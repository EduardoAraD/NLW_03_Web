import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/auth'

import LandingLogo from '../components/LandingLogo'

import '../styles/pages/login.css'

export default function Login() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remind, setRemind] = useState(false)

    async function handleSubmitLogin() {
        const ok = await signIn(email, password, remind);
        if(!ok) {
            alert('Usuário/Senha inválida')
        }
    }

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
                            id="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input type='password'
                            id="senha"
                            value={password}
                            onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className="content-check">
                        <label className="check-input">Lembre-me
                            <input type="checkbox" checked={remind}
                                onChange={event => setRemind(event.target.checked)} />
                            <span className="checkmark"></span>
                        </label>
                        <Link to="/forgot-password">
                            <p>Esqueci minha senha</p>
                        </Link>
                    </div>
                    <button className="button"
                        type="button"
                        onClick={handleSubmitLogin}
                    >Entrar</button>
                </div>

            </div>

        </div>
    )
}