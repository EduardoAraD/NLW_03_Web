import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import api from '../services/api'
import '../styles/pages/edit-orphanage.css';

import FormEditOrphanage from '../components/FormEditOrphanage';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function EditOrphanage() {
  const history = useHistory();
  const params = useParams<OrphanageParams>();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [imagesFile, setImagesFile] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([])

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      const { name, latitude, longitude, about, instructions,
        opening_hours, open_on_weekends, images } = response.data as Orphanage;

      setPosition({ latitude, longitude })
      setName(name)
      setAbout(about)
      setInstructions(instructions)
      setOpeningHours(opening_hours)
      setOpenOnWeekends(open_on_weekends)

      const imagesUrl = images.map(image => image.url)
      setPreviewImages(imagesUrl)

    })
  }, [params.id])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('pending', 'true')

    imagesFile.forEach(image => {
      data.append('images', image);
    })

    await api.put(`orphanages/${params.id}`, data)

    history.push('/orphanage-done')
  }

  return (
    <div id="page-edit-orphanage">
      <SideBar />
      <div className="content-edit-page">
        <div className="title">
          <span>Editar perfil de {name}</span>
        </div>
        <main>
          <div className="edit-form-container">
            <FormEditOrphanage
              position={position} setPosition={setPosition}
              name={name} setName={setName}
              about={about} setAbout={setAbout}
              instructions={instructions} setInstructions={setInstructions}
              opening_hours={opening_hours} setOpeningHours={setOpeningHours}
              open_on_weekends={open_on_weekends} setOpenOnWeekends={setOpenOnWeekends}
              images={imagesFile} setImages={setImagesFile}
              previewImages={previewImages} setPreviewImages={setPreviewImages}
            />
            <button type="submit" onClick={handleSubmit}>
              Confirmar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
