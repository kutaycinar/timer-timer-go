import { Glassfy, GlassfyPermissions } from "capacitor-plugin-glassfy";
import { useEffect, useState } from "react";

function Purchases() {
  const [perms, setPerms] = useState<GlassfyPermissions>();
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
      const perms = await Glassfy.permissions();
      setPerms(perms);
    }
    init();
  }, []);
  return <pre>{JSON.stringify(perms, undefined, 2)}</pre>;
}

export default Purchases;
