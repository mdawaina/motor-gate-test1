"use client";
import agent from "@/api/agent";
import { DashboardModel, StatCount } from "@/components/models/dashboardModel";
import { protectedRoute } from "@/util/protectedRoute";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ColouredCard } from "./ColouredCard";

function page() {
  //call agent.getDashboard inside useeffect
  //set state to the response
  //use state to render the page

  const [pending, setPending] = useState<boolean>(false);
  const [statCounts, setStatCounts] = useState<StatCount[]>([]);

  const initPage = useCallback(async () => {
    // await LoadPageData(metaData.pageNumber);

    const dataResult = await agent.Dashboard.getDashboardCounts();
    setStatCounts(dataResult);
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  if (pending) {
    return (
      <div className="row">
        <div className="col-12">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <div className="row">
        {statCounts &&
          statCounts.map((statCount) => (
            <ColouredCard title={statCount.title} count={statCount.count} />
          ))}
      </div>
    </div>
  );
}

export default protectedRoute(page);
