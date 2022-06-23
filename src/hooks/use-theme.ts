import { SafeAny } from "@App/types";
import { useTheme as useThemeEmotion } from "@emotion/react";
import { get } from "lodash";
export const useTheme = <Path extends string | string[]>(
  path: Path
): Path extends string ? SafeAny : SafeAny[] => {
  const theme = useThemeEmotion();
  const pathsAreArray = Array.isArray(path);
  return pathsAreArray ? path.map((d) => get(theme, d)) : get(theme, path);
};
