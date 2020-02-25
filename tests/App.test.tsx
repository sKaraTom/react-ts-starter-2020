import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './../src/App';
import { Test } from '../src/components/Test';


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  const test = wrapper.find(Test)
  expect(test.length).toEqual(1)
});