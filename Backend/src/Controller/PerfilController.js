import { getAllPerfil } from "../Model/PerfilModel.js";

const getPerfil = async (req, res) => {
    try {
        const perfil = await getAllPerfil();

        if (perfil.length > 0) {
            res.status(200).json(perfil);
        } else {
            res.status(404).json({ message: "Perfil no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getPerfil };
