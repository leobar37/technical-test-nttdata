import { getToken } from "@App/utils";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

const InputWrapper = styled("div", {
  shouldForwardProp: (propname) => propname !== "hasIcon",
})<{ hasIcon?: boolean }>`
  border: 2px solid ${getToken("colors.gray.300")};
  padding: 0.5rem 0.5rem;
  width: max-content;
  height: max-content;
  background: ${getToken("colors.white")};
  display: flex;
  align-items: center;
  input {
    border: none;
    outline: none;
  }

  ${(props) =>
    props.hasIcon
      ? css`
          input {
            margin-left: 0.5rem;
          }
        `
      : css``}
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...props }, ref) => {
    const hasIcon = icon !== null;
    return (
      <InputWrapper hasIcon={hasIcon}>
        {icon}
        <input type={"text"} ref={ref} {...props} />
      </InputWrapper>
    );
  }
);
Input.defaultProps = {
  icon: null,
};

Input.displayName = "Input";
