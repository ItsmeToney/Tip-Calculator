const bill = document.querySelector(".bill__input");
const customTip = document.querySelector(".input__tip");
const numberOfPeople = document.querySelector(".total__people__input");
const tipAmountPerPerson = document.querySelector(".tip__amount");
const totalAmountPerPerson = document.querySelector(".total__amount");
const tipPercentage = document.querySelector(".tip__selection");
const resetBtn = document.querySelector(".reset__btn");

let tip;

tipPercentage.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn")) return;
  tip = +e.target.textContent.replace("%", "") / 100;
  customTip.value = "";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (customTip.value) {
      tip = +customTip.value / 100;
    }
    const billAmount = +bill.value;
    const members = +numberOfPeople.value;
    const tipPerPerson = +(tip * billAmount) / members;

    const totalPerPerson = billAmount / members + tipPerPerson;
    if (members < 1 || billAmount < 1) {
      if (members < 1) {
        numberOfPeople.style.border = "2px solid red";
        document.querySelector(".error__msg__label").classList.remove("hidden");
      }
      return;
    }
    tipAmountPerPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountPerPerson.textContent = `$${totalPerPerson.toFixed(2)}`;

    numberOfPeople.blur();
  }
});

const reset = function () {
  numberOfPeople.style.border = "";
  document.querySelector(".error__msg__label").classList.add("hidden");
};
numberOfPeople.addEventListener("focus", reset);

resetBtn.addEventListener("click", function () {
  reset();
  bill.value = "";
  numberOfPeople.value = "";
  customTip.value = "";
  tipAmountPerPerson.textContent = "$0.00";
  totalAmountPerPerson.textContent = "$0.00";
});
