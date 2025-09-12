import './ButterflyDetail.css'
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getOneButterfly } from '../services/ButterflyServices';
import Button from '../components/Button';

const ButterflyDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔧 Helper para manejar arrays que vienen como JSON o directamente como array
  const formatArray = (data) => {
    if (!data) return "No disponible";

    if (Array.isArray(data)) {
      return data.join(", ");
    }

    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed.join(", ") : data;
    } catch {
      return data; // fallback si no es array ni JSON
    }
  };

  useEffect(() => {
    const DetailButterfly = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Obteniendo mariposa con ID:", id);
        const bfDetail = await getOneButterfly(id);
        
        console.log("Datos recibidos:", bfDetail);
        
        if (bfDetail) {
          setButterfly(bfDetail);
        } else {
          setError("No se encontraron datos de la mariposa");
        }
      } catch (error) {
        console.error("Error al obtener mariposa:", error);
        setError("Error al cargar la mariposa");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      DetailButterfly();
    }
  }, [id, location.key]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando mariposa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <Button 
          type="button" 
          title="Volver" 
          action={() => navigate("/butterflylist")} 
        />
      </div>
    );
  }

  if (!butterfly) {
    return (
      <div className="error-container">
        <p>Mariposa no encontrada</p>
        <Button 
          type="button" 
          title="Volver" 
          action={() => navigate("/butterflylist")} 
        />
      </div>
    );
  }

  const imageUrl = `https://res.cloudinary.com/da3higfux/image/upload/e_background_removal,w_400,h_400,c_pad,b_transparent,f_auto,q_auto/${butterfly.publicId}.png`;

  return (
    <div className="butterflyDetailWrapper">
      <div className="detailWindow">
        <div className="detailHeader">
          <h1>{butterfly.commonName || "Nombre no disponible"}</h1>
          <h3>{butterfly.scientificName || "Nombre científico no disponible"}</h3>
          {butterfly.publicId && (
            <img 
              src={imageUrl} 
              alt={butterfly.commonName || "Mariposa"} 
              className="butterflyImage" 
            />
          )}
        </div>
        
        <div className="detailList">
          <p><strong><i className="fa-solid fa-location-dot"></i> Ubicación</strong></p>
          <p>{butterfly.region || "No disponible"}, {butterfly.specificLocation || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-ruler"></i> Tamaño</strong></p>
          <p>{butterfly.wingspan || "No disponible"} {butterfly.wingspanUnit || ""}</p>
          <br />

          <p><strong><i className="fa-solid fa-plane"></i> Temporada de Vuelo</strong></p>
          <p>{formatArray(butterfly.flightSeason)}</p>
          <br />

          <p><strong><i className="fa-solid fa-triangle-exclamation"></i> Estado de Conservación</strong></p>
          <p>{butterfly.threatLevel || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-people-group"></i> Población</strong></p>
          <p>{butterfly.population || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-people-roof"></i> Familia</strong></p>
          <p>{butterfly.family || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-tree"></i> Hábitat</strong></p>
          <p>{butterfly.habitat || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-running"></i> Comportamiento</strong></p>
          <p>{butterfly.behavior || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-book"></i> Descripción</strong></p>
          <p>{butterfly.description || "No disponible"}</p>
          <br />

          <p><strong><i className="fa-solid fa-seedling"></i> Plantas Hospederas</strong></p>
          <p>{formatArray(butterfly.hostPlants)}</p>
          <br />

          <p><strong><i className="fa-solid fa-apple-whole"></i> Fuente de Néctar</strong></p>
          <p>{formatArray(butterfly.nectarSources)}</p>
          <br />

          <p><strong><i className="fa-solid fa-tags"></i> Tags</strong></p>
          <p>{formatArray(butterfly.tags)}</p>
          <br />

          <div className="button-container">
            <Button 
              type="button" 
              title="Volver" 
              action={() => navigate("/butterflylist")} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButterflyDetail;