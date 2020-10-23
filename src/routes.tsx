import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import EndPageDone from './pages/EndPageDone'
import EndPageDelete from './pages/EndPageDelete'
import EditOrphanage from './pages/EditOrphanage'
import PendingOrphanage from './pages/PendingOrphanage'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:id" component={ResetPassword} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orphanage-done" component={EndPageDone} />
                <Route path="/orphanage-delete" component={EndPageDelete} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/edit/:id" component={EditOrphanage} />
                <Route path="/orphanages/pending/:id" component={PendingOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;