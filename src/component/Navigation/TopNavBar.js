import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTE from '../../route/constant';
import { FirebaseContext, SessionContext } from '../Firebase';
import HamburgerMenu from 'react-hamburger-menu'

const TopNavBar = props => {
  const [open, setOpen] = useState(false)
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

  return (
    <div>
      <HamburgerMenu
        isOpen={open}
        menuClicked={() => setOpen(!open)}
        width={18}
        height={15}
        strokeWidth={1}
        rotate={0}
        color='black'
        borderRadius={0}
        animationDuration={0.5}
      />
      {open ? <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div> : null}

    </div>
  )
};

export default TopNavBar;