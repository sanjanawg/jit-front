// chatbot.js

// The function to send a user message and receive a bot response
function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const chatContainer = document.getElementById('chat-container');
  const chat = document.getElementById('chat');

  // Display user message
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message';
  userMessage.textContent = userInput;
  chat.appendChild(userMessage);

  // Get the bot response using the checkAllMessages function
  const botResponse = getResponse(userInput);

  // Display the bot response
  const botMessage = document.createElement('div');
  botMessage.className = 'chat-message bot';
  botMessage.textContent = botResponse;
  chat.appendChild(botMessage);

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Clear the user input field
  document.getElementById('user-input').value = '';
}

// Function to calculate the probability of a message matching predefined responses
function messageProbability(userMessage, recognisedWords, singleResponse = false, requiredWords = []) {
  // ... (No changes to this function)

}

// Function to check all predefined messages and determine the best match
function checkAllMessages(message) {
  const highestProbList = {};

  // Simplifies response creation / adds it to the dict
  function response(botResponse, listOfWords, singleResponse = false, requiredWords = []) {
      highestProbList[botResponse] = messageProbability(message, listOfWords, singleResponse, requiredWords);
  }

  // Responses -------------------------------------------------------------------------------------------------------
  response('Greetings to all! Ready for exciting conversations. What topics are you curious about today?', ['Hey', 'everyone', 'chatbot'], true, ['everyone', 'chatbot']);
  response('Awesome choice! Given the many layoffs happening, AI impact on jobs is a hot topic. Your thoughts?', ['chat', 'ai', 'concerns'], false, ['ai', 'concerns']);
  response('Indeed! With more bots like me joining the party, jobs might get a bit nervous. What is your playful take on the bot invasion?', ['absolutely', 'intriguing', 'impact'], false, ['absolutely', 'impact']);
  response('Touché! No coffee maker takeovers here, just a friendly bot. Should I practice barista skills?', ['resume', 'coffee', 'multiply', 'true'], false, ['coffee', 'resume']);
  response('Absolutely! This is not the end. Comment your thoughts, questions, suggestions. Let us build a vibrant community!👩‍💻🌐', ['fun', 'interacting', 'blast'], false, ['fun', 'interacting']);
  response('Eagerly waiting to see the code and dive into the explanations. Let the coding journey unfold! 🚀💻', ['next', 'explanation', 'way'], false, ['next', 'explanation']);
  response('tiger is the biggest cat weighing 800 pounds', ['tiger', 'national animal', 'india'], false, ['tiger']);

  // Longer responses
  response(long.R_ADVICE, ['give', 'advice'], false, ['advice']);
  response(long.R_EATING, ['what', 'you', 'eat'], false, ['you', 'eat']);

  const bestMatch = Object.keys(highestProbList).reduce((a, b) => highestProbList[a] > highestProbList[b] ? a : b);

  return highestProbList[bestMatch] < 1 ? long.unknown() : bestMatch;
}

// Function to get the response based on user input
function getResponse(userInput) {
  const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/);
  const response = checkAllMessages(splitMessage);
  return response;
}

// Testing the response system
// (Note: This will result in an infinite loop, adjust as needed for your application)
 while (true) {
    console.log('Bot: ' + getResponse(prompt('You: ')));
}