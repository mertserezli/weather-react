import { render, cleanup } from '@testing-library/react';
import Results from './results';
import React from "react";

afterEach(cleanup);

test('renders search bar', () => {
    const { getByText } = render(<Results name={"Istanbul"} countryCode={"TR"} temp={"25"} weather={"Sunny"}/>);
    expect(getByText("Istanbul, TR")).toBeInTheDocument();
    expect(getByText("Sunny")).toBeInTheDocument();
    expect(getByText("25°c")).toBeInTheDocument()
});