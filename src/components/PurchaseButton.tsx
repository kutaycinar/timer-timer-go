import { Glassfy } from "capacitor-plugin-glassfy";
import { SkuInfo } from "../iap";
import Confirmation from "./Confirmation";

function PurchaseButton({
  proInfo,
  setPro,
  children,
  type,
  body,
}: {
  proInfo: SkuInfo;
  setPro: any;
  children: any;
  type: string;
  body: string;
}) {
  // disabled state
  //   if (proInfo.proSku === undefined)
  //     return <button disabled>Cannot Purchase</button>;

  async function purchaseSKU() {
    // try {
    //   const transaction = await Glassfy.purchaseSku({ sku: proInfo.proSku! });
    //   const permission = transaction.permissions.all.find(
    //     (p) => p.permissionId === "pro_mode"
    //   );
    //   if (permission && permission.isValid) {
    //     setPro(true);
    //   }
    // } catch (e) {
    //   console.error("Purchase Error");
    // }
  }

  return (
    <Confirmation
      title={"Buy Pro"}
      body={body}
      callback={purchaseSKU}
      type={type}
    >
      {/* {"Buy Pro Mode: $" + proInfo.proSku!.product.price} */}
      {children}
    </Confirmation>
  );
}

export default PurchaseButton;
