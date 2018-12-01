import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import * as EmailValidator from 'email-validator';

class Signup extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : ''}`;
        
        return (
            <div>
                <input 
                    type={field.input.name === "password" || field.input.name === "confirmPassword" ? "password" : "text"}
                    className={className}
                    autoComplete="off"
                    placeholder={field.label}
                    {...field.input} 
                />
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createUser(values, () => {
            this.props.successCallback();
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="First Name"
                        name="firstName"
                        component={this.renderField}
                    />
                    <Field 
                        label="Last Name"
                        name="lastName"
                        component={this.renderField}
                    />
                    <Field 
                        label="Email"
                        name="email"
                        component={this.renderField}
                    />
                    <Field 
                        label="Password"
                        name="password"
                        component={this.renderField}
                    />
                    <Field 
                        label="Confirm Password"
                        name="confirmPassword"
                        component={this.renderField}
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block btn-danger">Sign up</button>
                    </div>
                </form>
                <div className="text-center">                    
                    <p>Already have an account? <a href="#" onClick={this.props.switchToLogin}>Log in</a></p>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.firstName) 
        errors.firstName = "Enter your first name.";

    if (!values.lastName) 
        errors.lastName = "Enter your last name.";
    
    if (!values.email) 
        errors.email = "Enter your UCF email.";

    if (values.email && !((new RegExp(/((.+)@((.)+.)?ucf.edu)$/i)).test(values.email)))
        errors.email = "Enter your UCF email.";    
    
    else if (values.email && !EmailValidator.validate(values.email))  
        errors.email = "Email is invlaid.";    
    
    if (!values.password) 
        errors.password = "Enter your password.";

    if (values.password && values.password.length < 6) 
        errors.password = "Password must be at least 6 characters long.";

    else if (values.confirmPassword && values.password != values.confirmPassword)
        errors.confirmPassword = "Passwords don't match.";
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'SignupForm'
})(
    connect(null, {createUser})(Signup)
);