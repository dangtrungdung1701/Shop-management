import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Formik, FormikValues } from "formik";

import axiosClient from "common/utils/api";
import { APPROVED_STATUS } from "common/constants/schedule";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import MultipleSelect from "designs/MultipleSelect";
import Input from "designs/Input";

import { useLoading } from "hooks/useLoading";

import { IApprovalStatusType, ISchedule } from "typings/Schedule";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  VolumeDialogContainer,
  Form,
} from "./styles";

type IDialogProps = {
  editField?: ISchedule;
  approvalType?: IApprovalStatusType;
  onClose?: () => void;
  onSuccess?: () => void;
} & (
  | {
      ButtonMenu: React.ReactElement;
      readonly open?: boolean;
    }
  | {
      readonly ButtonMenu?: React.ReactElement;
      open: boolean;
    }
);

interface IFormValue {
  reason?: string;
  schedule?: string;
}

const LOAD_DATA = "LOAD_DATA";

const ApprovalDialog: React.FC<IDialogProps> = ({
  open = false,
  ButtonMenu,
  onClose,
  onSuccess,
  editField,
  approvalType,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const [listSchedule, setListSchedule] = useState<ISchedule[]>([]);

  const [listSelectedSchedule, setListSelectedSchedule] = useState<ISchedule[]>(
    [],
  );

  const [initialValues, setInitialValues] = useState<IFormValue>({
    reason: "",
    schedule: "",
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        reason: "",
        schedule: editField?.id,
      });
      setListSelectedSchedule([{ ...editField }]);
    }
  }, [editField]);

  // const getListPendingScheduleService = async () => {
  //   const PENDING_STATUS = 1;
  //   const payload: any = {
  //     approvalStatus: PENDING_STATUS,
  //   };
  //   try {
  //     startLoading(LOAD_DATA);

  //     const res: any = await axiosClient.get("/Schedule", {
  //       params: payload,
  //     });
  //     if (res) {
  //       console.log(res);
  //       setListSchedule(res.schedules);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     stopLoading(LOAD_DATA);
  //   }
  // };

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      reason: yup.string().required("Vui lòng nhập lý do duyệt!"),
      schedule: yup.string().required("Vui lòng chọn lịch duyệt!"),
    });

  const handleSubmit = async (values: FormikValues) => {
    const input: any = {
      approvalDescription: values?.reason,
      approvalStatus: approvalType,
    };
    try {
      const res = await axiosClient.put(
        `/Schedule/${editField?.id}/Approval`,
        input,
      );
      if (res) {
        onSuccess?.();
        setLoading(false);
        handleCloseDialog();
        if (approvalType === APPROVED_STATUS) {
          toast.dark("Phê duyệt lịch phát thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        } else {
          toast.dark("Từ chối lịch phát thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        }
      }
    } catch (err) {
      setLoading(false);
      handleCloseDialog();
      if (approvalType === APPROVED_STATUS) {
        toast.dark("Phê duyệt lịch phát không thành công !", {
          type: toast.TYPE.ERROR,
        });
      } else {
        toast.dark("Từ chối lịch phát không thành công !", {
          type: toast.TYPE.ERROR,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <VolumeDialogContainer>
          <DialogHeader
            title={
              approvalType === APPROVED_STATUS
                ? "Phê duyệt lịch phát"
                : "Từ chối lịch phát"
            }
          />
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  {!editField && (
                    <MultipleSelect
                      name="schedule"
                      options={listSchedule}
                      label="Lịch phát"
                      placeholder="Chọn lịch phát"
                      listOptionsSelected={listSelectedSchedule}
                      onSelect={listOption => {
                        setListSelectedSchedule(listOption);
                      }}
                    />
                  )}

                  <Input
                    label="Lý do"
                    name="reason"
                    placeholder="Nhập lý do xét duyệt"
                  />
                  <ButtonWrapper>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseDialog}
                    >
                      Hủy
                    </Button>
                    <Button loading={loading} type="submit">
                      Lưu
                    </Button>
                  </ButtonWrapper>
                </Form>
              );
            }}
          </Formik>
        </VolumeDialogContainer>
      </Dialog>
    </>
  );
};

export default ApprovalDialog;
