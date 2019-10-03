import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, Descriptions, Button} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {logoutUser} from '../../../redux/actions/auths'

 class Home extends Component {
    render() {
        const {user} = this.props
        return (
            <div>
                <Button onClick={this.props.logoutUser()}>
                    Logout
                 </Button>  
                <br/>
                <br/>
                <br/>
               <Card bordered={true}>
               <Descriptions title="User Info">
    <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
    <Descriptions.Item label="Name">{`${user.firstname} ${user.lastname}`}</Descriptions.Item>
    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
    <Descriptions.Item label="Phone Number">{user.phone}</Descriptions.Item>
  </Descriptions>,

               </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})
Home.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired
    
} 

export default connect(mapStateToProps, {logoutUser})(withRouter(Home))
