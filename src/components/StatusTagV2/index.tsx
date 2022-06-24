import { StatusTagContainer } from "./styles";

export type state = "approved" | "pending" | "refuse";
interface IStatusTagProps {
  active: state;
}

const StatusTag: React.FC<IStatusTagProps> = props => {
  const { active } = props;
  return (
    <StatusTagContainer active={active}>
      {(() => {
        switch (active) {
          case "approved":
            return "Đã duyệt";
          case "pending":
            return "Chờ duyệt";
          case "refuse":
            return "Từ chối";
          default:
            return "Đã duyệt";
        }
      })()}
    </StatusTagContainer>
  );
};

export default StatusTag;
