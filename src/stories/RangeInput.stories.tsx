import { ComponentMeta } from "@storybook/react";
import { RanqeInput } from "../ui/range";
import { defaultDecorators } from "./decorator";

type Meta = ComponentMeta<typeof RanqeInput>;

export default {
  title: "Components / Range",
  decorators: defaultDecorators,
} as Meta;

export const WithEdges = () => {
  return <RanqeInput />;
};

export const WithoutEdges = () => {
  return <RanqeInput omitEdges />;
};
