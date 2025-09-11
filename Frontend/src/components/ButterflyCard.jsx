import "./ButterflyCard.css";
import Button from "./Button";
import { deleteButterfly } from '../services/ButterflyServices';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


// --- CONFIGURACIÓN DE CLOUDINARY ---
// ¡IMPORTANTE! Reemplaza 'tu-cloud-name-aqui' con tu Cloud Name real.

const CLOUD_NAME = "da3higfux";
const CLOUDINARY_URL_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// Estas son las transformaciones que le pedimos a Cloudinary.
// w_400 = ancho 400px, f_auto = formato automático, q_auto = calidad automática.
const TRANSFORMATIONS =
  "e_background_removal,w_250,h_250,c_pad,b_transparent,f_auto,q_auto";

// --- DEFINICIÓN DEL COMPONENTE ---
// Este es nuestro componente. Recibe un objeto "butterfly" con todos los datos.
const ButterflyCard = ({ butterfly, setLoading }) => {
const navigate = useNavigate();
  //const formRef = useRef(null);//referencia para el scroll automático

  // Construimos la URL completa de la imagen en Cloudinary
  const imageUrl = `${CLOUDINARY_URL_BASE}/${TRANSFORMATIONS}/${butterfly.publicId}.png`;

const handleEdit =()=>{
  //navegar al componente EditButterfly
  navigate(`/editbutterfly/${butterfly.id}`);
};


const handleView = () => {
  navigate(`/viewbutterfly/${butterfly.id}`);
};

  // Esto es lo que el componente mostrará en pantalla (es JSX, parece HTML).
  return (
    <div className="card">
      <img src={imageUrl} alt={`Imagen de ${butterfly.commonName}`} />
      <h2 className="card-title">{butterfly.commonName}</h2>
      <h3 className="card-subtitle">{butterfly.scientificName}</h3>
      <p className="card-description">{butterfly.description}</p>

      <Button 
      tooltip="Cargar información de la mariposa" 
      title="Ver Ficha" 
      action={handleView} />

      <Button
        tooltip="Actualizar Información Mariposa"
        title="Editar"
        action={handleEdit}
      />

      <Button
        tooltip="Eliminar esta Mariposa"
        title="Eliminar"
        action={async () => {
          const confirmation = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la mariposa.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#e63946',
            cancelButtonColor: '#7d8388ff',
          });
          if (confirmation.isConfirmed) {
            await deleteButterfly(butterfly.id);
            Swal.fire('La mariposa fue eliminada correctamente.').then(setLoading(true))
            // En lugar de recargar la página, mejor usar el callback
          }
        }}
      />
  </div>
  );
};

// Esta línea permite que otros archivos usen nuestro componente.
export default ButterflyCard;