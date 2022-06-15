import React, { ChangeEvent, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import SearchIcon from "icons/Search";

import useConstant from "hooks/useConstant";

import { SearchBoxTableContainer, Input } from "./styles";

const DELAY = 300;

interface ISearchBoxTableProps {
  className?: string;
  placeholder?: string;
  isSelect?: boolean;
  onFetchData: (text: string) => void;
}

const SearchBoxTable: React.FC<ISearchBoxTableProps> = ({
  className = "",
  placeholder = "",
  onFetchData,
  isSelect = false,
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
    <SearchBoxTableContainer className={className} isSelect={isSelect}>
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
