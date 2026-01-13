
import express from 'express'

// import path from 'path'
// import { fileURLToPath } from 'url'

import { GiftsController } from '../controllers/gifts.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const giftsRouter = express.Router()

giftsRouter.get('/', GiftsController.getAllGifts)

giftsRouter.get('/:id', GiftsController.getSpecificGift)

export default giftsRouter