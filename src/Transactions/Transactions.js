import React, { Component } from 'react';
import "./Transactions.css";
import localData from "../Utilities/data";

class Transactions extends Component {
    render() {
        const { transactions } = localData
        console.log(transactions)
        return (
            <div>
                Transactions
            </div>
        )
    }
}

export default Transactions;
