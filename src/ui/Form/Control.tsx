import styled from "@emotion/styled";
import { HTMLAttributes, FC, ReactNode } from "react";
import { cx } from "@emotion/css";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  label {
    min-width: 4rem;
  }
  margin: 0.5rem 0.2rem;
`;

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  hasError?: boolean;
  children?: ReactNode;
}

export const FormControl: FC<FormControlProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Wrapper {...props} className={cx("form_control", className)}>
      {children}
    </Wrapper>
  );
};
