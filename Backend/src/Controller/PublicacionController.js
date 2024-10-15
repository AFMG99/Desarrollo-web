import { getAllPublicaciones } from "../Model/PublicacionModel.js"

const getAllPublic = async ( req, res) => {
    try {
        const publicaciones = await getAllPublicaciones()
        res.json(publicaciones)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllPublic }