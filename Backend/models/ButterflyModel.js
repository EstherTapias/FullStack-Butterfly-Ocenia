// Importamos lo necesario
import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";

const ButterflyModel = db_connection.define('Butterfly', {
    // id de la mariposa
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true // Es el id principal
    },
    // nombre de la mariposa
    // Obligatorio
    commonName: {
        type: DataTypes.STRING, // para textos cortos
        allowNull: false
    },
    //nombre cientifico
    // Obligatorio
    scientificName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    //Familia
    // Obligatorio
    family:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //region de la mariposa
    // Region   
    region:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    //Locacion especifica
    specificLocation:{
        type: DataTypes.STRING,
        allowNull: true
    },
    //Habitad de la mariposa
    habitat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Tamaño de la ala de la mariposa (es un numero)
    wingspan:{
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    // Unidad de medida de la ala de la mariposa (cm, mm, m, etc)
    wingspanUnit:{ 
        type: DataTypes.STRING,
        allowNull: true
    }, 
    // descripcion de la mariposa
    description:{
        type: DataTypes.TEXT, // Para textos largos
        allowNull: true
    },
    // estado de conservacion de la mariposa
    conservationStatus:{
        type: DataTypes.STRING,
        allowNull: true
    },
    // Nivel de preocupacion
    // Obligatorio
    threatLevel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // cantidad actual de la mariposa
    population:{
        type: DataTypes.STRING, 
        allowNull: true
    },
    // Temporada de vuelo (es un array de 6 datos)
    flightSeason:{
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: true,
        // Getter para asegurar que siempre devuelve un array
        get() {
            const rawValue = this.getDataValue('flightSeason');
            if (!rawValue) return [];
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch {
                    return [rawValue];
                }
            }
            return Array.isArray(rawValue) ? rawValue : [rawValue];
        }
    },
    // Es una array de dos datos
    hostPlants:{
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: true,
        // Getter para asegurar que siempre devuelve un array
        get() {
            const rawValue = this.getDataValue('hostPlants');
            if (!rawValue) return [];
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch {
                    return [rawValue];
                }
            }
            return Array.isArray(rawValue) ? rawValue : [rawValue];
        }
    },
    // Es un array de 3 datos
    nectarSources:{
        type: DataTypes.JSON,
        defaultValue: [], 
        allowNull: true,
        // Getter para asegurar que siempre devuelve un array
        get() {
            const rawValue = this.getDataValue('nectarSources');
            if (!rawValue) return [];
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch {
                    return [rawValue];
                }
            }
            return Array.isArray(rawValue) ? rawValue : [rawValue];
        }
    },
    // Comportamiento de la mariposa (solo texto)
    behavior:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Coordenadas
    coordinates:{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
            latitude: 0, 
            longitude: 0
        }
    },
    // Color primario
    colorPrimary:{
        type: DataTypes.STRING, 
        allowNull: true
    },
    // Tag (es un array de 4 datos)
    tags:{
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: true,
        // Getter para asegurar que siempre devuelve un array
        get() {
            const rawValue = this.getDataValue('tags');
            if (!rawValue) return [];
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch {
                    return [rawValue];
                }
            }
            return Array.isArray(rawValue) ? rawValue : [rawValue];
        }
    },
    // Es para colocar la foto de la mariposa (se coloca como con uncodigo que le da cloudinary)
    publicId:{
        type: DataTypes.STRING, 
        allowNull: true
    }
});

export default ButterflyModel;