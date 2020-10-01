import React, { Component } from "react";
import "./Transactions.css";
import Table from "react-bootstrap/Table";
import localData from "../Utilities/data";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../Utilities/formatData";

class Transactions extends Component {
  state = {
    totalUSD: 0,
  };

  componentDidMount() {
    this.calculateTotalUSD();
  }

  calculateTotalUSD = () => {
    const { transactions } = localData;
    let totalUSD = transactions.reduce((acc, cur) => {
      acc += cur.usd;
      return acc;
    }, 0);
    this.setState({ totalUSD });
  };

  returnTransactions = () => {
    const { transactions } = localData;
    return transactions.map((transaction, i) => {
      const { id, date, usd, customerName, customerId} = transaction;
      return (
        <tr key={id}>
          <td>{i + 1}</td>
          <td>{formatDate(date)}</td>
          <td>{formatCurrency(usd)}</td>
          <td><Link to={`/customer/${customerId}`}>{customerName}</Link></td>

        </tr>
      );
    });
  };

  render() {
    const { transactions } = localData;
    const { totalUSD } = this.state;

    return (
      <div className="transactions">
        <header className="transactions-header">
          <div className="transactions-header_block">
            <Link className="app-link-back-to-home-link" to="/">
              <span>&#8592;</span> Back to Home
            </Link>
            <h3>Transactions</h3>
          </div>
          <div className="transactions-header_block">
            <div className="transactions-header_block_widget">
              <p className="transactions-header_block_number">{transactions.length}</p>
              <p className="transactions-header_block_widget-label">Total Transactions</p>
            </div>
            <div className="transactions-header_block_widget">
              <p className="transactions-header_block_number">{formatCurrency(totalUSD)}</p>
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
          <tbody>{this.returnTransactions()}</tbody>
        </Table>
      </div>
    );
  }
}

export default Transactions;
