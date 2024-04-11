import { useState } from "react";
import "./form.css";
import "./output.css";
import Collapsible from "react-collapsible";

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
  const [desiredHouseValueInFuture, setDesiredHouseValueInFuture] = useState(0);
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
          <label>Cost of the house</label>
          <input
            type="number"
            required
            value={houseCost}
            onChange={(e) => {
              setHouseCost(e.target.value.replace(/\D/, ""));
            }}
            id="feedback-phone"
            defaultValue={0}
          />
          <label>Down payment</label>
          <input
            type="number"
            required
            value={downPayment}
            onChange={(e) => setDownpayment(e.target.value.replace(/\D/, ""))}
            id="feedback-phone"
            defaultValue={0}
          />
          <label>Mortgage percentage</label>
          <input
            type="number"
            required
            value={mortgagePercentage}
            onChange={(e) => setMortgagePercentage(e.target.value)}
            id="feedback-phone"
            defaultValue={0}
          />
          <label>Loan term</label>
          <input
            type="number"
            required
            value={mortgageYears}
            onChange={(e) => setMortgageYears(e.target.value.replace(/\D/, ""))}
            id="feedback-phone"
            defaultValue={0}
          />
          <Collapsible trigger="Taxes and fees" class="collapse">
            <label>HOA per month</label>
            <input
              type="number"
              required
              value={hoa}
              onChange={(e) => setHOA(e.target.value.replace(/\D/, ""))}
              id="feedback-phone"
              defaultValue={0}
            />
            <label>Tax percentage per year</label>
            <input
              type="number"
              required
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
              id="feedback-phone"
              defaultValue={0}
            />
            <label>House Insurance per month</label>
            <input
              type="number"
              required
              value={houseInsurancePerMonth}
              onChange={(e) =>
                setHouseInsurancePerMonth(e.target.value.replace(/\D/, ""))
              }
              id="feedback-phone"
              defaultValue={0}
            />
          </Collapsible>
          <Collapsible trigger="Investments" class="collapse">
            <label>Desired years to finish mortgage</label>
            <input
              type="number"
              required
              value={yearsToFinishMortgage}
              onChange={(e) =>
                setYearsToFinishMortgage(e.target.value.replace(/\D/, ""))
              }
              id="feedback-phone"
              defaultValue={0}
            />
            <label>Amount you invest every month</label>
            <input
              type="number"
              required
              value={investableAmountPerMonth}
              onChange={(e) =>
                setInvestableAmountPerMonth(e.target.value.replace(/\D/, ""))
              }
              id="feedback-phone"
              defaultValue={0}
            />
            <label>Investment interest percentage per annum</label>
            <input
              type="number"
              required
              value={investmentInterest}
              onChange={(e) =>
                setInvestmentInterest(e.target.value.replace(/\D/, ""))
              }
              id="feedback-phone"
              defaultValue={0}
            />
            <label>Rent per month</label>
            <input
              type="number"
              required
              value={currentRent}
              onChange={(e) => setCurrentRent(e.target.value.replace(/\D/, ""))}
              id="feedback-phone"
              defaultValue={0}
            />
          </Collapsible>
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
          <p>
            {extraAmountToPayEveryMonth != Infinity
              ? numberWithCommas(Math.ceil(extraAmountToPayEveryMonth))
              : "Not enough data"}
          </p>
        </div>
        <div className="value-cell">
          <h3>Total Extra Payment Per Month</h3>
          <p>
            {totalExtraAmountToPayEveryMonth != Infinity
              ? numberWithCommas(Math.ceil(totalExtraAmountToPayEveryMonth))
              : "Not enough data"}
          </p>
        </div>
        <div className="value-cell">
          <h3>Investment value without house</h3>
          <p>
            {investmentValueWithNoHouse != Infinity
              ? numberWithCommas(Math.ceil(investmentValueWithNoHouse))
              : "Not enough data"}
          </p>
        </div>
        <div className="value-cell">
          <h3>Investment value with house</h3>
          <p>
            {investmentValueWithHouse > 0
              ? numberWithCommas(Math.ceil(investmentValueWithHouse))
              : "cannot invest"}
          </p>
        </div>
        <div className="value-cell">
          <h3>Desired House value in future</h3>
          <p>
            {investmentValueWithHouse > 0
              ? numberWithCommas(Math.ceil(desiredHouseValueInFuture))
              : "cannot invest"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
