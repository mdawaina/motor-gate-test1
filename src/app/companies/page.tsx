"use client";
import agent from "@/api/agent";
import { Company } from "@/components/models/company";
import { MetaData } from "@/components/models/pagination";
import { protectedRoute } from "@/util/protectedRoute";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

function Companies() {
  const pageSize = 10;

  const [pending, setPending] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [metaData, SetMetaData] = useState<MetaData>({
    pageNumber: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.pageNumber);
  }, [metaData.pageNumber, searchTerm]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);
      const dataResult = await agent.Companies.getCompanies({
        searchTerm: searchTerm,
        pageNumber: newPageIndex,
        pageSize: pageSize,
      });
      SetMetaData(dataResult.metaData);

      setCompanies(dataResult.items);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1>Companies</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                {/* <th>City</th> */}
                <th>Country</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {pending && (
                <tr>
                  <td colSpan={4}>
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              )}
              {!pending && companies.length === 0 && (
                <tr>
                  <td colSpan={4}>No data</td>
                </tr>
              )}
              {!pending &&
                companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.address}</td>
                    {/* <td>{company.city.name}</td> */}
                    <td>{company.address}</td>
                    <td>
                      <Link href={`/companies/${company.refId}`}>
                        <button type="button" className="btn btn-success me-2">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default protectedRoute(Companies);
