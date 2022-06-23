import { render } from "@App/test-utils";
import { Stack } from "@App/ui";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../index";
describe("(UI)Button", () => {
  test("the button renders correctly", () => {
    const { getByText, getByRole } = render(
      <Button data-testid="button">Button</Button>
    );
    expect(getByText("Button")).toBeTruthy();
    const el = getByRole("button");
    expect(el).toBeInTheDocument();

    expect(el.classList.contains("app__button")).toBeTruthy();
  });

  test("renderf with icons", () => {
    const { getByTestId } = render(
      <Stack>
        <Button lefIcon={<AiOutlinePlus data-testid="leftIcon" />}>
          Button
        </Button>
        <Button rightIcon={<AiOutlinePlus data-testid="rightIcon" />}>
          Button
        </Button>
      </Stack>
    );
    expect(getByTestId("leftIcon")).toBeInTheDocument();
    expect(getByTestId("rightIcon")).toBeInTheDocument();
  });
});
