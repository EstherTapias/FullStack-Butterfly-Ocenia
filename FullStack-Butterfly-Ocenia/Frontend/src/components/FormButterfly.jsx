import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormButterfly.css";
import TagsInput from "./TagsInput/TagsInput.jsx";
import "../components/TagsInput/TagsInput.css";
import Button from "./Button.jsx";
import Swal from "sweetalert2";

const CLOUD_NAME = "da3higfux"; // Tu Cloud Name de Cloudinary
const UPLOAD_PRESET = "mariposas_unsigned"; // El nombre de tu "Unsigned Upload Preset"

const FormButterfly = ({ initialData = {}, onSubmit, onCancel, mode = "create" }) => {
    const fileInputRef = useRef(null);
    const [imageInputType, setImageInputType] = useState("url"); // Controla si se usa URL o subida de imagen
    const [isUploading, setIsUploading] = useState(false); // Estado para mostrar feedback de carga
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        //reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...initialData,
            tags: initialData.tags || [],
        }
    });
    //Libera el objeto cuando ya no se usa


    const imageFile = watch("imageFile");
    const publicId = watch("publicId");

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (imageFile && imageFile instanceof File) {
            const url = URL.createObjectURL(imageFile);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [imageFile]);

    const currentImage = imagePreview || (publicId ? (publicId.startsWith('http') ? publicId : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/${publicId}`) : null);

    const tagsValue = watch("tags") || [];


    //función que se ejecuta al eviar el forulario
    const handleFormSubmit = async (data) => {
        setIsUploading(true); // Empezamos la carga

        try {
            let finalData = { ...data };
            let imageToUpload = null;

            // Determinamos qué imagen subir: un archivo nuevo o una URL nueva.
            if (data.imageFile instanceof File) {
                imageToUpload = data.imageFile;
            } else if (data.publicId && data.publicId !== initialData.publicId && data.publicId.startsWith('http')) {
                imageToUpload = data.publicId;
            }

            // Si hay una imagen nueva para subir (archivo o URL)...
            if (imageToUpload) {
                console.log("Subiendo nueva imagen a Cloudinary...");
                const formData = new FormData();
                formData.append("file", imageToUpload);
                formData.append("upload_preset", UPLOAD_PRESET);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Error al subir la imagen a Cloudinary.");
                }

                const cloudinaryResponse = await response.json();
                console.log("Respuesta de Cloudinary:", cloudinaryResponse);

                // Actualizamos el publicId en nuestros datos finales
                finalData.publicId = cloudinaryResponse.public_id;
            }

            // Limpiamos el campo de archivo que ya no es necesario
            delete finalData.imageFile;

            console.log("Datos finales para enviar al backend:", finalData);

            // Llamamos a la función onSubmit del componente padre con los datos finales
            onSubmit?.(finalData);

        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            Swal.fire('Error', 'Hubo un problema al guardar la mariposa. ' + error.message, 'error');
        } finally {
            setIsUploading(false); // Terminamos la carga
        }
    };
    //maneja la selección manual de un archivo
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setValue("imageFile", file);
            setValue("publicId", "");
        }
    };
    //maneja el arrastrar la imagen
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setValue("imageFile", file);
            setValue("publicId", "");
        }
    };


    return (
        <div className="form-background">
            <div className="form-container">
                <div className="form-card">
                    <h1>{mode === "edit" ? "Editar Mariposa" : "Agregar nueva Mariposa"}</h1>
                    <h2>{mode === "edit" ? "Modifica la información existente" : "Documenta un nuevo avistamiento"}</h2>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-grid">
                            <label className="image-field">
                                Fotografía:
                                <div className="image-toggle-buttons">
                                    <button
                                        type="button"
                                        className={imageInputType === "file" ? "active" : ""}
                                        onClick={() => setImageInputType("file")}
                                    >
                                    <span className="upload-image"> 📸 Subir imagen</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={imageInputType === "url" ? "active" : ""}
                                        onClick={() => setImageInputType("url")}
                                    >
                                        <span className="paste-url">🔗 URL</span>
                                    </button>
                                </div>
                                <div className="image-input-container">
                                    {imageInputType === "url" && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Pega una URL de imagen"
                                                {...register("publicId")}
                                                onChange={(e) => {
                                                    setValue("publicId", e.target.value);
                                                    setValue("imageFile", null);
                                                }}
                                                className="image-url-input"
                                            />
                                        </>
                                    )}

                                    {imageInputType === "file" && (
                                        <>
                                            <div
                                                className="drop-area green-border"
                                                onDrop={handleDrop}
                                                onDragOver={(e) => e.preventDefault()}
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                {currentImage ? (
                                                    <img src={currentImage}  className="image-preview" />
                                                ) : (
                                                    <span>📸<br />Arrastra una imagen aquí o haz clic</span>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileSelect}
                                            />
                                        </>
                                    )}
                                </div>
                            </label>

                            <label htmlFor="commonName">
                                <span className="required-label">Nombre común:</span>
                                <input id="commonName" type="text" autoComplete="off" {...register("commonName", { required: "Este campo es obligatorio" })} />
                                {errors.commonName && <p className="error-message">{errors.commonName.message}</p>}
                            </label>

                            <label htmlFor="scientificName">
                                <span className="required-label">Nombre científico:</span>
                                <input id="scientificName" type="text" autoComplete="off" {...register("scientificName", { required: "Este campo es  obligatorio" })} />
                                {errors.scientificName && <p className="error-message">{errors.scientificName.message}</p>}
                            </label>

                            <label htmlFor="family">
                                <span className="required-label">Familia:</span>
                                <input id="family" type="text" autoComplete="off" {...register("family", { required: "Este campo es obligatorio" })} />
                                {errors.family && <p className="error-message">{errors.family.message}</p>}
                            </label>

                            <label htmlFor="region">
                                <span className="required-label">Región:</span>
                                <select id="region" type="text" autoComplete="off" {...register("region", { required: "Estecampo es obligatorio" })}>
                                    <option value="">Selecciona una región</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Nueva Zelanda">Nueva Zelanda</option>
                                    <option value="Islas del Pacífico">Islas del Pacífico</option>
                                </select>
                                {errors.region && <p className="error-message">{errors.region.message}</p>}
                            </label>
                            <label htmlFor="specificLocation">
                                Localización específica:
                                <input id="specificLocation" type="text" autoComplete="off" {...register("specificLocation")} />
                            </label>

                            <label htmlFor="habitat">
                                Hábitat:
                                <input id="habitat" type="text" autoComplete="off" {...register("habitat")} />
                            </label>

                            <label htmlFor="wingspan">
                                Envergadura (cm):
                                <input id="wingspan" type="text" autoComplete="off" {...register("wingspan")} />
                            </label>

                            <label htmlFor="description">
                                Descripción:
                                <input id="description" type="text" autoComplete="off" {...register("description")} />
                            </label>

                            <label htmlFor="conservationStatus">
                                Estado de conservación:
                                <input id="conservationStatus" type="text" autoComplete="off" {...register("conservationStatus")} />
                            </label>

                            <label htmlFor="threatLevel">
                                <span className="required-label">Nivel de amenaza:</span>
                                <select id="threatLevel" autoComplete="off" {...register("threatLevel", { required: "Este campo es obligatorio" })}>
                                    <option value="">Selecciona nivel de amenaza</option>
                                    <option value="vulnerable">Vulnerable</option>
                                    <option value="preocupación menor">Preocupación menor</option>
                                    <option value="en peligro crítico">En peligro crítico</option>
                                </select>
                                {errors.threatLevel && <p className="error-message">{errors.threatLevel.message}</p>}
                            </label>

                            <label htmlFor="population">
                                Población:
                                <input id="population" type="text" autoComplete="off" {...register("population")} />
                            </label>

                            <label htmlFor="flightSeason">
                                Temporada de vuelo:
                                <input id="flightSeason" type="text" autoComplete="off" {...register("flightSeason")} />
                            </label>

                            <label htmlFor="hostPlants">
                                Plantas anfitrionas:
                                <input id="hostPlants" type="text" autoComplete="off" {...register("hostPlants")} />
                            </label>

                            <label htmlFor="nectarSources">
                                Fuentes de néctar:
                                <input id="nectarSources" type="text" autoComplete="off" {...register("nectarSources")} />
                            </label>

                            <label htmlFor="behavior">
                                Comportamiento:
                                <input id="behavior" type="text" autoComplete="off" {...register("behavior")} />
                            </label>

                            <label htmlFor="coordinates-latitude">
                                Latitud (Coordinadas):
                                <input id="coordinates-latitude" type="text" autoComplete="off" {...register("coordinates.latitude")} />
                            </label>

                            <label htmlFor="coordinates-longitude">
                                Longitud (Coordinadas):
                                <input id="coordinates-longitude" type="text" autoComplete="off" {...register("coordinates.longitude")} />
                            </label>

                            <label htmlFor="colorPrimary">
                                Color principal:
                                <input id="colorPrimary" type="text" autoComplete="off" {...register("colorPrimary")} />
                            </label>

                            <label id="tags-label">
                                Etiquetas:
                                <TagsInput aria-labelledby="tags-label" autoComplete="off"
                                    value={tagsValue}
                                    onChange={(newTags) => setValue("tags", newTags, { shouldValidate: true, shouldDirty: true })}
                                />

                            </label>
                        </div>

                    <button type="submit" className="Button">
                        {mode === "edit" ? "Actualizar mariposa" : "Guardar mariposa"}
                    </button>
                    {mode === "edit" && (
                        <Button type="button" title="Cancelar" action={()=> onCancel?.()}>Cancelar</Button>
                    )}
                    
                </form>
            </div>
        </div>
        </div>
    );
};

export default FormButterfly;
