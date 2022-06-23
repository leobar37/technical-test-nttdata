import { act, fireEvent, render, screen, waitFor } from "@App/test-utils";
import { SafeAny } from "@App/types";
import { Formik } from "formik";
import { noop } from "lodash";
import { ReactNode } from "react";
import { Form } from "../components/maintainPokemon";
import { WrapperPokemon } from "../utils";
const stub = (node: ReactNode) => {
  return <WrapperPokemon>{node}</WrapperPokemon>;
};

const findByName = (element: HTMLElement, name: string) => {
  const el = element.querySelector(`[name=${name}]`);
  return el;
};

describe("testing mantain pokemon component", () => {
  test("Form are render correctly", () => {
    const Component = () => {
      return (
        <Formik
          initialValues={{
            attack: 0,
            defense: 0,
            name: "",
            image: "",
          }}
          onSubmit={noop}
        >
          <Form mode="create" pokemon={null} />
        </Formik>
      );
    };

    const { container } = render(stub(<Component />));

    const verifyInput = (element: HTMLElement, name: string) => {
      const el = element.querySelector(`[name=${name}]`);
      expect(el).toBeInTheDocument();
    };
    verifyInput(container, "attack");
    verifyInput(container, "defense");
    verifyInput(container, "name");
    verifyInput(container, "image");
  });

  test("Submit works properly", async () => {
    const submit = jest.fn();
    const Component = () => {
      return (
        <Formik
          initialValues={{
            attack: 0,
            defense: 0,
            name: "",
            image: "",
          }}
          onSubmit={submit}
        >
          <Form mode="create" pokemon={null} />
        </Formik>
      );
    };

    let container: HTMLElement = null as SafeAny;
    const { container: con } = render(stub(<Component />));
    container = con;

    const changeInput = async (name: string, value: SafeAny) => {
      const el = findByName(container, name);
      await waitFor(() => expect(el).not.toBeNull());
      fireEvent.change(el as SafeAny, {
        target: {
          value: value,
        },
      });
    };
    const values = {
      attack: 10,
      defense: 20,
      name: "Bulbasur",
      image: "https://www.enter.co/wp-content/uploads/2016/02/bulbasaur.png",
    };

    await act(async () => {
      await changeInput("attack", values.attack);
      await changeInput("defense", values.defense);
      await changeInput("name", values.name);
      await changeInput("image", values.image);
      const submitElement = screen.getByText("Guardar");
      expect(submit).not.toBeNull();
      fireEvent.click(submitElement);
      await waitFor(() => expect(submit).toHaveBeenCalled());
      expect(submit.mock.calls[0][0]).toEqual(values);
    });
  });
});
