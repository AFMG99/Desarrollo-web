import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getAllUsuarios } from "../Model/UsuariosModel.js";

const getAllUser = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export { getAllUser };