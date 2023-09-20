"use client";
import agent from "@/api/agent";
import { Company } from "@/components/models/company";
import React, { use, useCallback, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
interface Props {
  companyId: string;
  show: boolean;
  setShow: any;
}
export const CompanyModal = ({ companyId, show, setShow }: Props) => {
  const [pending, setPending] = useState<boolean>(false);

  const [companyDetails, setCompanyDetails] = useState<Company>();

  const handleClose = () => setShow(false);

  const initPage = useCallback(async () => {
    try {
      setPending(true);
      const dataResult = await agent.Companies.getCompany(companyId);

      setCompanyDetails(dataResult);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, [companyId]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {pending && (
            <div className="row">
              <div className="col-12">
                <Spinner animation="border" />
              </div>
            </div>
          )}

          {companyDetails && (
            <div className="company-info">
              <div className="info-field">
                <span className="info-label"> Name:</span>
                <span>{companyDetails?.name}</span>
              </div>

              <div className="info-field">
                <span className="info-label"> City:</span>
                <span>{companyDetails?.city?.name}</span>
              </div>

              <div className="info-field">
                <span className="info-label"> Address:</span>
                <span>{companyDetails?.address}</span>
              </div>

              <div className="info-field">
                <span className="info-label"> Sectors:</span>
                <span>
                  {" "}
                  <ul>
                    {companyDetails?.sectors?.map((sector) => (
                      <li key={sector.id}>{sector.name}</li>
                    ))}
                  </ul>
                </span>
              </div>

              <div className="info-field">
                <span className="info-label"> Specilizations:</span>
                <span>
                  {" "}
                  <ul>
                    {companyDetails?.specializations?.map((spec) => (
                      <li key={spec.id}>{spec.name}</li>
                    ))}
                  </ul>
                </span>
              </div>
              {/*  <div className="info-field">
                  <span className="info-label">Email:</span>
                  <span>{companyDetails.email}</span>
                </div> */}
              <div className="info-field">
                <span className="info-label">Phone:</span>
                <span>{companyDetails.mobileNumber}</span>
              </div>
              <div className="info-field">
                <span className="info-label">Services:</span>
                <span>
                  <ul>
                    {companyDetails?.services?.map((service) => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                  </ul>
                </span>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
