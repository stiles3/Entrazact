import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button} from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, loginAdmin} from '../../../../redux/actions/auths'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: {}
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const user = {
             username:values.username.toLowerCase(),
             password: values.password}
      if(values.username.toLowerCase() === 'administrator')
      {
        this.props.loginAdmin(user,this.props.history)
      }else
      {
        this.props.loginUser(user)
        console.log(user)
      }
       
      }
    });
  };
 

  componentDidMount() {
    if (this.props.isAuthenticated === true) {
      if(this.props.isAdmin === true)
      {
        this.props.history.push("/admin");
      }else
      {
        this.props.history.push("/");
      }
      
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
  
    return (
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/user_registration">Register </a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login' })(Login);
const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
})
LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginAdmin:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
export default connect (mapStateToProps,  {loginUser, loginAdmin})(withRouter(LoginForm))
