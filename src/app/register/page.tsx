"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import agent from "@/api/agent";
import { RegisterModel } from "@/components/models/registerModel";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import cities from "../../data/cities.json";

function Register() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const citiesLookup = cities?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      email: "",
      password: "",
      displayName: "",
      name: "",
      cityId: 0,
      vATRegNumber: "",
      cr: "",
      address: "",
      mobileNumber: "",
      region: "",
      district: "",
      userType: 0,
    },
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);
        agent.Account.register(formik.values as RegisterModel).then(() => {
          setPending(false);
          toast.success("تم التسجيل بنجاح");
          router.push("/login");
        });
        //setSubmitted(true);
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
      displayName: yup.string().trim().required("الحقل مطلوب"),
      name: yup.string().trim().required("الحقل مطلوب"),
      cityId: yup.number().typeError("المدينة مطلوب").required("الحقل مطلوب"),
      vATRegNumber: yup
        .string()
        .required("CR is required")
        .matches(/^[0-9]{10}$/, "CR is not valid"),
      cr: yup
        .string()
        .required("CR is required")
        .matches(/^[0-9]{10}$/, "CR is not valid"),
      address: yup.string().trim().required("الحقل مطلوب"),
      mobileNumber: yup
        .string()
        .trim()
        .matches(/^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, "رقم الجوال غير صحيح")
        .max(10, "")
        .required("الحقل مطلوب"),
      // region: yup.string().trim().required("الحقل مطلوب"),
      district: yup.string().trim().required("الحقل مطلوب"),
      userType: yup
        .number()
        .typeError("الرقم غير صحيح")
        .required("الحقل مطلوب"),
    }),
  });

  return (
    <div className="col login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
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
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="displayName" className="form-label">
              Registrar Name
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.displayName && (
              <div className="text-danger">{formik.errors.displayName}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <Select
              id="jobId"
              options={citiesLookup}
              placeholder="اختر"
              onChange={(option) =>
                formik.setFieldValue("cityId", option?.value)
              }
              value={citiesLookup.find(
                (option) => option.value === formik.values.cityId
              )}
              onBlur={formik.handleBlur("cityId")}
            />
            {formik.errors.cityId && (
              <div className="text-danger">{formik.errors.cityId}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="vATRegNumber" className="form-label">
              VAT Reg Number
            </label>
            <input
              type="text"
              className="form-control"
              id="vATRegNumber"
              value={formik.values.vATRegNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.vATRegNumber && (
              <div className="text-danger">{formik.errors.vATRegNumber}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cr" className="form-label">
              CR
            </label>
            <input
              type="text"
              className="form-control"
              id="cr"
              value={formik.values.cr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cr && (
              <div className="text-danger">{formik.errors.cr}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.address && (
              <div className="text-danger">{formik.errors.address}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.mobileNumber && (
              <div className="text-danger">{formik.errors.mobileNumber}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            {/*  <label htmlFor="region" className="form-label">
              Region
            </label>
            <input
              type="text"
              className="form-control"
              id="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.region && (
              <div className="text-danger">{formik.errors.region}</div>
            )} */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="district" className="form-label">
              District
            </label>
            <input
              type="text"
              className="form-control"
              id="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.district && (
              <div className="text-danger">{formik.errors.district}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Are you an:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value={1}
                checked
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label" htmlFor="individual">
                Individual
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value={2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label" htmlFor="company">
                Company
              </label>
            </div>
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
          التسجيل
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

export default Register;
