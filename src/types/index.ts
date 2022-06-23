// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;

export type Action<
  T extends SafeAny,
  Payload extends object | undefined | string
> = Payload extends undefined ? { type: T } : { type: T; payload: Payload };
