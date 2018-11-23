import React, {useState, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import { useFormInput } from '../Hook'

import {FirebaseContext} from '../Firebase'
import { RegisterLink } from './RegisterPage'

import * as ROUTE from '../../route/constant'

const LoginPage = props => (
  <div>
    <h1>Login</h1>
    <LoginForm />
    <RegisterLink />
  </div>
)

const LoginForm = withRouter(props => {
  const email = useFormInput('')
  const password = useFormInput('')
  const [error, setError] = useState(null)
  const firebase = useContext(FirebaseContext)
  
  const onSubmit = (e) => {

    firebase
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then(authUser => {
        console.log("successfully login!");
        props.history.push(ROUTE.HOME);
      })
      .catch(error => {
        console.log(error);
        setError(error)
      });

    e.preventDefault();

  }

  const isInvalid =
      password.value === '' ||
      email.value === ''

  return (
    <form onSubmit={onSubmit}>
        <input
          {...email}
          type="text"
          placeholder="Email Address"
        />
        <input
          {...password}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          login
        </button>
        {error && <p>{error.message}</p>}
    </form>
  );
})

export default LoginPage;