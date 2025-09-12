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

  // Función helper para parsear arrays JSON de forma segura
  const parseJsonArray = (jsonString, fallback = "No disponible") => {
    if (!jsonString) return fallback;
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed.join(", ") : jsonString;
    } catch (e) {
      console.warn("Error parsing JSON:", jsonString);
      return jsonString || fallback;
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
        console.log("Tipo de datos:", typeof bfDetail);
        
        if (bfDetail) {
          setButterfly(bfDetail);
          console.log("Butterfly state actualizado:", bfDetail);
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
          <p>
            <strong>
              <i className="fa-solid fa-location-dot" style={{ marginRight: "8px" }}></i>
              Ubicación
            </strong>
          </p>
          <p>{butterfly.region || "No disponible"}, {butterfly.specificLocation || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-ruler" style={{ marginRight: "8px" }}></i>
              Tamaño
            </strong>
          </p>
          <p>{butterfly.wingspan || "No disponible"}{butterfly.wingspanUnit || ""}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-plane" style={{ marginRight: "8px" }}></i>
              Temporada de Vuelo
            </strong>
          </p>
          <p>{parseJsonArray(butterfly.flightSeason)}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "8px" }}></i>
              Estado de Conservación
            </strong>
          </p>
          <p>{butterfly.threatLevel || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-people-group" style={{ marginRight: "8px" }}></i>
              Población
            </strong>
          </p>
          <p>{butterfly.population || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-people-roof" style={{ marginRight: "8px" }}></i>
              Familia
            </strong>
          </p>
          <p>{butterfly.family || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-tree" style={{ marginRight: "8px" }}></i>
              Hábitat
            </strong>
          </p>
          <p>{butterfly.habitat || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-running" style={{ marginRight: "8px" }}></i>
              Comportamiento
            </strong>
          </p>
          <p>{butterfly.behavior || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-book" style={{ marginRight: "8px" }}></i>
              Descripción
            </strong>
          </p>
          <p>{butterfly.description || "No disponible"}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-seedling" style={{ marginRight: "8px" }}></i>
              Plantas Hospederas
            </strong>
          </p>
          <p>{parseJsonArray(butterfly.hostPlants)}</p>
          <br />

          <p>
            <strong>
              <i className="fa-solid fa-apple-whole" style={{ marginRight: "8px" }}></i>
              Fuente de Néctar
            </strong>
          </p>
          <p>{parseJsonArray(butterfly.nectarSources)}</p>
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