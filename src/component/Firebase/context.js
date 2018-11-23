import React, {Component, useContext} from 'react';

const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => {
  const firebase = useContext(FirebaseContext);
  return (
    <Component {...props} firebase={firebase} />
  )
};

const SessionContext = React.createContext(null);

const withAuthentication = Component => {
  class WithAuthentication extends Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return WithAuthentication;
};

export {FirebaseContext, SessionContext, withFirebase};