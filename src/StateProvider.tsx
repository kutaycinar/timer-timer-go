import { createContext } from "react";
import { useTimer } from "./hooks";
import { Hooks, State } from "./types";

//@ts-ignore
export const StateContext = createContext<Hooks>(null);

function StateProvider({ children }: { children: any }) {
  if (StateContext == null) {
    throw new Error("No global state defined");
  }
  return (
    <StateContext.Provider value={{ ...useTimer() }}>
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
