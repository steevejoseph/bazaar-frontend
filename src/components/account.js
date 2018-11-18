import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';

class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user :  this.props.user || JSON.parse(localStorage.getItem('loggedInUser')),
        }  
    }

    componentDidMount() {
        this.props.fetchUsersServices(this.state.user._id);
    }

    render() {
        if (!this.state.user)
            return <div>loading</div>

        return (
            <div className="container account">
                <h1>Account - {this.state.user.lastName}</h1>
                <ServiceCardListRow services={this.props.services} ableToEdit={true}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user, services: state.services.services };
}

export default connect(mapStateToProps, {fetchUsersServices} )(Account);