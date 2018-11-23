import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTE from '../../route/constant';
import { FirebaseContext, SessionContext } from '../Firebase';

const TopNavBar = props => {

  const firebase = useContext(FirebaseContext)
  const authUser = useContext(SessionContext)

  const SignOutButton = props => (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );

  const NavAuth = () => (
    <ul>
      <li>
        <Link to={ROUTE.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTE.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTE.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
  
  const NavNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTE.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTE.LOGIN}>Login</Link>
      </li>
    </ul>
  );
  
  return(
    <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div>
  )
};

export default TopNavBar;