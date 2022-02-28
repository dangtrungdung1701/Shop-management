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
import { IDistrict, IProvince, IWard } from "typings";
import SimpleSelect from "designs/SimpleSelect";

const WardDialog = lazy(() => import("./WardDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IWardProps extends RouteComponentProps {}

const Ward: React.FC<IWardProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );

  const [listCategories, setListCategories] = useState<IWard[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listWard.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý địa phương",
      href: "#",
    },
    {
      name: "Phường/Xã/Thị Trấn",
      href: PATH.LOCATION.WARD,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected, districtSelected]);

  const renderAction = (record: IWard) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <WardDialog
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
            title: "Xóa Phường/Xã/Thị Trấn",
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
        text: "Phường/Xã/Thị Trấn",
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
        text: "Đang nghỉ",
        dataField: "inactiveDevice",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IWard) => renderAction(record),
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
      title="Phường/Xã/Thị Trấn"
      buttonMenu={
        <WardDialog
          ButtonMenu={
            <ButtonAddDistrict>Thêm Phường/Xã/Thị Trấn</ButtonAddDistrict>
          }
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên Phường/Xã/Thị Trấn"
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
      </SearchBoxWrapper>

      <Table
        data={listWard}
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

export default Ward;
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
const listWard: IWard[] = [
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
    district: {
      id: "1",
      name: "Quận 1",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Phường 12",
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
    district: {
      id: "1",
      name: "Quận 1",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Phường 12",
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
    district: {
      id: "1",
      name: "Quận 1",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Phường 12",
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
    district: {
      id: "1",
      name: "Quận 1",
      activeDevice: 100,
      connectDevice: 100,
      disconnectDevice: 100,
      inactiveDevice: 100,
    },
    name: "Phường 12",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
];
