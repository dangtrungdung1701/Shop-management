import React, { ChangeEvent, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { SearchBoxTableContainer, Input } from "./styles";
import SearchIcon from "icons/Search";
import useConstant from "hooks/useConstant";

const DELAY = 300;

interface ISearchBoxTableProps {
  className?: string;
  placeholder?: string;
  onFetchData: (text: string) => void;
}

const SearchBoxTable: React.FC<ISearchBoxTableProps> = ({
  className = "",
  placeholder = "",
  onFetchData,
}) => {
  const [text, setText] = useState<string>("");

  const searchAPIDebounced = useConstant(() =>
    AwesomeDebouncePromise(onFetchData, DELAY),
  );

  const handleTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    searchAPIDebounced(newText);
    setText(newText);
  };

  return (
    <SearchBoxTableContainer className={className}>
      <SearchIcon />
      <Input
        name="search"
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={text}
        onChange={handleTextChange}
      />
    </SearchBoxTableContainer>
  );
};

export default SearchBoxTable;
