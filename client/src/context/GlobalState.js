import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from 'axios';

//initial state
const initialState = {
  transactions: [],
  error:null,
  loading:true,
};

//create context
export const GlobalContext = createContext(initialState);

//create provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  async function getTransactions(){
    try{
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type:"GET_TRANSACTION",
        payload:res.data.data
      })
    }catch(error){
      dispatch({
        type:"TRANSACTION_ERROR",
        payload:error.response.data.error
      })
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`)
    } catch (error) {
      dispatch({
        type:"TRANSACTION_ERROR",
        payload:error.response.data.error
      })
    }
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  async function addTransaction(transaction) {
    try {
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }
     const res =  await axios.post(`/api/v1/transactions`,transaction,config)

      dispatch({
        type:"ADD_TRANSACTION",
        payload:res.data.data
      })

    } catch (error) {
        dispatch({
        type:"TRANSACTION_ERROR",
        payload:error.response.data.error
      })
    }
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error:state.error,
        loading:state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
