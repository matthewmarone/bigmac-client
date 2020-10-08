import {
  getHowManyCanYouBuy,
  getHowManyYouCouldBuyInForiegnCountry,
  getRealitiveWorthAbroad,
  chooseRandomValueFromArray,
} from "../helpers";
/**
 *
 */
it("getHowManyCanYouBuy with price at 5.50 and fundsAvailable at 55", () => {
  expect(getHowManyCanYouBuy(33, 67)).toEqual(2);
});
/**
 *
 */
it("getHowManyYouCouldBuyInForiegnCountry", () => {
  expect(
    getHowManyYouCouldBuyInForiegnCountry(132, 33, 2.389702554, 3.743655)
  ).toEqual(2);
});
/**
 *
 */
it("getRealitiveWorthAbroad", () => {
  expect(getRealitiveWorthAbroad(132, 2.389702554, 3.743655)).toEqual(
    84.26009798659332
  );
});
/**
 *
 */
it("chooseRandomValueFromArray", () => {
  const arr = ["this", "that"];
  const random = chooseRandomValueFromArray(arr);
  const test = random === "this" || random === "that";
  expect(test).toBeTruthy();
});
