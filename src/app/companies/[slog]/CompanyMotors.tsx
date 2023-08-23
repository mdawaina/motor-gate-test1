"use client";
import agent from "@/api/agent";
import { CompanyMotorYear } from "@/components/models/companyMotorYearForCreate";
import { MetaData } from "@/components/models/pagination";
import Pagination from "@/components/common/GPTPaginationComplex";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

import { Spinner } from "react-bootstrap";
/* interface Props {
  motorList: CompanyMotorYear[];
}
 */
export const CompanyMotors = () => {
  const [pending, setPending] = useState<boolean>(false);

  const pageSize = 5;
  const [metaData, SetMetaData] = useState<MetaData>({
    currentPage: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const [motorData, setMotorData] = useState<CompanyMotorYear[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.currentPage);
  }, [metaData.currentPage, searchTerm]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);
      const dataResult: any = await agent.Motors.getCompanyMotors({
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
          <h5>Company Motors</h5>
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
    <div>
      <h5>Company Motors</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(motorData || []).map((motor) => (
            <tr key={motor.id}>
              <td>{motor.id}</td>
              <td>{motor?.motorYear?.model?.brand.name}</td>
              <td>{motor?.motorYear?.model?.name}</td>
              <td>{motor?.motorYear?.name}</td>
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
  );
};
