import React from "react";
import { Pagination } from "react-bootstrap";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}
const GPTPaginationComplex = ({ metaData, onPageChange }: Props) => {
  const pageItems = [];

  // Calculate the number of pages to show in the pagination
  const numPagesToShow = Math.min(metaData.totalPages, 5);

  // Calculate the start and end page numbers
  let startPage = Math.max(
    metaData.currentPage - Math.floor(numPagesToShow / 2),
    1
  );
  let endPage = startPage + numPagesToShow - 1;
  if (endPage > metaData.totalPages) {
    endPage = metaData.totalPages;
    startPage = Math.max(endPage - numPagesToShow + 1, 1);
  }

  // Add the "First" button to the pagination
  pageItems.push(
    <Pagination.First
      key="first"
      disabled={metaData.currentPage === 1}
      onClick={() => onPageChange(1)}
    />
  );

  // Add the "Previous" button to the pagination
  pageItems.push(
    <Pagination.Prev
      key="prev"
      disabled={metaData.currentPage === 1}
      onClick={() => onPageChange(Math.max(metaData.currentPage - 1, 1))}
    />
  );

  // Add an "Ellipsis" item to indicate previous results
  if (startPage > 1) {
    pageItems.push(<Pagination.Ellipsis key="prevEllipsis" disabled />);
  }

  // Add the page numbers to the pagination
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === metaData.currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Add an "Ellipsis" item to indicate continuing results
  if (endPage < metaData.totalPages) {
    pageItems.push(<Pagination.Ellipsis key="nextEllipsis" disabled />);
  }

  // Add the "Next" button to the pagination
  pageItems.push(
    <Pagination.Next
      key="next"
      disabled={metaData.currentPage === metaData.totalPages}
      onClick={() =>
        onPageChange(Math.min(metaData.currentPage + 1, metaData.totalPages))
      }
    />
  );

  // Add the "Last" button to the pagination
  pageItems.push(
    <Pagination.Last
      key="last"
      disabled={metaData.currentPage === metaData.totalPages}
      onClick={() => onPageChange(metaData.totalPages)}
    />
  );

  return <Pagination>{pageItems}</Pagination>;
};

export default GPTPaginationComplex;
