import React, { Component } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import './App.css';
import { WithSuspense } from './hoc/WithSuspense';

import store from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Preloader from './components/Common/Preloader/Preloader';
import Footer from './components/Footer/Footer';

// Lazy imports
const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

class App extends Component {
  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    alert('Occured some error');
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandleErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route path="/dialogs" render={WithSuspense(DialogsContainer)} />
            <Route
              path="/profile/:userId?"
              render={WithSuspense(ProfileContainer)}
            />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />

            <Redirect exact from={'/'} to={'/profile'} />

            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp = (props) => {
  return (
    <BrowserRouter>
      {/* <HashRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
