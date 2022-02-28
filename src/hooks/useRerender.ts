import { useCallback, useState } from "react";

export const useRerender = () => {
  const [_, setBool] = useState(false);

  const rerender = useCallback(() => {
    setBool(bool => !bool);
  }, []);

  return rerender;
};
