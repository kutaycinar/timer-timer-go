import "./ThemeProvider.css";
function ThemeProvider({ children }: { children: any }) {
  const useDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return <div data-theme={useDark ? "dark" : "light"}>{children}</div>;
}

export default ThemeProvider;
