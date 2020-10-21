import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import LandingLogo from '../components/LandingLogo'

import '../styles/pages/forgot-password.css'

export default function ForgotPassword() {
    return (
        <div id="page-forgot">
            <LandingLogo />
            <div className="content-form">
                <Link to="/login" className="to-back">
                    <FiArrowLeft size={20} color="rgba(21, 195, 214, 1)" />
                </Link>
                <div className="form-forgot">
                    <h2>Esqueci a senha</h2>
                    <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email" />
                    </div>
                    <button className="button"
                        type="button"
                    >Enviar</button>
                </div>
            </div>
        </div>
    )
}