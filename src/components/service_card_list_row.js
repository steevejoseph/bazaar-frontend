import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';

export default class ServiceCardListRow extends Component {  
    renderCardList() {
        return _.map(this.props.services, service => {
            return (
                <ServiceCard 
                    key={service._id} 
                    service={service} 
                    ableToEdit={this.props.ableToEdit}
                    toggleEditServiceModal={this.props.toggleEditServiceModal}
                    />
            )
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.header}</h1>
                <div className="row flex-row">
                    { this.renderCardList() }
                </div>
            </div>
        );
    }
}