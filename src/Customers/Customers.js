import React, { Component } from 'react';
import "./Customers.css";
import Table from "react-bootstrap/Table";
import localData from "../Utilities/data";
import { Link } from "react-router-dom";

class Customers extends Component {
    

      returnTransactions = () => {
        const { customers } = localData;
        return customers.map((transaction, i) => {
          const { id, name} = transaction;
          return (
            <tr key={id}>
              <td>{i + 1}</td>
              <td><Link to={`/customer/${id}`}>{name}</Link></td>
            </tr>
          );
        });
      };

    render() {
        const { customers } = localData;
    
        return (

          <div className="customers">
            <header className="customers-header">
              <div className="customers-header_block">
                <Link className="app-link-back-to-home-link" to="/">
                  <span>&#8592;</span> Back to Home
                </Link>
                <h3>Customers</h3>
              </div>
              <div className="customers-header_block">
                <div className="customers-header_block_widget">
                  <p className="customers-header_block_number">{customers.length}</p>
                  <p className="customers-header_block_widget-label">Total Customers</p>
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
              <tbody>{this.returnTransactions()}</tbody>
            </Table>
          </div>
   
        );
      }
}

export default Customers;
