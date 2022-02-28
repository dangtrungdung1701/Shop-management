import React, { useMemo, useState, lazy, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import SkeletonAvatar from "assets/images/avatar.png";

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
import { IBlog, ICustomSizeImages } from "typings";

const BlogDialog = lazy(() => import("./BlogDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IBlogProps extends RouteComponentProps {}

const Blog: React.FC<IBlogProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [currentAccount, setCurrentAccount] = useState<Boolean>(true);

  const [listCategories, setListCategories] = useState<IBlog[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listBlog.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Bài viết",
      href: "#",
    },
    {
      name: "Dánh sách bài viết",
      href: PATH.BLOG,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: IBlog) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <BlogDialog
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
            title: "Xóa bài viết",
            message: `Bạn có chắc chắn muốn xóa bài viết này?`,
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
        text: "Hình ảnh",
        dataField: "image",
        formatter: (image: ICustomSizeImages) => {
          const imgUrl: string =
            image?.default || image?.small || image?.medium || SkeletonAvatar;
          return <img src={imgUrl} alt="" className="w-7 h-full" />;
        },
      },
      {
        text: "Tiêu đề",
        dataField: "title",
        headerStyle: () => ({
          width: "28%",
        }),
      },
      {
        text: "Thời gian tạo",
        dataField: "createdTime",
      },
      {
        text: "Người tạo",
        dataField: "createdPerson.name",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IBlog) => renderAction(record),
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
      title="Bài viết"
      buttonMenu={
        <BlogDialog
          ButtonMenu={<ButtonAdd>Thêm bài viết</ButtonAdd>}
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên bài viết"
          className="w-full phone:max-w-35"
        />
      </SearchBoxWrapper>

      <Table
        data={listBlog}
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

export default Blog;

const listBlog: IBlog[] = [
  {
    id: "1",
    title: "Blog 1",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "2",
    title: "Blog 2",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    title: "Blog 3",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "4",
    title: "Blog 4",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "5",
    title: "Blog 5",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
];
