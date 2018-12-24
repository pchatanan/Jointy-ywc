import React, {useState, useContext} from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as ROUTE from '../../route/constant'
import { FirebaseContext } from '../Firebase';

import { useFormInput } from '../Hook'

const profileImg = "https://www.google.co.th/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwimquvmvrffAhUJQ48KHcIMBDYQjRx6BAgBEAU&url=https%3A%2F%2Fkooledge.com%2Fusers%2Fsign_up&psig=AOvVaw0w2ebEQg-dMKrX5tLFAA9Z&ust=1545707309223402"

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
        authUser.user.updateProfile({ // <-- Update Method here
          displayName: username.value,
          photoURL: profileImg
        }).then(() => {
          console.log("updateProfile success")
          firebase.writeUserData(authUser.user.uid, username.value, email.value, profileImg)
          .then(()=>{
            props.history.push(ROUTE.HOME);
          })
          .catch(error => {
            console.log(error);
            setError(error)
          });
        })
        .catch(error => {
          console.log(error);
          setError(error)
        });
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