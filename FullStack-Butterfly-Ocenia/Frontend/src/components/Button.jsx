import "./Button.css";
import React, {useState} from "react";

const Button = ({ title, action, tooltip, type = "button"}) => {

    const [loading, setLoading] = useState(false);
    

    const handleClick = async () => {
        //console.log("test" + title);
        
        if (!action) return;

        setLoading(true);

        try {
            const result = await action();//Ejecuta el metodo CRUD recibido como prop
            console.log(result);

        } catch (error){
            console.error(error);

        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
            <button title={tooltip} type={type} onClick={handleClick} disabled={loading}>
            {loading ? 'Cargando ...': title}
            </button>
        </>
    )}

export default Button