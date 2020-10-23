import React from 'react'

import imgLandingDelete from '../images/landing-delete.svg'

import '../styles/pages/end-page.css'

export default function EndPageDelete() {
    return (
        <div id="page-end" className="page-delete">
            <div className="content-page">
                <h1>Excluir!</h1>
                <p>Você tem certeza que quer excluir o Orphanage Santa Monica?</p>

                <a href="/dashboard">
                    Voltar para o mapa
                </a>
            </div>
            <img src={imgLandingDelete} alt="Happy"/>
        </div>
    )
}