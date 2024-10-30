import { getAllPerfil } from "../Model/PerfilModel.js";

const getPerfil = async (req, res) => {
    const { idUsuario } = req.query;
    try {
        const perfil = await getAllPerfil(idUsuario);
        res.status(200).json(perfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getPerfil };
