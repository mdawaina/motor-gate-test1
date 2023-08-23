"use client";
import agent from "@/api/agent";
import { Brand } from "@/components/models/motors";
import { protectedRoute } from "@/util/protectedRoute";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function MotorsList2() {
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

  if (pending) return <Spinner />;

  /* return (motors || []).map((motor) => {
    return (
      { <div className="col-12" key={motor.id}>
        <h1>{motor.name}</h1>
      </div> }




    );
  }); */

  return (
    <Accordion defaultActiveKey="0">
      {(motors || []).map((brandData, idx) => (
        <Card key={idx}>
          <Card.Header>
            <Accordion.Header as={Button} variant="link" eventKey={idx + 1}>
              {brandData.name}
            </Accordion.Header>
          </Card.Header>
          <Accordion.Body key={idx + 1}>
            <Card.Body>
              <Accordion>
                {brandData.models.map((modelData, idx2) => (
                  <Card key={idx2}>
                    <Card.Header>
                      <Accordion.Header
                        as={Button}
                        variant="link"
                        eventKey={idx2 + 1}
                      >
                        {modelData.name}
                      </Accordion.Header>
                    </Card.Header>
                    <Accordion.Body key={idx2 + 1}>
                      <Card.Body>
                        {modelData.motorYears.map((year, idx3) => (
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox${idx3}`}
                            label={`${year.name}`}
                          />
                        ))}
                      </Card.Body>
                    </Accordion.Body>
                  </Card>
                ))}
              </Accordion>
            </Card.Body>
          </Accordion.Body>
        </Card>
      ))}
    </Accordion>
  );
}
export default protectedRoute(MotorsList2);
