import { defaultDecorators } from "./decorator";
import { ComponentMeta } from "@storybook/react";
import { Button } from "../ui/button";
import { SafeAny } from "@App/types";
import { AiOutlinePlus } from "react-icons/ai";
import { Stack } from "@App/ui/stack";

type Meta = ComponentMeta<typeof Button>;

export default {
  title: "Components / Button",
  decorators: defaultDecorators,
  component: Button,
} as Meta;

export const Normals = (args: SafeAny) => {
  return (
    <Stack>
      <Button {...args}>Button</Button>
      <Button {...args} lefIcon={<AiOutlinePlus />}>
        with left icon
      </Button>
      <Button {...args} rightIcon={<AiOutlinePlus />}>
        with right icon
      </Button>
    </Stack>
  );
};

export const Outlines = (args: SafeAny) => {
  return (
    <Stack>
      <Button {...args} variant="outline">
        Button
      </Button>
      <Button {...args} lefIcon={<AiOutlinePlus />} variant="outline">
        with left icon
      </Button>
      <Button {...args} rightIcon={<AiOutlinePlus />} variant="outline">
        with right icon
      </Button>
    </Stack>
  );
};
