import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ServiceCard extends Component {
    constructor(props) {
        super(props);

        this.openServiceView = this.openServiceView.bind(this);
    }

    openServiceView() {
        this.props.history.push(`/services/${this.props.service._id}`);
    }

    render() {
<<<<<<< HEAD
        console.log("in service card ", this.props.ableToEdit);
        if(this.props.ableToEdit)
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/services/${this.props.service._id}`}>
                                <h5 className="card-title">{this.props.service.name}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                            <p className="card-text">{this.props.service.description}</p>
                            <div className="btn-group" role="group" aria-label="...">
                                <button type="button" className="btn btn-default">Left</button>
                                <button type="button" className="btn btn-default">Edit</button>
                                <button type="button" className="btn btn-danger">delete</button>
                            </div>
		                    
                        </div>
                    </div>
=======
        return (
            <div>
                <div className="card" onClick={this.openServiceView}>
                    <div className="card-body" >
                        <h5 className="card-title">{this.props.service.name}</h5>
                        <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                        <p className="card-text">{this.props.service.description}</p>
                     </div>
>>>>>>> 14eb7ac4020418c53cb313272ba9fcea1b1258e7
                </div>
            );

        else if (!this.props.ableToEdit)
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/services/${this.props.service._id}`}>
                                <h5 className="card-title">{this.props.service.name}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                            <p className="card-text">{this.props.service.description}</p>
                        </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(ServiceCard);