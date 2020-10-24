import React, { useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'

import LandingLogo from '../components/LandingLogo'
import '../styles/pages/reset-password.css'
import api from "../services/api";

interface ParamsResetParams{
    id: string;
}

export default function ResetPassword() {
    const params = useParams<ParamsResetParams>();
    const history = useHistory();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    async function handleSubmit(){
        try{
            await api.post('/reset_password',{ password, confirmPassword, token: params.id})

            alert('Sua nova senha foi registrada com sucesso!')

            history.push('/login')
        } catch(err) {
            alert(err.response.data.error)
        }
    }

    return (
        <div id="page-reset">
            <LandingLogo />
            <div className="content-form">
                <Link to="/" className="to-back">
                    <FiArrowLeft size={20} color="rgba(21, 195, 214, 1)" />
                </Link>
                <div className="form-reset">
                    <h2>Redefinição de senha</h2>
                    <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
                    <div className="input-block">
                        <label htmlFor="password">Nova Senha</label>
                        <div>
                            <input type={visiblePassword ? 'text' : 'password'}
                                value={password}
                                id="password"
                                onChange={event => setPassword(event.target.value)} />
                            <span className="lnr-eye"
                                onClick={() => { setVisiblePassword(!visiblePassword) }} >
                                { visiblePassword? (
                                    <FiEyeOff size={24} color="rgba(21, 195, 214, 1)" />
                                ) : (
                                    <FiEye size={24} color="rgba(0, 0, 0, 0.3)" />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="input-block">
                        <label htmlFor="confirmPassword">Repetir senha</label>
                        <div>
                            <input type={visibleConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)} />
                            <span className="lnr-eye"
                                onClick={() => { setVisibleConfirmPassword(!visibleConfirmPassword) }} >
                                { visibleConfirmPassword? (
                                    <FiEyeOff size={24} color="rgba(21, 195, 214, 1)" />
                                ) : (
                                    <FiEye size={24} color="rgba(0, 0, 0, 0.3)" />
                                ) }
                            </span>
                        </div>
                    </div>
                    <button className="button"
                        type="button"
                        onClick={handleSubmit}
                    >Entrar</button>
                </div>
            </div>
        </div>
    )
}