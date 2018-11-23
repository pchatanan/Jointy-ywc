import React, {useState, useContext} from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as ROUTE from '../../route/constant'
import { FirebaseContext } from '../Firebase';

import { useFormInput } from '../Hook'

const RegisterPage = props => (
  <div>
    <h1>Register</h1>
    <RegisterForm />
  </div>
)

const RegisterForm = withRouter(props => {
  const username = useFormInput('')
  const email = useFormInput('')
  const passwordOne = useFormInput('')
  const passwordTwo = useFormInput('')
  const [error, setError] = useState(null)
  const firebase = useContext(FirebaseContext)
  
  const onSubmit = (e) => {

    firebase
      .doCreateUserWithEmailAndPassword(email.value, passwordOne.value)
      .then(authUser => {
        console.log("successfully registered!");
        props.history.push(ROUTE.HOME);
      })
      .catch(error => {
        console.log(error);
        setError(error)
      });

    e.preventDefault();

  }

  const isInvalid =
      passwordOne.value !== passwordTwo.value ||
      passwordOne.value === '' ||
      email.value === '' ||
      username.value === ''

  return (
    <form onSubmit={onSubmit}>
      <input
          {...username}
          type="text"
          placeholder="Full Name"
        />
        <input
          {...email}
          type="text"
          placeholder="Email Address"
        />
        <input
          {...passwordOne}
          type="password"
          placeholder="Password"
        />
        <input
          {...passwordTwo}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          register
        </button>
        {error && <p>{error.message}</p>}
    </form>
  );
})

const RegisterLink = () => (
  <p>
    Don't have an account? <Link to={ROUTE.REGISTER}>Register</Link>
  </p>
);

export default RegisterPage;

export { RegisterForm, RegisterLink };