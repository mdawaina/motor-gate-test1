"use client";
import agent from "@/api/agent";
import { WishList } from "@/components/models/wishList";
import { Company } from "@/components/models/company";
import { MetaData } from "@/components/models/pagination";
import { protectedRoute } from "@/util/protectedRoute";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

export const WishListComponent = () => {
  const pageSize = 10;

  const [pending, setPending] = useState<boolean>(false);
  const [whishLists, setWhishLists] = useState<WishList[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [metaData, SetMetaData] = useState<MetaData>({
    currentPage: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.currentPage);
  }, [metaData.currentPage, searchTerm]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);
      const dataResult = await agent.Companies.getWishList({
        searchTerm: searchTerm,
        pageNumber: newPageIndex,
        pageSize: pageSize,
      });
      SetMetaData(dataResult.metaData);

      setWhishLists(dataResult.items);
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
          <h1>WishList</h1>
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
                <th>City</th>
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
              {!pending && whishLists.length === 0 && (
                <tr>
                  <td colSpan={4}>No data</td>
                </tr>
              )}
              {!pending &&
                whishLists.map((item) => (
                  <tr key={item.id}>
                    <td>{item.company.name}</td>
                    <td>{item.company.city.name}</td>

                    <td>
                      <Link href={`/companies/${item.company.refId}`}>
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
};
