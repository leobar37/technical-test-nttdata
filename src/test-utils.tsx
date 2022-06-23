import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import theme from "@App/theme";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfirmProvider } from "@App/components/confirm";

export const WrapperApp: FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = new QueryClient();
  return (
    <ConfirmProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    </ConfirmProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WrapperApp, ...options });

export * from "@testing-library/react";
export { customRender as render };
