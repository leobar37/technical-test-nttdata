import { useRef, useMemo } from "react";
import { SafeAny } from "@App/types";
import { updatedDiff } from "deep-object-diff";

export const useChanges = (values: SafeAny) => {
  const refChanges = useRef<SafeAny>(null);
  const changes = useMemo(
    () => updatedDiff(refChanges.current, values),
    [values]
  );
  const toCompare = (values: SafeAny) => {
    refChanges.current = values;
  };

  const hasChanges = useMemo(() => Object.keys(changes).length > 0, [changes]);

  return {
    hasChanges,
    toCompare,
    changes,
  };
};
