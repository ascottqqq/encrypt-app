import React from 'react'
import {mount} from 'enzyme'
import ChaCha20Form from './ChaCha20Form'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import renderer from 'react-test-renderer'

it('should handle correct input in key field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let key = node.find('[name="key"]');
   let value = {target: {value: '10', name: 'key'}}

   key.value = '10'
   key.simulate('change', value )
   expect(node.state().key).toEqual('10')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formErrors.key).toEqual('')
   expect(node.state().formValid).toEqual(false)
});

it('should handle correct input in nonce field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let nonce = node.find('[name="nonce"]');
   let value = {target: {value: '11', name: 'nonce'}}

   nonce.value = '11'
   nonce.simulate('change', value )
   expect(node.state().nonce).toEqual('11')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formErrors.nonce).toEqual('')
   expect(node.state().formValid).toEqual(false)
});

it('should handle correct input in text field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let text = node.find('[name="text"]');
   let value = {target: {value: 'Hello', name: 'text'}}

   text.value = 'Hello'
   text.simulate('change', value )
   expect(node.state().text).toEqual('Hello')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formValid).toEqual(false)
});

it('should handle correct input in text field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let text = node.find('[name="text"]');
   let value = {target: {value: 'Hello', name: 'text'}}

   text.value = 'Hello'
   text.simulate('change', value )
   expect(node.state().text).toEqual('Hello')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formValid).toEqual(false)
});

it('should handle correct input in key, nonce, and text fields', () => {
   let handleSubmitMock = jest.fn()
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let field = node.find('[name="key"]');
   let value = {target: {value: '1234', name: 'key'}}

   field.value = '1234'
   field.simulate('change', value )

   field = node.find('[name="nonce"]');
   value = {target: {value: '4321', name: 'nonce'}}

   field.value = '4321'
   field.simulate('change', value )

   field = node.find('[name="text"]');
   value = {target: {value: 'Hello World!', name: 'text'}}

   field.value = 'Hello World!'
   field.simulate('change', value )

   expect(handleSubmitMock.mock.calls.length).toBe(0)
   expect(node.state().key).toEqual('1234')
   expect(node.state().nonce).toEqual('4321')
   expect(node.state().text).toEqual('Hello World!')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formValid).toEqual(true)
});

it('should handle encrypt button click correctly', () => {
   let handleSubmitMock = jest.fn()
   let node = mount(<ChaCha20Form handleSubmit={handleSubmitMock} />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let field = node.find('[name="key"]');
   let value = {target: {value: '1234', name: 'key'}}

   field.value = '1234'
   field.simulate('change', value )

   field = node.find('[name="nonce"]');
   value = {target: {value: '4321', name: 'nonce'}}

   field.value = '4321'
   field.simulate('change', value )

   field = node.find('[name="text"]');
   value = {target: {value: 'Hello World!', name: 'text'}}

   field.value = 'Hello World!'
   field.simulate('change', value )

   field = node.find('[name="encrypt"]');
   value = {target: { name: 'encrypt'}}
   field.simulate('click', value)

   expect(handleSubmitMock.mock.calls.length).toBe(1)
   expect(handleSubmitMock.mock.calls[0][0].target.name).toEqual('encrypt')
   expect(node.state().key).toEqual('1234')
   expect(node.state().nonce).toEqual('4321')
   expect(node.state().text).toEqual('Hello World!')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formValid).toEqual(true)
});

it('Should handle decrypt button click correctly', () => {
   let handleSubmitMock = jest.fn()
   let node = mount(<ChaCha20Form handleSubmit={handleSubmitMock} />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let field = node.find('[name="key"]');
   let value = {target: {value: '1234', name: 'key'}}

   field.value = '1234'
   field.simulate('change', value )

   field = node.find('[name="nonce"]');
   value = {target: {value: '4321', name: 'nonce'}}

   field.value = '4321'
   field.simulate('change', value )

   field = node.find('[name="text"]');
   value = {target: {value: 'Hello World!', name: 'text'}}

   field.value = 'Hello World!'
   field.simulate('change', value )

   field = node.find('[name="decrypt"]');
   value = {target: { name: 'decrypt'}}
   field.simulate('click', value)

   expect(handleSubmitMock.mock.calls.length).toBe(1)
   expect(handleSubmitMock.mock.calls[0][0].target.name).toEqual('decrypt')
   expect(node.state().key).toEqual('1234')
   expect(node.state().nonce).toEqual('4321')
   expect(node.state().text).toEqual('Hello World!')
   expect(node.state().formErrors.hasErrors).toEqual(false)
   expect(node.state().formValid).toEqual(true)
});

it('should handle error input in key field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let key = node.find('[name="key"]');
   let value = {target: {value: '115792089237316195423570985008687907853269' +
     '984665640564039457584007913129639936', name: 'key'}}

   key.simulate('change', value )
   expect(node.state().formErrors.key).toEqual(' is invalid')
   expect(node.state().formErrors.hasErrors).toEqual(true)
   expect(node.state().formValid).toEqual(false)
});

it('Should handle error input in nonce field', () => {
   let node = mount(<ChaCha20Form />);
   node.setState({key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false})

   let nonce = node.find('[name="nonce"]');
   let value = {target: {value: '79228162514264337593543950336', 
     name: 'nonce'}}

   nonce.simulate('change', value )
   expect(node.state().formErrors.nonce).toEqual(' is invalid')
   expect(node.state().formErrors.hasErrors).toEqual(true)
   expect(node.state().formValid).toEqual(false)
});

it('renders without error correctly', () => {
  const tree = renderer.create(<ChaCha20Form />).toJSON()
  expect(tree).toMatchSnapshot()
});

it('renders with valid data correctly', () => {
  const container = renderer.create(<ChaCha20Form />)
  container.getInstance().handleTextInput({target: { name: 'key', 
    value: '55'}})
  container.getInstance().handleTextInput({target: { name: 'nonce', 
    value: '66'}})
  container.getInstance().handleTextInput({target: { name: 'text', 
    value: 'Ready'}})
  expect(container.toJSON()).toMatchSnapshot()
});

it('renders with error correctly', () => {
  const container = renderer.create(<ChaCha20Form />)
  container.getInstance().validateField('nonce', '79228162514264337' + 
    '593543950336')
  expect(container.toJSON()).toMatchSnapshot();
});

it('renders with server error correctly', () => {
  const container = renderer.create(<ChaCha20Form />)
  container.getInstance().processError({message: 'Server down'})
  expect(container.toJSON()).toMatchSnapshot();
});