/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getToken } from "@App/utils";
import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { get } from "lodash";

import { Variant } from "./types";
export const getStylesByVariant = (variant: Variant, theme: Theme) => {
  switch (variant) {
    case "fill": {
      return css`
        background: ${get(theme, "colors.primary")};
        border: 2px solid ${get(theme, "colors.primary")};
        color: ${get(theme, "colors.white")};

        &:enabled:hover {
          background: transparent;
          border: 2px solid ${get(theme, "colors.primary")};
          color: ${get(theme, "colors.primary")};
        }
      `;
    }
    case "outline": {
      return css`
        background: transparent;
        color: ${get(theme, "colors.primary")};
        border: 2px solid ${get(theme, "colors.primary")};
        &:enabled:hover {
          background: ${get(theme, "colors.primary")};
          color: ${get(theme, "colors.white")};
        }
      `;
    }
  }
};

export const ButtonWrapper = styled.button<{ variant?: Variant }>`
  border: none;
  outline: none;
  margin: 0.6rem 0.8rem;
  padding: 0.4rem 0.7rem;
  font-family: ${getToken("fonts.body")};
  font-weight: 300;
  font-style: normal;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
  font-size: ${getToken("fontSizes.md")};
  ${(props) => getStylesByVariant(props.variant!, props.theme)}
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    opacity: 0.8;
    cursor: auto;
    &:hover {
      transform: scale(1);
    }
  }
`;
