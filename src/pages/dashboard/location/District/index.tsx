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

import { ButtonAddDistrict, SearchBoxWrapper } from "./styles";
import { IDistrict, IProvince } from "typings";
import SimpleSelect from "designs/SimpleSelect";

const DistrictDialog = lazy(() => import("./DistrictDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IDistrictProps extends RouteComponentProps {}

const District: React.FC<IDistrictProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );

  const [listCategories, setListCategories] = useState<IDistrict[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listDistrict.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý địa phương",
      href: "#",
    },
    {
      name: "Quận/Huyện/Thị Xã",
      href: PATH.LOCATION.DISTRICT,
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
              <DistrictDialog
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
            title: "Xóa Quận/Huyện/Thị Xã",
            message: `Bạn có chắc chắn muốn xóa địa phương này?`,
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
        text: "Quận/Huyện/Thị Xã",
        dataField: "name",
        headerStyle: () => ({
          width: "28%",
        }),
      },
      {
        text: "Đang hoạt động",
        dataField: "connectDevice",
      },
      {
        text: "Mất kết nối",
        dataField: "disconnectDevice",
      },
      {
        text: "Đang phát",
        dataField: "activeDevice",
      },
      {
        text: "đang nghỉ",
        dataField: "inactiveDevice",
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
      title="Quận/Huyện/Thị Xã"
      buttonMenu={
        <DistrictDialog
          ButtonMenu={
            <ButtonAddDistrict>Thêm Quận/Huyện/Thị Xã</ButtonAddDistrict>
          }
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên Quận/Huyện/Thị Xã"
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

export default District;

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

const listDistrict: IDistrict[] = [
  {
    id: "1",
    province: {
      id: "1",
      name: "TP HCM",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Quận 1",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "2",
    province: {
      id: "1",
      name: "TP HCM",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Quận 1",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "3",
    province: {
      id: "1",
      name: "TP HCM",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Quận 1",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "4",
    province: {
      id: "1",
      name: "TP HCM",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Quận 1",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
];
