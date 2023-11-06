(function () {
    const app = document.querySelector('.app');
    const socket = io();
    let uname;
  
    app.querySelector('.join-screen #join-user').addEventListener('click', function () {
      let username = app.querySelector('.join-screen #username').value;
      if (username.length === 0) {
        return;
      }
      socket.emit('newuser', username);
      uname = username;
      app.querySelector('.join-screen').classList.remove('active');
      app.querySelector('.chat-screen').classList.add('active');
    });
  
    app.querySelector('.chat-screen #send-message').addEventListener('click', function () {
      let message = app.querySelector('.chat-screen #message-input').value;
      if (message.length === 0) {
        return;
      }
      socket.emit('chat', {
        username: uname,
        text: message
      });
      app.querySelector('.chat-screen #message-input').value = '';
    });
  
    socket.on('update', function (message) {
      renderMessage('update', message);
    });
  
    socket.on('chat', function (message) {
      renderMessage('chat', message);
    });
  
    function renderMessage(type, message) {
      let messageContainer = app.querySelector('.chat-screen #messages');
      let el = document.createElement('div');
      if (type === 'update') {
        el.setAttribute('class', 'update');
        el.innerText = message;
      } else if (type === 'chat') {
        el.setAttribute('class', 'message');
        el.innerHTML = `<div><div class="name">${message.username}</div><div class="text">${message.text}</div></div>`;
      }
      messageContainer.appendChild(el);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  })();
  