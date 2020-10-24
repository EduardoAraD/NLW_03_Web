import React, { useState, useEffect } from 'react'
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link, useHistory } from 'react-router-dom'
import { FiAlertCircle, FiPower, FiMapPin, FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi'

import { useAuth } from '../contexts/auth'
import Orphanage from './Orphanage';
import NotOrphanage from '../components/NotOrphanage';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";
import '../styles/pages/dashboard.css'
import api from '../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    pending: boolean;
}

export default function Dashboard() {
    const history = useHistory();
    const { signOut } = useAuth();

    const [viewCadastro, setViewCadastro] = useState(true)
    const [orphanagesRegisted, setOrphanagesRegisted] = useState<Orphanage[]>([])
    const [orphanagesPending, setOrphanagesPending] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            const data = response.data as Orphanage[];

            const orphanagesRegister = data.filter( orphanage => orphanage.pending )

            const orphanagesPending = data.filter(orphanage => !orphanage.pending )

            setOrphanagesRegisted(orphanagesRegister)
            setOrphanagesPending(orphanagesPending)
        })

    }, [])

    function handleSignOut() {
        signOut()
    }

    async function handleDelete(id: number) {
        try{
            await api.delete(`/orphanages/${id}`)

            history.push('/orphanage-delete')
        } catch(e) {
            alert('Não foi possível fazer a remoção do orfanato.')
        }
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
                    <p>{viewCadastro ? orphanagesRegisted.length : orphanagesPending.length} orfanatos</p>
                </div>
                <div className={viewCadastro? (
                    orphanagesRegisted.length > 0 ? "content-cards" : "content-not-orphanage"
                ): (
                    orphanagesPending.length > 0 ? "content-cards" : "content-not-orphanage"
                )} >
                    {viewCadastro ? (
                        orphanagesRegisted.length ?
                            orphanagesRegisted.map(orphanage => {
                                return (
                                    <div className="card" key={orphanage.id}>
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
                                                <button type="button" 
                                                    onClick={() => handleDelete(orphanage.id)}>
                                                    <FiTrash size={20} color="#12AFCB" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <NotOrphanage />
                    ) : (
                            orphanagesPending.length ? orphanagesPending.map(orphanage => {
                                return (
                                    <div className="card" key={orphanage.id} >
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
                            }) : <NotOrphanage />
                        )
                    }
                </div>
            </div>
        </div>
    )
}