import React, { useEffect, useState, useContext } from "react";
import ExpensesLIst from "./ExpensesLIst";
import ExpensesForm from "./ExpensesForm";
import "../css/expense.css";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import DashboardCharts from "./DashboardCharts";
const Home = () => {
  const [expenses, setExpenses] = useState([]);

  const [updatedExpenseData, setUpdatedExpenseData] = useState(null);

  const { isTokenExpired } = useContext(AuthContext);

  const addExpense = async (formData) => {
    try {
      if (isTokenExpired()) {
        return;
      }

      const token = localStorage.getItem("token");

      const expense = await fetch("http://localhost:5000/api/expenses", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await expense.json();
      if (result.success) {
        toast.success(result.message);
        await fetchExpenses();
      }
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchExpenses = async () => {
    try {
      if (isTokenExpired()) {
        return;
      }
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setExpenses(result.expenses);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateExpense = async (updatedFormData) => {
    try {
      if (isTokenExpired()) {
        return;
      }

      setUpdatedExpenseData(updatedFormData);

      const { _id: expenseId } = updatedExpenseData;

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        await fetchExpenses();
        setUpdatedExpenseData(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      if (isTokenExpired()) {
        return;
      }
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          method: "Delete",
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        await fetchExpenses();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <section className="home-section">
      <div className="flex">
        <div className="left-container">
          <div className="top-container">
            <ExpensesForm
              addExpense={addExpense}
              fetchExpenses={fetchExpenses}
              updatedExpenseData={updatedExpenseData}
              handleUpdateExpense={handleUpdateExpense}
            />
          </div>

          <div className="botton-container">
            {expenses?.length === 0 ? null : (
              <DashboardCharts expenses={expenses} />
            )}
          </div>
        </div>
        <div className="right-container">
          {expenses?.length === 0 ? (
            <div className="no-expenses-message">
              <h3>No Expenses Found</h3>
            </div>
          ) : (
            expenses?.map((data) => (
              <ExpensesLIst
                value={data}
                handleDelete={handleDelete}
                key={data._id}
                setUpdatedExpenseData={setUpdatedExpenseData}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
