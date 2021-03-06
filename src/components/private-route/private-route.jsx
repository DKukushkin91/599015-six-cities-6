import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Path, AuthorizationStatus} from '../../constants';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const PrivateRoute = ({exact, path, render}) => {
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={Path.LOGIN}/>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
