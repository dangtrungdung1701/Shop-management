import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  CLASS_LIST_OF_DISTRICT,
  CLASS_LIST,
  CLASS_LIST_OF_WARD,
  INVALID_LOCATION_ID,
} from "common/constants/user";
import axiosClient from "common/utils/api";
import { filterPermission } from "common/functions";
import { PASSWORD } from "common/constants/validation";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";

import { IRegion, IUser, IUserInput } from "typings";

import useGetLocation from "hooks/useGetLocation";
import useCheckPermission from "hooks/useCheckPermission";

import { IPermissionV2 } from "typings";
import useStore from "zustand/store";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
  FormLeftWrapper,
  FormRightWrapper,
  FormTopWrapper,
} from "./styles";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";

type IDialogProps = {
  editField?: IUser;
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
  userName: string;
  displayName: string;
  password?: string;
  confirmPass?: string;
  permission: string;
  level: string;
  province: string;
  ward: string;
  district: string;
}

const NormalDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const { permission, currentUser, setCurrentUser } = useStore();
  const isPermission = useCheckPermission("UserManager", currentUser);

  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [provinceList, setProvinceList] = useState<IRegion[]>([]);
  const [districtList, setDistrictList] = useState<IRegion[]>([]);
  const [wardList, setWardList] = useState<IRegion[]>([]);

  const [selectedPermission, setSelectedPermission] = useState<IPermissionV2[]>(
    [],
  );
  const [selectedProvince, setSelectedProvince] = useState<IRegion | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<IRegion | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<IRegion | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<any | null>({});

  const [initialValues, setInitialValues] = useState<IFormValue>({
    userName: "",
    displayName: "",
    password: "",
    confirmPass: "",
    permission: "",
    province: "",
    district: "",
    ward: "",
    level: "",
  });

  useEffect(() => {
    getProvinceListService();
    currentUser?.userInfo?.region?.provinceId !== INVALID_LOCATION_ID &&
      getDistrictListService(currentUser?.userInfo?.region?.provinceId);
    currentUser?.userInfo?.region?.districtId !== INVALID_LOCATION_ID &&
      getWardListService(currentUser?.userInfo?.region?.districtId);
    if (editField) {
      setInitialValues({
        ...initialValues,
        userName: editField?.userName || "",
        displayName: editField?.displayName || "",
        permission: "SELECTED",
        province: "SELECTED",
        district: "SELECTED",
        ward: "SELECTED",
        level: "SELECTED",
      });
      setSelectedPermission(
        filterPermission(editField?.roles || [], permission),
      );
      setSelectedLevel(
        CLASS_LIST.filter(item => item.id === editField?.region?.levelId)[0],
      );
      if (editField?.region?.levelId === 3) {
        getDistrictListService(editField?.region?.provinceId!);
      }
      if (editField?.region?.levelId === 4) {
        getDistrictListService(editField?.region?.provinceId!);
        getWardListService(editField?.region?.districtId!);
      }
    }
  }, []);

  useEffect(() => {
    getUserInfoService();
  }, [isOpen]);

  const getUserInfoService = async () => {
    try {
      const res: any = await axiosClient.get(
        `User/${currentUser?.userInfo?.id}`,
      );
      if (res) {
        setCurrentUser({ ...currentUser, userInfo: res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinceListService = async () => {
    try {
      const res: any = await axiosClient.get("Region", {
        params: { level: 2 },
      });
      if (res) {
        setProvinceList(res.regions);
        setSelectedProvince(
          useGetLocation(editField?.region?.provinceId!, res.regions),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDistrictListService = async (id: number) => {
    try {
      const res: any = await axiosClient.get(`Region/${id}/Subregions`);
      if (res) {
        setDistrictList(res.regions);
        setSelectedDistrict(
          useGetLocation(editField?.region?.districtId!, res.regions),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWardListService = async (id: number) => {
    try {
      const res: any = await axiosClient.get(`Region/${id}/Subregions`);
      if (res) {
        setWardList(res.regions);
        setSelectedWard(
          useGetLocation(editField?.region?.wardId!, res.regions),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.lazy(value => {
    if (!editField) {
      return yup.object().shape<{ [key in keyof IFormValue]: any }>({
        userName: yup
          .string()
          .required("Vui lòng nhập tên tài khoản")
          .trim()
          .min(5, "Tên tài khoản phải tối thiểu 5 ký tự"),
        displayName: yup.string().required("Vui lòng nhập tên hiển thị").trim(),
        password: yup
          .string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
          .matches(
            PASSWORD,
            "Mật khẩu phải có số, chữ cái thường, chữ cái hoa và ký tự đặc biệt",
          ),
        confirmPass: yup
          .string()
          .required("Vui lòng nhập lại mật khẩu")
          .oneOf(
            [yup.ref("password"), null],
            "Mật khẩu phải trùng với mật khẩu đã nhập",
          ),
        province: yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
        district: yup.string().required("Vui lòng chọn Quận/Huyện/Thị Xã"),
        ward: yup.string().required("Vui lòng chọn Phường/Xã/Thị Trấn"),
        permission: yup.string().required("Vui lòng chọn quyền hạn"),
        level: yup.string().required("Vui lòng chọn phân cấp"),
      });
    } else {
      return yup.object().shape<{ [key in keyof IFormValue]: any }>({
        userName: yup
          .string()
          .required("Vui lòng nhập tên tài khoản")
          .trim()
          .min(5, "Tên tài khoản phải tối thiểu 5 ký tự"),
        displayName: yup.string().required("Vui lòng nhập tên hiển thị").trim(),
        password: yup
          .string()
          .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
          .matches(
            PASSWORD,
            "Mật khẩu phải có số, chữ cái thường, chữ cái hoa và ký tự đặc biệt",
          ),
        confirmPass: yup.string().when("password", {
          is: (password: any) => password?.length > 0,
          then: yup
            .string()
            .required("Vui lòng nhập lại mật khẩu")
            .oneOf(
              [yup.ref("password"), null],
              "Mật khẩu phải trùng với mật khẩu đã nhập",
            ),
        }),
        province: yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
        district: yup.string().required("Vui lòng chọn Quận/Huyện/Thị Xã"),
        ward: yup.string().required("Vui lòng chọn Phường/Xã/Thị Trấn"),
        permission: yup.string().required("Vui lòng chọn quyền hạn"),
        level: yup.string().required("Vui lòng chọn phân cấp"),
      });
    }
  });

  const handleSubmit = async (value: FormikValues) => {
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : undefined;
    const input: IUserInput = {
      userName: value?.userName || "",
      displayName: value?.displayName,
      password: value?.password || "",
      regionId: regionId,
      regionLevelId: parseInt(selectedLevel?.id),
      roles: selectedPermission?.map(permission => permission?.id || ""),
    };
    if (!input.password) {
      delete input.password;
    }
    try {
      setLoading(true);

      if (editField) {
        setLoading(true);
        const payload: IUserInput = {
          ...input,
        };
        const res = await axiosClient.put(`User/${editField?.id}`, payload);
        if (res) {
          onSuccess?.();
          handleCloseDialog();
          toast.dark("Cập nhật người dùng thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        }
        return;
      }
      const payload: any = {
        ...input,
      };
      const res = await axiosClient.post("User", payload);
      if (res) {
        onSuccess?.();
        handleCloseDialog();
        toast.dark("Tạo người dùng thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err) {
      handleCloseDialog();
      if (editField) {
        toast.dark("Cập nhật người dùng không thành công !", {
          type: toast.TYPE.ERROR,
        });
      } else {
        toast.dark("Tạo người dùng không thành công !", {
          type: toast.TYPE.ERROR,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedLevel(null);
    setSelectedPermission([]);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    onClose?.();
  };

  const setFieldValue = (value: any, formik: FormikProps<IFormValue>) => {
    const province = provinceList.filter(
      item => item.id === currentUser?.userInfo?.region?.provinceId,
    )[0];
    const district = districtList.filter(
      item => item.id === currentUser?.userInfo?.region?.districtId,
    )[0];
    const ward = wardList.filter(
      item => item.id === currentUser?.userInfo?.region?.wardId,
    )[0];
    switch (value?.id) {
      case 2:
        setSelectedProvince(province);
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case 3:
        setSelectedProvince(province);
        setSelectedDistrict(district);
        !district && getDistrictListService(province?.id!);
        formik.setFieldValue("province", "SELECTED");
        district
          ? formik.setFieldValue("district", "SELECTED")
          : formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case 4:
        setSelectedProvince(province);
        setSelectedDistrict(district);
        setSelectedWard(ward);
        !district && getDistrictListService(province?.id!);
        !ward && district
          ? getWardListService(district?.id!)
          : editField?.region?.districtId !== INVALID_LOCATION_ID &&
            getWardListService(editField?.region?.districtId!);
        formik.setFieldValue("province", "SELECTED");
        district
          ? formik.setFieldValue("district", "SELECTED")
          : formik.setFieldValue("district", "");
        ward
          ? formik.setFieldValue("ward", "SELECT")
          : formik.setFieldValue("ward", "");
        break;
      default:
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
    }
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="lg">
        <UserDialogContainer>
          <DialogHeader
            title={editField ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
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
                  <FormTopWrapper>
                    <FormLeftWrapper>
                      <Input
                        name="userName"
                        label="Tài khoản"
                        placeholder="Nhập tên tài khoản"
                        type="text"
                        disabled={editField ? true : false}
                        required
                      />
                      <Input
                        name="displayName"
                        label="Tên hiển thị"
                        placeholder="Nhập tên hiển thị"
                        type="text"
                        required
                        disabled={isPermission ? false : true}
                      />
                      {isPermission && (
                        <>
                          <Input
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            required={editField ? false : true}
                          />
                          <Input
                            name="confirmPass"
                            label="Nhập lại mật khẩu"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            required={editField ? false : true}
                          />
                        </>
                      )}
                    </FormLeftWrapper>
                    <FormRightWrapper>
                      <Select
                        name="level"
                        label="Phân cấp"
                        optionSelected={selectedLevel}
                        options={
                          currentUser?.userInfo?.region?.levelId === PROVINCE_ID
                            ? CLASS_LIST
                            : currentUser?.userInfo?.region?.levelId ===
                              DISTRICT_ID
                            ? CLASS_LIST_OF_DISTRICT
                            : CLASS_LIST_OF_WARD
                        }
                        onSelect={value => {
                          setFieldValue(value, formik);
                          setSelectedLevel(value);
                        }}
                        placeholder="Chọn phân cấp"
                        required
                        disabled={isPermission ? false : true}
                      />

                      {selectedLevel?.id === PROVINCE_ID && (
                        <Select
                          name="province"
                          label="Tên tỉnh/ thành phố"
                          optionSelected={selectedProvince}
                          options={provinceList}
                          onSelect={value => setSelectedProvince(value)}
                          placeholder="Chọn tỉnh/thành phố"
                          required
                          optionTarget="displayName"
                          disabled
                        />
                      )}
                      {selectedLevel?.id === DISTRICT_ID && (
                        <>
                          <Select
                            name="province"
                            label="Tên tỉnh/ thành phố"
                            optionSelected={selectedProvince}
                            options={provinceList}
                            onSelect={value => {
                              getDistrictListService(value?.id!);
                              setSelectedDistrict(null);
                              setSelectedProvince(value);
                            }}
                            placeholder="Chọn tỉnh/thành phố"
                            required
                            optionTarget="displayName"
                            disabled
                          />
                          <Select
                            name="district"
                            label="Tên quận/ huyện/ thị xã"
                            optionSelected={selectedDistrict}
                            options={districtList}
                            onSelect={value => {
                              setSelectedDistrict(value);
                            }}
                            placeholder="Chọn quận/ huyện/ thị xã"
                            disabled={
                              currentUser?.userInfo?.region?.districtId ===
                              INVALID_LOCATION_ID
                                ? isPermission
                                  ? false
                                  : true
                                : true
                            }
                            required
                            optionTarget="displayName"
                          />
                        </>
                      )}
                      {selectedLevel?.id === WARD_ID && (
                        <>
                          <Select
                            name="province"
                            label="Tên tỉnh/ thành phố"
                            optionSelected={selectedProvince}
                            options={provinceList}
                            onSelect={value => {
                              getDistrictListService(value?.id!);
                              setSelectedDistrict(null);
                              setSelectedWard(null);
                              setSelectedProvince(value);
                            }}
                            placeholder="Chọn tỉnh/ thành phố"
                            required
                            optionTarget="displayName"
                            disabled
                          />
                          <Select
                            name="district"
                            label="Tên quận/ huyện/ thị xã"
                            optionSelected={selectedDistrict}
                            options={districtList}
                            onSelect={value => {
                              getWardListService(value?.id!);
                              setSelectedWard(null);
                              setSelectedDistrict(value);
                            }}
                            placeholder="Chọn quận/ huyện/ thị xã"
                            disabled={
                              currentUser?.userInfo?.region?.districtId ===
                              INVALID_LOCATION_ID
                                ? isPermission
                                  ? false
                                  : true
                                : true
                            }
                            required
                            optionTarget="displayName"
                          />
                          <Select
                            name="ward"
                            label="Tên phường/ xã/ thị trấn"
                            optionSelected={selectedWard}
                            options={wardList}
                            onSelect={value => setSelectedWard(value)}
                            placeholder="Chọn phường/ xã/ thị trấn"
                            disabled={(() => {
                              if (!isPermission) {
                                return true;
                              }
                              if (
                                currentUser?.userInfo?.region?.wardId !==
                                INVALID_LOCATION_ID
                              ) {
                                return true;
                              } else {
                                if (!selectedDistrict) {
                                  return true;
                                }
                              }
                              return false;
                            })()}
                            required
                            optionTarget="displayName"
                          />
                        </>
                      )}

                      <MultipleSelect
                        name="permission"
                        label="Quyền hạn"
                        listOptionsSelected={selectedPermission}
                        options={permission}
                        onSelect={value => setSelectedPermission(value)}
                        placeholder="Chọn quyền hạn"
                        required
                        disabled={isPermission ? false : true}
                        optionTarget="name"
                      />
                    </FormRightWrapper>
                  </FormTopWrapper>
                  <ButtonWrapper>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseDialog}
                    >
                      Hủy
                    </Button>
                    {isPermission && (
                      <Button loading={loading} type="submit">
                        Lưu
                      </Button>
                    )}
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

export default NormalDialog;
