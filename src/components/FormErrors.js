import React, {Component} from 'react'

class FormErrors extends Component {

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className={this.props.formErrors.hasErrors ? 
          '' : 'text-center'}>
        {this.props.formErrors.hasErrors ? 
          Object.keys(this.props.formErrors).map((fieldName, i) => {
            if(this.props.formErrors[fieldName].length > 0){
              return (
                <p key={i}>{this.capitalizeFirstLetter(fieldName)} 
                {this.props.formErrors[fieldName]}</p>
              )        
            } else {
              return '';
            }
          }) 
        : <p>ChaCha 20</p>}
      </div>
    )
  }
} export default FormErrors
