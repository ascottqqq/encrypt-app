import React, {Component} from 'react'
import FormErrors from '../components/FormErrors'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class ChaCha20Form extends Component {
  constructor(props) {
    super(props)
    this.state = {key: '', keyValid: false, counter: '', nonce: '', 
      nonceValid: false, text: '', result: '', 
      formErrors: {hasErrors: false, key: '', nonce: '', serverErrors: ''}, 
      formValid: false, isEncrypt: false}
      this.processData = this.processData.bind(this)
      this.processError = this.processError.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOnKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === '+') {
      e.preventDefault();
    }
  }

  handleTextInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value},
      () => {this.validateField(name, value)})	
  }

  isBase64 = (str) => {
    try {
      return window.btoa(window.atob(str)) === str
    } catch(err) {
      return false
    }
  }
  
  processData(base64Result) {
    let formErrors = this.state.formErrors
    if (this.state.isEncrypt) {
      debugger
      formErrors.serverErrors = ''
      formErrors.hasErrors = formErrors.key.length > 0 || 
        formErrors.nonce.length > 0
      this.setState ({result: base64Result, formErrors: formErrors})
    } else {
      debugger
      if (base64Result) {
        let ascii = new Buffer(base64Result, 'base64').toString('ascii')
        this.setState ({result: ascii})
      } else {
        console.log("result is undefined")
      }
    }
  }

  processError(error) {
    let formErrors = this.state.formErrors
    formErrors.serverErrors = ' ' + error.message
    formErrors.hasErrors = true
    this.setState ({formErrors: formErrors})
  } 

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let keyValid = this.state.keyValid
    let nonceValid = this.state.nonceValid
    let formValid = this.state.formValid
    switch(fieldName) {
      case 'key':
        const keyMax = "1157920892373161954235709850086879078532699846656" +
          "40564039457584007913129639936"
        let keyPad = "0".repeat(Math.max(keyMax.length, value.length))
        let paddedKeyValue = keyPad.substring(0, keyPad.length - 
          value.length) + value
        let paddedMaxKey = keyPad.substring(0, keyPad.length - 
          keyMax.length) + keyMax
        keyValid = !isNaN(value) && value !== "" &&
           paddedKeyValue < paddedMaxKey
        fieldValidationErrors.key = keyValid ? '' : ' is invalid'
        break
      case 'nonce':
        const nonceMax = "79228162514264337593543950336"
        let noncePad = "0".repeat(Math.max(nonceMax.length, value.length))
        let paddedNonceValue = noncePad.substring(0, noncePad.length - 
          value.length) + value
        let paddedMaxNonce = noncePad.substring(0, noncePad.length - 
          nonceMax.length) + nonceMax
        nonceValid = !isNaN(value) && value !== "" &&
                  paddedNonceValue < paddedMaxNonce
        fieldValidationErrors.nonce = nonceValid ? '' : ' is invalid'
        break
      default:
        break
    }
    fieldValidationErrors.hasErrors = 
      fieldValidationErrors.key.length > 0 || 
      fieldValidationErrors.nonce.length > 0 ||
      fieldValidationErrors.serverErrors.length > 0
    formValid = keyValid && nonceValid && this.state.text.length > 0
    this.setState({formErrors: fieldValidationErrors,
         keyValid: keyValid, nonceValid: nonceValid, 
         formValid: formValid})
  }

  handleSubmit(e) {
    debugger
    this.props.handleSubmit.call(this, e)
  }

  render() {
    var cardStyle = {width: "20rem"}
    return (
      <div className={this.state.formErrors.hasErrors ? 
          "panel panel-danger" : 
          "panel panel-default"}>
        <div className="panel-heading">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="panel-body">
        <div className="form-group">
          <label htmlFor="key-input">Key:</label>
          <input type="number"
            className="form-control" value={this.state.key} 
            name="key" id="key-input" onChange={this.handleTextInput} 
            onKeyDown={this.handleOnKeyDown} min="0" />
        </div>
        <div className="form-group">
          <label htmlFor="nonce-input">Nonce:</label>
          <input type="number" className="form-control" value={this.state.nonce} 
            name="nonce" id="nonce-input" onChange={this.handleTextInput} 
            onKeyDown={this.handleOnKeyDown} min="0" />
        </div>
        <div className="form-group">
          <label htmlFor="text-input">Text:</label>
          <textarea value={this.state.plaintext} className="form-control" 
            name="text" id="text-input" onChange={this.handleTextInput} />
        </div>
        <div className="btn-group" role="group">
          <button onClick={this.handleSubmit} className="btn btn-primary" name="encrypt"
            disabled={!this.state.formValid}>
            Encrypt
          </button>
          <button onClick={this.handleSubmit} className="btn btn-primary" name="decrypt"
            disabled={!this.state.formValid}>
            Decrypt
          </button>
        </div>
        <div className="card">
          <div className="card-body" style={cardStyle}>
            <h4 className="card-title">Result:</h4>
            <p className="card-text">{this.state.result}</p>
          </div>
        </div>
        </div>
      </div>
    )
  }
} export default ChaCha20Form 