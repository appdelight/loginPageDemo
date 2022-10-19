import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter, withRouterSignup } from '../components/routing';
import { userSignup } from "../redux/actions/auth.action"
import {signup_Failed} from "../redux/reducers/auth.reducers/signup.reducer"



function checkPasswordValidation(value) {

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
        return "Password must be 8-16 Characters Long.";
    }

    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        return "Password must not contain Whitespaces.";
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
        return "Password must have at least one Uppercase Character.";
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
        return "Password must have at least one Lowercase Character.";
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        return "Password must contain at least one Digit.";
    }


    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
        return "Password must contain at least one Special Symbol.";
    }

    return '';
}


export class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: "",
            password: "",
            rePassword: "",
            // error: false,
            errorMessages: {
                name: '',
                email: '',
                password: '',
            }

        };
    }

    changeSignupPayload = (keyName, valueName) => {
        // console.log(keyName, valueName, this.state)
        this.setState({ [keyName]: valueName })
    }



    updateErrorState = (errorField, errorName) => {
        // console.log(errorField, errorName, 'jjjjjjjjjjj', { ...this.state.errorMessages });
        this.setState({ errorMessages: { ...this.state.errorMessages, [errorField]: errorName } })

    }

    validateForm = () => {
        // console.log(this.state, 'oppppasdfasdf')
        let errorMessages = {
            name: '',
            email: '',
            password: ''
        }
        let isError = false;
        let updateErrorState = (errorField, errorName) => {
            // console.log(errorField, errorName, 'jjjjjjjjjjj', { ...errorMessages });
            errorMessages = { ...errorMessages, [errorField]: errorName }
        }

        if (this.state.name) {
            if (!(this.state.name.length > 2)) {
                isError = true;
                updateErrorState('name', 'name should be at least 2 characters long')
            }
        } else {
            isError = true;

            updateErrorState('name', 'Name should not be empty')
        };

        if (this.state.email) {
            let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
            console.log(regex.test(this.state.email));
            if (!regex.test(this.state.email)) {
                isError = true;
                updateErrorState('email', 'This is not a valid email')
            }

        } else {
            isError = true;
            updateErrorState('email', 'Email should not be empty')
        };

        if (this.state.password) {
            const error = checkPasswordValidation(this.state.password)
            if (error) {
                isError = true;
                console.log(error, 'erororeoeoerrororor')
                updateErrorState('password', error)
            }
        } else {
            isError = true;
            updateErrorState('password', 'Password should not be empty')
        };

        console.log(errorMessages, 'bbbbbbbbbbbb')
        this.setState({ errorMessages })
        return isError
    }

    submitForm = () => {
        if (this.state.password !== this.state.rePassword) {
            alert('password and re-password are not same.')
            return
        }
        let isError = this.validateForm()

        console.log(this.props, 'kkkkkkkkkkkkkkk');
        if (!isError) {
            const payload = {
                username: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.props.userSignup(payload)
        } else {
            this.props.signup_Failed()
            console.log('ppppppppppppp', this.state.errorMessages)
        }
    }


    render() {
        return (
            <div className='col-md-8 mt-5 col-12 d-flex flex-row card ' style={{ "height": "80vh" }}>
                <div className='col-md-6 d-md-flex d-none'>
                    <img src="/images/loginbg.jpg" alt="d" className='img-responsive' />
                </div>
                <div className='p-3 col-md-6 col-12 rgpage '>
                    <h1 className='text-center fw-bolder '>
                        Register here
                    </h1>
                    <div className='mt-3  d-flex flex-column align-items-center' >
                        <div className=' d-flex flex-column w-75 mx-auto '>
                            <label htmlFor="name" className='mb-1'>Name</label>
                            <input
                                type="name"
                                name='name'
                                className=' py-2 px-2'
                                placeholder='Enter name'
                                value={this.state.name}
                                onChange={(e) => this.changeSignupPayload(e.target.name, e.target.value)}
                            />
                        </div>
                        {
                            this.state.errorMessages.name && <p className='text-danger fsz12 text-align-start w-75 pt-2 pb-0'>
                                {this.state.errorMessages.name || 'asd'}
                            </p>
                        }
                        <div className=' d-flex flex-column w-75 mx-auto mt-2'>
                            <label htmlFor="email" className='mb-1'>Email</label>
                            <input
                                type="email"
                                name='email'
                                className=' py-2 px-2'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={(e) => this.changeSignupPayload(e.target.name, e.target.value)}
                            />
                        </div>
                        {
                            this.state.errorMessages.email && <p className='text-danger fsz12 text-align-start w-75 pt-2 pb-0'>
                                {this.state.errorMessages.email || 'asd'}
                            </p>
                        }
                        <div className=' d-flex flex-column  w-75 mx-auto mt-2 '>
                            <label htmlFor="password" className='mb-1'>Password</label>
                            <input
                                type="password"
                                name='password'
                                className=' py-2 px-2 '
                                placeholder='Password'
                                value={this.state.password}
                                onChange={(e) => this.changeSignupPayload(e.target.name, e.target.value)}
                            />
                        </div>
                        {
                            this.state.errorMessages.password && <p className='text-danger fsz12 text-align-start w-75 pt-2 pb-0'>
                                {this.state.errorMessages.password || 'asd'}
                            </p>
                        }
                        <div className=' d-flex flex-column  w-75 mx-auto mt-2 '>
                            <label htmlFor="password" className='mb-1'>Re - Password</label>
                            <input
                                type="password"
                                name='rePassword'
                                className=' py-2 px-2 '
                                placeholder='Password'
                                value={this.state.rePassword}
                                onChange={(e) => this.changeSignupPayload(e.target.name, e.target.value)}
                            />
                        </div>

                        <button type="" className='px-2 py-1 mt-4  btn btn-success w-75' onClick={this.submitForm}>
                            Submit
                        </button>
                        <div className="divider d-flex align-items-center my-2 w-75">
                            <p className="text-center fw-bold mx-3 ">Or</p>
                        </div>
                        <p>All ready have an account?
                            <Link to="/" className="link-info">
                                Login here
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        signupState: state.signupState
    }
}


export default connect(mapStateToProps, { userSignup,signup_Failed })(withRouterSignup(SignupPage))