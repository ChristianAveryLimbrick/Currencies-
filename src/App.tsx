import React from "react";
import "./index.css";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiArrowDown } from "react-icons/hi2";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";

type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "JPY"
  | "MXN"
  | "COP"
  | "BRL";

type CurrencyData = {
  code: string;
  symbol: string;
  name: string;
  flag: string;
};

function App() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [flip, setFlip] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const currencyList: CurrencyCode[] = [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "JPY",
    "MXN",
    "COP",
    "BRL",
  ];

  const currencySymbols: Record<CurrencyCode, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    JPY: "¥",
    MXN: "Mex$",
    COP: "Col$",
    BRL: "R$",
  };

  const currencyNames: Record<CurrencyCode, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    CAD: "Canadian Dollar",
    JPY: "Japanese Yen",
    MXN: "Mexican Peso",
    COP: "Colombian Peso",
    BRL: "Brazilian Real",
  };

  const countryFlagEmojis: Record<CurrencyCode, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    CAD: "🇨🇦",
    JPY: "🇯🇵",
    MXN: "🇲🇽",
    COP: "🇨🇴",
    BRL: "🇧🇷",
  };

  const combinedCurrencyData: CurrencyData[] = currencyList.map(
    (currencyCode) => {
      return {
        code: currencyCode,
        symbol: currencySymbols[currencyCode],
        name: currencyNames[currencyCode],
        flag: countryFlagEmojis[currencyCode],
      };
    }
  );

  console.log(combinedCurrencyData);

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("From currency changed to:", event.target.value);

    setFromCurrency(event.target.value as CurrencyCode);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("To currency changed to:", event.target.value);

    setToCurrency(event.target.value as CurrencyCode);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the input value and remove all non-numeric characters except for the decimal point
    let input = event.target.value.replace(/[^0-9.]/g, "");

    // Avoid multiple decimal points
    const decimalPoints = input.match(/\./g) || [];
    if (decimalPoints.length > 1) {
      input = input.slice(0, input.lastIndexOf("."));
    }

    // Split the input into whole and decimal parts
    const parts = input.split(".");
    const wholePart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";

    // Add commas to the whole part of the number
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the whole part with the decimal part
    setAmount(formattedWholePart + decimalPart);
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
          combinedCurrencyData={combinedCurrencyData}
        />
        <Input
          handleAmountChange={handleAmountChange}
          amount={amount}
          handleClear={handleClear}
        />
        <ConvertButton />

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

type InputProps = {
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  amount: string;
  handleClear: () => void;
};

const Input = ({ handleAmountChange, amount, handleClear }: InputProps) => {
  return (
    <div className="flex justify-center mb-4 mt-4 rounded-full">
      <div className="flex items-center rounded-full">
        <input
          type="text"
          placeholder="Enter Amount"
          className="border border-gray-300  px-2 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-12 text-center "
          onChange={handleAmountChange}
          value={amount}
        ></input>
        <button className=" px-4 py-2 hover:font-bold" onClick={handleClear}>
          <MdOutlineDeleteOutline className=" hover:text-gray-800" />
        </button>
      </div>
    </div>
  );
};

type CurrencySelectorProps = {
  currencyList: CurrencyCode[];
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  handleFromCurrencyChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleToCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFlip: () => void;
  combinedCurrencyData: CurrencyData[];
};

const CurrencySelector = ({
  currencyList,
  fromCurrency,
  toCurrency,
  handleFromCurrencyChange,
  handleToCurrencyChange,
  handleFlip,
  combinedCurrencyData,
}: CurrencySelectorProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <FromCurrency
        currencyList={currencyList}
        onChange={handleFromCurrencyChange}
        className="mr-2"
        value={fromCurrency}
        combinedCurrencyData={combinedCurrencyData}
      />
      <button className=" mb-4" onClick={handleFlip}>
        <Flipper />
      </button>

      <ToCurrency
        currencyList={currencyList}
        onChange={handleToCurrencyChange}
        className="ml-2"
        value={toCurrency}
        combinedCurrencyData={combinedCurrencyData}        
      />
    </div>
  );
};

type FromCurrencyProps = {
  currencyList: CurrencyCode[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  value: CurrencyCode;
  combinedCurrencyData: CurrencyData[];
};

const FromCurrency = ({
  currencyList,
  onChange,
  className,
  value,
  combinedCurrencyData,
}: FromCurrencyProps) => {
  return (
    <select
      onChange={onChange}
      className={`border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 ${className}`}
      value={value}
    >
      {combinedCurrencyData.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code} {currency.flag}
        </option>
      ))}
    </select>
  );
};

const ToCurrency = ({
  currencyList,
  onChange,
  className,
  value,
  combinedCurrencyData,
}) => {
  return (
    <select
      onChange={onChange}
      className={`border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 ${className}`}
      value={value}
    >
      {combinedCurrencyData.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code} {currency.flag}
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

const ConvertButton = () => {
  return (
    <button className="bg-blue-500 text-white w-64 px-2 py-2 mt-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
      Convert
    </button>
  );
};

const Result = () => {
  return <div></div>;
};

const Footer = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white text-center text-sm p-4">
      Created by Christian Limbrick
    </div>
  );
};

export default App;