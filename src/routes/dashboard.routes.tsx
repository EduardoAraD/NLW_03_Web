import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard'
import EndPageDelete from '../pages/EndPageDelete'
import EditOrphanage from '../pages/EditOrphanage'
import PendingOrphanage from '../pages/PendingOrphanage'

function DashboardRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orphanage-delete" component={EndPageDelete} />
                <Route path="/orphanages/edit/:id" component={EditOrphanage} />
                <Route path="/orphanages/pending/:id" component={PendingOrphanage} />
                <Redirect to="/dashboard" />
            </Switch>
        </BrowserRouter>
    );
}

export default DashboardRoutes;