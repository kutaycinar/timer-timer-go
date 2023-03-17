import { Capacitor } from "@capacitor/core";
import { Glassfy, GlassfySku } from "capacitor-plugin-glassfy";
import { useContext } from "react";
import StateProvider, { StateContext } from "./StateProvider";

export type SkuInfo =
  | {
      isPro: boolean | undefined;
      proSku: GlassfySku | undefined;
    }
  | undefined;
export async function initGlassfy(): Promise<SkuInfo | undefined> {
  const result: SkuInfo = {
    isPro: undefined,
    proSku: undefined,
  };
  if (!Capacitor.isNativePlatform()) {
    console.warn("Glassfy not supported on this platform");
    return;
  }
  try {
    await Glassfy.initialize({
      apiKey: import.meta.env.VITE_GLASSFY_API_KEY ?? "",
      watcherMode: false,
    });
    const permissions = await Glassfy.permissions();
    if (
      permissions.all.find(
        (perm) => perm.permissionId === "pro_mode" && perm.isValid
      )
    ) {
      result.isPro = true;
    }
  } catch (e) {
    console.error("INIT ERROR:", e);
  }

  try {
    const offerings = await Glassfy.offerings();
    result.proSku = offerings.all[0]?.skus[0] ?? undefined;
  } catch (e) {
    console.error("OFFERINGS ERROR:", e);
  }
  return result;
}

export async function purchaseSKU(proSku: SkuInfo) {
  const { setProMode } = useContext(StateContext);
  if (!proSku) return;
  try {
    const transaction = await Glassfy.purchaseSku({ sku: proSku.proSku! });
    const permission = transaction.permissions.all.find(
      (p) => p.permissionId === "pro_mode"
    );
    if (permission && permission.isValid) {
      setProMode({ ...proSku, isPro: true });
    }
  } catch (e) {
    console.error("Purchase Error");
  }
}
