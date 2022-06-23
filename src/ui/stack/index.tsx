import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Stack = styled.div<{ direction?: "row" | "column" }>`
  display: flex;
  justify-content: start;
  ${({ direction }) =>
    direction == "column"
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
        `}
`;

Stack.defaultProps = {
  direction: "row",
};
