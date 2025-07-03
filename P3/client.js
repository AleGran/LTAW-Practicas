//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


socket.on("message", (msg)=>{
  const p = document.createElement("p");
  p.classList.add("chat-message");
  p.textContent = msg.message;
  display.appendChild(p);
  display.scrollTop = display.scrollHeight;
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value) {
    const mensaje = msg_entry.value;
    socket.send(mensaje);

    const p = document.createElement("p");
    p.classList.add("chat-message", "own");
    p.textContent = mensaje;
    display.appendChild(p);
    display.scrollTop = display.scrollHeight;

  //-- Borrar el mensaje actual
  msg_entry.value = "";
  }
};
