import openai
import json
import os
from constants.pricing import COST_PER_1M_INPUT_TOKENS, COST_PER_1M_OUTPUT_TOKENS
from dotenv import load_dotenv

load_dotenv()


# Set up your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def load_results_from_json(filename):
    """Load existing results from a JSON file."""
    if os.path.exists(filename):
        with open(filename, 'r') as json_file:
            return json.load(json_file)
    return {}

def save_results_to_json(filename, data):
    """Save results to a JSON file."""
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def update_json_with_result(domain, filename="email_check_results.json"):
    """Update the JSON file with the result of the email check."""
    # Load existing results
    results = load_results_from_json(filename)

    if domain in results:
        results[domain] += 1
    else:
        results[domain] = 1

    # Save updated results to a JSON file
    save_results_to_json(filename, results)

def check_email_provider(domain):
    system_prompt = "You are an Strict AI that detects temporary email providers."
    user_prompt = f"Is '{domain}' a temporary mail domain? Respond with 'Yes' or 'No'."

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0
    )

    # Extract the model's response
    reply = response.choices[0].message['content'].strip()
        # Extract token usage
    input_tokens = response["usage"]["prompt_tokens"]
    output_tokens = response["usage"]["completion_tokens"]
    total_tokens = response["usage"]["total_tokens"]

    # Calculate token cost
    input_cost = (input_tokens / 1_000_000) * COST_PER_1M_INPUT_TOKENS
    output_cost = (output_tokens / 1_000_000) * COST_PER_1M_OUTPUT_TOKENS
    total_cost = input_cost + output_cost
    print(f"Token Usage: {input_tokens} (input), {output_tokens} (output), {total_tokens} (total)")
    print(f"Cost: ${total_cost:.8f} per request")


    # Determine if the domain is a temporary email provider
    reply = reply.lower()
    if(reply == "yes"):
        update_json_with_result(domain)
    return reply