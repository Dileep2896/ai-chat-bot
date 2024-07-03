export const configureOpenAI = () => {
  const config = {
    apiKey: process.env.OPEN_AI_KEY,
    organization: process.env.OPEN_AI_ORG_ID,
  };
  return config;
};
