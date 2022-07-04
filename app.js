const messageTypes = {LEFT: 'left', RIGHT: 'right', LOGIN: 'login'};

//Chat stuff
const chatWindow = document.getElememntById('chat');
const messagesList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//Login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = [
    // {author: 'james quick', 
    //  date: '11/11/2018', 
    //  content: 'cool message', 
    //  type: messageTypes.RIGHT
    // },
    // {
    //     author: 'james quick',
    //     date: '11/11/2018',
    //     content: 'cool message',
    //     type: messageTypes.LEFT
    // },
    // {
    //     author: 'james quick',
    //     date: '11/11/2018',
    //     content: 'cool message',
    //     type: messageTypes.LOGIN
    // },
]; //{author, date, content, type}

var socket = io();

//Callback
socket.on('message', message => {
    console.log(message);
    if (message.type !== messageTypes.LOGIN) {
        if(MessageChannel.author === username) {
            message.type = messageTypes.RIGHT;
        }
        else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();
    chatWindow.scrollTop = chatWindow.srollHeight();
});

//take in message object, and returncorresponding message HTML
createMessageHTML = (message) => {
    if(messageTypes.type === messageTypes.LOGIN) {
        return `<p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>
        `;
    }

    return '
            <div class="message ${
                message.type === messageTypes.LEFT 
                    ? 'message-left' 
                    : 'message-right'}">
                <div id="message-detail" class="flex">
                    <p class="message-author">${message.author === messageTypes.RIGHT ? '' : message.author}</p>
                    <p class="message-date">${message.date}</p>
                </div>
                <p class="message-content">${message.content}</p>
            </div>
    ';

};

const displayMessages = () => {
    console.log('displaying messages');
    const messagesHTML = messages
        .map((message) => createMessageHTML(message))
        .join('');
    messagesList.innerHTML = messageHTML;
}

displayMessages();

//sendbtn callback
sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!usernameInput.value) {
        return console.log('must supply a message');
    }

    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = '${month}/${year}';
    const montoh = ('0' + (date.getMonth() + 1)).slice(-2);
    const message = {
        author: username,
        date: new Date(),
        content: messageInput.value,
    }

    // messages.push(message);
    // displayMessages();
    sendMessage(message);

    messageInput.value = '';
    chatWindow,srollTop = chatWindow.scrollHeight;

});

const sendMessages = message => {
    socket.emit('message', message);
}

//loginbtn callback
loginBtn.addEventListener('click', e => {
    //preventdefault of a form
    e.preventDefault();
    //set the userame and create logged in message
    if(!usernameInput.value) {
        return console.log('must supply a username');
    }
    username = usernameInput.value;
    console.log(username);
    
    messages.push({
        author: username,
        type: messgaesTypes.LOGIN
    });
    
    sendMessage({
        author: username,
        type: messageTypes.LOGIN
    });

    //hide login and show chat window
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
   
});

//console.log("Hello World")