import { getRespuestaPorPublicacion } from "../Model/RespuestaModel.js";

const getRespuestas = async (req, res) => {
    const { idPublicacion } = req.query
    try {
        const respuestas = await getRespuestaPorPublicacion(idPublicacion)
        res.json(respuestas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getRespuestas }