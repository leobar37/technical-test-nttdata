import "@testing-library/jest-dom/extend-expect";
import { mockServer } from "./mocks/server";
import "whatwg-fetch";
import { SafeAny } from "./types";

beforeAll(async () => {
  mockServer.listen({
    onUnhandledRequest: "warn",
  });
});

afterEach(() => {
  mockServer.resetHandlers();
  jest.resetAllMocks();
});

afterAll(() => {
  mockServer.close();
});
// In your test setup file
(globalThis as SafeAny).IS_REACT_ACT_ENVIRONMENT = true;
