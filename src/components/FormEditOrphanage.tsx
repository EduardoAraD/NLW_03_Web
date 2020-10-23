import React, { ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet'

import mapIcon from "../utils/mapIcon";

import '../styles/components/form-edit-orphanage.css';

interface PropsFormParams {
  position: {
    latitude: number;
    longitude: number
  };
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<File>;
  previewImages:Array<string>;
  setPosition(position: Object): void;
  setName(name: string): void;
  setAbout(about: string): void;
  setInstructions(instrucions: string): void;
  setOpeningHours(opening_hours: string): void;
  setOpenOnWeekends(open_on_weekends: boolean): void;
  setImages(images: Array<File>): void;
  setPreviewImages(previewImages: Array<string>): void;
}

export default function FormEditOrphanage({
  position, name, about, instructions, opening_hours, open_on_weekends, images, previewImages,
  setPosition, setName, setAbout, setInstructions, setOpeningHours, setOpenOnWeekends, setImages, setPreviewImages
}: PropsFormParams) {

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectedImagesPreview);

  }

  return (
    <form className="edit-orphanage-form">
      <fieldset>
        <legend>Dados</legend>

        <Map
          center={[position.latitude, position.longitude]}
          style={{ width: '100%', height: 280 }}
          zoom={15}
          onclick={handleMapClick}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {position.latitude !== 0 && (
            <Marker
              interactive={false}
              icon={mapIcon}
              position={[position.latitude, position.longitude]}
            />
          )}

        </Map>

        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
            onChange={event => setName(event.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
          <textarea
            id="name"
            maxLength={300}
            value={about}
            onChange={event => setAbout(event.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="images">Fotos</label>

          <div className="images-container">

            {previewImages.map(image => {
              return (
                <img key={image} src={image} alt={name} />
              )
            })}

            <label htmlFor="image[]" className="new-image">
              <FiPlus size={24} color="#15b6d6" />
            </label>
          </div>

          <input multiple onChange={handleSelectImages} type="file" id="image[]" />

        </div>
      </fieldset>

      <fieldset>
        <legend>Visitação</legend>

        <div className="input-block">
          <label htmlFor="instructions">Instruções</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={event => setInstructions(event.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="opening_hours">Horário de funcionamento</label>
          <input
            id="opening_hours"
            value={opening_hours}
            onChange={event => setOpeningHours(event.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="open_on_weekends">Atende fim de semana</label>

          <div className="button-select">
            <button
              type="button"
              className={open_on_weekends ? 'active' : ''}
              onClick={() => setOpenOnWeekends(true)}
            >Sim</button>
            <button
              type="button"
              className={!open_on_weekends ? 'active' : ''}
              onClick={() => setOpenOnWeekends(false)}
            >Não</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}