import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import AudioPlayer from "material-ui-audio-player";
import { toast } from "react-toastify";

import { FILE_SIZE, SUPPORTED_FORMATS } from "common/constants/file";
import axiosClient from "common/utils/api";
import { HTMLdecode } from "common/functions";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";
import SingleFileUploader from "components/SingleFileUploader";

import Input from "designs/Input";

import { IFileAudio } from "typings";

import useStore from "zustand/store";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

type IDialogProps = {
  editField?: IFileAudio;
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
  displayName?: string;
  file?: File | string | undefined;
}

const FileAudioDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const { currentUser, setUploadProgress, uploadProgress } = useStore();
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [initialValues, setInitialValues] = useState<IFormValue>({
    displayName: "",
    file: undefined,
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        displayName: HTMLdecode(editField?.displayName || "") || "",
        file: editField?.url,
      });
      setFileUrl(editField?.url || "");
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      displayName: yup.string().required("Vui lòng nhập tên tệp tin").trim(),
      file: yup
        .mixed()
        .required("Vui lòng thêm tệp tin")
        .test("fileSize", "File size is too large", value => {
          if (!value) return true;
          return fileSelected ? fileSelected.size <= FILE_SIZE : true;
        })
        .test("fileType", "Định dạng tệp tin không hỗ trợ", value => {
          if (!value) return true;
          return fileSelected
            ? SUPPORTED_FORMATS.includes(fileSelected?.type)
            : true;
        }),
    });

  const handleSubmit = async (value: FormikValues) => {
    const formData = new FormData();
    if (fileSelected) {
      formData.append("FormFile", fileSelected, fileSelected.name);
      formData.append("RegionId", currentUser?.userInfo?.region?.id);
      formData.append("DisplayName", value?.displayName);
    }
    try {
      setLoading(true);
      if (editField) {
        const payload = {
          displayName: value?.displayName,
        };
        const res = await axiosClient.put(
          `/AudioFileSource/${editField?.id}`,
          payload,
        );
        if (res) {
          onSuccess?.();
          handleCloseDialog();
          toast.dark("Cập nhật tệp tin thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        }
        return;
      }
      setOpen(false);
      setUploadProgress(true);
      const uploadToast = toast.loading("Đang upload tệp tin !", {
        type: toast.TYPE.WARNING,
        theme: "dark",
      });
      const res = await axiosClient.post("/AudioFileSource", formData);

      if (res) {
        setUploadProgress(false);
        handleCloseDialog();
        onSuccess?.();
        toast.update(uploadToast, {
          render: "Tạo tệp tin thành công !",
          type: toast.TYPE.SUCCESS,
          theme: "dark",
          isLoading: false,
          autoClose: 4000,
          closeOnClick: true,
        });
      }
    } catch (err: any) {
      if (editField) {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị tệp tin đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            handleCloseDialog();
            toast.dark("Cập nhật tệp tin không thành công !", {
              type: toast.TYPE.ERROR,
            });
            break;
        }
      } else {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị tệp tin đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            setUploadProgress(false);
            handleCloseDialog();
            toast.dark("Tạo tệp tin không thành công !", {
              type: toast.TYPE.ERROR,
            });
            break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFileUrl("");
    setFileSelected(undefined);
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <UserDialogContainer>
          <DialogHeader
            title={editField ? "Chỉnh sửa tệp tin" : "Thêm tệp tin"}
          />
          {uploadProgress && !editField ? (
            <div className="flex flex-col gap-2">
              <div>
                Hiện tại có tệp tin đang được tải, vui lòng thử lại sau!
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseDialog}
                className="self-end"
              >
                Hủy
              </Button>
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {formik => {
                return (
                  <Form onSubmit={formik.handleSubmit}>
                    <Input
                      name="displayName"
                      label="Tên tệp tin"
                      placeholder="Nhập tên tệp tin"
                      type="text"
                      required
                    />

                    {!editField && (
                      <SingleFileUploader
                        name="file"
                        label="Tệp tin"
                        subLabel="(Định dạng file .mp3, .m4a, .wav, .ogg)"
                        file={initialValues?.file}
                        onChange={(file, _, base64AudioFile) => {
                          setFileSelected(file);
                          setFileUrl(base64AudioFile);
                        }}
                        required
                      />
                    )}

                    {fileUrl && !formik?.errors?.file && (
                      <div className="custom-audio-player">
                        <AudioPlayer
                          elevation={1}
                          width="100%"
                          variation="primary"
                          debug={false}
                          src={fileUrl}
                        />
                      </div>
                    )}

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
          )}
        </UserDialogContainer>
      </Dialog>
    </>
  );
};

export default FileAudioDialog;
