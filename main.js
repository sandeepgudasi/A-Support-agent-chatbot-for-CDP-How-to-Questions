document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const platformButtons = document.querySelectorAll('.platform-btn');

    let currentPlatform = 'segment';

    // Platform selection
    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            platformButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPlatform = button.dataset.platform;
        });
    });

    // Add clearChat function
    const clearChat = () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <i class="fas fa-robot"></i>
                <div class="message-content">
                    Hello! I'm your CDP Assistant. How can I help you today?
                </div>
            </div>
        `;
    };

    // Send message function
    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message === '') return;

        // Check for clear chat command
        if (message.toLowerCase() === 'clear chat') {
            clearChat();
            userInput.value = '';
            return;
        }

        // Add user message
        addMessage(message, 'user');
        
        // Get chatbot response
        const response = chatbot.getResponse(message, currentPlatform);
        
        // Add bot message with typing animation
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 1000);

        userInput.value = '';
    };

    // Add message to chat
    const addMessage = (message, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const icon = document.createElement('i');
        icon.className = type === 'bot' ? 'fas fa-robot' : 'fas fa-user';

        const content = document.createElement('div');
        content.className = 'message-content';
        
        if (type === 'bot') {
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            for (let i = 0; i < 3; i++) {
                typingIndicator.appendChild(document.createElement('span'));
            }
            content.appendChild(typingIndicator);
            
            // Simulate typing
            setTimeout(() => {
                content.innerHTML = message.replace(/\n/g, '<br>');
            }, 1500);
        } else {
            content.textContent = message;
        }

        if (type === 'user') {
            messageDiv.appendChild(content);
            messageDiv.appendChild(icon);
        } else {
            messageDiv.appendChild(icon);
            messageDiv.appendChild(content);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}); 