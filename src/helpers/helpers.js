import { listSupportedCountries as listSupportedCountriesGQL } from "graphQL/query";

/**
 *
 * @param {*} localAvilableFunds
 * @param {*} localPriceOfGood
 * @param {*} localDollarPrice
 * @param {*} foriegnDollarPrice
 */
export const getMaxNumOfGoodsInForiegnCountry = (
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
 *
 * @param {*} localFunds
 * @param {*} localDollarPrice
 * @param {*} foreignDollarPrice
 */
export const convertFunds = (
  localFunds,
  localDollarPrice,
  foreignDollarPrice
) =>
  parseFloat((localFunds + localDollarPrice / foreignDollarPrice).toFixed(2));

/**
 *
 * @param {*} arr
 */
export const chooseRandomValueFromArray = (arr) => {
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
