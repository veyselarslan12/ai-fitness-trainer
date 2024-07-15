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
    const { workoutPrompt } = req.body

    if (!workoutPrompt) {
        return res.status(400).send('Prompt is required!!!')
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    'role': 'system',
                    'content': 'You are a helpful fitness trainer and based on person\'s information you will create a fitness training workout plan.'
                },
                {
                    'role': 'user',
                    'content': workoutPrompt
                }
            ],
            temperature: 0.5,
            max_tokens: 300,
            top_p: 1
        })

        console.log('Response from OpenAI API:', JSON.stringify(response))
        if (response && response.choices && response.choices.length > 0) {
            res.json(response.choices[0].message);
        } else {
            res.status(500).send('No valid response from OpenAI');
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Error generating fitness training advice')
    }
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})