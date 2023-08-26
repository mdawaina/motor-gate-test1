"use client";
import agent from "@/api/agent";
import { CreateCustomerMotor } from "@/components/models/createCustomerMotor";
import { ChangePassword } from "@/components/models/loginUser";
import { Brand } from "@/components/models/motors";
import { protectedRoute } from "@/util/protectedRoute";
import { useFormik } from "formik";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { PropsValue } from "react-select";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";

function ChangePassword() {
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);
        agent.Account.changePassword(formik.values as ChangePassword).then(
          () => {
            setPending(false);
            toast.success("تم التسجيل بنجاح");
            router.push("/account/motors");
          }
        );
        //setSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      currentPassword: yup.string().trim().required("الحقل مطلوب"),
      password: yup.string().trim().required("الحقل مطلوب"),
      confirmPassword: yup.string().trim().required("الحقل مطلوب"),
    }),
  });

  return (
    <div className="col login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="currrentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="text"
              className="form-control"
              id="chassisNo"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.currentPassword && (
              <div className="text-danger">{formik.errors.currentPassword}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword && (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {pending && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          موافق
        </button>

        <button
          className="btn btn-secondary"
          data-bs-original-title=""
          title=""
          onClick={() => router.push("/")}
        >
          إلفاء
        </button>
      </form>
    </div>
  );
}

export default protectedRoute(ChangePassword);
