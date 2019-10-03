import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './css/EmailValidation.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { registrationFieldChange } from '../../../../redux/actions/auths';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EmailValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailotp: 0
    }
    this.props.next.bind(this)
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  
  }

 async getEmailOtp() {
    const response = await
    axios.get('/api/users/getmailotp',{headers: {'Content-Type': 'application/json'}})
    console.log(response.data.emailotp)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const mailotp = parseInt(values.email_otp, 10) 
        console.log(mailotp)
       axios.get('/api/users/getmailotp',{headers: {'Content-Type': 'application/json'}})
        .then(res => {
          console.log(res.data.emailotp)
          if(mailotp === res.data.emailotp)
          {
            message.success('Email Validation Succesful')
             this.props.next()
          }
          else{
            message.warn('Invalid One-Time Password')
          }  
        }) 
     
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const otpError = isFieldTouched('email_otp') && getFieldError('email_otp');

    return (
      <div>
        <div className='header'>Email Verification</div>
        <h2>
          A One-Time Password will be sent to the email address you used in
          registering{' '}
        </h2>
        <Form layout='inline' onSubmit={this.handleSubmit} className='inter'>
          <Form.Item
            validateStatus={otpError ? 'error' : ''}
            help={otpError || ''}
          >
            {getFieldDecorator('email_otp', {
              rules: [
                { required: true, message: 'input your Otp sent to your mail' }
              ]
            })(
              <Input
                prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Email Otp'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const EmailVer = Form.create({ name: 'email_ver' })(EmailValidation);
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { registrationFieldChange }
)(EmailVer);
