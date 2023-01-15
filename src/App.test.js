import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("login api resolves true", () => {
  const jsdomAlert = window.alert;  // remember the jsdom alert
  window.alert = () => {};  // provide an empty implementation for window.alert
  render(<App />);

  const header = screen.getByText('Supply Chain Management Portal')
  expect(header).toBeInTheDocument();

  window.alert = jsdomAlert;  // restore the jsdom alert
});