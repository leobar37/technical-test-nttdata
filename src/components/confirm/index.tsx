/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, FC, ReactNode, useContext } from "react";
import { noop } from "lodash";
import { useImmer, Updater } from "use-immer";
import { Modal, Button, Stack, Text } from "@App/ui";
import styled from "@emotion/styled";

const initialState = {
  title: "",
  body: "",
  isOpen: false,
  onConfirm: noop,
  onCancel: noop,
};
type State = typeof initialState;

const ConfirmContext = createContext<{ state: State; patch: Updater<State> }>(
  undefined!
);

interface ConfirmProviderProps {
  children: ReactNode;
}

const Box = styled.div`
  text-align: center;
  .buttons {
    justify-content: center;
  }
`;

export const ConfirmProvider: FC<ConfirmProviderProps> = ({ children }) => {
  const [state, patch] = useImmer(initialState);

  return (
    <ConfirmContext.Provider value={{ state, patch }}>
      {children}
      <Modal
        isOpen={state.isOpen}
        onClose={() => {
          patch((draft) => {
            draft.isOpen = false;
          });
        }}
      >
        <Box>
          <Text as="h3" size="lg">
            {state.title}
          </Text>
          <Text as="p" size="md">
            {state.body}
          </Text>
          <Stack className="buttons">
            <Button
              variant="outline"
              onClick={() => {
                patch((draft) => {
                  draft.isOpen = false;
                });
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                state?.onConfirm();
              }}
            >
              Confirmar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </ConfirmContext.Provider>
  );
};

const useConfirmStore = () => useContext(ConfirmContext);

type UseConfirmOptions = {
  title: string;
  description: string;
  onConfirm: () => void;
};
export const useConfirm = (topOptions: Partial<UseConfirmOptions>) => {
  const { patch } = useConfirmStore();
  const confirm = (funOptions: Partial<UseConfirmOptions>) => {
    const options = Object.assign(
      {} as UseConfirmOptions,
      topOptions,
      funOptions
    );
    patch((draft) => {
      draft.isOpen = true;
      draft.title = options.title;
      const onConfirm = () => {
        patch((draft) => {
          draft.isOpen = false;
          options?.onConfirm?.();
        });
      };
      draft.onConfirm = onConfirm;
      draft.body = options.description;
    });
  };
  return confirm;
};
