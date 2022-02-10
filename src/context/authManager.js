import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import PrivateRoute from "../components/auth/privateRoute";

import Axios from "axios";
import Home from "../components/pages/home";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import SendResetPassword from "../components/auth/sendResetPassword";
import ResetPassword from "../components/auth/resetPassword";
import ResetPasswordSuccessful from "../components/auth/resetPasswordSuccessful";
import ChangePassword from "../components/auth/changePassword";
import Header from "../components/layout/header";
import Orders from "../components/pages/orders";
import Order from "../components/pages/order";
import Quotes from "../components/pages/quotes";
import Quote from "../components/pages/quote";
import Profile from "../components/pages/profile";

import jwt from "jwt-decode";

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
        this.props.history.push("/login");
      })
      .catch((error) => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        this.props.history.push("/login");
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
    localStorage.setItem("user", JSON.stringify(user));
  };

  validateToken = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      let user = localStorage.getItem("user") || null;
      user = user ? JSON.parse(user) : null;
      let decodedToken = jwt(accessToken);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        // Refresh token
        if (refreshToken && user) {
          this.getNewToken(refreshToken, user);
        } else {
          console.log("No refresh");
          console.log("refreshToken && user", refreshToken && user);
        }
      } else {
        console.log("Valid token");
        if (user) {
          this.setState({
            user,
            authenticated: true,
            accessToken,
            refreshToken,
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  getNewToken = (refreshToken, user) => {
    Axios.post(process.env.REACT_APP_API_BASE_URL + "/api/user/refresh-token", {
      refreshToken,
    })
      .then((response) => {
        this.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        this.setUser({ user, authenticated: true });
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ error: error.message });
      });
  };

  componentDidMount() {
    this.validateToken();
  }

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
          <Route path="/password-send-reset" component={SendResetPassword} />
          <Route path="/password-reset/:token" component={ResetPassword} />
          <Route path="/password-change" component={ChangePassword} />
          <Route
            path="/password-success-reset"
            component={ResetPasswordSuccessful}
          />
          <Route path="/register" component={Register} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/:id" component={Order} />
          <Route path="/quotes" component={Quotes} />
          <Route path="/quote/:id" component={Quote} />
          <Route path="/profile" component={Profile} />
          {/* <PrivateRoute
            authenticated={this.state.authenticated}
            path="/orders"
            component={Orders}
          /> */}
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
