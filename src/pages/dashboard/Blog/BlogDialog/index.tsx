import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IBlog, IBlogInput, IDistrict, IDistrictInput, IUpload } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import MultipleSelect from "designs/MultipleSelect";
import {
  CUSTOM_SIZE_UPLOAD_AVATAR,
  FILE_SIZE,
  SUPPORTED_FORMATS,
} from "common/constants/image";
import SingleImageUploader from "components/SingleImageUploader";
import TextArea from "designs/TextArea";
import RichTextEditor from "designs/RichTextEditor";

type IDialogProps = {
  editField?: IBlog;
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
  title?: string;
  image?: IUpload | string | null;
  description?: string;
  content?: string;
}

const BlogDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState<File | null>();

  const [isSaved, setIsSaved] = useState(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    title: "",
    image: undefined,
    description: "",
    content: "",
  });

  const image =
    editField?.image?.default ||
    editField?.image?.medium ||
    editField?.image?.small;

  useEffect(() => {
    if (editField) {
      setInitialValues({
        title: editField?.title,
        content: editField?.content,
        description: editField?.description,
        image: image,
      });
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      title: yup.string().required("Vui lòng nhập tiêu đề"),
      description: yup.string().required("Vui lòng nhập mô tả"),
      content: yup.string().required("Vui lòng nhập nội dung"),
      image: yup
        .mixed()
        .test("fileSize", "Dung lượng ảnh quá lớn", value => {
          if (!value) return true;
          return imageSelected ? imageSelected.size <= FILE_SIZE : true;
        })
        .test("fileType", "Định dạng tệp tin không đúng", value => {
          if (!value) return true;
          return imageSelected
            ? SUPPORTED_FORMATS.includes(imageSelected?.type)
            : true;
        }),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IBlogInput = {
      title: value?.title,
      description: value?.description,
      content: value?.content,
    };
    if (imageSelected) {
      input.image = imageSelected;
      input.customSizeForUploadImage = CUSTOM_SIZE_UPLOAD_AVATAR;
    }
    console.log(input);
    handleCloseDialog();
    // try {
    //   if (editField) {
    //     setLoading(true);
    //     const payload: IUpdateDistrict = {
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
    //   const payload: ICreateDistrict = {
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
    setOpen(false);
    setImageSelected(null);
    // setIsSaved(true);
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
            title={editField ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
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
                    name="title"
                    label="Tiêu đề"
                    placeholder="Nhập tên tiêu đề"
                    type="text"
                    required
                  />
                  <SingleImageUploader
                    name="image"
                    label="Hình ảnh"
                    subLabel="(Định dạng file .jpg .jpeg .png .gif và độ lớn < 1MB)"
                    image={imageSelected || image}
                    onChange={image => setImageSelected(image)}
                  />
                  <TextArea
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    required
                  />
                  <RichTextEditor
                    label="Nội dung"
                    name="content"
                    placeholder="Nhập nội dung"
                    onChange={() => {
                      isSaved && setIsSaved(false);
                    }}
                    required
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
        </UserDialogContainer>
      </Dialog>
    </>
  );
};

export default BlogDialog;

const optionPermission: any = [
  {
    id: "1",
    name: "Quản lý tài khoản",
  },
  {
    id: "2",
    name: "Quản lý tệp tin",
  },
  {
    id: "3",
    name: "Quản lý nguồn phát",
  },
];
