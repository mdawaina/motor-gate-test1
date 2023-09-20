"use client";
import agent from "@/api/agent";
import { Company } from "@/components/models/company";
import { protectedRoute } from "@/util/protectedRoute";
// import { format, set } from "date-fns";
import Link from "next/link";

import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CompanyMotors } from "./CompanyMotors";
import { User } from "@/components/models/loginUser";
import { getUser } from "@/util/getUser";
import { ro } from "date-fns/locale";

function CompanyDetail({ params }: any) {
  const [pending, setPending] = useState<boolean>(false);
  const [company, setCompany] = useState<Company | null>(null);

  var { roles, companyRefId }: User = getUser() as User;

  const initPage = useCallback(async () => {
    try {
      setPending(true);
      const dataResult = await agent.Companies.getCompany(params.slog);
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
  if (pending) {
    return (
      <div className="row">
        <div className="col-12">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <>
      {company && (
        <>
          <div className="row">
            <div className="col-12">
              <h5>Company Detail</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/** show name of the copany with label */}
              Name: <p>{company?.name}</p>
              {/** show city name of the copany with label */}
              City:
              <p>{company?.city?.name}</p>
              {/** show vATRegNumber of the copany with label */}
              VAT Registration Number:
              <p>{company?.vatRegNumber}</p>
              {/** show cr of the copany with label */}
              CR:
              <p>{company?.cr}</p>
              {/** show address of the copany with label */}
              Address:
              <p>{company?.address}</p>
              {/** show specialization name of the copany with label */}
              {/*   Specialization Name:
              <p>{company?.specialization?.name}</p> */}
              {/** show companyStatus name of the copany with label */}
              {/*  Company Status:
              <p>{company?.companyStatus?.name}</p> */}
              Company Sectors:
              <ul>
                {company?.sectors?.map((sector) => (
                  <li key={sector.id}>{sector.name}</li>
                ))}
              </ul>
              Company Specilizations:
              <ul>
                {company?.specializations?.map((spec) => (
                  <li key={spec.id}>{spec.name}</li>
                ))}
              </ul>
              Company Services:
              <ul>
                {company?.services?.map((service) => (
                  <li key={service.id}>{service.name}</li>
                ))}
              </ul>
              {/** show createdOn of the copany with label */}
              {/** show createdOn of the copany with label */}
              {/*  <p>
                {format(
                  new Date(company?.createdOn?.slice(0, 18)),
                  "dd/MM/yyyy HH:mm:ss"
                )}
              </p> */}
            </div>
          </div>
          {/** include CompanyMotors Component here */}
          <div className="row">
            <div className="col-12">
              <CompanyMotors />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {roles?.includes("Company") && (
                <Link href={`/companies/${params.slog}/edit`}>Edit</Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default protectedRoute(CompanyDetail);
