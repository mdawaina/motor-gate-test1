import agent from "@/api/agent";
import { AdminMotor, Brand } from "@/components/models/motors";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { LookupForCrete } from "@/components/models/lookups";
import Select, { PropsValue } from "react-select";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [pending, setPending] = useState(false);
  const [modelsLookup, setModelsLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const [motorYearsLookup, setMotorYearsLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const router = useRouter();

  const brandsLookup = brands?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const initPage = useCallback(async () => {
    const brandsResult: any = await agent.Lookups.getBrands();
    setBrands(brandsResult);
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const formik = useFormik({
    initialValues: {
      brandId: 0,
      brandText: "",
      modelId: 0,
      modelText: "",
      motorYearId: 0,
      motorYearText: "",
    },
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);
        agent.Lookups.addLookup(formik.values as LookupForCrete).then(() => {
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
      chassisNo: yup.string().trim().required("الحقل مطلوب"),
      plateNo: yup.string().trim().required("الحقل مطلوب"),
      motorYearId: yup
        .number()
        .typeError("المدينة مطلوب")
        .required("الحقل مطلوب"),
      motorColorId: yup
        .number()
        .typeError("المدينة مطلوب")
        .required("الحقل مطلوب"),
    }),
  });

  return (
    <div className="col login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="city" className="form-label">
              Brand
            </label>
            <Select
              id="brandId"
              options={brandsLookup}
              placeholder="اختر"
              onChange={(option) => {
                formik.setFieldValue("brandId", option?.value);
                formik.setFieldValue("brandText", option?.label);

                agent.Lookups.getModelsByBrandId(option?.value as number).then(
                  (data) => {
                    setModelsLookup(
                      data.map((service: any) => {
                        return {
                          value: service.id,
                          label: service.name,
                        };
                      })
                    );
                  }
                );
              }}
              value={
                brandsLookup.find(
                  (option) => option.value === formik.values.brandId
                ) as PropsValue<{ label: string; value: number }>
              }
              onBlur={formik.handleBlur("brandId")}
            />
            {formik.errors.brandId && (
              <div className="text-danger">{formik.errors.brandId}</div>
            )}
          </div>

          <div className="col-md-5 mb-3">
            <label htmlFor="brandText" className="form-label">
              Brand Text
            </label>
            <input
              type="text"
              className="form-control"
              id="brandText"
              value={formik.values.brandText}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.brandText && (
              <div className="text-danger">{formik.errors.brandText}</div>
            )}
          </div>

          <div className="col-md-2 mb-3">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                console.log(formik.values);
                // console.log("hello");
                agent.Lookups.addBrand({
                  brandId: formik.values.brandId,
                  brandText: formik.values.brandText,
                }).then(() => {
                  initPage();
                  formik.setFieldValue("brandText", "");
                  toast.success("تم التحديث بنجاح");
                });
              }}
            >
              Add or Update
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              Model
            </label>
            <Select
              id="modelId"
              options={modelsLookup}
              placeholder="اختر"
              onChange={(option) => {
                formik.setFieldValue("modelId", option?.value);

                agent.Lookups.getMotoryearsByModelId(
                  option?.value as number
                ).then((data) => {
                  setMotorYearsLookup(
                    data.map((service: any) => {
                      return {
                        value: service.id,
                        label: service.name,
                      };
                    })
                  );
                });
              }}
              value={
                modelsLookup.find(
                  (option) => option.value === formik.values.brandId
                ) as PropsValue<{ label: string; value: number }>
              }
              onBlur={formik.handleBlur("brandId")}
            />
            {formik.errors.brandId && (
              <div className="text-danger">{formik.errors.brandId}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              Motor Year
            </label>
            <Select
              id="motorYearId"
              options={motorYearsLookup}
              placeholder="اختر"
              onChange={(option) => {
                formik.setFieldValue("motorYearId", option?.value);
              }}
              value={
                motorYearsLookup.find(
                  (option) => option.value === formik.values.motorYearId
                ) as PropsValue<{ label: string; value: number }>
              }
              onBlur={formik.handleBlur("brandId")}
            />
            {formik.errors.brandId && (
              <div className="text-danger">{formik.errors.brandId}</div>
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
