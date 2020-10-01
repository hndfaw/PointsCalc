import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Customers from "../Customers/Customers";
import Customer from "../Customer/Customer";
import Transactions from "../Transactions/Transactions";
import React, { Component } from "react";
import localData from "../Utilities/data";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              <header className="header">
                <div className="logo-container">
                  <h2 className="logo">
                    Points<span className="logo-span-calc">Calc</span>
                  </h2>
                  <p className="logo-second-part">REWARDING PROGRAM</p>
                </div>
                <nav className="app-buttons-container">
                  <ul className="app-nav-list">
                    <li>
                      <Link to="/customers">Customers</Link>
                    </li>
                    <li>
                      <Link to="/transactions">Transactions</Link>
                    </li>
                  </ul>
                </nav>
              </header>
              <section className="app-body">
                <article className="app-body_total-cont">
                  <p className="app-body_total-num">
                    {localData.customers.length}
                  </p>
                  <p className="app-body_total-label">TOTAL CUSTOMERS</p>
                </article>
                <article className="app-body_total-cont">
                  <p className="app-body_total-num">
                    {localData.transactions.length}
                  </p>
                  <p className="app-body_total-label">TOTAL TRANSACTIONS</p>
                </article>
              </section>
            </div>
          </Route>
          <Route exact path="/customers">
            <Customers />
          </Route>
          <Route exact path="/customer/:id"
          render={props => {
            const { id } = props.match.params;
              return <Customer id={id}/>
          }}
          />
          <Route exact path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
