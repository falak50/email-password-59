import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
 const auth = getAuth(app);
const Register = () => {
    const [error,setError] = useState('')
    const [email,setEmail]= useState('');
    const [success,setSuccess]= useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setSuccess(''); // no need 
        setError('');
        // e.target.email.value='';
        // e.target.password.value='';
    //   console.log('email: ',email);  
    //   console.log('password: ',password);  
   // password checking 
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

        //create user with firebase

        createUserWithEmailAndPassword(auth,email,password)
        .then((result) => {
            // Signed in 
            console.log('i th createa app')
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            // event.tager.reset();
            e.target.reset();
            setSuccess('User has been created Successfully')
            sendVerification(loggedUser);
          })
          .catch(e => {
           console.log(e.message);
            setError(e.message);
            setSuccess('')
          });
        
        

    }

    const sendVerification = (user) => {
        // sendEmailVerification
        console.log('from sendVerificatio')
        console.log(email);
        sendEmailVerification(user)
        .then(r => {
            console.log(r);
            alert('please varify your email address');
        })
    }

    const handleEmailChange = (e) => {
    // console.log(e.target.value);
     setEmail(e.target.value);
    }
    const handlePasswordBluer = (e) => {
 //       console.log(e.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h4>please register</h4>
    
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="id" placeholder='Your email ' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBluer} type="password" name='password' placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>If YOU ALREADY REGISTER GO TO login page  <Link to="/login">Login</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;