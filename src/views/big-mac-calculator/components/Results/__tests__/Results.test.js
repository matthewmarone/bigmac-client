import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Results from "./../Results";
import { act } from "react-dom/test-utils";

test("Show Big Mac Calculator Resutls Component", async () => {
  // This is just made up data
  const props = {
    localCountry: "Argentina",
    localPrice: 33,
    dollarPrice: 2.389702554,
    dollarPPP: 6.693711968,
    randomCountry: "Australia",
    dollarPriceRandom: 3.743655,
  };

  await act(async () => {
    const { baseElement, getByTestId } = render(<Results {...props} />);
    const userInput = getByTestId("component-MoneyInput").querySelector(
      "input"
    );
    //Sim having the user input 23
    fireEvent.change(userInput, { target: { value: "132.50" } });
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(baseElement).toMatchSnapshot();
  });
});
