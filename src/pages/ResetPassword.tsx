import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'

import LandingLogo from '../components/LandingLogo'
import '../styles/pages/reset-password.css'

export default function ResetPassword() {

    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

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
                                id="password" />
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
                                id="confirmPassword" />
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
                    >Entrar</button>
                </div>
            </div>
        </div>
    )
}