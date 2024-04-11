import { useState } from "react";

const Home = () => {
  const [houseCost, setHouseCost] = useState(0);
  const [downPayment, setDownpayment] = useState(0);
  const [mortgagePercentage, setMortgagePercentage] = useState(0);
  const [hoa, setHOA] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [houseInsurancePerMonth, setHouseInsurancePerMonth] = useState(0);
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
  function calculateCompoundInterest(
    principal,
    annualInterestRate,
    monthlyPayment,
    years
  ) {
    let months = years * 12;
    let futureValue = principal;
    let annualInterestRateInDecimal = annualInterestRate / 100;
    for (let i = 0; i <= months; i++) {
      futureValue += monthlyPayment;
      futureValue += futureValue * (annualInterestRateInDecimal / 12);
    }
    return futureValue.toFixed(2);
  }

  // Example usage:
  let principal = 10000; // initial amount
  let annualInterestRate = 5; // annual interest rate in percentage
  let monthlyPayment = 200; // monthly payment
  let years = 5; // number of years

  let futureValue = calculateCompoundInterest(
    principal,
    annualInterestRate,
    monthlyPayment,
    years
  );
  console.log("Future value: $" + futureValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentsPerYear = 12;
    const monthlyInterestRate = mortgagePercentage / (paymentsPerYear * 100);
    const numberOfPayments = 30 * paymentsPerYear;

    const numerator =
      (houseCost - downPayment) *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments));
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const mortgage = numerator / denominator;
    setMortgagePerMonth(mortgage);
    const taxPerMonth = (houseCost * taxPercentage) / 1200;
    console.log(
      "tax",
      mortgage,
      houseCost,
      taxPercentage,
      hoa,
      houseInsurancePerMonth,
      taxPerMonth
    );
    setTotalCostPerMonth(
      mortgage + taxPerMonth + parseInt(hoa) + parseInt(houseInsurancePerMonth)
    );
    const newTotalPayments = parseInt(yearsToFinishMortgage) * 12;
    const newMonthlyPayment =
      ((houseCost - downPayment) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -newTotalPayments));

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
        />
        <label>Down payment</label>
        <input
          type="number"
          required
          value={downPayment}
          onChange={(e) => setDownpayment(e.target.value)}
        />
        <label>Mortgage percentage</label>
        <input
          type="number"
          required
          value={mortgagePercentage}
          onChange={(e) => setMortgagePercentage(e.target.value)}
        />
        <label>HOA</label>
        <input
          type="number"
          required
          value={hoa}
          onChange={(e) => setHOA(e.target.value)}
        />
        <label>Tax percentage</label>
        <input
          type="number"
          required
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(e.target.value)}
        />
        <label>House Insurance</label>
        <input
          type="number"
          required
          value={houseInsurancePerMonth}
          onChange={(e) => setHouseInsurancePerMonth(e.target.value)}
        />
        <label>Years to finish mortgage</label>
        <input
          type="number"
          required
          value={yearsToFinishMortgage}
          onChange={(e) => setYearsToFinishMortgage(e.target.value)}
        />
        <label>Investable amount per month</label>
        <input
          type="number"
          required
          value={investableAmountPerMonth}
          onChange={(e) => setInvestableAmountPerMonth(e.target.value)}
        />
        <label>Investment interest percentage</label>
        <input
          type="number"
          required
          value={investmentInterest}
          onChange={(e) => setInvestmentInterest(e.target.value)}
        />
        <label>Rent per month</label>
        <input
          type="number"
          required
          value={currentRent}
          onChange={(e) => setCurrentRent(e.target.value)}
        />
        <button>Calculate</button>
      </form>
      <label>Mortgage per month</label>
      <input
        type="number"
        required
        value={mortgagePerMonth}
        onChange={(e) => setMortgagePerMonth(e.target.value)}
      />
      <label>Total Payment Per Month</label>
      <input
        type="number"
        required
        value={totalCostPerMonth}
        onChange={(e) => setTotalCostPerMonth(e.target.value)}
      />
      <label>Extra Payment Per Month</label>
      <input
        type="number"
        required
        value={extraAmountToPayEveryMonth}
        onChange={(e) => setExtraAmountToPayEveryMonth(e.target.value)}
      />
      <label>Total Extra Payment Per Month</label>
      <input
        type="number"
        required
        value={totalExtraAmountToPayEveryMonth}
        onChange={(e) => setTotalExtraAmountToPayEveryMonth(e.target.value)}
      />
      <label>Investment value without house</label>
      <input
        type="number"
        required
        value={investmentValueWithNoHouse}
        onChange={(e) => setInvestmentValueWithNoHouse(e.target.value)}
      />
      <label>Investment value with house</label>
      <input
        type="number"
        required
        value={investmentValueWithHouse}
        onChange={(e) => setInvestmentValueWithHouse(e.target.value)}
      />
    </div>
  );
};

export default Home;
