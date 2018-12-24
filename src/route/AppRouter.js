import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as ROUTE from './constant'
import * as MAIN_PAGE from '../component/MainPage/MainPage'

import TopNavBar from '../component/Navigation/TopNavBar'

import { SessionContext, withFirebase } from '../component/Firebase/index'
import Mobx, { MobxContext, withMobx } from '../component/Mobx/index'

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        console.log(authUser);
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <MobxContext.Provider value={new Mobx()}>
        <BrowserRouter>
          <div>
            <SessionContext.Provider value={this.state.authUser}>
              <TopNavBar />
              <Route exact path={ROUTE.LANDING} component={MAIN_PAGE.LandingPage} />
              <Route exact path={ROUTE.LOGIN} component={MAIN_PAGE.LoginPage} />
              <Route exact path={ROUTE.REGISTER} component={MAIN_PAGE.RegisterPage} />
              <Route exact path={ROUTE.ACCOUNT} component={MAIN_PAGE.Account} />
              <Route exact path={ROUTE.CREATE_POST} component={MAIN_PAGE.CreatePostPage} />
              <Route path={ROUTE.STORE} component={MAIN_PAGE.StorePage} />
              <Route path={ROUTE.LOCATION} component={MAIN_PAGE.LocationPage} />
              <Route path={ROUTE.PROMOTION_DETAIL} component={MAIN_PAGE.VotePage} />
              <Route path={ROUTE.PROMOTION_POSTS} component={MAIN_PAGE.PostPage} />
              <Route path={ROUTE.POST_DETAIL} component={MAIN_PAGE.PostDetailPage} />
              <Route path={ROUTE.ARTICAL} component={MAIN_PAGE.ArticalPage} />
            </SessionContext.Provider>
          </div>
        </BrowserRouter>
      </MobxContext.Provider>
    )
  }
}

export default withMobx(withFirebase(AppRouter));