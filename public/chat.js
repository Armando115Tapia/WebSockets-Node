const socket = io();

// DOM ELEMENTS
let message = document.getElementById("message");
let username = document.getElementById("username");
let boton = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

boton.addEventListener("click", function() {
  socket.emit("mimensaje", {
    username: username.value,
    massage: message.value
  });
  message.value = '';  
});


message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value );
});

socket.on("mensajeServidor", function(data) {
    actions.innerHTML = '';
    
  output.innerHTML += `<p> 
    <strong>${data.username}</strong>: ${data.massage}</p>`;
});


socket.on('chat:typing', function(data){
    actions.innerHTML = ''; 
    actions.innerHTML = `
    <p><em>${data}</em> is typing... </p>`;
});
