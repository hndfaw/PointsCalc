import React, { Component } from "react";
import "./Customer.css";
import localData from "../Utilities/data";
import Table from "react-bootstrap/Table";
import { formatCurrency, formatDate } from "../Utilities/formatData";

class Customer extends Component {
  state = {
    customerId: "",
    customerName: "",
    transWithPoints: []
  };
  componentDidMount() {
    this.getCustomerAndTransactions();
  }

  getCustomerAndTransactions = () => {
    const { id } = this.props;
    const { customers, transactions } = localData;
    let customer = customers.find((cstm) => cstm.id === id);

    if (customer) {
        let customersTransactions = transactions.filter(trns => trns.customerId === customer.id);
        this.calculatePoints(customersTransactions)
      this.setState({ customerId: customer.id, customerName: customer.name });
    }
};

calculatePoints = customersTransactions => {
    let transWithPoints = customersTransactions.map(trans => {
        const { id, date, usd } = trans
        let points = 0;

        if(usd > 50 && usd <=100) {
            points = (usd - 50)
        } else if(usd > 100) {
            points = ((usd - 100) * 2) + 50
        }

        return {
            id,
            date,
            usd,
            points
        }
    })
    this.setState({transWithPoints})
    this.calculatePointsPerMonth(transWithPoints)
}

calculatePointsPerMonth = customersTransactions => {
    let transWithPoints = customersTransactions.reduce((acc, cur) => {
        const { date, usd, points } = cur

        const newDate = new Date(date);
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let convertMonths = {
            0: "January",
            1: "February",
            6: "July",
            7: "August",
            8: "September"
        }

        acc[convertMonths[month]] ? acc[convertMonths[month]] += points : acc[convertMonths[month]] = points;

        return acc;
    }, {})
    console.log(transWithPoints)
}

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


  render() {
    const { customerName } = this.state;

    return (
      <div className="customer">
        <h3>{customerName}</h3>
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
