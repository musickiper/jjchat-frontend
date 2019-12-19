import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

describe("<Login/>", () => {
  it("matches snapshot", () => {
    const utils = render(<Login />);
    expect(utils.container).toMatchSnapshot();
  });
});
