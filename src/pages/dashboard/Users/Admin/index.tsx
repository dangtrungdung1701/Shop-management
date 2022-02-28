import React, { useMemo, useState, lazy, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import SearchBoxTable from "components/SearchBoxTable";
import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import TableLayout from "layouts/Table";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";

import { ButtonAdd, SearchBoxWrapper } from "./styles";
import { IDistrict } from "typings";

const AdminDialog = lazy(() => import("./AdminDialog"));
const UserProfileDialog = lazy(() => import("components/UserProfileDialog"));
const ChangePasswordDialog = lazy(
  () => import("components/ChangePasswordDialog"),
);

const LOAD_DATA = "LOAD_DATA";

interface IAdminProps extends RouteComponentProps {}

const Admin: React.FC<IAdminProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [currentAccount, setCurrentAccount] = useState<Boolean>(true);

  const [listCategories, setListCategories] = useState<IDistrict[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listDistrict.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý người dùng",
      href: "#",
    },
    {
      name: "Quản trị viên",
      href: PATH.USER.ADMIN,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: IDistrict) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props =>
              // record.userId === currentAccount.id ?
              currentAccount ? (
                <UserProfileDialog
                  editField={record}
                  onSuccess={() => {}}
                  open
                  {...props}
                />
              ) : (
                <AdminDialog
                  onSuccess={() => {
                    // invokeGetAllCategory();
                  }}
                  open
                  editField={record}
                  {...props}
                />
              ),
          },
          delete: {
            title: "Xóa quản trị viên",
            message: `Bạn có chắc chắn muốn xóa quản trị viên này?`,
            onDelete: async () => {
              // await deleteBlogAPI({ id: record._id });
              // invokeGetAllBlogList();
            },
          },
          ...(currentAccount && {
            update: {
              DialogContent: props => (
                // record.userId === currentAccount.id ?
                <ChangePasswordDialog
                  editField={record}
                  onSuccess={() => {}}
                  open
                  {...props}
                />
              ),
            },
          }),
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên tài khoản",
        dataField: "name",
        headerStyle: () => ({
          width: "40%",
        }),
      },
      {
        text: "Tên hiển thị",
        dataField: "id",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IDistrict) => renderAction(record),
      },
    ],
    [page],
  );

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const handleChangeSize = (value: number) => {
    setSizePerPage(value);
    setPage(1);
  };

  return (
    <TableLayout
      title="Quản trị viên"
      buttonMenu={
        <AdminDialog
          ButtonMenu={<ButtonAdd>Thêm quản trị viên</ButtonAdd>}
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên tài khoản"
          className="w-full phone:max-w-35"
        />
      </SearchBoxWrapper>

      <Table
        data={listDistrict}
        columns={columns}
        page={page}
        totalSize={totalCount}
        onPageChange={handleChangePage}
        onSizeChange={handleChangeSize}
        isRemote
      />
    </TableLayout>
  );
};

export default Admin;

const listDistrict: IDistrict[] = [
  {
    name: "admin1",
    id: "admin1",
  },
  {
    name: "admin1",
    id: "admin2",
  },
  {
    name: "admin1",
    id: "admin3",
  },
];
