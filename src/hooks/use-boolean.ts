import { useCallback, useState } from "react";

export const useBoolean = (state = false) => {
  const [isOn, setIsOpen] = useState(state);
  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);
  const on = useCallback(() => setIsOpen(true), []);
  const off = useCallback(() => setIsOpen(false), []);

  return {
    toggle,
    on,
    off,
    isOn,
  };
};
