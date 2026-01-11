import express from 'express'
import path from 'path'
import { fileURLToPath } from "url"
import giftsRouter from './routes/gifts.js'

const app = express()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


app.use('/public', express.static('./public'))

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
})

app.use('/gifts', giftsRouter)


const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

