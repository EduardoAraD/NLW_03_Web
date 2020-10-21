import React from 'react'

import logoImg from '../images/logotipo.svg'
import '../styles/components/landing-logo.css'

export default function LandingLogo() {
    return (
        <div className="content-landing">
            <img src={logoImg} alt="Happy" />

            <div className="location">
                <strong>Ceará</strong>
                <span>Caucaia</span>
            </div>
        </div>
    )
}