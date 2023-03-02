import { Glassfy } from "capacitor-plugin-glassfy";

function Purchases() {
  async function init() {
    try {
      await Glassfy.initialize({
        apiKey: "6f17c860640445d6b7112bf3215e80b9",
        watcherMode: false,
      });
    } catch (e) {
      // initialization error
    }
  }
  return <></>;
}

export default Purchases;
