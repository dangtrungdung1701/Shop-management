import SVG from "designs/SVG";

import { ActionItem, ActionText } from "./styles";

interface IUpgradeProps {}

export const Upgrade: React.FC<IUpgradeProps> = props => {
  return (
    <ActionItem>
      <SVG name="common/refresh" width={16} height={16} />
      <ActionText>Change permission</ActionText>
    </ActionItem>
  );
};
