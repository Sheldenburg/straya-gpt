import { Configuration, OpenAIApi } from "openai";

const configuraiton = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuraiton)

export default openai