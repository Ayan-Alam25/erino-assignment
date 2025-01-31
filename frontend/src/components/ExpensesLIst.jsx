import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentIcon from "@mui/icons-material/Payment";
import CategoryIcon from "@mui/icons-material/Category";

const ExpensesLIst = (props) => {
  const { handleDelete, setUpdatedExpenseData } = props;

  const getCategoryColor = (category) => {
    switch (category) {
      case "Expense":
        return "#FF5733";
      case "Saving":
        return "#28A745";
      case "Investment":
        return "#007BFF";
      default:
        return "#F4F4F4";
    }
  };

  return (
    <div
      className="box"
      key={props.value._id}
      style={{ backgroundColor: getCategoryColor(props.value.category) }}
    >
      <div className="icons">
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => {
            setUpdatedExpenseData(props.value);
          }}
        ></i>
        <i
          className="fa-solid fa-trash"
          onClick={() => handleDelete(props.value._id)}
        ></i>
      </div>

      <div className="expense-details">
        <p>
          <DescriptionIcon className="icon" />
          <span>{props.value.description}</span>
        </p>
        <p>
          <PaymentIcon className="icon" />
          <span>{props.value.paymentType}</span>
        </p>
        <p>
          <CategoryIcon className="icon" />
          <span>{props.value.category}</span>
        </p>
        <p>
          <CurrencyRupeeIcon className="icon" />
          <span>{props.value.amount}</span>
        </p>
        <p>
          <DateRangeIcon className="icon" />
          <span>
            {new Date(props.value.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <p>
          <LocationOnIcon className="icon" />
          <span>{props.value.location}</span>
        </p>
      </div>
    </div>
  );
};

export default ExpensesLIst;
