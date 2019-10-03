import React, {Component} from 'react';
import { Row, Col } from 'antd';
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Login from './components/client/Auth/Login/Login'
import Registration from './components/client/Auth/Registration/Registration'
import store from './redux/store'
//import jwt_decode from "jwt-decode";
//import setAuthToken from './redux/utils/setAuthToken'
//import {setCurrentUser} from './redux/actions/auths'
import {Provider} from 'react-redux'
import PrivateRoute from './redux/PrivateRoute'
import Home from './components/client/Home/Home'
import AdminHome from './components/admin/AdminHome'

/*  if(localStorage.entrazactoken)
{
 const token = localStorage.entrazactoken
 setAuthToken(token) 
 const decoded = jwt_decode(token)
 store.dispatch(setCurrentUser(decoded))
}  */

export default class App extends Component { 
  render(){  
    return (
      <Row>
      <div className="App"/>   
     <div className="App-header"/>
        
          <Col xs={{span:2, offset:1}} lg={{span:2, offset:1}}/>
          <Col xs={{span:17, offset:1}} lg={{span:17, offset:1}}>
            <Provider store= {store}>
             <Router>
             <Switch>
             <PrivateRoute exact path = '/' component={Home}/>
                 <PrivateRoute exact path = '/admin' component={AdminHome}/>
                 <Route exact path= '/user_registration' component={Registration}/>
                 <Route exact path= '/user_login' component={Login}/>
               </Switch>
             </Router>
             </Provider>
          </Col>
          <Col xs={{span:2, offset:1}} lg={{span:2, offset:1}}/>
        </Row>
        
     
    )
  }}
    






  

  

 
 
