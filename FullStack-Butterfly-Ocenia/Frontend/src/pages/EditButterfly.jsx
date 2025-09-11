import FormButterfly from "../components/FormButterfly";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneButterfly, updateButterfly } from "../services/ButterflyServices";
import Swal from "sweetalert2";


const EditButterfly = ()=>{
  const { id } = useParams();
  const navigate = useNavigate();
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] =useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      console.log("informacion", fetchData)
      try {
        setLoading(true);
        setError(null);
        console.log("Cargando mariposa con ID:", id);

        const data = await getOneButterfly(id);
        console.log("Datos recibidos de la API", data)
        setButterfly(data);

      } catch (error) {
        console.error("Error al obtener la mariposa", error);
        setError("No se pudo cargar la mariposa");

        await Swal.fire({
          title:"Error",
          text: "No se pudo cargar la mariposa",
          icon: "error",
          confirmButtonText:"OK"
        });

    } finally {
      setLoading(false);
    }
  };
  if (id) {
    fetchData();
  }
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      setIsSubmitting(true);
      console.log("Datos a actualizar:", updatedData);

      const result = await updateButterfly(id, updatedData);
      console.log("Resultado de la actualización:", result);

      setButterfly(result);

      await Swal.fire({
        title: "Éxito", 
        text: "Mariposa actualizada correctamente",
        icon:"success",
        confirmButtonText:"OK"
    });

      navigate(`/viewbutterfly/${id}`)// volver a la butterflydetail
    
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar");
    }
    finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = () => {
    navigate(`/butterflylist`);
    isSubmitting (false)
  };

  if (loading) {
    return (
    <div className="loading">Cargando...</div>
    )
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>
    );
  }

    return (
      <>
      {butterfly ? (
        <FormButterfly
        initialData={butterfly}
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={handleCancel}/>
      ) : ( 
        <div className="error">
          <p>No se encontró la mariposa</p>
          <button onClick={() => navigate("/butterflylist")}>Volver</button>
        </div>
      )}
      </>
  );
}; 



export default EditButterfly;



