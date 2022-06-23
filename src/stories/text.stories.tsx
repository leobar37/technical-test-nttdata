import { FontSize } from "@App/theme";
import { SafeAny } from "@App/types";
import { Stack } from "@App/ui/stack";
import { Text } from "@App/ui/text";
import { ComponentMeta } from "@storybook/react";
import { defaultDecorators } from "./decorator";
export default {
  title: "components / text",
  decorators: defaultDecorators,
} as ComponentMeta<SafeAny>;

export const withSizes = () => {
  const fontSizes: FontSize[] = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
  ];

  return (
    <Stack direction="column">
      {fontSizes.map((size) => (
        <Text key={size} size={size}>
          text with size {size}
        </Text>
      ))}
    </Stack>
  );
};
