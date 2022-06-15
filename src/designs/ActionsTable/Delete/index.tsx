import SVG from "designs/SVG";

import { ActionItem, ActionText } from "./styles";

interface IDeleteProps {}

export const Delete: React.FC<IDeleteProps> = props => {
  return (
    <ActionItem>
      <SVG name="common/delete" width={16} height={16} />
      <ActionText>Delete</ActionText>
    </ActionItem>
  );
};
