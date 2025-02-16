const HUGGING_FACE_API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
const MODEL_ID = process.env.NEXT_PUBLIC_HF_MODEL_ID;

export async function queryHuggingFace(text: string, speaker: string = "idera") {
  try {
    console.log('Making API request to:', `https://api-inference.huggingface.co/models/${MODEL_ID}`);
    
    // Create the prompt in the format expected by YarnGPT
    const prompt = `[${speaker.toUpperCase()}]: ${text}`;
    console.log('With prompt:', prompt);

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            temperature: 0.1,
            repetition_penalty: 1.1,
            max_length: 4000,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorData}`);
    }

    console.log('API request successful');
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
} 