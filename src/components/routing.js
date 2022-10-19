import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../config/session';

export const withRouterLogin = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    let token =getLocalStorage('token');
    useEffect(()=>{
        if (!token){
            
            navigate('/',{replace:true})
        }
        else{
            navigate('/home',{replace:true})
        }
    },[])
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

export const withRouterSignup = (Component) => {
    const Wrapper = (props) => {
      const navigate = useNavigate();
      let token =getLocalStorage('token');
      useEffect(()=>{
          if (!token){
              navigate('/signup',{replace:true})
          }
          else{
              navigate('/home',{replace:true})
          }
      },[])
      return (
        <Component
          navigate={navigate}
          {...props}
          />
      );
    };
    return Wrapper;
  };



export const withRouterHomePage = (Component) => {
    const Wrapper = (props) => {
      const navigate = useNavigate();
      let token =getLocalStorage('token');
      useEffect(()=>{
          if (!token){
              navigate('/',{replace:true})
          }
          else{
              navigate('/home',{replace:true})
          }
      },[])
      return (
        <Component
          navigate={navigate}
          {...props}
          />
      );
    };
    return Wrapper;
  };