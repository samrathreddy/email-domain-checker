import { checkEmailProviderAi } from './openAi.js';
import { loadResultsFromJson, saveResultsToJson } from './jsonService.js';

async function updateJsonWithResult(domain, filename = 'email_check_results.json') {
  const results = await loadResultsFromJson(filename);
  if (results[domain]) {
    results[domain] += 1;
  } else {
    results[domain] = 1;
  }
  await saveResultsToJson(filename, results);
}

// With OpenAI
async function checkEmailProviderServiceAi(domain) {
  const isAiTemp = await checkEmailProviderAi(domain);
  console.log(isAiTemp);
  if (isAiTemp === 'true') {
    try{
      await updateJsonWithResult(domain);
    }catch(error){
      console.log(error);
    }
  }
  return isAiTemp;
}

export { checkEmailProviderServiceAi, updateJsonWithResult };