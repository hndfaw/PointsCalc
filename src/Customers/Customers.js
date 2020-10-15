import React from "react";
import "./Customers.css";
import { Table, Alert, Button } from "react-bootstrap";
import localData from "../Utilities/data";
import { Link, useHistory } from "react-router-dom";

export default function Customers() {
  const { customers } = localData;
  let history = useHistory();

  const returnTransactions = () => {
    const { customers } = localData;
    return customers.map((transaction, i) => {
      const { id, name } = transaction;
      return (
        <tr key={id}>
          <td>{i + 1}</td>
          <td>
            <Link to={`/customer/${id}`}>{name}</Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="customers">
      <header className="customers-header">
        <div className="customers-header_block">
          <Button size="sm" onClick={history.goBack} variant="light">
            <span>&#8592;</span> Back
          </Button>
          <h3 className="component-title">Customers</h3>
        </div>
        <div className="customers-header_block">
          <div className="customers-header_block_widget">
            <p className="customers-header_block_number">{customers.length}</p>
            <p className="customers-header_block_widget-label">
              Total Customers
            </p>
          </div>
        </div>
      </header>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>{returnTransactions()}</tbody>
      </Table>
      <Alert variant="light">Click on a customer's name for details.</Alert>
    </div>
  );
}
