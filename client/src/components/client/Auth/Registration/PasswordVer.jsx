import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import './css/PasswordVer.css';
import {registerUser} from '../../../../redux/actions/auths'

import { registrationFieldChange } from '../../../../redux/actions/auths';

class PasswordVer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }


  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
    
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {userDetails} = this.props
        console.log(userDetails)
        this.props.registrationFieldChange({ password: values.password });
        const user = {
          username: userDetails.username.toLowerCase(),
          firstname: userDetails.firstName.toLowerCase(),
          lastname: userDetails.lastName.toLowerCase(),
          email: userDetails.email,
          password: userDetails.password,
          phone: userDetails.phone
        }
        console.log(user)
        this.props.registerUser(user, this.props.history)
        message.success('Registration Successful')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    

    return (
      <div>
        <div className='header'>Email Verification</div>

        <div className='inside'>
          <Form
            layout='vertical'
            onSubmit={this.handleSubmit}
            className='inter'
          >
            <Form.Item label='Password' hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label='Confirm Password' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit' /* disabled={hasErrors(getFieldsError()) }*/
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const PasswordVerification = Form.create({ name: 'password' })(PasswordVer);
const mapStateToProps = state => ({
  userDetails: state.registration,
});
PasswordVerification.propTypes = {
   userDetails: PropTypes.object.isRequired,
   registrationFieldChange: PropTypes.func.isRequired
}
export default connect(mapStateToProps, { registrationFieldChange, registerUser })(PasswordVerification);
