import { listSupportedCountries as listSupportedCountriesGQL } from "graphQL/query";

/**
 * Calculates the maximum number of a commodity that could be purchased
 * given the price of the item and funds availble for spending.
 * @param {*} price - price of a commodity item
 * @param {*} fundAvailable - amount of money availble in the same currency as price
 *
 * @returns maximum whole number
 */
export const getHowManyCanYouBuy = (price, fundAvailable) =>
  Math.floor(fundAvailable / price);

/**
 * Caclulates the maximum number of a commodity that could be bought in a
 * foreign country.
 * @param {*} localAvilableFunds - cash for purchase in local currency
 * @param {*} localPriceOfGood - price of item in local currency
 * @param {*} localDollarPrice - local price of item in U.S. dollars
 * @param {*} foriegnDollarPrice - foriegn price of item in U.S. dollars
 *
 * @returns maxium whole number
 */
export const getHowManyYouCouldBuyInForiegnCountry = (
  localAvilableFunds,
  localPriceOfGood,
  localDollarPrice,
  foreignDollarPrice
) =>
  Math.floor(
    (localAvilableFunds / localPriceOfGood) *
      (localDollarPrice / foreignDollarPrice)
  );

/**
 * Provides an approximation of "how far" an amount of money in one currency would
 * take you in a differnt country by comparing the local U.S. dollar price of a
 * commodity (Ex: a Big Mac) between the two countries.
 *
 * @param {*} localFunds - cash for purchsae of an item in local currency
 * @param {*} localDollarPrice - the dollar price of an item locally
 * @param {*} foreignDollarPrice - the dollar price of an item in another country
 *
 * @returns amount as a floating point number in the same currency as localFunds.
 */
export const getRealitiveWorthAbroad = (
  localFunds,
  localDollarPrice,
  foreignDollarPrice
) => localFunds * (localDollarPrice / foreignDollarPrice);

/**
 * Returns a random value from arr
 * @param {*} arr - an array of values
 */
export const chooseRandomValueFromArray = (arr = []) => {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

/**
 * Pulls out of the base query (listLatestBigMacIndex) all countries
 * and writes it to the cache the same way a listSupportedCountries
 * request would be written.
 * @param {*} data - data returned from listSupportedCountriesGQL
 * @param {*} client - the Apollo GraphQL cache/client
 */
export const writeSupportedCountriesToCatch = (data, client) => {
  const { listLatestBigMacIndex } = data || { listLatestBigMacIndex: [] };
  const countries = listLatestBigMacIndex.map(({ country }) => country);
  const __typename = "CountryList";
  client.writeQuery({
    query: listSupportedCountriesGQL,
    data: {
      listSupportedCountries: { id: "LATEST", countries, __typename },
    },
  });
};

/**
 * This function would be improved to format an amount as a currency in
 * any given country.  Currently, it always returns in U.S. format.
 * @param {*} amount - amount of money in country's currency
 * @param {*} country - the country to format amount to
 */
export const formatCurrency = (amount, country = "United State") => {
  if (isNaN(amount)) throw new Error("Amount must be a number");
  const symbol = "$";
  const number = amount.toFixed(2);
  const formatted = `${symbol}${number}`;
  return { symbol, number, formatted, country };
};
