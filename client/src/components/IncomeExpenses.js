import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {numberWithCommas} from "../utils/format"


export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, inc) => (acc += inc), 0)
    .toFixed(2);
  console.log(income);

  const expence = (
    amounts.filter(amount => amount < 0).reduce((acc, exp) => (acc += exp), 0) *
    -1
  ).toFixed(2);
  console.log(expence);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">$ {numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">$ {numberWithCommas(expence)}</p>
      </div>
    </div>
  );
};
