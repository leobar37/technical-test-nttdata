import { ContainerSize } from "@App/theme";
import styled from "@emotion/styled";
import { get } from "lodash";

export const Container = styled.div<{ size?: ContainerSize }>`
  margin: 0 auto;
  max-width: ${(props) => get(props.theme, `container[${props.size}]`)};
`;

Container.defaultProps = {
  size: "lg",
};
