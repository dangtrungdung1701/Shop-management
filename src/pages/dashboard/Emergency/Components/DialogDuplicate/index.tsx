import { useEffect, useMemo, useState } from "react";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import { IEmergencyPrograms } from "typings";

import { Button, ButtonWrapper, UserDialogContainer } from "./styles";
import Table, { IColumns } from "designs/Table";
import dayjs from "dayjs";
import useStore from "zustand/store";

type IDialogProps = {
  onClose?: () => void;
};

const DuplicateDialog: React.FC<IDialogProps> = ({ onClose }) => {
  const [listEmergencyProgram, setListEmergencyProgram] = useState<
    IEmergencyPrograms[]
  >([]);
  const [page, setPage] = useState<number>(1);

  const {
    duplicateDialog,
    duplicateList,
    removeDuplicateList,
    setDuplicateDialog,
  } = useStore();

  useEffect(() => {
    setListEmergencyProgram(duplicateList);
  }, [duplicateList]);

  const handleCloseDialog = () => {
    setDuplicateDialog(false);
    removeDuplicateList();
    onClose?.();
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên chương trình",
        dataField: "displayName",
      },
      {
        text: "Thời gian",
        dataField: "startTime",
        formatter: (timeStamp: number) => {
          const date = dayjs.unix(timeStamp).format("DD/MM/YYYY");
          const time = dayjs.unix(timeStamp).format("HH:mm:ss");
          return `${date} - ${time}`;
        },
      },
      {
        text: "Thời lượng",
        dataField: "totalDuration",
      },
      {
        text: "Người tạo",
        dataField: "createdByUser.displayName",
      },
      {
        text: "Số thiết bị",
        dataField: "devices",
        formatter: (device: any[]) => (
          <div className="w-full text-right">{device.length}</div>
        ),
      },
    ],
    [duplicateList],
  );

  return (
    <>
      <Dialog open={duplicateDialog} onClose={handleCloseDialog} size="lg">
        <UserDialogContainer>
          <DialogHeader title="Danh sách chương trình đang phát" />
          <Table
            page={page}
            data={listEmergencyProgram}
            columns={columns}
            totalSize={listEmergencyProgram.length}
            sizePerPage={1000}
            isShowChangeSize={false}
          />
          <ButtonWrapper>
            <Button type="button" variant="primary" onClick={handleCloseDialog}>
              Đóng
            </Button>
          </ButtonWrapper>
        </UserDialogContainer>
      </Dialog>
    </>
  );
};

export default DuplicateDialog;
