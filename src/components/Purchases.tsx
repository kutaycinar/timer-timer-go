import {
  Glassfy,
  GlassfyOffering,
  GlassfyOfferings,
} from "capacitor-plugin-glassfy";
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
    }
    updateOfferings();
  }, [test]);

  function getOffers() {
    const options = perms.map((perm: GlassfyOffering) => {
      <div>{perm.offeringId}</div>;
    });
    return (
      <>
        {perms.length}
        {...options}
        <button onClick={() => setTest(test + 1)}> Refresh </button>
      </>
    );
  }

  return <div>Test: {getOffers()}</div>;
}

export default Purchases;
