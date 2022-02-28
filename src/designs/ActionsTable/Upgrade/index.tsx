import { ActionItem, ActionText } from "./styles";
import SVG from "designs/SVG";
interface IUpgradeProps {}

export const Upgrade: React.FC<IUpgradeProps> = props => {
  return (
    <ActionItem>
      <SVG name="common/refresh" width={16} height={16} />
      <ActionText>Change permission</ActionText>
    </ActionItem>
  );
};
