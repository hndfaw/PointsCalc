import React, { useState, useEffect } from "react";
import "./Transactions.css";
import { Table, Alert, Button, Pagination } from "react-bootstrap";
import localData from "../Utilities/data";
import { Link, useHistory } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import NumberFormat from "react-number-format";

export default function Transactions() {
  const [totalUSD, setTotalUSD] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [startingIndex, setStartingIndex] = useState(0);
  const [itemsPerPage] = useState(10);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const { transactions } = localData;
  let history = useHistory();

  useEffect(() => {
	  getTransactions(1)
  },[]);

  const getTransactions = (number) => {
    const { transactions } = localData;
    const startingIndex = number === 1 ? 0 : (number - 1) * itemsPerPage;
    const currentTransactions = transactions.slice(
      startingIndex,
      startingIndex + itemsPerPage
    );

    let totalUSD = currentTransactions.reduce((acc, cur) => {
      acc += cur.usd;
      return acc;
    }, 0);
    setTotalUSD(totalUSD);
    setCurrentTransactions(currentTransactions);
    setStartingIndex(startingIndex);
  };

  const pagination = () => {
    const { transactions } = localData;
    let totalPages = Math.ceil(transactions.length / itemsPerPage);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          onClick={() => handlePagination(number)}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }

    return <Pagination size="sm">{items}</Pagination>;
  };

  const handlePagination = (number) => {
    setActivePage(number);
    getTransactions(number);
  };

  const returnTransactions = () => {
    return currentTransactions.map((transaction, i) => {
      const { id, date, usd, customerName, customerId } = transaction;
      return (
        <tr key={id}>
          <td>{startingIndex + i + 1}</td>
          <td>
            {" "}
            <Moment format="MMM D, YYYY">{date}</Moment>
          </td>
          <td>
            {" "}
            <NumberFormat
              value={usd}
              displayType={"text"}
              fixedDecimalScale={true}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
            />
          </td>
          <td>
            <Link to={`/customer/${customerId}`}>{customerName}</Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="transactions">
      <header className="transactions-header">
        <div className="transactions-header_block">
          <Button size="sm" onClick={history.goBack} variant="light">
            <span>&#8592;</span> Back
          </Button>
          <h3 className="component-title">Transactions</h3>
        </div>
        <div className="transactions-header_block">
          <div className="transactions-header_block_widget">
            <p className="transactions-header_block_number">
              {transactions.length}
            </p>
            <p className="transactions-header_block_widget-label">
              Total Transactions
            </p>
          </div>
          <div className="transactions-header_block_widget">
            <p className="transactions-header_block_number">
              <NumberFormat
                value={totalUSD}
                displayType={"text"}
                fixedDecimalScale={true}
                decimalScale={2}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            <p className="transactions-header_block_widget-label">Total USD</p>
          </div>
        </div>
      </header>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Date</th>
            <th>USD</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>{returnTransactions()}</tbody>
      </Table>
      {pagination()}
      <Alert variant="light">Click on a customer's name for details.</Alert>
    </div>
  );
}
