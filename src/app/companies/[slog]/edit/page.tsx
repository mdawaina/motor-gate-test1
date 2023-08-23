"use client";
import { protectedRoute } from "@/util/protectedRoute";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import cities from "../../../../data/cities.json";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import agent from "@/api/agent";
import * as yup from "yup";

import {
  Company,
  CompanyForUpdate,
  Specialization,
} from "@/components/models/company";
import { Sector } from "@/components/models/sector";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { spec } from "node:test/reporters";

function EditCompany({ params }: any) {
  const [pending, setPending] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyForUpdate | null>(null);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  //define state for services lookup
  const [servicesLookup, setServicesLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const [sectors, setSectors] = useState<Sector[]>([]);
  const [services, setServices] = useState<Sector[]>([]);
  const router = useRouter();

  const citiesLookup = cities?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const sectorsLookup = sectors?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const specializationsLookup = specializations?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  /*  const servicesLookup = services?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }); */

  const initPage = useCallback(async () => {
    try {
      setPending(true);
      const dataResult = await agent.Companies.getCompanyForUpdate(params.slog);
      var sectorsData = await agent.Lookups.getSectors();
      setSectors(sectorsData);
      var specializationsData = await agent.Lookups.getSpecializations();
      var specializationids = dataResult.specializations.map(
        (item: any) => item
      );
      var servicesData = await agent.Lookups.getServices(
        specializationids as number[]
      );
      const servicesLookupData = servicesData?.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setSpecializations(specializationsData);
      setServicesLookup(servicesLookupData);
      setCompany(dataResult);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, [params.slog]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const formik = useFormik({
    initialValues: {
      id: company?.id as number,
      refId: company?.refId as string,
      name: company?.name as string,
      cityId: company?.cityId as number,
      vatRegNumber: company?.vatRegNumber as string,
      cr: company?.cr as string,
      address: company?.address as string,
      disctrict: company?.disctrict as string,
      companyStatusId: company?.companyStatusId as number,
      //specializations: company?.specializations,
      //specializationId: company?.specializationId as number,
      specialization: null,
      companyStatus: null,
      city: null,
      createdOn: company?.createdOn as string,
      specializations: company?.specializations as number[],
      services: company?.services as number[],
      sectors: company?.sectors as number[],
    },
    enableReinitialize: true,
    onSubmit: () => {
      try {
        setPending(true);
        // console.log(formik.values);
        //definee variable company
        /*  const newCompany: CompanyForUpdate = {
          id: company?.id as number,
          refId: formik.values.refId,
          name: formik.values.name,
          cityId: formik.values.cityId,
          vatRegNumber: formik.values.vatRegNumber,
          cr: formik.values.cr,
          address: formik.values.address,
          disctrict: formik.values.disctrict,
          companyStatusId: formik.values.companyStatusId,
          specializationId: formik.values.specializationId,
          sectors: formik.values.sectors,
          services: formik.values.services,
          createdOn: formik.values.createdOn,

        }; */

        agent.Companies.updateCompany(formik.values).then(() => {
          setPending(false);
          toast.success("تم تحديث بيانات المنشأة ");
          router.push(`/companies/${params.slog}`);
        });
        //setSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      name: yup.string().trim().required("الحقل مطلوب"),
      cityId: yup.number().typeError("المدينة مطلوب").required("الحقل مطلوب"),
      vatRegNumber: yup
        .string()
        .required("CR is required")
        .matches(/^[0-9]{10}$/, "CR is not valid"),
      cr: yup
        .string()
        .required("CR is required")
        .matches(/^[0-9]{10}$/, "CR is not valid"),
      address: yup.string().trim().required("الحقل مطلوب"),
      sectors: yup.array().min(1, "الحقل مطلوب").required("الحقل مطلوب"),
      /*  specializations: yup
        .array()
        .min(1, "الحقل مطلوب")
        .required("الحقل مطلوب"), */
      specializations: yup
        .array()
        .min(1, "الحقل مطلوب")
        .required("الحقل مطلوب"),

      services: yup.array().min(1, "الحقل مطلوب").required("الحقل مطلوب"),

      // region: yup.string().trim().required("الحقل مطلوب"),
      disctrict: yup.string().trim().required("الحقل مطلوب"),
    }),
  });

  return (
    company && (
      <>
        <div className="row">
          <div className="col-12">
            <h5>Edit Company</h5>
          </div>
        </div>

        <div className="col">
          <form onSubmit={formik.handleSubmit}>
            <div className="row"></div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formik.values?.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  /*  {...formik.getFieldProps("name")} */
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
                  id="vatRegNumber"
                  value={formik.values.vatRegNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.vatRegNumber && (
                  <div className="text-danger">
                    {formik.errors.vatRegNumber}
                  </div>
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
                <label htmlFor="disctrict" className="form-label">
                  Disctrict
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="disctrict"
                  value={formik.values.disctrict}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.disctrict && (
                  <div className="text-danger">{formik.errors.disctrict}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="sector" className="form-label">
                  Sector
                </label>
                <Select
                  id="sectors"
                  options={sectorsLookup}
                  placeholder="اختر"
                  isMulti
                  onChange={(options) =>
                    formik.setFieldValue(
                      "sectors",
                      options ? options.map((option) => option?.value) : []
                    )
                  }
                  value={
                    formik.values.sectors
                      ? formik.values.sectors.map((value) =>
                          sectorsLookup.find((option) => option.value === value)
                        )
                      : null
                  }
                  onBlur={formik.handleBlur("sectors")}
                />
                {formik.errors.sectors && (
                  <div className="text-danger">{formik.errors.sectors}</div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="specializations" className="form-label">
                  Specialization
                </label>
                <Select
                  id="specializations"
                  options={specializationsLookup}
                  placeholder="اختر"
                  isMulti
                  onChange={(options) => {
                    formik.setFieldValue(
                      "specializations",
                      options ? options.map((option) => option?.value) : []
                    );

                    const selectedValues: number[] = options.map(
                      (option) => option?.value || 0
                    );

                    agent.Lookups.getServices(selectedValues).then((data) => {
                      setServicesLookup(
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
                    formik.values.specializations
                      ? formik.values.specializations.map((value) =>
                          specializationsLookup.find(
                            (option) => option.value === value
                          )
                        )
                      : null
                  }
                  onBlur={formik.handleBlur("specializations")}
                />
                {formik.errors.specializations && (
                  <div className="text-danger">
                    {formik.errors.specializations}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="services" className="form-label">
                  Services
                </label>
                <Select
                  id="services"
                  options={servicesLookup}
                  placeholder="اختر"
                  isMulti
                  onChange={(options) =>
                    formik.setFieldValue(
                      "services",
                      options ? options.map((option) => option?.value) : []
                    )
                  }
                  value={
                    formik.values.services
                      ? formik.values.services.map((value) =>
                          servicesLookup.find(
                            (option) => option.value === value
                          )
                        )
                      : null
                  }
                  onBlur={formik.handleBlur("services")}
                />
                {formik.errors.services && (
                  <div className="text-danger">{formik.errors.services}</div>
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
              Update
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default protectedRoute(EditCompany);
//export default EditCompany;
