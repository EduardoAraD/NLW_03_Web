import React from 'react'

import imgLandingCadastro from '../images/landing-cadastro.svg'

import '../styles/pages/end-page.css'

export default function EndPageDone() {
    return (
        <div id="page-end" className="page-done">
            <div className="content-page">
                <h1>Ebaaa!</h1>
                <p>O cadastro deu certo e foi enviado ao admistrador para ser aprovado.</p>
                <p>Agora é só esperar :)</p>

                <a href="/app">
                    Voltar para o mapa
                </a>
            </div>
            <img src={imgLandingCadastro} alt="Happy" />
        </div>
    )
}