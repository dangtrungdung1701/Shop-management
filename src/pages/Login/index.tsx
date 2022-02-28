import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import { Form, ErrorMessage } from "./styles";
import { isEmail } from "common/functions";
import { PATH } from "common/constants/routes";

import Input from "designs/Input";
import Button from "designs/Button";

import { useRedirect } from "hooks/useRedirect";
import useAuth from "hooks/useAuth";
import Checkbox from "designs/Checkbox";

interface IFormValue {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const redirect = useRedirect();
  const { isAuth } = useAuth();
  const [initialValues] = useState<IFormValue>({
    username: "",
    password: "",
  });
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  useEffect(() => {
    if (isAuth) {
      redirect(PATH.DASHBOARD);
    }
  }, []);

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

  const handleSubmit = (values: IFormValue) => {
    const payload: any = {
      user: {
        email: values?.username,
        password: values?.password,
      },
    };
    console.log(payload);
  };

  return (
    <>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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
            // onFocus={handleFocus}
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
            // loading={loading}
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
