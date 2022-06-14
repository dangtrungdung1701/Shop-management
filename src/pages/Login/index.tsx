import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

import { PATH } from "common/constants/routes";
import axiosClient from "common/utils/api";

import Input from "designs/Input";
import Button from "designs/Button";
import Checkbox from "designs/Checkbox";

import { useRedirect } from "hooks/useRedirect";
import useAuth from "hooks/useAuth";
import useLogin from "hooks/useLogin";

import { Form } from "./styles";
import { AUTH_KEY } from "common/constants/auth";
import { getLocalStorage } from "common/utils/auth";

interface IFormValue {
  username: string;
  password: string;
}
const URL = "/Login";
const LoginPage: React.FC = () => {
  const redirect = useRedirect();
  const { isAuth } = useAuth();
  const { login, setError, error } = useLogin();

  const [initialValues] = useState<IFormValue>({
    username: "",
    password: "",
  });
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      redirect(PATH.DASHBOARD);
    }
  }, []);

  useEffect(() => {
    const prevData = getLocalStorage();
    const newData = { ...prevData, autoLogin: isAutoLogin };
    localStorage.setItem(AUTH_KEY, JSON.stringify(newData));
  }, [isAutoLogin]);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      username: yup
        .string()
        .required("Vui lòng nhập tên tài khoản!")
        .min(5, "Tên tài khoản tối thiểu 5 ký tự!"),
      password: yup
        .string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, "Mật khẩu tối thiểu 6 ký tự!"),
    });

  useEffect(() => {
    if (error) {
      setError("");
      toast.dark(error, {
        type: toast.TYPE.ERROR,
      });
    }
  }, [error]);

  const handleSubmit = async (values: IFormValue) => {
    const payload: any = {
      userName: values?.username,
      password: values?.password,
    };
    try {
      setLoading(true);
      const res = await axiosClient.post(URL, payload);
      login(res);
    } catch (error: any) {
      if (error.response.data === "User is not found") {
        setError("Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại!");
      } else {
        setError("Lỗi hệ thống, vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="login" method="post">
          <Input
            name="username"
            id="username"
            type="text"
            label="Tên tài khoản"
            placeholder="Nhập tên tài khoản"
            autoComplete="username"
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
          />
          <Button
            className="justify-center"
            type="submit"
            size="lg"
            loading={isLoading}
          >
            Đăng nhập
          </Button>
          <Checkbox
            initialCheck={false}
            label="Tự động đăng nhập"
            onChange={checked => setIsAutoLogin(checked)}
          />
        </Form>
      </Formik>
    </>
  );
};

export default LoginPage;
