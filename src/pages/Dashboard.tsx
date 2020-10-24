import React, { useState, useEffect } from 'react'
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from 'react-router-dom'
import { FiAlertCircle, FiPower, FiMapPin, FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi'

import { useAuth } from '../contexts/auth'

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";
import '../styles/pages/dashboard.css'
import api from '../services/api';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    pending: boolean;
}

export default function Dashboard() {
    const { signOut } = useAuth();

    const [viewCadastro, setViewCadastro] = useState(true)
    const [orphanagesRegisted, setOrphanagesRegisted] = useState<Orphanage[]>([])
    const [orphanagesPending, setOrphanagesPending] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            const data = response.data as Orphanage[];

            const orphanagesRegister = data.filter(orphanage => {
                if (orphanage.pending)
                    return orphanage
            })

            const orphanagesPending = data.filter(orphanage => {
                if (!orphanage.pending) return orphanage
            })

            setOrphanagesRegisted(orphanagesRegister)
            setOrphanagesPending(orphanagesPending)
        })

    }, [])

    function handleSignOut() {
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
                    {viewCadastro ? orphanagesRegisted.map(orphanage => {
                        return (
                            <div className="card">
                                <Map
                                    center={[orphanage.latitude, orphanage.longitude]}
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
                                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                                </Map>

                                <div className="card-footer">
                                    <p>{orphanage.name}</p>
                                    <div>
                                        <Link to={`/orphanages/edit/${orphanage.id}`}>
                                            <FiEdit3 size={20} color="#12AFCB" />
                                        </Link>
                                        <Link to="/">
                                            <FiTrash size={20} color="#12AFCB" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : orphanagesPending.map(orphanage => {
                        return (
                            <div className="card">
                                <Map
                                    center={[orphanage.latitude, orphanage.longitude]}
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
                                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                                </Map>

                                <div className="card-footer">
                                    <p>{orphanage.name}</p>
                                    <div>
                                        <Link to={`/orphanages/pending/${orphanage.id}`} >
                                            <FiArrowRight size={20} color="#12AFCB" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}