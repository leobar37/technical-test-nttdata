import { ComponentMeta, ComponentStory } from "@storybook/react";
import { defaultDecorators } from "./decorator";
import { Table } from "../ui/table";
import { SafeAny } from "@App/types";
type Meta = ComponentMeta<typeof Table>;
type Story = ComponentStory<typeof Table>;
export default {
  title: "Components / table",
  decorators: defaultDecorators,
} as Meta;

export const Normal: Story = (args: SafeAny) => {
  const columns = ["Nombre", "Imagen", "Ataque", "Defensa"];
  const data = Array.from({ length: 10 }).map((_) => [
    "Ivysaus",
    "",
    "65",
    "38",
  ]);
  return (
    <Table {...args}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {row.map((d, idx2) => (
              <td key={idx2}>{d}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
