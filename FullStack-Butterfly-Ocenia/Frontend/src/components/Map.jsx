//Para el componente de Mapa usamos la librearía de Leaflet https://leafletjs.com/
//Para eso tuvimos que instalarlo (npm install react-leaflet@next)
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; //Importamos los Hooks de leaflet que vamos a usar.
import 'leaflet/dist/leaflet.css'; // Importa el CSS de Leaflet
import L from 'leaflet';

const CLOUD_NAME = "da3higfux";
const CLOUDINARY_URL_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

const MapComponent = ({ butterflies }) => {

  // Este componente recibirá la lista de mariposas a mostrar
  return (
    <MapContainer 
      center={[-25.2744, 133.7751]} 
      zoom={4} 
      style={{ height: '500px', width: '100%' }}
    >
      {/* MapContainer es el contenedor principal del mapa. Lo centramos en Australia con un zoom inicial. */}
      {/* Es crucial darle una altura (height) para que sea visible. */}
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* TileLayer es la capa visual del mapa. Usamos OpenStreetMap, que es gratis y no necesita clave. */}

      {/* Recorremos la lista de mariposas y creamos un Marcador para cada una */}
      {butterflies.map(butterfly =>  {
        const TRANSFORMATIONS =
  "e_background_removal,w_250,h_250,c_pad,b_transparent,f_auto,q_auto";
  const TRANSFORMATIONS2 =
  "e_background_removal,w_100,h_100,c_pad,b_transparent,f_auto,q_auto";

        const imageUrl = `${CLOUDINARY_URL_BASE}/${TRANSFORMATIONS}/${butterfly.publicId}.png`;
        const imageUrl2 = `${CLOUDINARY_URL_BASE}/${TRANSFORMATIONS2}/${butterfly.publicId}.png`;
        const customIcon = new L.Icon({
          iconUrl: imageUrl,
          iconSize: [50, 50],
      });
      return (
        <Marker 
          key={butterfly.id} 
          position={[butterfly.coordinates.latitude, butterfly.coordinates.longitude]}
          icon ={customIcon}
        >
          <Popup>
            <img src={imageUrl2}></img><br/>
            <strong>{butterfly.commonName}</strong><br/>
            <em>{butterfly.scientificName}</em>
          
          </Popup>
        </Marker>
      );
    })}
    </MapContainer>
  );
};

export default MapComponent;