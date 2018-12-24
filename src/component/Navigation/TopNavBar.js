import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTE from '../../route/constant';
import { FirebaseContext, SessionContext } from '../Firebase';
import HamburgerMenu from 'react-hamburger-menu'
import BackIcon from './BackIcon'

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
    <div>
      <div style={{ textAlign: 'left', position: 'fixed', top: '0px', right: '0', zIndex: '90', minHeight: '100vh', width: '80%', backgroundColor: '#F25514' }}>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <img src="https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg" style={{ width: '80px', height: 'auto' }} />
        </div>
        <div style={{ padding: '30px' }}>
          <h3>Thunradee Sriudomporn</h3>
          <div>
            <Link to={ROUTE.CREATE_POST} onClick={() => setOpen(!open)}>Create new ty</Link>
          </div>
          <div>
            <Link to={ROUTE.LANDING} onClick={() => setOpen(!open)}>Jointee</Link>
          </div>

          <div>
            <Link to={ROUTE.LANDING} onClick={() => setOpen(!open)}>Jointer</Link>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <SignOutButton />
        </div>
      </div>
      <div onClick={() => setOpen(!open)} style={{ backgroundColor: 'rgba(0,0,0,0,.1)', position: 'fixed', top: '0px', right: '0', zIndex: '80', minHeight: '100vh', width: '100%', }}>
      </div>
    </div>
    // <ul>
    //   <li>
    //     <Link to={ROUTE.LANDING} onClick={() => setOpen(!open)}>Landing</Link>
    //   </li>
    //   <li>
    //     <Link to={ROUTE.CREATE_POST} onClick={() => setOpen(!open)}>Create Post</Link>
    //   </li>
    //   <li>
    //     <Link to={ROUTE.ACCOUNT} onClick={() => setOpen(!open)}>Account</Link>
    //   </li>
    //   <li>
    //     <SignOutButton />
    //   </li>
    // </ul>
  );

  const NavNonAuth = () => (
    <div>
      <div style={{ position: 'fixed', top: '0', right: '0', zIndex: '90' }}>
        <Link to={ROUTE.LANDING} onClick={() => setOpen(!open)}>HOME</Link>
        <Link to={ROUTE.LOGIN} onClick={() => setOpen(!open)}>Login</Link>
      </div>
      <div onClick={() => setOpen(!open)} style={{ backgroundColor: 'rgba(0,0,0,0,.1)', position: 'fixed', top: '0px', right: '0', zIndex: '80', minHeight: '100vh', width: '100%', }}>
      </div>
    </div>
    // <ul>
    //   <li>
    //     <Link to={ROUTE.LANDING} onClick={() => setOpen(!open)}>Landing</Link>
    //   </li>
    //   <li>
    //     <Link to={ROUTE.LOGIN} onClick={() => setOpen(!open)}>Login</Link>
    //   </li>
    // </ul>
  );

  const redirectBack = () => {
    props.history.goBack()
  }

  return (
    <div style={{ position: 'fixed', top: '0px', left: '0px', color: 'white', zIndex: '999', backgroundColor: 'white', width: '100%' }}>
      <button onClick={redirectBack} style={{ position: 'fixed', top: '0', left: '5px', color: 'white', background: 'none', border: 'none' }}>
        <BackIcon />
      </button>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: '999' }}>
        <HamburgerMenu
          isOpen={open}
          menuClicked={() => setOpen(!open)}
          width={18}
          height={15}
          strokeWidth={1.2}
          rotate={0}
          color='#e74c3c'
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
      {open ? <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div> : null}

    </div>
  )
};

export default withRouter(TopNavBar);