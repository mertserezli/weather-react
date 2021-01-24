import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import App from './App';
import React from "react";

afterEach(cleanup);

test('renders search bar', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('search-bar')).toBeInTheDocument()
});

test('can change search input', () => {
  const { getByTestId } = render(<App />);
  const searchBar = getByTestId('search-bar');
  fireEvent.change(searchBar, { target: { value: 'istanbul' } });
  expect(searchBar.value).toBe('istanbul');
});

test('can do search', async () => {
  const { getByTestId } = render(<App />);
  const searchBar = getByTestId('search-bar');
  fireEvent.change(searchBar, { target: { value: 'istanbul' } });
  fireEvent.focus(searchBar);
  fireEvent.keyPress(searchBar, { key: "Enter", code: 13, charCode: 13 });

  await waitFor(()=>expect(getByTestId("results")).toBeInTheDocument())
});

test('search returns', async () => {
  const { getByTestId, getByText } = render(<App />);
  const searchBar = getByTestId('search-bar');
  fireEvent.change(searchBar, { target: { value: 'istanbul' } });
  fireEvent.focus(searchBar);
  fireEvent.keyPress(searchBar, { key: "Enter", code: 13, charCode: 13 });

  await waitFor(()=> {
    expect(getByText("Istanbul, TR")).toBeInTheDocument();
    expect(getByText(/\d*°c/g)).toBeInTheDocument();
  });

});