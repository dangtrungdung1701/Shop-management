import { useEffect, useLayoutEffect, useRef } from "react";

type IOption = {
  runInFirstRender: boolean;
};

export const useEventListener = (
  event: string,
  callback: (e: EventListenerOrEventListenerObject | null) => void,
  option?: IOption,
) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    if (option?.runInFirstRender) callbackRef.current(null);

    const handler: any = (e: EventListenerOrEventListenerObject) =>
      callbackRef.current(e);
    window.addEventListener(event, handler);

    return () => window.removeEventListener(event, handler);
  }, [event]);
};
