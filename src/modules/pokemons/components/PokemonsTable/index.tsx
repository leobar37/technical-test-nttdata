import { Stack, Table } from "@App/ui";
import { getToken } from "@App/utils";
import styled from "@emotion/styled";
import { FC, Fragment, useMemo } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useMantainModal } from "../../domain/store";
import { Pokemon } from "../../domain/types";
import { useDeletePokemonMuatation } from "../../controllers";
import { useConfirm } from "@App/components";
import { toast } from "react-toastify";
import { LoadingTable } from "@App/components";
import { Text } from "@App/ui";
type PokemonsTableProps = {
  data: Pokemon[];
  isLoading?: boolean;
};

const ButtonAction = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  opacity: 0.7;
  color: ${getToken("colors.primary")};
  margin: 0 0.1rem;
  svg {
    font-size: 1rem;
  }
  &:hover {
    opacity: 1;
  }
`;

const PokemonsTable: FC<PokemonsTableProps> = ({ data, isLoading }) => {
  const headers = useMemo(() => {
    return ["Nombres", "Imagen", "Ataque", "Defensa", "Acciones"].map(
      (label) => <th key={label}>{label}</th>
    );
  }, [data]);

  const deletePokemonMutation = useDeletePokemonMuatation();
  const { openModal } = useMantainModal();

  const confirm = useConfirm({
    description: "Esta acción es irreversible",
  });
  const rows = useMemo(() => {
    return data.map((pokemon) => (
      <tr key={pokemon.id}>
        <td>{pokemon.name}</td>
        <td>
          <img width={60} src={pokemon.image} alt={`${pokemon.name} image`} />
        </td>
        <td>{pokemon.attack}</td>
        <td>{pokemon.defense}</td>
        <td>
          <Stack>
            <ButtonAction
              onClick={() => {
                openModal(pokemon);
              }}
            >
              <AiOutlineEdit />
            </ButtonAction>
            <ButtonAction>
              <AiOutlineDelete
                onClick={() => {
                  confirm({
                    title: `Esta seguro que desea eliminar a ${pokemon.name}`,
                    onConfirm: async () => {
                      toast.promise(
                        deletePokemonMutation.mutateAsync(pokemon.id),
                        {
                          error: "Ha ocurrido un error al eliminar",
                          pending: "Eliminando...",
                          success: "Correctamente eliminado",
                        }
                      );
                    },
                  });
                }}
              />
            </ButtonAction>
          </Stack>
        </td>
      </tr>
    ));
  }, [data]);

  return (
    <div>
      <Table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {isLoading && <LoadingTable />}
      {data && data.length == 0 && (
        <Text data-testid="notFoundResults">No se encontraron Resultados</Text>
      )}
    </div>
  );
};
PokemonsTable.defaultProps = {
  isLoading: false,
};

export default PokemonsTable;
