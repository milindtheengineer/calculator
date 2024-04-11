import { useState } from "react";
import "./form.css";
import "./output.css";

const Home = () => {
  const [houseCost, setHouseCost] = useState("");
  const [downPayment, setDownpayment] = useState("");
  const [mortgagePercentage, setMortgagePercentage] = useState("");
  const [hoa, setHOA] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [houseInsurancePerMonth, setHouseInsurancePerMonth] = useState("");
  const [mortgageYears, setMortgageYears] = useState("");
  const [investableAmountPerMonth, setInvestableAmountPerMonth] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [investmentInterest, setInvestmentInterest] = useState("");
  ////
  const [mortgagePerMonth, setMortgagePerMonth] = useState("");
  const [totalCostPerMonth, setTotalCostPerMonth] = useState("");
  const [yearsToFinishMortgage, setYearsToFinishMortgage] = useState("");
  const [extraAmountToPayEveryMonth, setExtraAmountToPayEveryMonth] =
    useState("");
  const [totalExtraAmountToPayEveryMonth, setTotalExtraAmountToPayEveryMonth] =
    useState("");
  const [investmentValueWithNoHouse, setInvestmentValueWithNoHouse] =
    useState("");
  const [investmentValueWithHouse, setInvestmentValueWithHouse] = useState("");
  const [desiredHouseValueInFuture, setDesiredHouseValueInFuture] =
    useState("");
  const calculateCompoundInterest = (
    principal,
    annualInterestRate,
    monthlyPayment,
    years
  ) => {
    let months = years * 12;
    let futureValue = principal;
    let annualInterestRateInDecimal = annualInterestRate / 100;
    for (let i = 0; i <= months; i++) {
      futureValue += monthlyPayment;
      futureValue += futureValue * (annualInterestRateInDecimal / 12);
    }
    return futureValue.toFixed(2);
  };

  const calculateMortgagePerMonth = (
    mortgagePercentage,
    mortgageYears,
    loanAmount
  ) => {
    let monthlyInterestRate = mortgagePercentage / (12 * 100);
    let numberOfPayments = mortgageYears * 12;

    let numerator =
      loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments));
    let denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return numerator / denominator;
  };

  const calculateExtraMonthlyPayment = (
    yearsToFinishMortgage,
    loanAmount,
    mortgagePercentage
  ) => {
    let monthlyInterestRate = mortgagePercentage / (12 * 100);
    let newTotalPayments = parseInt(yearsToFinishMortgage) * 12;
    let newMonthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -newTotalPayments));
    return newMonthlyPayment;
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mortgage = calculateMortgagePerMonth(
      parseFloat(mortgagePercentage),
      parseInt(mortgageYears),
      parseInt(houseCost) - parseInt(downPayment)
    );
    setMortgagePerMonth(mortgage);
    const taxPerMonth = (houseCost * taxPercentage) / 1200;
    setTotalCostPerMonth(
      mortgage + taxPerMonth + parseInt(hoa) + parseInt(houseInsurancePerMonth)
    );
    const newMonthlyPayment = calculateExtraMonthlyPayment(
      parseInt(yearsToFinishMortgage),
      parseInt(houseCost) - parseInt(downPayment),
      parseFloat(mortgagePercentage)
    );
    // Calculate extra amount to pay each month
    setExtraAmountToPayEveryMonth(newMonthlyPayment - mortgage);
    const totalExtrapaymentToPayEveryMonth =
      taxPerMonth +
      parseInt(hoa) +
      parseInt(houseInsurancePerMonth) +
      newMonthlyPayment;
    setTotalExtraAmountToPayEveryMonth(totalExtrapaymentToPayEveryMonth);
    const valueWithNoHouse = calculateCompoundInterest(
      parseInt(downPayment),
      parseFloat(investmentInterest),
      parseInt(investableAmountPerMonth),
      parseInt(yearsToFinishMortgage)
    );
    setInvestmentValueWithNoHouse(valueWithNoHouse);
    const valueWithHouse = calculateCompoundInterest(
      0,
      parseFloat(investmentInterest),
      parseInt(investableAmountPerMonth) +
        parseInt(currentRent) -
        totalExtrapaymentToPayEveryMonth,
      parseInt(yearsToFinishMortgage)
    );
    setInvestmentValueWithHouse(valueWithHouse);
    setDesiredHouseValueInFuture(valueWithNoHouse - valueWithHouse);
  };

  return (
    <div className="home">
      <div className="home-form">
        <form onSubmit={handleSubmit}>
          <label>House cost</label>
          <input
            type="number"
            required
            value={houseCost}
            onChange={(e) => setHouseCost(e.target.value)}
            id="feedback-phone"
          />
          <label>Down payment</label>
          <input
            type="number"
            required
            value={downPayment}
            onChange={(e) => setDownpayment(e.target.value)}
            id="feedback-phone"
          />
          <label>Mortgage percentage</label>
          <input
            type="number"
            required
            value={mortgagePercentage}
            onChange={(e) => setMortgagePercentage(e.target.value)}
            id="feedback-phone"
          />
          <label>Loan term</label>
          <input
            type="number"
            required
            value={mortgageYears}
            onChange={(e) => setMortgageYears(e.target.value)}
            id="feedback-phone"
          />
          <label>HOA per month</label>
          <input
            type="number"
            required
            value={hoa}
            onChange={(e) => setHOA(e.target.value)}
            id="feedback-phone"
          />
          <label>Tax percentage per year</label>
          <input
            type="number"
            required
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
            id="feedback-phone"
          />
          <label>House Insurance per month</label>
          <input
            type="number"
            required
            value={houseInsurancePerMonth}
            onChange={(e) => setHouseInsurancePerMonth(e.target.value)}
            id="feedback-phone"
          />
          <label>Desired years to finish mortgage</label>
          <input
            type="number"
            required
            value={yearsToFinishMortgage}
            onChange={(e) => setYearsToFinishMortgage(e.target.value)}
            id="feedback-phone"
          />
          <label>Investable amount per month</label>
          <input
            type="number"
            required
            value={investableAmountPerMonth}
            onChange={(e) => setInvestableAmountPerMonth(e.target.value)}
            id="feedback-phone"
          />
          <label>Investment interest percentage per annum</label>
          <input
            type="number"
            required
            value={investmentInterest}
            onChange={(e) => setInvestmentInterest(e.target.value)}
            id="feedback-phone"
          />
          <label>Rent per month</label>
          <input
            type="number"
            required
            value={currentRent}
            onChange={(e) => setCurrentRent(e.target.value)}
            id="feedback-phone"
          />
          <button>Calculate</button>
        </form>
      </div>
      <div className="output">
        <div className="value-cell">
          <h3>Mortgage per month</h3>
          <p>{numberWithCommas(Math.ceil(mortgagePerMonth))}</p>
        </div>
        <div className="value-cell">
          <h3>Total Payment Per Month</h3>
          <p>{numberWithCommas(Math.ceil(totalCostPerMonth))}</p>
        </div>
        <div className="value-cell">
          <h3>Extra Payment Per Month</h3>
          <p>{numberWithCommas(Math.ceil(extraAmountToPayEveryMonth))}</p>
        </div>
        <div className="value-cell">
          <h3>Total Extra Payment Per Month</h3>
          <p>{numberWithCommas(Math.ceil(totalExtraAmountToPayEveryMonth))}</p>
        </div>
        <div className="value-cell">
          <h3>Investment value without house</h3>
          <p>{numberWithCommas(Math.ceil(investmentValueWithNoHouse))}</p>
        </div>
        <div className="value-cell">
          <h3>Investment value with house</h3>
          <p>{numberWithCommas(Math.ceil(investmentValueWithHouse))}</p>
        </div>
        <div className="value-cell">
          <h3>Desired House value in future</h3>
          <p>{numberWithCommas(Math.ceil(desiredHouseValueInFuture))}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
