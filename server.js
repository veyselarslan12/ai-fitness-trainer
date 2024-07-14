require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const { OpenAI } = require('openai')

const app = express()
const port = 3001

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/fitness-trainer', async (req, res) => {
    const { prompt } = req.body

    if (!prompt) {
        return res.status(400).send('Prompt is required!!!')
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    'role': 'system',
                    'content': 'You are a helpful fitness trainer and based on person\'s information you will create fitness training advice.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            temperature: 0.5,
            max_tokens: 300,
            top_p: 1
        })

        console.log('Response from OpenAI API:', JSON.stringify(response))


    } catch (error) {
        res.status(500).send('Error generating fitness training advice')
    }
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})