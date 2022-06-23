import styled from "@emotion/styled";
import { getToken } from "@App/utils";
import { FontSize } from "@App/theme";
import { get } from "lodash";

export const Text = styled.p<{ size?: FontSize }>`
  font-family: ${getToken("fonts.body")};
  font-size: ${(props) => get(props.theme, `fontSizes[${props.size}]`)};
`;

Text.defaultProps = {
  size: "md",
};
