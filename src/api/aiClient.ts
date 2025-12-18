export type GeneratedAsset = {
  id: string;
  prompt: string;
  url: string;
};

export type GenerateRequest = {
  prompts: string[];
};

/**
 * Stubbed AI client for the demo.
 *
 * In a real integration, replace the implementation of `generateImages`
 * with calls to your image/video generation provider (e.g. OpenAI / DALL·E,
 * NanoBanana, etc.).
 */
export async function generateImages(
  request: GenerateRequest
): Promise<GeneratedAsset[]> {
  const { prompts } = request;

  // Simulate network latency so the loading state is visible in the UI.
  await new Promise((resolve) => setTimeout(resolve, 900));

  // TODO: Wire up to real provider API.
  // Example (pseudo-code):
  // const response = await fetch("https://api.your-provider.com/generate", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`
  //   },
  //   body: JSON.stringify({ prompts })
  // });
  // const data = await response.json();
  // return data.results;

  // For now, return placeholder images so the demo runs without any secrets.
  const placeholderBase = "https://images.pexels.com/photos";
  const placeholderIds = [
    "2690323/pexels-photo-2690323.jpeg",
    "1036856/pexels-photo-1036856.jpeg",
    "977567/pexels-photo-977567.jpeg",
    "994517/pexels-photo-994517.jpeg"
  ];

  return prompts.map((prompt, index) => {
    const id = `${Date.now()}-${index}`;
    const srcId = placeholderIds[index % placeholderIds.length];
    const url = `${placeholderBase}/${srcId}?auto=compress&cs=tinysrgb&w=800`;

    return {
      id,
      prompt,
      url
    };
  });
}



