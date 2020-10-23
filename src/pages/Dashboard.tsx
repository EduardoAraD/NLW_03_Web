import React, { useState } from 'react'
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiAlertCircle, FiPower, FiMapPin, FiEdit3, FiTrash } from 'react-icons/fi'

import { useAuth } from '../contexts/auth'

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";
import '../styles/pages/dashboard.css'

export default function Dashboard() {
    const { signOut } = useAuth();

    const [viewCadastro, setViewCadastro] = useState(true)

    function handleSignOut(){
        signOut()
    }

    return (
        <div id="page-dashboard">
            <aside className="sidebar">
                <img src={mapMarkerImg} alt="Happy" />
                <div>
                    <button type="button" className={viewCadastro ? 'marker' : ''}
                        onClick={() => setViewCadastro(true)}>
                        <FiMapPin size={24} color={viewCadastro ? "#12AFCB" : "#FFF"} />
                    </button>
                    <button type="button" className={!viewCadastro ? 'marker' : ''}
                        onClick={() => setViewCadastro(false)}>
                        <FiAlertCircle size={24} color={!viewCadastro ? "#12AFCB" : "#FFF"} />
                    </button>
                </div>
                <footer>
                    <button type="button" onClick={handleSignOut}>
                        <FiPower size={24} color="#FFF" />
                    </button>
                </footer>
            </aside>
            <div className="content-page">
                <div className="title">
                    <h2>{viewCadastro ? "Orfanatos Cadastrados" : "Cadastros Pendentes"}</h2>
                    <p>2 orfanatos</p>
                </div>
                <div className="content-cards">
                    <div className="card">
                        <Map
                            center={[-3.7353647, -38.6634685]}
                            zoom={16}
                            style={{ width: '100%', height: 280 }}
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />
                            <Marker interactive={false} icon={mapIcon} position={[-3.7353647, -38.6634685]} />
                        </Map>

                        <div className="card-footer">
                            <p>Orfanato Baiano</p>
                            <div>
                                <a href="/">
                                    <FiEdit3 size={20} color="#12AFCB" />
                                </a>
                                <a href="/">
                                    <FiTrash size={20} color="#12AFCB" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}