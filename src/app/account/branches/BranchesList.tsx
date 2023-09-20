"use client";
import agent from "@/api/agent";
import { Branch } from "@/components/models/branch";
import React, { use, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export const BranchesList = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  const initPage = async () => {
    try {
      const result = await agent.Branches.getBranches(2002);
      setBranches(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    initPage();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="col-12">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Branch Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.id}</td>
                <td>{branch.name}</td>
                <td>{branch.address}</td>
                <td>{branch.city?.name}</td>
                <td>{branch.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
