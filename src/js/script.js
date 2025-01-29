function convertCurrency(e) {
  e.preventDefault();
  const { from, to, value } = form.elements;
  fetchCurrency(from.value)
    .then(res => {
      const conversionFactor = res[from.value][to.value];
      const valueToConvert = parseFloat(
        value.value.replace(/\./, "").replace(/,/, ".")
      );
      updateResult(
        from.value,
        to.value,
        valueToConvert,
        valueToConvert * conversionFactor
      );
    })
    .catch(err => console.log(err));
}

function updateResult(fromCode, toCode, fromAmount, toAmount) {
  fromImg.src = `src/assets/images/currency/${fromCode}.png`;
  fromCurrency.textContent = CURRENCIES[fromCode].name;
  fromValue.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: fromCode
  }).format(fromAmount);

  toImg.src = `src/assets/images/currency/${toCode}.png`;
  toCurrency.textContent = CURRENCIES[toCode].name;
  toValue.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: toCode
  }).format(toAmount);
}

function updateCurrencySymbol() {
  const { from } = form.elements;
  currencySymbol.textContent = CURRENCIES[from.value].symbol;
}

async function fetchCurrency(currencyCode) {
  const res = await fetch(`${API_URL}/${currencyCode}.json`);
  const json = await res.json();
  return json;
}

const CURRENCIES = {
  brl: {
    name: "Real Brasileiro",
    symbol: "R$"
  },
  btc: {
    name: "Bitcoin",
    symbol: "₿"
  },
  eur: {
    name: "Euro",
    symbol: "€"
  },
  gbp: {
    name: "Libra Esterlina",
    symbol: "£"
  },
  usd: {
    name: "Dólar Americano",
    symbol: "US$"
  }
};

const API_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const form = document.getElementById("form");
const currencySymbol = document.getElementById("currency-symbol");

const fromImg = document.getElementById("from-img");
const fromCurrency = document.getElementById("from-currency");
const fromValue = document.getElementById("from-value");

const toImg = document.getElementById("to-img");
const toCurrency = document.getElementById("to-currency");
const toValue = document.getElementById("to-value");

form.addEventListener("submit", convertCurrency);

form.elements.from.addEventListener("change", updateCurrencySymbol);
