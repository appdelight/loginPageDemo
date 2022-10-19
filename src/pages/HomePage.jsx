import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouterHomePage } from '../components/routing'
import { clearLocalStorage } from '../config/session'
import { logoutUser } from '../redux/actions/auth.action';

export  class HomePage extends Component {
    logoutClick=()=>{
        console.log('kkkkkkkkasdddddddd');
        this.props.logoutUser()
            .then((result) => {
                console.log(result, 'resultresult')
                clearLocalStorage()
                this.props.navigate('/')
            }).catch((err) => {
                this.props.login_Failed()
                console.log(err.message, 'ererererere')
            });
        clearLocalStorage()
        this.props.navigate('/')

    }
    render() {
        return (
            <div className='w-100 d-flex flex-column'>
                <nav className="navbar navbar-light bg-light ">
                    <div className="container-fluid">
                        <a className="navbar-brand">Navbar</a>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <div>
                            <button className="btn btn-outline-info" onClick={()=>this.logoutClick()} >logout</button>
                        </div>
                    </div>
                </nav>

                <div className='text-center my-5'>
                    <h1 >home page</h1>
                </div>
            </div>
        )
    }
}

export default connect(null,{logoutUser})( withRouterHomePage(HomePage))