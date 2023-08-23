import agent from "@/api/agent";
import { CreateCustomerMotor } from "@/components/models/createCustomerMotor";
import { Brand } from "@/components/models/motors";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { PropsValue } from "react-select";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";

function CreateMotor() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [pending, setPending] = useState(false);
  const [modelsLookup, setModelsLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const [motorYearsLookup, setMotorYearsLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const router = useRouter();

  const brandsLookup = brands?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const initPage = useCallback(async () => {
    const brandsResult = await agent.Lookups.getBrands();
    setBrands(brandsResult);
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const formik = useFormik({
    initialValues: {
      chassisNo: "",
      plateNo: "",
      brandId: 0,
      modelId: 0,
      motorYearId: 0,
      motorColorId: 0,
    },
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);
        agent.Customers.createCustomerMotor(
          formik.values as CreateCustomerMotor
        ).then(() => {
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
          <div className="col-md-6 mb-3">
            <label htmlFor="chassisNo" className="form-label">
              Chassis No
            </label>
            <input
              type="text"
              className="form-control"
              id="chassisNo"
              value={formik.values.chassisNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.chassisNo && (
              <div className="text-danger">{formik.errors.chassisNo}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="plateNo" className="form-label">
              Plate No
            </label>
            <input
              type="text"
              className="form-control"
              id="plateNo"
              value={formik.values.plateNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.plateNo && (
              <div className="text-danger">{formik.errors.plateNo}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              Brand
            </label>
            <Select
              id="brandId"
              options={brandsLookup}
              placeholder="اختر"
              onChange={(option) => {
                formik.setFieldValue("brandId", option?.value);

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
}

export default CreateMotor;
