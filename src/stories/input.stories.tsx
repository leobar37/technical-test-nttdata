import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "../ui/input";
import { defaultDecorators } from "./decorator";
import { FiSearch } from "react-icons/fi";

type Meta = ComponentMeta<typeof Input>;

type Story = ComponentStory<typeof Input>;

export default {
  title: "Components / Input",
  decorators: defaultDecorators,
} as Meta;

const Template: Story = ({ ...args }) => <Input {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  placeholder: "Buscar",
};
export const WithIcon = Template.bind({});

WithIcon.args = {
  icon: <FiSearch />,
  placeholder: "Buscar",
};
