import { get } from "lodash";
import { SafeAny } from "@App/types";
export const getToken = (path: string, fallback?: SafeAny) => {
  return (props: SafeAny) => get(props.theme, path, fallback);
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
