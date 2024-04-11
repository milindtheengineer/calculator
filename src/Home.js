import { useState } from "react";
import "./form.css";

const Home = () => {
  const [houseCost, setHouseCost] = useState(0);
  const [downPayment, setDownpayment] = useState(0);
  const [mortgagePercentage, setMortgagePercentage] = useState(0);
  const [hoa, setHOA] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [houseInsurancePerMonth, setHouseInsurancePerMonth] = useState(0);
  const [mortgageYears, setMortgageYears] = useState(0);
  const [investableAmountPerMonth, setInvestableAmountPerMonth] = useState(0);
  const [currentRent, setCurrentRent] = useState(0);
  const [investmentInterest, setInvestmentInterest] = useState(0);
  ////
  const [mortgagePerMonth, setMortgagePerMonth] = useState(0);
  const [totalCostPerMonth, setTotalCostPerMonth] = useState(0);
  const [yearsToFinishMortgage, setYearsToFinishMortgage] = useState(0);
  const [extraAmountToPayEveryMonth, setExtraAmountToPayEveryMonth] =
    useState(0);
  const [totalExtraAmountToPayEveryMonth, setTotalExtraAmountToPayEveryMonth] =
    useState(0);
  const [investmentValueWithNoHouse, setInvestmentValueWithNoHouse] =
    useState(0);
  const [investmentValueWithHouse, setInvestmentValueWithHouse] = useState(0);

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
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <label>Home cost</label>
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
        <label>Mortgage years</label>
        <input
          type="number"
          required
          value={mortgageYears}
          onChange={(e) => setMortgageYears(e.target.value)}
          id="feedback-phone"
        />
        <label>HOA</label>
        <input
          type="number"
          required
          value={hoa}
          onChange={(e) => setHOA(e.target.value)}
          id="feedback-phone"
        />
        <label>Tax percentage</label>
        <input
          type="number"
          required
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(e.target.value)}
          id="feedback-phone"
        />
        <label>House Insurance</label>
        <input
          type="number"
          required
          value={houseInsurancePerMonth}
          onChange={(e) => setHouseInsurancePerMonth(e.target.value)}
          id="feedback-phone"
        />
        <label>Years to finish mortgage</label>
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
        <label>Investment interest percentage</label>
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
      <div className="output">
        <p>Mortgage per month</p>
        <p>{mortgagePerMonth}</p>
        <p>Total Payment Per Month</p>
        <p>{totalCostPerMonth}</p>
        <p>Extra Payment Per Month</p>
        <p>{extraAmountToPayEveryMonth}</p>
        <p>Total Extra Payment Per Month</p>
        <p>{totalExtraAmountToPayEveryMonth}</p>
        <p>Investment value without house</p>
        <p>{investmentValueWithNoHouse}</p>
        <p>Investment value with house</p>
        <p>{investmentValueWithHouse}</p>
      </div>
    </div>
  );
};

export default Home;
