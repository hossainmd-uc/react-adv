
import express from 'express'
import giftData from '../data/gifts.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const giftsRouter = express.Router()

giftsRouter.get('/', (req, res) => {
    console.log("Received Request")
    res.status(200).json(giftData)
})

giftsRouter.get('/:id', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))

})

export default giftsRouter