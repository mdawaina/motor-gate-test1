"use client";
import agent from "@/api/agent";
import { CompanyMotorYearForCreate } from "@/components/models/companyMotorYearForCreate";
import { Brand } from "@/components/models/motors";
import { protectedRoute } from "@/util/protectedRoute";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function MotorsList() {
  const [motors, setMotors] = useState<Brand[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const motorData = [
    {
      brand: "Brand1",
      models: [
        {
          model: "Model1",
          years: [2019, 2020, 2021],
        },
        {
          model: "Model2",
          years: [2020, 2021, 2022],
        },
      ],
    },
    {
      brand: "Brand2",
      models: [
        {
          model: "Model3",
          years: [2021, 2022, 2023],
        },
        {
          model: "Model4",
          years: [2022, 2023, 2024],
        },
      ],
    },
  ];
  const initPage = useCallback(async () => {
    try {
      setPending(true);
      const dataResult = await agent.Motors.getMotors();
      setMotors(dataResult);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const changeCheckBox = (e: any) => {
    const companyMotorYear: CompanyMotorYearForCreate = {
      companyId: 2002,
      motorYearId: e.target.getAttribute("year-id"),
      isChecked: e.target.checked,
    };

    /*  const id = e.target.getAttribute("brand-Id");
    const id2 = e.target.getAttribute("model-Id");
    console.log(id);
    const id3 = e.target.getAttribute("year-Id");
    console.log(id3); */

    try {
      agent.Motors.createCompanyMotorYear(companyMotorYear);
    } catch (error) {
      console.log(error);
    }
  };

  if (pending) return <Spinner />;

  return (
    <Accordion defaultActiveKey="0" flush>
      {(motors || []).map((brandData, idx) => (
        <Accordion.Item eventKey={idx.toString()} key={idx}>
          <Accordion.Header>{brandData.name}</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="0" flush>
              {brandData.models.map((modelData, idx2) => (
                <Accordion.Item eventKey={idx2.toString()} key={idx2}>
                  <Accordion.Header>{modelData.name}</Accordion.Header>
                  <Accordion.Body>
                    {modelData.motorYears.map((year, idx3) => (
                      <Form.Check
                        type="checkbox"
                        id={`default-checkbox${idx3}`}
                        label={`${year.name}`}
                        key={idx3}
                        // brand-Id={brandData.id}
                        // model-Id={modelData.id}
                        //year.companyMotorYears.length > 0?
                        defaultChecked={
                          year.companyMotorYears.filter(
                            (x) => x.motorYearId === year.id
                          ).length > 0
                        }
                        year-id={year.id}
                        onChange={changeCheckBox}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
export default protectedRoute(MotorsList);
