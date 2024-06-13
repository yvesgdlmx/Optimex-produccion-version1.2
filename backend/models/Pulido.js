import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Pulido = db.define('pulidos', {
    name: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    mean: {
        type: DataTypes.TIME
    },
    median: {
        type: DataTypes.TIME
    },
    hits: {
        type: DataTypes.INTEGER
    },
    multi: {
        type: DataTypes.DECIMAL
    }, 
    shortest: {
        type: DataTypes.TIME
    },
    longest: {
        type: DataTypes.TIME
    },
    total: {
        type: DataTypes.TIME
    },
    stddev: {
        type: DataTypes.TIME
    },
    hour: {
        type: DataTypes.TIME
    },
    num: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false
    }
);

export default Pulido;