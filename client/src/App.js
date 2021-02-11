import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
// import Landing from './components/pages/Landing/Landing';
import Main from './components/pages/Main/Main';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Portfolio from './components/pages/Portfolio/Portfolio';
import Other from './components/pages/Other/Other';
import Profile from './components/Profile/Profile';
// import StartUp from './components/pages/StartUp/StartUp';
import News from './components/pages/News/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContextProvider } from './store';
import Auth from './Auth';

import './App.css';

function App() {
    return (
        <AppContextProvider>
            <Router>
                <div className="pl-0 pr-0 m-0 container-fluid">
                    <Navbar />
                    <Route exact path="/" component={Main} />
                    <div className="p-0 m-0 container-fluid">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/portfolio" component={Auth(Portfolio)} />
                        <Route exact path="/other" component={Other} />
                        <Route exact path="/news" component={News} />
                    </div>
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
