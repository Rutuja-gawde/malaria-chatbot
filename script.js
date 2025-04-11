// Get DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const quickBtns = document.querySelectorAll('.quick-btn');

// Add initial bot message
addBotMessage("Hello! I'm your Malaria Health Assistant. Ask me about malaria symptoms, prevention, treatment, or anything else related to malaria.");

// Function to add user message to chat
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${timestamp}</div>
    `;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add bot message to chat
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedMessage = formatMessage(message);
    messageElement.innerHTML = `
        <div class="message-content">${formattedMessage}</div>
        <div class="message-time">${timestamp}</div>
    `;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to format message with HTML tags
function formatMessage(text) {
    let formatted = text.replace(/\n/g, '<br>');
    formatted = formatted.replace(/(\d+\.)\s(.+?)(<br>|$)/g, '<li>$2</li>');
    if (formatted.includes('<li>')) {
        formatted = '<ul>' + formatted + '</ul>';
    }
    return formatted;
}

// Function to handle user input
function handleUserInput() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    addUserMessage(message);
    userInput.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
        const response = getBotResponse(message);
        hideTypingIndicator();
        addBotMessage(response);
    }, 1000 + Math.random() * 1000);
}

// Typing indicator functions
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.id = 'typing-indicator';
    typingElement.classList.add('message', 'bot-message');
    typingElement.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatBox.appendChild(typingElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

// Function to generate bot responses
function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Malaria symptoms
    if (lowerCaseMessage.includes('symptom') || 
        lowerCaseMessage.includes('sign') || 
        lowerCaseMessage.includes('feel')) {
        return `Common malaria symptoms include:
- Fever and chills
- Headache
- Nausea and vomiting
- Muscle pain and fatigue
- Sweating

Symptoms usually appear 10-15 days after infection. Severe cases may cause:
- Anemia
- Seizures
- Organ failure`;
    }
    
    // Malaria transmission
    else if (lowerCaseMessage.includes('transmit') || 
             lowerCaseMessage.includes('spread') || 
             lowerCaseMessage.includes('get')) {
        return `Malaria spreads through:
1. Bite of infected Anopheles mosquitoes
2. Blood transfusion (rare)
3. Mother to unborn child

It does NOT spread through:
- Casual contact
- Food or water
- Toilet seats`;
    }
    
    // Malaria prevention
    else if (lowerCaseMessage.includes('prevent') || 
             lowerCaseMessage.includes('avoid') || 
             lowerCaseMessage.includes('protection')) {
        return `To prevent malaria:
1. Use insecticide-treated mosquito nets
2. Apply mosquito repellent (DEET or picaridin)
3. Wear long-sleeved clothing at dusk/dawn
4. Take antimalarial medication when traveling
5. Eliminate standing water near your home
6. Consider indoor residual spraying`;
    }
    
    // Malaria treatment
    else if (lowerCaseMessage.includes('treat') || 
             lowerCaseMessage.includes('medicine') || 
             lowerCaseMessage.includes('drug')) {
        return `Malaria treatment options:
- Artemisinin-based combination therapies (ACTs)
- Chloroquine (in some areas)
- Quinine with doxycycline
- Mefloquine or atovaquone-proguanil

⚠️ Important: Treatment depends on:
• Malaria type
• Severity
• Patient age
• Pregnancy status

Always consult a doctor for proper treatment.`;
    }
    
    // Malaria diagnosis
    else if (lowerCaseMessage.includes('diagnos') || 
             lowerCaseMessage.includes('test') || 
             lowerCaseMessage.includes('detect')) {
        return `Malaria diagnosis methods:
1. Microscopic blood smear test
2. Rapid diagnostic tests (RDTs)
3. Molecular tests (PCR)

Tests can:
- Confirm malaria
- Identify parasite species
- Determine parasite count
- Detect drug resistance`;
    }
    
    // High-risk areas
    else if (lowerCaseMessage.includes('risk') || 
             lowerCaseMessage.includes('area') || 
             lowerCaseMessage.includes('country')) {
        return `High-risk malaria regions:
🌍 Africa: Sub-Saharan countries
🌏 Asia: India, Indonesia, Myanmar
🌎 Americas: Amazon basin areas
🌏 Oceania: Papua New Guinea

Check <a href="https://www.who.int/malaria/travel-advice" target="_blank">WHO malaria maps</a> for current risk areas.`;
    }
    
    // Emergency warning
    else if (lowerCaseMessage.includes('emergency') || 
             lowerCaseMessage.includes('serious') || 
             lowerCaseMessage.includes('danger')) {
        return `🚨 Seek IMMEDIATE medical care for:
• High fever with confusion
• Multiple seizures
• Difficulty breathing
• Blood in urine
• Extreme weakness
• Loss of consciousness

Severe malaria can be fatal within 24 hours if untreated.`;
    }
    
    // Default response
    else {
        return `I'm here to help with malaria information. Try asking about:
- Symptoms and warning signs
- Prevention methods
- Treatment options
- High-risk areas

Or click one of the quick questions below.`;
    }
}

// Event listeners
sendBtn.addEventListener('click', handleUserInput);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Quick question buttons
quickBtns.forEach(button => {
    button.addEventListener('click', () => {
        userInput.value = button.textContent;
        handleUserInput();
    });
});
