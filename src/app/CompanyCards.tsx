"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import { Company, FilterCompanyParams } from "@/components/models/company";
import { MetaData } from "@/components/models/pagination";
import Pagination from "@/components/common/GPTPaginationComplex";
import agent from "@/api/agent";
import Link from "next/link";
import { getUser } from "@/util/getUser";
import { useRouter } from "next/navigation";

export const CompanyCards = () => {
  const pageSize = 10;

  const [pending, setPending] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addedToWishlist, setAddedToWishlist] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<FilterCompanyParams>({
    searchTerm: "",
    pageNumber: 1,
    pageSize: 10,
    companyStatusId: null,
    cityId: null,
    sectorId: null,
    specializationId: null,
    servicesString: "",
  });
  const onParamsChange = (newParams: FilterCompanyParams) => {
    // setCount((prevCount) => prevCount + 1);
    console.log(newParams);
    setSearchParams(newParams);
  };
  const [metaData, SetMetaData] = useState<MetaData>({
    pageNumber: 1,
    pageSize: pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const LoadPageData = async (newPageIndex: number) => {
    try {
      setPending(true);

      const dataResult = await agent.Companies.filterCompanies(searchParams);
      SetMetaData(dataResult.metaData);

      setCompanies(dataResult.items);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  };

  const initPage = useCallback(async () => {
    await LoadPageData(metaData.pageNumber);
  }, [metaData.pageNumber, searchTerm, searchParams]);

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

  const onAddToWishList = async (companyId: string) => {
    // Assuming addToWishList is an async function, await its response
    const response = await agent.Companies.addToWishList(companyId);
    await LoadPageData(metaData.pageNumber);
    if (response /* and any other condition to check if it's successful */) {
      // Add the refId to the addedToWishlist array
      setAddedToWishlist((prevState) => [...prevState, companyId]);
    }
  };

  const onRemoveFromWishList = async (companyId: string) => {
    // Assuming removeFromWishList is an async function, await its response
    const response = await agent.Companies.removeFromWishList(companyId);
    await LoadPageData(metaData.pageNumber);
    if (response /* and any other condition to check if it's successful */) {
      // Remove the refId from the addedToWishlist array
      setAddedToWishlist((prevState) =>
        prevState.filter((id) => id !== companyId)
      );
    }
  };
  const onAddToWishList2 = useCallback(
    async (companyId: string) => {
      try {
        await agent.Companies.addToWishList(companyId);
        await LoadPageData(metaData.pageNumber);
      } catch (error) {
        console.log(error);
      }
    },
    [metaData.pageNumber]
  );

  return (
    <div className="container">
      <SearchForm onParamsChange={onParamsChange} />

      <div className="row">
        <div className="col-12">
          <h1>Service Providers</h1>
        </div>
      </div>
      <Row>
        {(companies || []).map((company, index) => (
          <Col md={4} key={index}>
            <Card border="default" style={{ marginBottom: "15px" }}>
              <Card.Header>
                {/*Company {index + 1} */} {company.name}{" "}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>
                    Company Name: {company.name} {count}
                  </p>
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
                  {company.isInWishList ? (
                    <Button
                      variant="link"
                      onClick={() => onRemoveFromWishList(company.refId)}
                    >
                      Remove From Wish List
                    </Button>
                  ) : (
                    <div key={company.refId}>
                      {!addedToWishlist.includes(company.refId) ? (
                        <Button
                          variant="link"
                          onClick={() => onAddToWishList(company.refId)}
                        >
                          Add To Wish List
                        </Button>
                      ) : (
                        <span>Added to wishlist1</span>
                      )}
                    </div>
                  )}
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
