import React from 'react'

import img from '../images/logo-gray.svg'
import '../styles/components/not-orphanage.css'

function NotOrphanage() {
    return (
        <div className="not-orphanage">
            <img src={img} alt="Not Orphanage" />
            <p>Nenhum no momento</p>
        </div>
    )
}

export default NotOrphanage;