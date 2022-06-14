import useCheckPermission from "hooks/useCheckPermission";
import { ReactNode } from "react";
import { IPermissionV2Id } from "typings";
import useStore from "zustand/store";
import { LayoutTableContainer, Heading, TableWrapper } from "./styles";

interface ILayoutTableProps {
  title?: string;
  permission?: IPermissionV2Id;
  buttonMenu?: ReactNode;
  children: ReactNode;
}

const LayoutTable: React.FC<ILayoutTableProps> = ({
  buttonMenu = null,
  title = "",
  children,
  permission,
}) => {
  const { currentUser } = useStore();
  const getIsPermission = () => {
    if (!permission) return true;
    return useCheckPermission(permission, currentUser);
  };
  return (
    <LayoutTableContainer>
      <Heading.Wrapper>
        <Heading.Title>{title && title}</Heading.Title>
        {getIsPermission() && buttonMenu && buttonMenu}
      </Heading.Wrapper>
      <TableWrapper>
        {getIsPermission() ? (
          children
        ) : (
          <div className="h-30 flex items-center justify-center font-bold text-20">
            Bạn không có quyền truy cập trang này
          </div>
        )}
      </TableWrapper>
    </LayoutTableContainer>
  );
};

export default LayoutTable;
