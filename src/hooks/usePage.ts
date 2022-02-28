import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useHistory } from "react-router";

export const usePage = (
  initialPage: string | number = 1,
): [number, Dispatch<SetStateAction<number>>] => {
  const history = useHistory();
  const [state, setState] = useState(Number(initialPage));
  const setPage = useCallback((newPage: number) => {
    setState(newPage);
    history.push(`${history.location.pathname}?page=${newPage}`);
  }, []);

  return [state, setPage as any];
};
