import React, {Component, useContext} from 'react';

const MobxContext = React.createContext(null);

const withMobx = Component => props => {
  const mobx = useContext(MobxContext);
  return (
    <Component {...props} mobx={mobx} />
  )
};

export {MobxContext, withMobx};