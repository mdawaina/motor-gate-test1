"use client";
import agent from "@/api/agent";
import { Offer } from "@/components/models/offer";
import { MetaData } from "@/components/models/pagination";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

const OffersList = () => {
  const pageSize = 10;

  const [pending, setPending] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]); // Offer
  const [metaData, SetMetaData] = useState<MetaData>({
    currentPage: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.currentPage);
  }, [metaData.currentPage]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);
      const dataResult = await agent.Offers.getOffers({
        searchTerm: searchTerm,
        currentPage: newPageIndex,
        pageSize: pageSize,
        totalCount: 0,
        totalPages: 0,
      });
      SetMetaData(dataResult.metaData);

      setOffers(dataResult.items);
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
          <h1>Offers</h1>
          <Link href="/offers/create">Create</Link>
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
                <th>Title</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Expire Date</th>
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
              {!pending && offers.length === 0 && (
                <tr>
                  <td colSpan={4}>No data</td>
                </tr>
              )}
              {!pending &&
                offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.title}</td>
                    <td>{offer.description}</td>
                    <td>{offer.expireDate}</td>
                    <td>{offer.createdOn}</td>
                    <td>
                      <Link href={`/offers/${offer.id}`}>View</Link>
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

export default OffersList;
