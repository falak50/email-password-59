import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);
const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const emailRef =  useRef();
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your login logic here
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email);
      console.log(password);
 //////////// not need here validate when login ////
     setError('');
     setSuccess('');
      if(!/(?=.*[A-Z])/.test(password)){
        setError("Please add at least one uppercase");
        return ;
    }else if(!/(?=.*[0-9].*[0-9])/.test(password)){
        setError("Please add at least two number ");
        return ;
    }else if(!/(.{8})/.test(password)){
        setError("length must be upper or equal to eight");
        return ;
    }
////////////////////////////////////////////////////
     signInWithEmailAndPassword(auth,email,password)
     .then(result  => {
        console.log('from success ');
          const loggedUser = result.user;
          console.log(loggedUser);
          if(!loggedUser.emailVerified){
            console.log('your email is not varified , your acoount will delete you do not Verified your email')
          }else {
            console.log('varified email , your account is safe now')
          }
          setSuccess('User login sccessfully ');
          setError('');
     } )
     .catch(error => {
        console.log('from error ')
        console.log(error.message.length);
        setError(error.message);

        //  setError('Wrong password OR Email')
     })



    };
    const handleResetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            alert('Please provite your email address to reset your password');
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then( ()=>{
            alert('Please check your email ')
        })
        .catch(e => {
            console.log(e);
            setError(e.message);
        })
    }
    return (
        <div> <p className='text-danger'>{error}</p>
        <p className='text-success'>{success}</p>
       
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3>Please Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input
                      type="text"
                      name='email'
                      ref={emailRef}
                      className="form-control"
                      id="username"
                      placeholder="Enter your Email"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      name='password'
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p><small>Foregt password ? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button> </small></p>
        <p><small>New to this website ? Please login <Link to="/register">Register</Link> </small></p>
       
      </div>
      </div>
    );
};

export default Login;



/// f1alakahmedshakib170@gmail.com
/// FFalak123