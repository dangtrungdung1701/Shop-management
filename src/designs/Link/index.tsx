import { KeyboardEvent, MouseEvent } from "react";
import { useHistory } from "react-router";

import { cleanObject } from "common/functions";

import { ILinkProps } from "./interface";

const Link: React.FC<ILinkProps> = props => {
  const history = useHistory();
  const {
    to: toURL,
    disableShadow = false,
    children,
    className = "",
    query = {},
    params = {},
  } = props;

  let href = toURL;

  if (params) {
    for (const key in params) {
      const value = params[key] || "-";
      href = href.replace(`/:${key}`, `/${value}`);
    }
  }

  // incase we replace all params but it still has /:abc in url,
  // replace it by -.
  // example: "/nha-dat/ban/:province/thu-duc/:ward" --> "/nha-date/ban/-/thu-duc/-"
  href = href.replace(/(\/:)\w+/g, "/-");

  if (Object.keys(query).length) {
    const queryString = renderQueryStringFromObject(cleanObject(query) as any);
    href += `?${queryString}`;
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!disableShadow) {
      e.preventDefault();
      history.push(href);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "13") {
      e.preventDefault();
      history.push(href);
    }
  };

  return (
    <a
      href={href}
      className={`block cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {children}
    </a>
  );
};

export default Link;

const renderQueryStringFromObject = (query: Record<string, string>) => {
  return new URLSearchParams(query)?.toString();
};
