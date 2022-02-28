import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import AudioPlayer from "material-ui-audio-player";

import { SUPPORTED_FORMATS } from "common/constants/file";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";
import SingleFileUploader from "components/SingleFileUploader";

import Input from "designs/Input";

import { IFileAudio, IFileAudioInput } from "typings";

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
  name?: string;
  file?: File | string | undefined;
}

const FileAudioDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    file: undefined,
  });
  const file = editField?.fileAudio;
  useEffect(() => {
    if (editField) {
      setInitialValues({
        name: editField?.name,
        file: editField?.fileAudio,
      });
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên tệp tin"),
      file: yup
        .mixed()
        .required("Vui lòng thêm tệp tin")
        // .test("fileSize", "File size is too large", value => {
        //   if (!value) return true;
        //   return fileSelected ? fileSelected.size <= FILE_SIZE : true;
        // })
        .test("fileType", "Định dạng tệp tin không hỗ trợ", value => {
          if (!value) return true;
          return fileSelected
            ? SUPPORTED_FORMATS.includes(fileSelected?.type)
            : true;
        }),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IFileAudioInput = {
      name: value?.name,
      fileAudio: fileSelected,
    };
    console.log(input);
    handleCloseDialog();
    // try {
    //   if (editField) {
    //     setLoading(true);
    //     const payload: IUpdateProvince = {
    //       id: editField?._id!,
    //       categoryInput: input,
    //     };
    //     await updateCategoryAPI(payload);
    //     onSuccess?.();
    //     setLoading(false);
    //     handleCloseDialog();
    //     return;
    //   }
    //   setLoading(true);
    //   const payload: ICreateProvince = {
    //     categoryInput: input,
    //   };
    //   await createCategoryAPI(payload);
    //   onSuccess?.();
    //   setLoading(false);
    //   handleCloseDialog();
    // } catch (err) {
    //   setLoading(false);
    //   handleCloseDialog();
    // }
  };

  const handleCloseDialog = () => {
    if (editField) {
      setFileUrl(editField?.fileAudio as string);
      setFileSelected(editField?.fileAudio as File);
    }
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
                    name="name"
                    label="Tên tệp tin"
                    placeholder="Nhập tên tệp tin"
                    type="text"
                    required
                  />
                  <SingleFileUploader
                    name="file"
                    label="Tệp tin"
                    subLabel="(Định dạng file .mp3, .m4a, .wav, .ogg)"
                    file={file}
                    onChange={(file, fileName, base64AudioFile) => {
                      setFileSelected(file);
                      setFileUrl(base64AudioFile);
                    }}
                    required
                  />
                  {fileSelected && !formik?.errors?.file && (
                    <div className="custom-audio-player">
                      <AudioPlayer
                        elevation={1}
                        width="500px"
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
        </UserDialogContainer>
      </Dialog>
    </>
  );
};

export default FileAudioDialog;
