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

import store, { AppStateType } from './redux/redux-store';
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

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
type PropsType = MapPropsType & DispatchPropsType

const SuspendedDialogs = WithSuspense(DialogsContainer)
const SuspendedProfile = WithSuspense(ProfileContainer)

class App extends Component<PropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
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
            <Route path="/dialogs" render={ ()=> <SuspendedDialogs /> } />
            <Route
              path="/profile/:userId?"
              render={ () => <SuspendedProfile />}
            />
            <Route path="/users" render={ () => <UsersContainer pageTitle={'users'}/> } />
            <Route path="/login" render={ () => <LoginPage /> } />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />

            <Redirect exact from={'/'} to={'/profile'} />
            <Redirect exact from={'/Demo-SocialNetwork'} to={'/profile'} />

            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp: React.FC = () => {
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
