import { useState } from "react";
import FormButterfly from "../components/FormButterfly";
import { createButterfly } from "../services/ButterflyServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateButterfly = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log("Datos recibidos del formulario:", formData);

      // Preparar los datos para enviar (Axios maneja FormData automáticamente)
      let dataToSend;

      if (formData.imageFile && formData.imageFile instanceof File) {
        // Si hay un archivo de imagen, crear FormData
        dataToSend = new FormData();
        
        // Agregar todos los campos al FormData
        Object.keys(formData).forEach(key => {
          if (key === 'tags' && Array.isArray(formData[key])) {
            // Para arrays, enviar cada elemento por separado
            formData[key].forEach((tag, index) => {
              dataToSend.append(`tags[${index}]`, tag);
            });
          } else if (key === 'coordinates' && formData[key] && typeof formData[key] === 'object') {
            // Para coordenadas, enviar cada propiedad por separado
            if (formData[key].latitude) {
              dataToSend.append('coordinates[latitude]', formData[key].latitude);
            }
            if (formData[key].longitude) {
              dataToSend.append('coordinates[longitude]', formData[key].longitude);
            }
          } else if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            dataToSend.append(key, formData[key]);
          }
        });
      } else {
        // Si no hay archivo, enviar como objeto normal (Axios enviará como JSON)
        dataToSend = {};
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            dataToSend[key] = formData[key];
          }
        });
        
        // Remover imageFile si está vacío
        if (!dataToSend.imageFile) {
          delete dataToSend.imageFile;
        }
      }

      console.log("Datos procesados para enviar:", dataToSend);

      // Tu servicio createButterfly ya usa Axios
      const newButterfly = await createButterfly(dataToSend);
      console.log("Mariposa creada exitosamente:", newButterfly);

      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "¡Éxito!",
        text: "Mariposa creada correctamente",
        icon: "success",
        confirmButtonText: "OK"
      });

      // Navegar a la ruta correcta (ajusta según tu aplicación)
      navigate("/butterflylist", { 
        state: { 
          created: true, 
          butterflyId: newButterfly.id || newButterfly._id,
          message: "Nueva mariposa agregada correctamente"
        } 
      });

    } catch (error) {
      console.error("Error al crear mariposa:", error);
      
      // Mostrar error específico al usuario
      let errorMessage = "No se pudo crear la mariposa. Por favor, verifica los datos e intenta de nuevo.";
      
      // Axios pone los errores del servidor en error.response
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      await Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Volver a la lista sin crear
    navigate("/");
  };

  return (
    <div>
      {isSubmitting && (
        <div>
          Creando mariposa...
        </div>
      )}
      
      <FormButterfly 
        onSubmit={handleCreate} 
        onCancel={handleCancel}
        mode="create" 
      />
    </div>
  );
};

export default CreateButterfly;


