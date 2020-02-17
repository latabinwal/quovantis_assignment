import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginView from './routes/login/LoginView';
import ErrorBoundary from './component/ErrorPage/ErrorBoundary';
import DashboardView from './routes/dashboard/DashboardView';
import Auth from './Auth';
import UserDetailView from './routes/userDetail/UserDetailView';

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={LoginView} />
              <PrivateRoute path="/dashboard" component={DashboardView} />
              <PrivateRoute path="/users/:id" component={UserDetailView} />
            </Switch>
          </ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  );
}

//create component for protected route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

export default App;
