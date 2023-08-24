"use client";
import agent from "@/api/agent";
import { Offer } from "@/components/models/offer";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as yup from "yup";

export const AddOfferForm = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      expireDate: "",
    },
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);
        agent.Offers.addOffer(formik.values as Offer).then(() => {
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
      title: yup.string().trim().required("الحقل مطلوب"),
      description: yup.string().trim().required("الحقل مطلوب"),
      expireDate: yup.string().trim().required("الحقل مطلوب"),
    }),
  });

  return (
    <div className="col login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expireDate" className="form-label">
              Expire Date
            </label>
            <input
              type="date"
              className="form-control"
              id="expireDate"
              value={formik.values.expireDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.expireDate && (
              <div className="text-danger">{formik.errors.expireDate}</div>
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
          حفظ
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
};
