import { Glassfy, GlassfySku } from "capacitor-plugin-glassfy";

export type SkuInfo = {
  isPro: boolean;
  proSku: GlassfySku | undefined;
};
export async function initGlassfy(): Promise<SkuInfo> {
  const result: SkuInfo = {
    isPro: false,
    proSku: undefined,
  };
  try {
    await Glassfy.initialize({
      apiKey: "6f17c860640445d6b7112bf3215e80b9",
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
    console.log("INIT ERROR:", e);
  }

  try {
    const offerings = await Glassfy.offerings();
    result.proSku = offerings.all[0]?.skus[0] ?? undefined;
  } catch (e) {
    console.log("OFFERINGS ERROR:", e);
  }
  return result;
}
