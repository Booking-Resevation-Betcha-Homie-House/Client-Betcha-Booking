// Get DOM elements
const messageBox = document.getElementById('message-box');
const chatContainer = document.getElementById('chat-container');
const messageText = document.getElementById('message-text');
const sendMessageButton = document.getElementById('send-message');

// Set the message box to be closed by default
messageBox.style.display = 'none'; // Message box is hidden initially

// Toggle the visibility of the message box
document.getElementById('message-button').addEventListener('click', () => {
    messageBox.style.display = messageBox.style.display === 'none' ? 'flex' : 'none';
});

// Send message when the send button is clicked
sendMessageButton.addEventListener('click', () => {
    const message = messageText.value.trim();  // Get message from the text area

    if (message !== "") {
        // Create a user message element
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = message;

        // Append the user message to the chat container
        chatContainer.appendChild(userMessage);

        // Clear the input field
        messageText.value = '';

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Simulate a response from the other person after a short delay
        setTimeout(() => {
            const otherMessage = document.createElement('div');
            otherMessage.classList.add('message', 'other');
            otherMessage.textContent = "Got it! I'll get back to you soon.";
            chatContainer.appendChild(otherMessage);

            // Scroll to the bottom of the chat container
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000); // Adjust time delay to simulate chat (1000ms = 1 second)
    }
});
