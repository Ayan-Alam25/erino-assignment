import React, { useEffect, useState } from "react";
import "../css/expense.css";

const ExpenseForm = (props) => {
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    date: "",
    location: "",
  });

  const { addExpense, fetchExpenses, handleUpdateExpense } = props;

  const paymentTypes = ["Cash", "Credit Card", "Debit Card", "UPI", "other"];
  const categories = ["Expense", "Saving", "Investment"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props.updatedExpenseData) {
      await handleUpdateExpense(formData);
      setFormData({
        description: "",
        paymentType: "",
        category: "",
        amount: "",
        date: "",
        location: "",
      });
    } else {
      const result = await addExpense(formData);

      if (result.success) {
        await fetchExpenses();
        setFormData({
          description: "",
          paymentType: "",
          category: "",
          amount: "",
          date: "",
          location: "",
        });
      }
    }
  };

  useEffect(() => {
    if (props.updatedExpenseData) {
      setFormData({
        description: props.updatedExpenseData.description,
        paymentType: props.updatedExpenseData.paymentType,
        category: props.updatedExpenseData.category,
        amount: props.updatedExpenseData.amount,
        date: new Date(props.updatedExpenseData.date)
          .toISOString()
          .split("T")[0],
        location: props.updatedExpenseData.location,
      });
    }
  }, [props.updatedExpenseData]);

  return (
    <form onSubmit={handleSubmit} className="expense-form-container">
      <h2 className="form-title">
        {props.updatedExpenseData ? "Edit Expense" : "Add Expense"}
      </h2>
      <div className="form-grid">
        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter description"
          />
        </div>

        {/* Payment Type */}
        <div className="form-group">
          <label htmlFor="paymentType">Payment Type</label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Type</option>
            {paymentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Enter amount"
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
