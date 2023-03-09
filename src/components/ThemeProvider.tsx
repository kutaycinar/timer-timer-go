import { themeOption } from "../types";
import "./ThemeProvider.css";
function ThemeProvider({
  children,
  theme,
}: {
  children: any;
  theme: themeOption;
}) {
  // const useDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return <div data-theme={theme}>{children}</div>;
}

export default ThemeProvider;
