import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { connect, Provider } from 'react-redux';
import store from './redux/redux-store';
import { compose } from 'redux';
import Preloader from './components/Common/Preloader/Preloader';
import { WithSuspense } from './hoc/WithSuspense';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
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
        </div>
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
    <HashRouter>
      {/* <HashRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default MainApp;
