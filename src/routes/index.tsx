import React from 'react'

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'
import DashboardRoutes from './dashboard.routes'

function Routes() {
    const { signed } = useAuth();

    return signed ? <DashboardRoutes /> : <AppRoutes />
}

export default Routes;