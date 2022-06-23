import { FC, useEffect } from "react";
import { Stack, Text, RanqeInput, Button } from "@App/ui";
import styled from "@emotion/styled";
import { FormControl, FormLabel, Input } from "@App/ui";
import { getToken } from "@App/utils";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { Formik, useFormikContext, Field, FieldProps } from "formik";
import { CreatePokemon, Pokemon } from "../../domain/types";
import { SafeAny } from "@App/types";
import {
  useCreatePokemonMutation,
  useUpdatePokemonMutation,
} from "../../controllers";
import { useMantainModal } from "../../domain/store";
import { useChanges } from "@App/hooks";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  width: 600px;
  margin: 1rem auto;
  .title {
    text-align: center;
  }
  padding: 2rem 2rem;
  .box {
    justify-content: space-between;
  }
  background-color: ${getToken("colors.white")};
  border: 2px solid ${getToken("colors.gray.300")};
  .button_group {
    margin: 0 auto;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const mapperPerMode: SafeAny = {
  edit: {
    title: (pokemon?: Pokemon) => `Editando a ${pokemon?.name}`,
    buttonOk: "Guardar cambios",
  },
  create: {
    title: () => `Nuevo Pokemon`,
    buttonOk: "Guardar",
  },
};

export const Form: FC<{
  mode: string;
  pokemon?: Pokemon | null;
}> = ({ mode, pokemon }) => {
  const { handleSubmit, setValues, values, isValid, isSubmitting } =
    useFormikContext<CreatePokemon>();
  const properties = mapperPerMode[mode];
  const changesApi = useChanges(values);
  useEffect(() => {
    if (pokemon) {
      const valuesInForm = {
        attack: pokemon.attack,
        defense: pokemon.defense,
        image: pokemon.image,
        name: pokemon.name,
      };
      setValues(valuesInForm);
      changesApi.toCompare(valuesInForm);
    }
  }, [pokemon]);

  const isDisabled = !isValid || !changesApi.hasChanges || isSubmitting;

  return (
    <Wrapper as="form" onSubmit={handleSubmit as SafeAny}>
      <Text className="title" as="h4">
        {properties.title(pokemon)}
      </Text>
      <Stack className="box">
        <Stack direction="column">
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Field name="name">
              {({ field }: FieldProps) => {
                return <Input type={"text"} {...field} />;
              }}
            </Field>
          </FormControl>
          <FormControl>
            <FormLabel>Imagen:</FormLabel>
            <Field name="image">
              {({ field }: FieldProps) => {
                return <Input placeholder="url" type={"url"} {...field} />;
              }}
            </Field>
          </FormControl>
        </Stack>
        <Stack direction="column">
          <FormControl>
            <FormLabel>Ataque:</FormLabel>
            <Field name="attack">
              {({ field }: FieldProps) => {
                return <RanqeInput {...field} />;
              }}
            </Field>
          </FormControl>
          <FormControl>
            <FormLabel>Defensa:</FormLabel>
            <Field name="defense">
              {({ field }: FieldProps) => {
                return <RanqeInput {...field} />;
              }}
            </Field>
          </FormControl>
        </Stack>
      </Stack>
      <Stack className="button_group">
        <Button disabled={isDisabled} type="submit" lefIcon={<AiOutlineSave />}>
          {properties.buttonOk}
        </Button>
        <Button lefIcon={<AiOutlineClose />}>Cancelar</Button>
      </Stack>
    </Wrapper>
  );
};

const MaintainPokemon: FC = () => {
  const createPokemonMutation = useCreatePokemonMutation();
  const updatePokemonMutation = useUpdatePokemonMutation();
  const { closeModal, pokemon, mode } = useMantainModal();
  return (
    <Formik<CreatePokemon>
      initialValues={{
        attack: 0,
        defense: 0,
        name: "",
        image: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          switch (mode) {
            case "create": {
              await toast.promise(createPokemonMutation.mutateAsync(values), {
                pending: "Creando...",
                error: "Ha ocurrido un error al guardar",
                success: "Pokemon creado ",
              });
              break;
            }
            case "edit": {
              const input = Object.assign({} as Pokemon, pokemon, values);
              await toast.promise(updatePokemonMutation.mutateAsync(input), {
                pending: "Editando...",
                error: "Ha ocurrido un error al editar",
                success: "Pokemon editado",
              });
              break;
            }
          }
          closeModal();
        } catch (error) {
          setSubmitting(false);
        }
      }}
    >
      <Form mode={mode} pokemon={pokemon} />
    </Formik>
  );
};

export default MaintainPokemon;
