import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '../config/session';
import { login } from '../redux/actions/auth.action';
import { withRouter, withRouterLogin } from '../components/routing';
import { login_Failed } from '../redux/reducers/auth.reducers/auth.reducer';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            toast: true
        };

    }


    notify = () => toast("Wow so easy!");

    changeCredentials = (keyName, valueName) => {
        // console.log(keyName, valueName, this.state)
        this.setState({ [keyName]: valueName })
    }


    // componentDidUpdate(prevProps) {
    //     console.log(prevProps.toast,"prevProps.toast",this.state.toast);
    //     if(this.state.toast){
    //         console.log(prevProps.toast,"jjjprevProps.toast",this.state.toast);
    //         // this.notify();
    //         toast("Wow so easy!")
    //     }
    //   }
    // // componentDidMount() {
    // //     console.log("helllo");
       
        
    // //   }

    componentDidMount() {
        // const { isNotificationOpen } = this.props;
        this.state.toast && this.notify();
      }
      
      componentDidUpdate(prevProps) {
        // const { isNotificationOpen } = this.props;
                console.log(prevProps,"prevProps.toast",this.state.toast);

        if ( this.state.toast) {
            this.state.toast && this.notify();
        }
      }

    submitForm = () => {
      
        this.validateLoginForm()
        console.log(this.props, 'pppppppppppppppssssssssss')
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(payload)
            .then((result) => {
                console.log(result, 'resultresult')
                setLocalStorage("token", result?.data?.token)
                setLocalStorage("username", result?.data?.data?.username)
                this.setState({toast:true})
                this.props.navigate('/home')
            }).catch((err) => {
                this.props.login_Failed()
                console.log(err.message, 'ererererere')
            });
    }



    validateLoginForm = () => {
        if (!this.state.email || !this.state.password) {
            this.setState({ error: true })
        }
        else {
            this.setState({ error: false })
        }
    }

    render() {
        
        return (

            <div className='col-md-8 mt-5 col-12 d-flex flex-row card ' style={{ "height": "80vh" }}>
                <div className='col-md-6 d-md-flex d-none'>
                    <img src="/images/loginbg.jpg" alt="d" className='img-responsive' />
                </div>
                <div className='p-3 col-md-6 col-12 '>
                    <h1 className='text-center fw-bolder mt-3'>
                        Login
                    </h1>
                    <div className='mt-5  d-flex flex-column align-items-center' >
                        <div className=' d-flex flex-column w-75 mx-auto '>
                            <label htmlFor="email" className='mb-1'>Email</label>
                            <input
                                type="email"
                                name='email'
                                className=' py-2 px-2'
                                placeholder='Email'
                                required
                                onChange={
                                    (e) => this.changeCredentials(e.target.name, e.target.value)
                                }
                                value={this.state.email}
                            />
                        </div>
                        {
                            this.state.error && !this.state.email && <p className='text-danger fsz12 text-align-start w-75 pt-2 pb-0'>
                                Email feild not to be empty.
                            </p>
                        }
                        <div className=' d-flex flex-column  w-75 mx-auto mt-3 '>
                            <label htmlFor="password" className='mb-1'>Password</label>
                            <input
                                type="password"
                                name='password'
                                className=' py-2 px-2 '
                                placeholder='Password'
                                required
                                onChange={(e) => this.changeCredentials(e.target.name, e.target.value)}
                                value={this.state.password}
                            />
                        </div>
                        {
                            this.state.error && !this.state.password && <p className='text-danger fsz12 text-align-start w-75 pt-2 pb-0'>
                                Password feild not to be empty.
                            </p>
                        }
                        <div className='w-75 mt-1  fw-bold d-flex justify-content-end'>
                            <p className='btn text-primary'>
                                forget password?
                            </p>
                        </div>
                        <button type="" className='px-2 py-1  btn btn-success w-75' onClick={this.submitForm}>
                            login
                        </button>
                        <div className="divider d-flex align-items-center my-4 w-75">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>
                        <p>Don't have an account?
                            <Link to="signup" className="link-info">
                                Register here
                            </Link>
                        </p>
                    </div>

                </div>
                <ToastContainer/>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    // console.log(state,'ojojojojojojojojoj')
    return {
        logingState: state.logingState
    }
}

export default connect(mapStateToProps, { login,login_Failed })(withRouterLogin(LoginPage))