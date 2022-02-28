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
import { IDistrict, IProvince, IWard } from "typings";
import SimpleSelect from "designs/SimpleSelect";

const NormalDialog = lazy(() => import("./NormalDialog"));
const UserProfileDialog = lazy(() => import("components/UserProfileDialog"));
const ChangePasswordDialog = lazy(
  () => import("components/ChangePasswordDialog"),
);

const LOAD_DATA = "LOAD_DATA";

interface IAdminProps extends RouteComponentProps {}

const NormalUsers: React.FC<IAdminProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<IDistrict[]>([]);
  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);

  const [totalCount, setTotalCount] = useState<number>(listDistrict.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý người dùng",
      href: "#",
    },
    {
      name: "Người dùng",
      href: PATH.USER.NORMAL,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: IDistrict) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <NormalDialog
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
            title: "Xóa người dùng",
            message: `Bạn có chắc chắn muốn xóa người dùng này?`,
            onDelete: async () => {
              // await deleteBlogAPI({ id: record._id });
              // invokeGetAllBlogList();
            },
          },
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
          width: "30%",
        }),
      },
      {
        text: "Tên hiển thị",
        dataField: "id",
        headerStyle: () => ({
          width: "30%",
        }),
      },
      {
        text: "Phân cấp",
        dataField: "class",
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
      title="Người dùng"
      buttonMenu={
        <NormalDialog
          ButtonMenu={<ButtonAdd>Thêm người dùng</ButtonAdd>}
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
        <SimpleSelect
          options={provinceList}
          optionSelected={provinceSelected}
          onSelect={value => {
            setProvinceSelected(value);
            setPage(1);
          }}
          placeholder="Tỉnh/TP"
          className="w-full phone:max-w-35"
        />
        <SimpleSelect
          options={districtList}
          optionSelected={districtSelected}
          onSelect={value => {
            setDistrictSelected(value);
            setPage(1);
          }}
          placeholder="Quận/Huyện/Thị Xã"
          disabled={provinceSelected ? false : true}
          className="w-full phone:max-w-35"
        />
        <SimpleSelect
          options={wardList}
          optionSelected={wardSelected}
          onSelect={value => {
            setWardSelected(value);
            setPage(1);
          }}
          placeholder="Phường/Xã/Thị Trấn"
          disabled={districtSelected ? false : true}
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

export default NormalUsers;

const listDistrict: any[] = [
  {
    name: "admin1",
    id: "ADMIN",
    class: "Tỉnh/TP",
  },
  {
    name: "admin1",
    id: "ADMIN",
    class: "Tỉnh/TP",
  },
  {
    name: "admin1",
    id: "ADMIN",
    class: "Tỉnh/TP",
  },
  {
    name: "admin1",
    id: "ADMIN",
    class: "Tỉnh/TP",
  },
  {
    name: "admin1",
    id: "ADMIN",
    class: "Tỉnh/TP",
  },
];

const provinceList: IProvince[] = [
  {
    id: "1",
    name: "TP HCM",
  },
  {
    id: "2",
    name: "TP HN",
  },
  {
    id: "3",
    name: "TP HP",
  },
];

const districtList: IDistrict[] = [
  {
    id: "1",
    name: "Quận 1",
  },
  {
    id: "2",
    name: "Quận 2",
  },
  {
    id: "3",
    name: "Quận 3",
  },
];

const wardList: IWard[] = [
  {
    id: "1",
    name: "Quận 1",
  },
  {
    id: "2",
    name: "Quận 2",
  },
  {
    id: "3",
    name: "Quận 3",
  },
];
