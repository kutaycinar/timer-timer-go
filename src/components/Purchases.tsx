import { Glassfy, GlassfyOffering, GlassfySku } from "capacitor-plugin-glassfy";
import { useEffect, useState } from "react";

function Purchases() {
  const [perms, setPerms] = useState<GlassfyOffering[]>([]);
  const [pro, setPro] = useState(false);
  useEffect(() => {
    async function init() {
      try {
        await Glassfy.initialize({
          apiKey: "6f17c860640445d6b7112bf3215e80b9",
          watcherMode: false,
        });
      } catch (e) {
        console.log("INIT ERROR:", e);
      }

      try {
        const offerings = await Glassfy.offerings();
        setPerms(offerings.all);
      } catch (e) {
        console.log("OFFERINGS ERROR:", e);
      }
    }
    init();
  }, []);

  async function purchaseSKU(sku: GlassfySku) {
    try {
      const transaction = await Glassfy.purchaseSku({ sku });
      const permission = transaction.permissions.all.find(
        (p) => p.permissionId === "aPermission"
      );
      if (permission && permission.isValid) {
        setPro(true);
      }
    } catch (e) {
      console.log("Purchase Error");
    }
  }

  function getOffers() {
    const options = perms.map((perm: GlassfyOffering) => {
      return (
        <button onClick={() => purchaseSKU(perm.skus[0])}>
          {perm.skus[0].product.title + ": " + perm.skus[0].product.price}
        </button>
      );
    });
    return (
      <>
        {options}
        <pre>{JSON.stringify(perms, undefined, 2)}</pre>
        {pro && (
          <div style={{ background: "blue", width: "100%" }}>You are pro</div>
        )}
      </>
    );
  }

  return <div>Test: {getOffers()}</div>;
}

export default Purchases;
