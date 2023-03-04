import { Glassfy, GlassfyOffering } from "capacitor-plugin-glassfy";
import { useEffect, useState } from "react";

function Purchases() {
  const [perms, setPerms] = useState<GlassfyOffering[]>([]);
  const [test, setTest] = useState(0);
  useEffect(() => {
    async function init() {
      try {
        await Glassfy.initialize({
          apiKey: "6f17c860640445d6b7112bf3215e80b9",
          watcherMode: false,
        });
      } catch (e) {
        console.log(e);
      }
      setTest(1);
    }
    init();
  }, []);

  useEffect(() => {
    async function updateOfferings() {
      const offerings = await Glassfy.offerings();
      setPerms(offerings.all);
      //@ts-ignore
      // try {
      //   let sku = await Glassfy.skuWithId({ identifier: "unlock_pro_mode" });
      //   // sku.extravars
      //   // sku.product.description;
      //   // sku.product.price
      //   //@ts-ignore
      //   setPerms(sku);
      // } catch (e) {
      //   console.log(e);
      //   // setPerms(e);
      // }
    }
    updateOfferings();
  }, [test]);

  function getOffers() {
    const options = perms.map((perm: GlassfyOffering) => {
      return <div>{perm.offeringId}</div>;
    });
    return (
      <>
        {perms.length}
        <pre>{JSON.stringify(perms, undefined, 2)}</pre>
        {...options}
        <button onClick={() => setTest(test + 1)}> Refresh </button>
      </>
    );
  }

  return <div>Test: {getOffers()}</div>;
}

export default Purchases;
