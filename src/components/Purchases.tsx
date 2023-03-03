import {
  Glassfy,
  GlassfyOffering,
  GlassfyOfferings,
} from "capacitor-plugin-glassfy";
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
        console.log(e);
      }
      const offerings = await Glassfy.offerings();
      setPerms(offerings.all);
    }
    init();
  }, []);

  function getOffers() {
    const options = perms.map((perm: GlassfyOffering) => {
      <div>{perm.offeringId}</div>;
    });
    return (
      <>
        {perms.length}
        {...options}
        <button onClick={() => console.log(perms)}> Log </button>
      </>
    );
  }

  return <div>Test: {getOffers()}</div>;
}

export default Purchases;
