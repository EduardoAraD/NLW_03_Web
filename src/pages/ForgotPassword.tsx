import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import LandingLogo from '../components/LandingLogo'
import api from '../services/api'

import '../styles/pages/forgot-password.css'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')

    async function handleSubmit() {
        console.log(email)
        try {
            await api.post('/forgot_password', { email })

            alert('Você receberá um email para redefinir sua senha')

        } catch (err) {
            alert('Email invalido')
        }
    }

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
                        <input value={email}
                            id="email"
                            onChange={event => setEmail(event.target.value)} />
                    </div>
                    <button className="button"
                        type="button"
                        onClick={handleSubmit}
                    >Enviar</button>
                </div>
            </div>
        </div>
    )
}