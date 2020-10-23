import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import EndPageDone from '../pages/EndPageDone'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:id" component={ResetPassword} />
                <Route path="/orphanage-done" component={EndPageDone} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;