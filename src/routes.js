import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import New from './pages/New';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/new" component={New} />
                <Route path="/student/:ra_id" component={Student} />
                <Route path="/dashboard" component={Dashboard} />
                
            </Switch>
        </BrowserRouter>
    )
}