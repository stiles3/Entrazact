import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';
import { registrationFieldChange } from '../../../../redux/actions/auths';
import './css/EmailValidation.css';
import axios from 'axios'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PhoneRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOtp: '111111'
    }
    this.props.next.bind(this)
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const phoneotp = parseInt(values.phoneotp, 10) 
        console.log(phoneotp)
       axios.get('/api/users/getphoneotp',{headers: {'Content-Type': 'application/json'}})
        .then(res => {
          console.log(res.data.phoneotp)
          if(phoneotp === res.data.phoneotp)
          {
            message.success('Phone Validation Succesful')
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
    const otpError = isFieldTouched('phone_otp') && getFieldError('email_otp');

    return (
      <div>
        <div className='header'>Phone Verification</div>
        <h2>
          A One-Time Password will be sent to the phone number you used in
          registering{' '}
        </h2>
        <Form layout='inline' onSubmit={this.handleSubmit} className='inter'>
          <Form.Item
            validateStatus={otpError ? 'error' : ''}
            help={otpError || ''}
          >
            {getFieldDecorator('phoneotp', {
              rules: [
                {
                  required: true,
                  message: 'input your Otp sent to your Phone number'
                }
              ]
            })(
              <Input
                prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder=' Phone Otp'
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
          <h3>Phone Otp: 111111</h3>
        </Form>
      </div>
    );
  }
}

const PhoneVal = Form.create({ name: 'phone_val' })(PhoneRegistration);
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { registrationFieldChange }
)(PhoneVal);
