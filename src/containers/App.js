import React, {Component} from 'react';
import ChaCha20Form from './ChaCha20Form'; 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {

  handleSubmit(event) {
    let formErrors = this.state.formErrors
    let key = []
    for (let i = 0; i < this.state.key.length; i+=2) {
      key.push(
        parseInt(this.state.key.substr(i, 2), 16)
      )
    }
    let nonce = []
      for (let i = 0; i < this.state.nonce.length; i+=2) {
      nonce.push(
        parseInt(this.state.nonce.substr(i, 2), 16)
      )
    }
    let plaintext = ""
    let isEncrypt = event.target.name === "encrypt"
    this.setState({isEncrypt: isEncrypt})
    if (isEncrypt) {
      plaintext = window.btoa(this.state.text)
    }
    else {
      if (this.isBase64(this.state.text)) {
        plaintext = this.state.text
      } else {
        formErrors.serverErrors = " not valid ciphertext"
        formErrors.hasErrors = true
        this.setState({formErrors: formErrors})
        return
      }
    }
    fetch(isEncrypt ? 
      'http://localhost:8080/encrypt/' : 
      'http://localhost:8080/decrypt/', {
      method: 'post',
      body: JSON.stringify ({
        key: key,
        counter: 0,
        nonce: nonce,
        plaintext: plaintext
      }, formErrors)
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    }).then(
      this.processData
    ).catch(this.processError)
    event.preventDefault()
  }


  render() {

    return (

      <div className="chacha20">
        <ChaCha20Form handleSubmit={this.handleSubmit} />
      </div>

    )

  }

}


 export default App 