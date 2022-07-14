import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';

import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from './navigation/nav-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/Blog';
import PortfolioItem from './portfolio/portfolio-item';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from  './pages/no-match';
import PortfolioManager from './pages/portfolio-manager';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    })
  }

  checkLoginStatus() {
    
    return axios.get('https://api.devcamp.space/logged_in', { 
      withCredentials: true
    }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      // If loggedIn and status LOGGED_IN => return data
      // If loggedIn, status NOT_LOGGED_IN => update state
      // If not loggedIn and status LOGGED_IN => update state

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        })
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        })
      }
    }).catch(error => {
      console.log("Error", error)
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route path="/portfolio-manager" component={PortfolioManager} />
    ]
  }

  render() {
    return (
      <div className='container'>
        

        <Router>
            <div>
              <NavigationContainer 
                loggedInStatus={this.state.loggedInStatus}
                handleLogout={this.handleLogout}
              />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route 
                  path="/auth" 
                  render={props => (
                    <Auth
                      {...props}
                      handleSuccessfulLogin={this.handleSuccessfulLogin}
                      handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    />
                  )}  
                />

                <Route path="/about-me" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/blog" component={Blog} />
                {this.state.loggedInStatus === "LOGGED_IN" ? (
                  this.authorizedPages()
                ) : null}
                
                <Route
                 exact 
                 path="/portfolio/:slug" 
                 component={PortfolioDetail} 
                />
                <Route component={NoMatch} />
              </Switch>
          </div>
        </Router>

        {/* <PortfolioContainer /> */}
      </div>
    );
  }
}
