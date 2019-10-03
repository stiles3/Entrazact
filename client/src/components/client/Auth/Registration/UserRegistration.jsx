import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './css/UserRegistration.css';
import { connect } from 'react-redux';
import {
  validate,
  registrationFieldChange
} from '../../../../redux/actions/auths';
import { Form, Icon, Input, Button, message } from 'antd';


 class UserRegistration extends Component {
   constructor(props){
     super(props)
     this.props.next.bind(this)
   }
   static propTypes = {
     isAuthenticated: PropTypes.bool,
     userDetails: PropTypes.object
   }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
if(values.username ==='administrator')
{
  message.warn('Administrator not allowed as username')
}else{
      
  this.props.registrationFieldChange(values);
  const params = {
     phone: values.phone,
     email: values.email
  }
  this.props.validate(params)
  this.props.next()
}
      }
    });
  };
    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <div  className="main">
              <div  className="header">
                  User Registration
                  </div>
                  <div  className="body">
                    <div className="inner">
                  <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your First name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="First Name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your Last name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Last Name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone Number!' }],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Phone Number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Next
          </Button>
          Or
          {/* <Button type="primary" htmlType="submit" className="login-form-button">
            Resend
          </Button> */}
        </Form.Item>
      </Form>
      </div>
      </div>
      </div> 
    );
  }
}
const UserReg = Form.create({ name: 'register' })(UserRegistration);
const mapStateToProps = state => ({
  auth: state.auth
});
UserReg.propTypes = {
  validate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { validate, registrationFieldChange }
)(withRouter(UserReg));
