import React from "react";
import "./index.css";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiArrowDown } from "react-icons/hi2";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(0);
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(false);

  const currencyList = ["USD", "EUR", "GBP", "CAD", "JPY", "MXN", "COP"];

  const handleFromCurrencyChange = (event) => {
    console.log("From currency changed to:", event.target.value);

    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    console.log("To currency changed to:", event.target.value);

    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFlip = () => {
    const currentFromCurrency = fromCurrency;
    const currentToCurrency = toCurrency;

    setFromCurrency(currentToCurrency);
    setToCurrency(currentFromCurrency);

    console.log("Flip");
  };

  const handleClear = () => {
    setAmount("");
    setResult(0);
  };

  return (
    <div className="wrapper flex flex-col items-center px-4 py-8">
      <div className="wrapper flex flex-col items-center px-4 py-8">
        <Header />

        <CurrencySelector
          currencyList={currencyList}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          handleFromCurrencyChange={handleFromCurrencyChange}
          handleToCurrencyChange={handleToCurrencyChange}
          handleFlip={handleFlip}
        />
        <Input
          handleAmountChange={handleAmountChange}
          amount={amount}
          handleClear={handleClear}
        />
        <ConvertButton/>


        <Footer />
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="text-4xl font-semibold text-gray-800 text-center my-10 mb-12">
      Currency Converter
    </div>
  );
};

const Input = ({ handleAmountChange, amount, handleClear }) => {
  return (
    <div className="flex justify-center mb-4 mt-4 rounded-full">
      <div className="flex items-center rounded-full">
        <input
          type="text"
          placeholder="Enter Amount"
          className="border border-gray-300  px-2 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-12 text-center "
          onChange={handleAmountChange}
          value={amount}
        />
        <button className=" px-4 py-2 hover:font-bold" onClick={handleClear}>
          <MdOutlineDeleteOutline className=" hover:text-gray-800" />
        </button>
      </div>
    </div>
  );
};

const CurrencySelector = ({
  currencyList,
  fromCurrency,
  toCurrency,
  handleFromCurrencyChange,
  handleToCurrencyChange,
  handleFlip,
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <FromCurrency
        currencyList={currencyList}
        onChange={handleFromCurrencyChange}
        className="mr-2"
        value={fromCurrency}
      />
      <button className = " mb-4" onClick = {handleFlip} >
      <Flipper  />

      </button>
      
      <ToCurrency
        currencyList={currencyList}
        onChange={handleToCurrencyChange}
        className="ml-2"
        value={toCurrency}
        default = {currencyList[1]}
      />
    </div>
  );
};

const FromCurrency = ({ currencyList, onChange, className, value }) => {
  return (
    <select
      onChange={onChange}
      className={`border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 ${className}`}
      value = {value}
    >
      {currencyList.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

const ToCurrency = ({ currencyList, onChange, className, value }) => {
  return (
    <select
      onChange={onChange}
      className={`border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 ${className}`}
      value={value}
    >
      {currencyList.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

const Flipper = () => {
  return (
    <div>
      <HiOutlineSwitchHorizontal className="text-2xl text-blue-500 cursor-pointer mx-4" />
    </div>
  );
};

const ExchangeLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mx-2 mb-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};

const ConvertButton = ({fromCurrency, toCurrency, amount, result}) => {
  return (
    <button
      className="bg-blue-500 text-white w-64 px-2 py-2 mt-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Convert
    </button>
  );
};

const Result = ({fromCurrency, toCurrency, amount, result, setResult }) => {
  return (
    <div >
      
      
    </div>
  );
};



const Footer = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white text-center text-sm p-4">
      Created by Christian Limbrick
    </div>
  )
}

export default App;
