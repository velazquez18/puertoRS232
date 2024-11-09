const socket = io();  // 

socket.on('serialData', function(data) {
  console.log(data);
  
  const container = document.getElementById('dataDisplay'); 
  if (container) {  // Verificar que el contenedor exista
    const dataElement = document.createElement('p');
    dataElement.textContent = `Received: ${data}`;
    container.appendChild(dataElement);
  } else {
    console.error('Error: No se encontró el contenedor de datos (dataDisplay).');
  }
});
