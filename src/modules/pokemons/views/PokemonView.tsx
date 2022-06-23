import { Button, Container, Input, Modal, Stack, Text } from "@App/ui";
import styled from "@emotion/styled";
import { FC } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import MaintainPokemon from "../components/maintainPokemon";
import PokemonsTable from "../components/PokemonsTable";
import { usePokemonData } from "../controllers";
import { usePokemonStore } from "../domain/store";
import { PokemonsProvider, useMantainModal } from "../domain/store";

const Wrapper = styled.div`
  .searchbar {
    justify-content: space-between;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .container {
    min-width: 950px;
    max-height: 600px;
    /* overflow: hidden; */
    background-color: #f3f5f4;
  }
  .bar {
    width: 100%;
    background: #9dadba;
    display: flex;
    padding-left: 1rem;
    align-items: center;
    padding: 4px 8px;
    span {
      background: #8e9eab;
      width: 15px;
      height: 15px;
      border-radius: 50px;
    }
  }
  .px-2 {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
`;

const Content = () => {
  const { data, isLoading } = usePokemonData();
  const { isOpen, closeModal, openModal } = useMantainModal();
  const { patch, state } = usePokemonStore();
  return (
    <Wrapper>
      <Container className="container" size="sm">
        <div className="bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="px-2">
          <Text size="lg">Listado de pokemones</Text>
          <Stack direction="row" className="searchbar" as={"header"}>
            <Input
              name="search"
              value={state.query}
              onChange={(e) => {
                patch((draft) => {
                  draft.query = e.target.value.trim();
                });
              }}
              placeholder="Buscar"
              icon={<FiSearch />}
              type="text"
            />
            <Button
              lefIcon={<FiPlus />}
              onClick={() => {
                openModal();
              }}
            >
              Nuevo
            </Button>
          </Stack>
          <PokemonsTable isLoading={isLoading} data={data || []} />
        </div>
      </Container>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <MaintainPokemon />
      </Modal>
    </Wrapper>
  );
};

const Page: FC = () => {
  return (
    <PokemonsProvider>
      <Content />
    </PokemonsProvider>
  );
};

export default Page;
