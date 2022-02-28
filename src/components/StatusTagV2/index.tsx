import { StatusTagContainer } from "./styles";

export type state = "active" | "pending" | "locked" | "requestedToEdit";
interface IStatusTagProps {
  active: state;
}

const StatusTag: React.FC<IStatusTagProps> = props => {
  const { active } = props;
  return (
    <StatusTagContainer active={active}>
      {active === "requestedToEdit"
        ? "Requested to edit"
        : active.charAt(0).toUpperCase() + active.slice(1)}
    </StatusTagContainer>
  );
};

export default StatusTag;
