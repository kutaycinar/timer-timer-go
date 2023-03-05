import { Glassfy, GlassfyOffering } from "capacitor-plugin-glassfy";
import { useEffect, useState } from "react";

function Purchases() {
  const [perms, setPerms] = useState<GlassfyOffering[]>([]);
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

  function getOffers() {
    const options = perms.map((perm: GlassfyOffering) => {
      return <div>{perm.skus[0]?.skuId}</div>;
    });
    return (
      <>
        {perms.length}
        <pre>{JSON.stringify(perms, undefined, 2)}</pre>
        {...options}
      </>
    );
  }

  return <div>Test: {getOffers()}</div>;
}

export default Purchases;
