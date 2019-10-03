import React, { Component } from 'react'
import {Steps, Button, message} from 'antd'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {validate, registerUser} from '../../../../redux/actions/auths'
import UserRegistration from './UserRegistration'
import EmailValidation from './EmailValidation'
import PhoneValidation from './PhoneRegistration'
import PasswordVer from './PasswordVer'
import './css/registration.css'


const {Step} = Steps
 class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
          
        };
      }
      componentDidMount() {
        if (this.props.auth.isAuthenticated === true) {
          if(this.props.auth.isAdmin === true)
          {
            this.props.history.push("/admin");
          }else
          {
            this.props.history.push('/')
          }
          
        }
      }
      next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
        console.log(current)
       
       
      }
    
      prev = () => {
        const current = this.state.current - 1;
        this.setState({ current })
      }
    
    render() {
        const steps = [
            {
              title: 'User Registeration',
              content:<UserRegistration next = {this.next}
                                        validate = {this.props.validate} />
            },
            {
              title: 'Email Authentication',
              content: <EmailValidation next = {this.next}
                                        prev = {this.prev} />
            },
            {
              title: 'Phone Authentication',
              content: <PhoneValidation next = {this.next} />
            },
            {
              title: 'Password',
              content: <PasswordVer next = {this.next} 
                                    register = {this.props.registerUser}/>
            },
          ];
          const { current } = this.state;


        return (
            <div>
                 <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div 
              className='steps-content'
              bordered='false'
              >
{steps[current].content}</div>
         <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )} 
      </div> 
            </div>
        )
    }
}
const mapStateToProps = state => ({
  auth: state.auth
})
Registration.propTypes = {
   validate: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   registerUser: PropTypes.func.isRequired

}
export default connect(mapStateToProps, {validate, registerUser})(withRouter (Registration))