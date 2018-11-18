import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Modal from './modal';
import CreateService from './create_service';
import { connect } from 'react-redux';
import { getUserFromLocalStorage, logOutUser } from '../actions';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isTryingToLogin: false,
            showCreateServiceModal: false,
            showLoginSignupModal: false
        };

        this.toggleLoginIntent = this.toggleLoginIntent.bind(this);
        this.renderLoginSignupModal = this.renderLoginSignupModal.bind(this);
        this.logOut = this.logOut.bind(this);
        this.toggleCreateServiceModal = this.toggleCreateServiceModal.bind(this);
        this.toggleLoginSignupModal = this.toggleLoginSignupModal.bind(this);
        this.handleLoginClickEvent = this.handleLoginClickEvent.bind(this);
        this.handleSignupClickEvent = this.handleSignupClickEvent.bind(this);
        this.handleCreateServiceClickEvent = this.handleCreateServiceClickEvent.bind(this);
    }

    componentDidMount() {
        // Check local storage to see if user has signed in
        // TODO: Check to see if token is valid instead
        if (localStorage.getItem('loggedInUser'))
            this.props.getUserFromLocalStorage();   
    }

    setLoginIntent(intent, callback = {}) {
        this.setState({ 
            ...this.state,
            isTryingToLogin: intent
        }, () => callback());
    }

    toggleLoginIntent() {
        this.setState({ 
            ...this.state,
            isTryingToLogin: !this.state.isTryingToLogin,
        });
    }

    logOut() {
        this.props.logOutUser();
        this.props.history.push('/');
    }

    toggleCreateServiceModal() {
        this.setState({ 
            ...this.state,
            showCreateServiceModal: !this.state.showCreateServiceModal
        });
    }

    toggleLoginSignupModal() {
        this.setState({ 
            ...this.state,
            showLoginSignupModal: !this.state.showLoginSignupModal
        });
    }

    renderCreateServiceModal() {
        return (
            <Modal 
                isOpen={this.state.showCreateServiceModal} 
                toggle={this.toggleCreateServiceModal} 
                modalBody={<CreateService />}
                />
        );
    }

    renderLoginSignupModal() {
        return (
            <Modal 
                isOpen={this.state.showLoginSignupModal} 
                toggle={this.toggleLoginSignupModal} 
                modalBody={this.state.isTryingToLogin ?
                                  <Login switchToSignup={this.toggleLoginIntent} successCallback={this.toggleLoginSignupModal} /> 
                                : <Signup switchToLogin={this.toggleLoginIntent} successCallback={this.toggleLoginSignupModal} />}
                />
        );
    }

    handleCreateServiceClickEvent() {
        if (!this.props.loggedIn)
            this.setLoginIntent(true, () => this.toggleLoginSignupModal());
        else
            this.setState({ 
                ...this.state,
                showCreateServiceModal: !this.state.showCreateServiceModal
            });
    }

    handleSignupClickEvent() {
        this.setLoginIntent(false, () => this.toggleLoginSignupModal()); 
    }

    handleLoginClickEvent() {
        this.setLoginIntent(true, () => this.toggleLoginSignupModal()); 
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm  navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand mb-0 h1">Bazaar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.handleCreateServiceClickEvent}>Create Service</a>
                            </li>
                            
                            {this.props.loggedIn ? 

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Account
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/account" className="dropdown-item">Account</Link>
                                        <div className="dropdown-divider"></div>
                                        <a onClick={this.logOut} className="dropdown-item">Log out</a>
                                    </div>
                                </li>
                                :  '' }

                            
                            {/* Yes, weird, cumbersome use of ternary, but works only this way weirdly. Open to other solutions */}

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.handleSignupClickEvent}>Sign up</a>
                                </li>

                            }

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.handleLoginClickEvent}>Log in</a>
                                </li>

                                }
                        </ul>
                    </div>
                </nav>
                {this.renderLoginSignupModal()}
                {this.renderCreateServiceModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { loggedIn: state.user.loggedIn };
}

export default connect(mapStateToProps, {getUserFromLocalStorage, logOutUser})(Navbar);