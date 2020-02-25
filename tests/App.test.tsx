import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './../src/App';


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



it('renders without crashing', () => {
  shallow(<App />);
});