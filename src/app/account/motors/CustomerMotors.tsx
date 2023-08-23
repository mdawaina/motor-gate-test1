"use client";
import agent from "@/api/agent";
import { CompanyMotorYear } from "@/components/models/companyMotorYearForCreate";
import { MetaData } from "@/components/models/pagination";
import Pagination from "@/components/common/GPTPaginationComplex";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Spinner } from "react-bootstrap";
import { CustomerMotor } from "@/components/models/motors";
import Link from "next/link";

export const CustomerMotors = () => {
  const [pending, setPending] = useState<boolean>(false);

  const pageSize = 5;
  const [metaData, SetMetaData] = useState<MetaData>({
    currentPage: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const [motorData, setMotorData] = useState<CustomerMotor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.currentPage);
  }, [metaData.currentPage, searchTerm]);
  const LoadPageData = async (newPageIndex: number) => {
    console.log("test 44");
    try {
      setPending(true);
      const dataResult: any = await agent.Motors.getCustomerMotors({
        searchTerm: searchTerm,
        pageNumber: newPageIndex,
        pageSize: pageSize,
        companyId: 2002,
      });
      SetMetaData(dataResult.metaData);
      setMotorData(dataResult.items);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  };

  useEffect(() => {
    initPage();
  }, [initPage]);
  const handlePageChange = useCallback(
    (page: number) => {
      SetMetaData({ ...metaData, currentPage: page });
    },
    [metaData]
  );
  const handleSearchTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearchTermChange, 1000),
    []
  );

  if (pending) {
    return (
      <div className="row">
        <div className="col-12">
          <h5>Customers Motors</h5>
        </div>

        <div className="col-12">
          <h5>
            <Spinner />
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      {/**button to add customer motor */}

      <div className="row">
        <div className="col-12">
          <h5>Customers Motors</h5>
        </div>
        <Link
          href="/account/motors/CreateCustomerMotor"
          className="btn btn-link"
        >
          Add Motor
        </Link>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="searchTerm">Search</label>
            <input
              type="text"
              className="form-control"
              id="searchTerm"
              placeholder="Search"
              value={searchTerm}
              onChange={debouncedChangeHandler}
            />
          </div>
        </div>
      </div>
      <div>
        <h5>Customer Motors</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>ChassisNo</th>
              <th>Plate No</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {(motorData || []).map((motor) => (
              <tr key={motor.id}>
                <td>{motor.id}</td>
                <td>{motor?.chassisNo}</td>
                <td>{motor?.plateNo}</td>
                <td>
                  {motor?.motorYear?.name}
                  {motor?.motorYear?.model.name}
                  {motor?.motorYear?.model.brand.name}
                </td>
                <td>
                  {/* <button className="btn btn-primary">Edit</button> */}
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination metaData={metaData} onPageChange={handlePageChange} />
      </div>
    </>
  );
};
