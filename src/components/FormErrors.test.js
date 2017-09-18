import React from 'react';
import FormErrors from './FormErrors';
import renderer from 'react-test-renderer';

it('renders without error correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: false, key: '', 
      nonce: '', serverErrors: ''}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with key error correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: ' is invalid', 
      nonce: '', serverErrors: ''}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with nonce error correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: '', 
      nonce: ' is invalid', serverErrors: ''}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with server error correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: '', 
      nonce: '', serverErrors: ' Failed to fetch'}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with key and nonce errors correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: ' is invalid', 
      nonce: ' is invalid', serverErrors: ''}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with key and server errors correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: ' is invalid', 
      nonce: '', serverErrors: ' Failed to fetch'}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with nonce and server errors correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: '', 
      nonce: ' is invalid', serverErrors: ' Failed to fetch'}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with key and nonce and server errors correctly', () => {
  const tree = renderer.create(
    <FormErrors formErrors={{hasErrors: true, key: ' is invalid', 
      nonce: ' is invalid', serverErrors: ' Failed to fetch'}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});