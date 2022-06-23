import { FC } from "react";
import { Text } from "@App/ui/text";

export const LoadingTable: FC = () => {
  return (
    <div data-testid="loading">
      <Text>Cargando...</Text>
    </div>
  );
};
