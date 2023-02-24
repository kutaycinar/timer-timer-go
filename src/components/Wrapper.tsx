import { Capacitor } from "@capacitor/core";
import "./Wrapper.css";

// function Wrapper() {
//   return <></>;
// }

function BrowserWrapper({ children }: { children: any }) {
  return Capacitor.isNativePlatform() ? (
    <>{children}</>
  ) : (
    <div className="iPhoneX">{children}</div>
  );
}

export default BrowserWrapper;