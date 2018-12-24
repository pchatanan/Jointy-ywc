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
        <Link to={ROUTE.CREATE_POST}>Create Post</Link>
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
    <div style={{ position: 'fixed', top: '0px', left: '0px', backgroundColor: 'white', width: '100%' }}>
      <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
        <HamburgerMenu
          isOpen={open}
          menuClicked={() => setOpen(!open)}
          width={18}
          height={15}
          strokeWidth={1.2}
          rotate={0}
          color='white'
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
      {open ? <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div> : null}

    </div>
  )
};

export default TopNavBar;