import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import LandingLogo from '../components/LandingLogo'

import '../styles/pages/login.css'

export default function Login() {
    return (
        <div id="page-login">
            <LandingLogo />
            <div className="content-form">
                <Link to="/" className="to-back">
                    <FiArrowLeft size={20} color="rgba(21, 195, 214, 1)" />
                </Link>
                <div className="form-login">
                    <h2>Fazer login</h2>
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input type='password'
                            id="senha" />
                    </div>
                    <div className="content-check">
                        <label className="check-input">Lembre-me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <Link to="/forgot-password">
                            <p>Esqueci minha senha</p>
                        </Link>
                    </div>
                    <button className="button"
                        type="button"
                    >Entrar</button>
                </div>

            </div>

        </div>
    )
}