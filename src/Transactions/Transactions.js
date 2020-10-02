import React, { Component } from "react";
import "./Transactions.css";
import { Table, Alert, Button, Pagination } from "react-bootstrap";
import localData from "../Utilities/data";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../Utilities/formatData";

class Transactions extends Component {
  state = {
    totalUSD: 0,
    currentTransactions: [],
    activePage: 1,
    startingIndex: 0,
    itemsPerPage: 10,
  };

  componentDidMount() {
    this.getTransactions(1);
  }

  getTransactions = (number) => {
    const { transactions } = localData;
    const { itemsPerPage } = this.state;
    const startingIndex = number === 1 ? 0 : (number - 1) * itemsPerPage;
    const currentTransactions = transactions.slice(
      startingIndex,
      startingIndex + itemsPerPage
    );

    let totalUSD = currentTransactions.reduce((acc, cur) => {
      acc += cur.usd;
      return acc;
    }, 0);
    this.setState({ currentTransactions, startingIndex, totalUSD });
  };

  handlePagination = (number) => {
    this.setState({ activePage: number });
    this.getTransactions(number);
  };

  pagination = () => {
    let { activePage, itemsPerPage } = this.state;
    const { transactions } = localData;
    let totalPages = Math.ceil(transactions.length / itemsPerPage);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          onClick={() => this.handlePagination(number)}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }

    return <Pagination size="sm">{items}</Pagination>;
  };

  returnTransactions = () => {
    const { currentTransactions, startingIndex } = this.state;

    return currentTransactions.map((transaction, i) => {
      const { id, date, usd, customerName, customerId } = transaction;
      return (
        <tr key={id}>
          <td>{startingIndex + i + 1}</td>
          <td>{formatDate(date)}</td>
          <td>{formatCurrency(usd)}</td>
          <td>
            <Link to={`/customer/${customerId}`}>{customerName}</Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { totalUSD } = this.state;
    const { transactions } = localData;

    return (
      <div className="transactions">
        <header className="transactions-header">
          <div className="transactions-header_block">
            <Button
              size="sm"
              onClick={this.props.history.goBack}
              variant="light"
            >
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
                {formatCurrency(totalUSD)}
              </p>
              <p className="transactions-header_block_widget-label">
                Total USD
              </p>
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
        {this.pagination()}
        <Alert variant="light">Click on a customer's name for details.</Alert>
      </div>
    );
  }
}

export default Transactions;
