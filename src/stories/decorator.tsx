import { FC } from "react";
import { SafeAny } from "@App/types";
import { ThemeProvider } from "@emotion/react";
import theme from "@App/theme";
export const defaultDecorators = [
  (Story: FC<SafeAny>) => {
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    );
  },
];
