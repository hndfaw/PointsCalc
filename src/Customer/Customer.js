import React, { Component } from "react";
import "./Customer.css";
import localData from "../Utilities/data";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { formatCurrency, formatDate } from "../Utilities/formatData";

class Customer extends Component {
  state = {
    customerId: "",
    customerName: "",
    transWithPoints: [],
    transWithPointsPerMonth: [],
    totalPoints: 0,
    showTransactionsNote: false,
  };

  componentDidMount() {
    let currentYear = new Date().getFullYear();
    this.getCustomerAndTransactions(currentYear);
  }

  handleOnChange = (e) => {
    const { value } = e.target;
    this.getCustomerAndTransactions(parseInt(value));
  };

  getCustomerAndTransactions = (year) => {
    const { id } = this.props;

    const { customers, transactions } = localData;
    let customer = customers.find((cstm) => cstm.id === id);

    if (customer) {
      let customersTransactions = transactions.filter((trns) => {
        let newDate = new Date(trns.date);
        let trnsYear = newDate.getFullYear();
        return trns.customerId === customer.id && year === trnsYear;
      });

      if (customersTransactions.length === 0) {
        this.setState({ showTransactionsNote: true });
      } else {
        this.setState({ showTransactionsNote: false });
      }
      this.calculatePoints(customersTransactions);
      this.setState({ customerId: customer.id, customerName: customer.name });
    }
  };

  calculatePoints = (customersTransactions) => {
    let transWithPoints = customersTransactions.map((trans) => {
      const { id, date, usd } = trans;
      let points = 0;

      if (usd > 50 && usd <= 100) {
        points = usd - 50;
      } else if (usd > 100) {
        points = (usd - 100) * 2 + 50;
      }

      return {
        id,
        date,
        usd,
        points,
      };
    });
    this.setState({ transWithPoints });
    this.calculatePointsPerMonth(transWithPoints);
  };

  calculatePointsPerMonth = (customersTransactions) => {
    let totalPoints = 0;
    let transWithPointsPerMonth = customersTransactions.reduce((acc, cur) => {
      const { date, points } = cur;
      totalPoints += points;

      const newDate = new Date(date);
      let month = newDate.getMonth();

      let convertMonths = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };

      acc[convertMonths[month]]
        ? (acc[convertMonths[month]] += points)
        : (acc[convertMonths[month]] = points);

      return acc;
    }, {});

    this.setState({
      transWithPointsPerMonth: Object.entries(transWithPointsPerMonth),
      totalPoints,
    });
  };

  returnTransWithPoints = () => {
    const { transWithPoints } = this.state;

    return transWithPoints.map((transWithPoint, i) => {
      const { id, date, usd, points } = transWithPoint;
      return (
        <tr key={id}>
          <td>{i + 1}</td>
          <td>{formatDate(date)}</td>
          <td>{formatCurrency(usd)}</td>
          <td>{points}</td>
        </tr>
      );
    });
  };

  returnTransWithPointsPerMonth = () => {
    const { transWithPointsPerMonth } = this.state;

    return transWithPointsPerMonth.map((transWithPoint, i) => {
      return (
        <tr key={i + 1}>
          <td>{i + 1}</td>
          <td>{transWithPoint[0]}</td>
          <td>{transWithPoint[1]}</td>
        </tr>
      );
    });
  };

  render() {
    const { customerName, totalPoints, showTransactionsNote } = this.state;

    return (
      <div className="customer">
        <header className="customer-header">
          <div className="customer-header-part-1">
            <Button
              size="sm"
              onClick={this.props.history.goBack}
              variant="light"
            >
              <span>&#8592;</span> Back
            </Button>

            <h3 className="component-title">{customerName}</h3>
          </div>

          <div className="customers-header_block_widget">
            <p className="customers-header_block_number">{totalPoints}</p>
            <p className="customers-header_block_widget-label">Total Points</p>
          </div>
        </header>
        <div className="customer-table-title-container">
          <h4 className="customer-table-title">Monthly Points</h4>
          {showTransactionsNote && (
          <Alert variant="danger" >
            No transactions found for the selected year.{" "}
          </Alert>
        )}
          <Form>
            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
              <Form.Label>Year</Form.Label>
              <Form.Control
                defaultValue={new Date().getFullYear()}
                as="select"
                size="sm"
                custom
                onChange={this.handleOnChange}
              >
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{this.returnTransWithPointsPerMonth()}</tbody>
        </Table>
        <h4 className="customer-table-title">Transactions</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>USD</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{this.returnTransWithPoints()}</tbody>
        </Table>
        
      </div>
    );
  }
}

export default Customer;
