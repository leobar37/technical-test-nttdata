/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { ButtonWrapper } from "./button.styles";
import { Variant } from "./types";
import { IconContainer } from "./icon.container";

import { cx } from "@emotion/css";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  lefIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, lefIcon, variant, rightIcon, className, ...props }, ref) => {
    return (
      <ButtonWrapper
        className={cx("app__button", className)}
        variant={variant}
        ref={ref}
        role="button"
        {...props}
      >
        {lefIcon && (
          <IconContainer
            style={{
              paddingRight: "0.5rem",
            }}
          >
            {lefIcon}
          </IconContainer>
        )}
        <span>{children}</span>
        {rightIcon && (
          <IconContainer
            style={{
              paddingLeft: "0.5rem",
            }}
          >
            {rightIcon}
          </IconContainer>
        )}
      </ButtonWrapper>
    );
  }
);

Button.defaultProps = {
  variant: "fill",
};

Button.displayName = "Button";
