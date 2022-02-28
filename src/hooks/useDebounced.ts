import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";

// Generic reusable hook
export function useDebounced<T = any>(
  searchFunction: (text: string) => void,
  timeDebounced = 300,
) {
  const [inputText, setInputText] = useState("");

  const debouncedSearchFunction = useConstant<any>(() =>
    AwesomeDebouncePromise(searchFunction, timeDebounced),
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length < 2) {
      return [];
    } else {
      return (debouncedSearchFunction(inputText) as T[]) || [];
    }
  }, [debouncedSearchFunction, inputText]);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
}
