import Button from "react-bootstrap/Button";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React, { Component } from "react";

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
                  <Button size="sm">Customers</Button>
                  <Button size="sm" variant="danger">
                    Transactions
                  </Button>
                </nav>
              </header>
              <section className="app-body">
                <article className="app-body_total-cont">
                  <p className="app-body_total-num">5</p>
                  <p className="app-body_total-label">TOTAL CUSTOMERS</p>
                </article>
                <article className="app-body_total-cont">
                  <p className="app-body_total-num">35</p>
                  <p className="app-body_total-label">TOTAL TRANSACTIONS</p>
                </article>
              </section>
            </div>
          </Route>
          <Route exact path="/customers">
            {/* <Users /> */}
          </Route>
          <Route exact path="/transactions">
            {/* <Home /> */}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
