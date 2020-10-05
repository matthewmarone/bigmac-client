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
