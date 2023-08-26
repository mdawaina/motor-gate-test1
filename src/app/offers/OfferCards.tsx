"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { MetaData } from "@/components/models/pagination";
import Pagination from "@/components/common/GPTPaginationComplex";
import agent from "@/api/agent";
import Link from "next/link";
import { getUser } from "@/util/getUser";
import { useRouter } from "next/navigation";
import { Offer, OfferParams } from "@/components/models/offer";

export const OfferCards = () => {
  const pageSize = 10;

  const [pending, setPending] = useState<boolean>(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addedToWishlist, setAddedToWishlist] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [offerParams, setOfferParams] = useState<OfferParams>({
    searchTerm: "",
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    source: "LandingPage",
  });

  const [metaData, SetMetaData] = useState<MetaData>({
    pageNumber: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);
      console.log(offerParams);
      const dataResult = await agent.Offers.getOffers(offerParams);

      SetMetaData(dataResult.metaData);

      setOffers(dataResult.items);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  };

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.pageNumber);
  }, [metaData.pageNumber, searchTerm]);

  useEffect(() => {
    initPage();
  }, [initPage]);
  const handlePageChange = useCallback(
    (page: number) => {
      SetMetaData({ ...metaData, pageNumber: page });
    },
    [metaData]
  );
  const handleSearchTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );
  const router = useRouter();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Offers</h1>
        </div>
      </div>
      <Row>
        {(offers || []).map((offer, index) => (
          <Col md={4} key={index}>
            <Card border="default" style={{ marginBottom: "15px" }}>
              <Card.Header>
                {/*Company {index + 1} */} {offer.title}{" "}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>Description: {offer.description}</p>

                  <p>Expire Date: {offer.expireDate}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination metaData={metaData} onPageChange={handlePageChange} />
    </div>
  );
};
