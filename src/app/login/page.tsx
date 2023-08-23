"use client";
import agent from "@/api/agent";
import { LoginUser } from "@/components/models/loginUser";
import { setUser, signInUser } from "@/store/accountSlice";
import { useAppDispatch } from "@/store/configureStore";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import * as yup from "yup";
import Cookies from "js-cookie";

//import style from "./styles.css";
function Login() {
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const validate = async (values: LoginUser) => {
    const user = await agent.Account.login(values);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as LoginUser;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      try {
        setPending(true);
        /*  dispatch(signInUser(formik.values as LoginUser)).then(() => {
          setPending(false);
          router.push("/home");
        }); */
        validate(formik.values as LoginUser).then((user) => {
          if (user) {
            dispatch(setUser(user));
            setPending(false);
            router.push("/account/profile");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .trim()
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
          "البريد الإلكتروني غير صحيح"
        )
        .required("الحقل مطلوب"),

      password: yup.string().trim().required("الحقل مطلوب"),
    }),
  });

  return (
    <div className="col login-form">
      <h3>Login</h3>
      <form className="theme-form mega-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label className="col-form-label">البريد الإلكتروني</label>
          <input
            name="email"
            className="form-control"
            type="text"
            placeholder=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label className="col-form-label">كلمة المرور</label>
          <input
            name="password"
            className="form-control"
            type="password"
            placeholder=""
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          /* data-bs-original-title=""
                        title="" */
        >
          {pending && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          تسجيل الدخول
        </button>
        <button
          className="btn btn-secondary"
          data-bs-original-title=""
          title=""
          onClick={() => router.push("/")}
        >
          إلفاء
        </button>
        <Link href="/register" className="btn btn-warning">
          التسجيل
        </Link>
      </form>
    </div>
  );
}

export default Login;
