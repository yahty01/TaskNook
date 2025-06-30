export type ThemeMode = "light" | "dark"

export const getInitialThemeMode = (): ThemeMode => {
  const stored = localStorage.getItem("theme")
  return stored === "dark" || stored === "light" ? stored : "light"
}
