import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {numberWithCommas} from "../utils/format"


export const Transaction = ({ transaction }) => {
  const sign = transaction.amount > 0 ? "+" : "-";
  const borderClass = transaction.amount > 0 ? "plus" : "minus";

  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <>
      <li className={borderClass}>
        {transaction.text}{" "}
        <span>
          {sign}${numberWithCommas(Math.abs(transaction.amount))}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteTransaction(transaction._id)}
        >
          x
        </button>
      </li>
    </>
  );
};
