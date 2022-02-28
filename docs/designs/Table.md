# **Table**

### The documentation of the Table React component.

## Import

---

```tsx
import Table from "designs/Table";
```

## **Props**

---

|     _Name_      |    _Type_    | _Default_ | _Description_                                                                                                                |
| :-------------: | :----------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------- |
|   `className`   |   `string`   |           | You can use set css className of tailwind by this props                                                                      |
|     `data`      | `Array<any>` |           | Push your data here, make sure that they have all properties which you defined in columns                                    |
|    `columns`    |  `IColumns`  |           | [see the Docs of columns detail here](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html) |
| `headerElement` |              |           |
|  `sizePerPage`  |   `number`   |   `10`    | Number items you want to show in each Page.                                                                                  |
| `onPageChange`  | `callback()` |           | This function will be called if you do something with table                                                                  |
|     `page`      |   `number`   |    `1`    | page starts from 1                                                                                                           |
|   `isRemote`    |  `boolean`   |  `false`  | enable it if you call API in each page                                                                                       |
|   `totalSize`   |   `number`   |    `0`    | Number of all Items                                                                                                          |
|  `onClickRow`   | `callback()` |           | Callback will be called whenever you click to any row of table                                                               |
| `onTableChange` | `callback()` |           |                                                                                                                              |

## **Example**

---

Take a look this example, and know how to use this.

```tsx
const Component: React.FC = props => {
  // .....
  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Avatar",
        dataField: "avtUrl",
        headerStyle: () => ({
          width: "7%",
        }),
        formatter: (cell: string, record: IUser) => (
          <Avatar src={record.urlAvt?.small} />
        ),
      },
      {
        text: "Tên tài khoản",
        dataField: "username",
      },
      {
        text: "Họ và tên",
        dataField: "displayName",
      },
      {
        text: "Email",
        dataField: "email",
      },
      {
        text: "Số điện thoại",
        dataField: "phoneNumber",
      },
      {
        text: "Quyền hạn",
        dataField: "permission",
        formatter: (cell: string, record: IUser) => {
          return record.permission === "ADMIN"
            ? "Nhân viên quản lý"
            : "Nhân viên bình thường";
        },
      },
      {
        text: "Trạng thái",
        dataField: "status",
        formatter: (cell: string, record: IUser) => {
          if (record?.enabled) {
            return <Tags items={["Hoạt động"]} />;
          }
          return <></>;
        },
      },
      {
        text: "Hành động",
        dataField: "action",
        headerStyle: () => ({ width: "10%" }),
        formatter: (cell: string, record: IUser) => renderActions(record),
      },
    ];
  }, []);

  // .....

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    //....
    <Table
      columns={columns}
      data={results}
      totalSize={totalCount}
      page={page}
      onPageChange={handleChangePage}
    />
    //...
  );
};
```

**Explain**

- ```tsx
  const columns: IColumns = useMemo(() => {
  ```
  As you can see, we use `useMemo` here. Why? Because this variable will be
  declared whenever component is re-rendered. We don't want that. So `useMemo`
  will avoid it to be declared, so help optimizing performance
- ```tsx
  formatter: (cell: string, row: IUser, rowIndex: number) => (
      <Avatar src={record.urlAvt?.small} />
  ),
  ```
  What is this?. We can customize the Table Data of column by this callback.
  This call back give us 3 params.
  - `cell` : current value of current cell.
  - `row`: value of data[rowIndex]
  - `rowIndex`: index of current row
- ```tsx
  const handleChangePage = useCallback((newPage: number) => {
  ```
  Because using prevent the `Table` component won't render if begin unnecessary.
  We have to make sure all props which we pass to it never be declared.
