import styled from "@emotion/styled";
import { FC, HtmlHTMLAttributes } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export interface RangeInputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  omitEdges?: boolean;
}
export const RanqeInput: FC<RangeInputProps> = ({
  min,
  omitEdges,
  max,
  ...props
}) => {
  return (
    <Wrapper>
      {!omitEdges && <span>{min}</span>}
      <input type="range" min={min} max={max} {...props} />
      {!omitEdges && <span>{max}</span>}
    </Wrapper>
  );
};

RanqeInput.defaultProps = {
  min: 0,
  max: 100,
  omitEdges: false,
};
