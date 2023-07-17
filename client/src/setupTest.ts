
  // jest-dom adds custom jest matchers for asserting on DOM nodes.
  // allows you to do things like:
  // expect(element).toHaveTextContent(/react/i)
  // learn more: https://github.com/testing-library/jest-dom
  /// <reference types="vitest/globals" />
  import '@testing-library/jest-dom';
  import "@testing-library/jest-dom/extend-expect";
  import "jest-localstorage-mock";
  import matchers from '@testing-library/jest-dom/matchers';
  import { expect } from 'vitest';

  import Enzyme, { shallow, render } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';
  import element Dataset Polyfill from "element-dataset";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

  expect.extend(matchers);