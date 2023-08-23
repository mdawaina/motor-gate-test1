import agent from "@/api/agent";
import { Service, Specialization } from "@/components/models/company";
import { Sector } from "@/components/models/sector";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Button, Form, Col, Row, Card } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";

const SearchForm = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLookup, setServicesLookup] = useState<
    { label: string; value: number }[]
  >([]);

  const [specializations, setSpecializations] = useState<Specialization[]>([]);

  const initPage = useCallback(async () => {
    try {
      setPending(true);

      var sectorsData = await agent.Lookups.getSectors();
      setSectors(sectorsData);
      var specializationsData = await agent.Lookups.getSpecializations();

      setSpecializations(specializationsData);
      //setServicesLookup(servicesLookupData);
      //setCompany(dataResult);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

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

  const formik = useFormik({
    initialValues: {
      searchTerm: "",
      sectorId: 0,
      specializationId: 0,
      services: [],
    },
    enableReinitialize: true,
    onSubmit: () => {
      try {
        setPending(true);
        console.log(formik.values);

        agent.Companies.filterCompanies({
          searchTerm: formik.values.searchTerm,
          pageNumber: 1,
          pageSize: 10,
          companyStatusId: null,
          cityId: null,
          sectorId: formik.values.sectorId,
          specializationId: formik.values.specializationId,
          servicesString: formik.values.services.join(","),
        }).then((data) => {
          console.log(data);
        });

        /*   agent.Companies.updateCompany(formik.values).then(() => {
          setPending(false);
          toast.success("تم تحديث بيانات المنشأة ");
          router.push(`/companies/${params.slog}`);
        }); */
        //setSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({}),
  });

  return (
    <Card className="p-3 border" style={{ padding: "10px" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="align-items-center">
          <Col>
            <div className="col-md-6 mb-3">
              <label htmlFor="sectorId" className="form-label">
                الفئة
              </label>
              <Select
                id="sectorId"
                options={sectorsLookup}
                placeholder="اختر"
                onChange={(option) =>
                  formik.setFieldValue("sectorId", option?.value)
                }
                value={sectorsLookup.find(
                  (option) => option.value === formik.values.sectorId
                )}
                onBlur={formik.handleBlur("sectorId")}
              />
              {formik.errors.sectorId && (
                <div className="text-danger">{formik.errors.sectorId}</div>
              )}
            </div>
          </Col>

          <Col>
            <div className="col-md-6 mb-3">
              <label htmlFor="sectorId" className="form-label">
                التخصص
              </label>
              <Select
                id="specializationId"
                options={specializationsLookup}
                placeholder="اختر"
                onChange={(option) => {
                  formik.setFieldValue("specializationId", option?.value);

                  /*  const selectedValues: number[] = option.map(
                    (x) => x?.value || 0
                  ); */

                  var selectedValues: number[] = option?.value
                    ? [option?.value]
                    : [];

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
                value={specializationsLookup.find(
                  (option) => option.value === formik.values.specializationId
                )}
                onBlur={formik.handleBlur("specializationId")}
              />
              {formik.errors.specializationId && (
                <div className="text-danger">
                  {formik.errors.specializationId}
                </div>
              )}
            </div>
          </Col>

          <Col>
            <div className="col-md-6 mb-3">
              <label htmlFor="services" className="form-label">
                الخدمات
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
                        servicesLookup.find((option) => option.value === value)
                      )
                    : null
                }
                onBlur={formik.handleBlur("services")}
              />
              {formik.errors.services && (
                <div className="text-danger">{formik.errors.services}</div>
              )}
            </div>
          </Col>

          <Col>
            <Button variant="primary" type="submit">
              بحث
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchForm;
