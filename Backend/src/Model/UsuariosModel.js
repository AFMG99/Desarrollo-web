import { sql } from "../Config/Connection.js";
import bcrypt from "bcrypt";

const getAllUsuarios = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Usuarios');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

export { getAllUsuarios };
