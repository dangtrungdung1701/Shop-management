import { ActionItem, ActionText } from "./styles";
import SVG from "designs/SVG";
interface IEditProps {}

export const Edit: React.FC<IEditProps> = props => {
  return (
    <ActionItem>
      <SVG name="common/edit" width={16} height={16} />
      <ActionText>Edit</ActionText>
    </ActionItem>
  );
};
