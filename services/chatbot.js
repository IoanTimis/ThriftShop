const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function ruleBasedReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes('orar')) return 'Suntem deschiși între 10:00 și 18:00.';
  if (msg.includes('retur')) return 'Retur în 14 zile cu bonul fiscal.';
  return null;
}

async function getBotReply(message) {
  const ruleReply = ruleBasedReply(message);
  if (ruleReply) return ruleReply;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('GPT error:', error.message);
    return 'Îmi pare rău, a apărut o eroare la răspunsul AI.';
  }
}

module.exports = { getBotReply };
