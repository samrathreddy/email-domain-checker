import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import path from 'path';
import { COST_PER_1M_INPUT_TOKENS, COST_PER_1M_OUTPUT_TOKENS } from '../constants/pricing.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fsPromises from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });



const dataDirectory = path.resolve(__dirname, '../data');

   // Set up your OpenAI API key
const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
   });
const openai = new OpenAIApi(configuration);

   async function loadResultsFromJson(filename) {
     const filePath = path.resolve(dataDirectory, filename);
     try {
       const data = await fsPromises.readFile(filePath, 'utf-8');
       return JSON.parse(data);
     } catch (error) {
       if (error.code === 'ENOENT') {
         // File not found, return an empty object
         return {};
       }
       throw error; // Re-throw other errors
     }
   }

   async function saveResultsToJson(filename, data) {
     const filePath = path.resolve(dataDirectory, filename);
     await fsPromises.writeFile(filePath, JSON.stringify(data, null, 4));
   }

   async function updateJsonWithResult(domain, filename = 'email_check_results.json') {
     const results = await loadResultsFromJson(filename);
     if (results[domain]) {
       results[domain] += 1;
     } else {
       results[domain] = 1;
     }

     saveResultsToJson(filename, results);
   }

   async function checkEmailProviderAi(domain) {
     console.log("Checking email provider for domain with OpenAI:", domain);
     const systemPrompt = "You are a strict AI that detects temporary email providers.";
     const userPrompt = `Is '${domain}' a temporary mail domain? Respond with 'true' or 'false'.`;

     try {
       const response = await openai.createChatCompletion({
         model: 'gpt-4o-mini',
         messages: [
           { role: 'system', content: systemPrompt },
           { role: 'user', content: userPrompt }
         ],
         temperature: 0,
       });

       const reply = response.data.choices[0].message.content.trim().toLowerCase();

       // Extract token usage
       const inputTokens = response.data.usage.prompt_tokens;
       const outputTokens = response.data.usage.completion_tokens;
       const totalTokens = response.data.usage.total_tokens;

       // Calculate token cost
       const inputCost = (inputTokens / 1_000_000) * COST_PER_1M_INPUT_TOKENS;
       const outputCost = (outputTokens / 1_000_000) * COST_PER_1M_OUTPUT_TOKENS;
       const totalCost = inputCost + outputCost;
       console.log(`Token Usage: ${inputTokens} (input), ${outputTokens} (output), ${totalTokens} (total)`);
       console.log(`Cost: $${totalCost.toFixed(8)} per request`);
       // Determine if the domain is a temporary email provider
       if (reply == 'true') {
         updateJsonWithResult(domain);
       }
       return reply;
     } catch (error) {
      console.error("Error checking email provider with OpenAI:", error);
       //console.error('Error checking email provider with OpenAI:', error);
       return null;
     }
   }

export { checkEmailProviderAi };