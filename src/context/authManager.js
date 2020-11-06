import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from "../components/auth/privateRoute";

import Home from "../components/pages/home";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Header from "../components/layout/header";
import Orders from "../components/pages/orders";

// import decode from "jwt-decode";

import Axios from "axios";

export const AuthManagerContext = React.createContext();

class AuthManager extends Component {
  logout = () => {
    let refreshToken = localStorage.getItem("refreshToken");
    Axios.post(process.env.REACT_APP_API_BASE_URL + "/api/user/logout", {
      refreshToken,
    })
      .then(() => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        this.setState({
          authenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  setTokens = ({ accessToken, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    this.setState({ accessToken, refreshToken });
  };

  setUser = (user) => {
    this.setState({ user, authenticated: true });
  };

  state = {
    authenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,

    logout: this.logout,
    setTokens: this.setTokens,
    setUser: this.setUser,

    error: null,
  };

  render() {
    return (
      <AuthManagerContext.Provider value={this.state}>
        <Header />
        {this.state.error}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute
            authenticated={this.state.authenticated}
            path="/orders"
            component={Orders}
          />
        </Switch>
      </AuthManagerContext.Provider>
    );
  }
}

export default withRouter(AuthManager);

// const checkLoggedIn = async () => {
//   accessToken = localStorage.getItem("access_token");
//   refreshToken = localStorage.getItem("refresh_token");

//   if (!token || !refreshToken) {
//     return false;
//   }

//   try {
//     const payload = decode(refreshToken);
//     const exp = payload.exp;
//     if (Date.now() >= exp * 1000) {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };
