// 1. Catálogo Dinámico
const gridProductos = document.getElementById('grid-productos');

async function cargarCatalogo() {
  if (!gridProductos) return;
  
  try {
    // Consultar la API de productos apuntando a servidor en la nube
    const response = await fetch('https://green-worms-backend.onrender.com/api/productos');
    const productos = await response.json();

    if (productos.length === 0) {
      gridProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No hay productos registrados en este momento.</p>`;
      return;
    }

    gridProductos.innerHTML = productos.map(p => `
      <div class="card">
        <div>
          <div class="card-img-wrapper">
            <img src="${p.img || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400'}" alt="${p.nombre}">
          </div>
          <span class="card-tag">${p.categoria || 'Green Worms'}</span>
          <h3>${p.nombre}</h3>
          <p class="desc">${p.descripcion || 'Sin descripción disponible.'}</p>
        </div>
        <div>
          <p class="precio">$${p.precio}</p>
          <button class="btn" onclick="solicitarProducto('${p.nombre}')">Consultar / Pedir</button>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error al cargar los productos desde el backend:', error);
    gridProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Error al conectar con el servidor de productos.</p>`;
  }
}

function solicitarProducto(nombre) {
  alert(`¡Has seleccionado: ${nombre}! Puedes detallar tu pedido en el formulario de contacto al final de la página.`);
  const mensajeInput = document.getElementById('mensaje');
  if (mensajeInput) {
    mensajeInput.value = `Hola Green Worms, estoy interesado/a en adquirir: ${nombre}.`;
    window.location.href = '#contacto';
  }
}

// Ejecutar la carga del catálogo al abrir la página
cargarCatalogo();

// 2. Chatbot con Gemini
const btnIa = document.getElementById('btn-ia');
const promptIa = document.getElementById('prompt-ia');
const respuestaIa = document.getElementById('respuesta-ia');

if (btnIa && promptIa && respuestaIa) {
  btnIa.addEventListener('click', procesarChat);
  promptIa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') procesarChat();
  });
}

async function procesarChat() {
  const pregunta = promptIa.value.trim();
  if (!pregunta) return;

  // 1. Mostrar el mensaje del usuario
  agregarMensaje(pregunta, 'usuario');
  promptIa.value = '';

  // 2. Crear la burbuja del bot con el mensaje "Pensando..."
  const mensajeBotTemp = agregarMensaje('Pensando...', 'bot');

  try {
    // Petición POST al servidor en la nube 
    const res = await fetch('https://green-worms-backend.onrender.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: pregunta })
    });

    const data = await res.json();

    // Reemplazar "Pensando..." con la respuesta de Gemini
    if (data.reply) {
      mensajeBotTemp.textContent = '🤖 ' + data.reply;
    } else {
      mensajeBotTemp.textContent = '🤖 Lo sentimos, en este momento el asistente virtual no está disponible.';
    }
  
  } catch (error) {
    console.error('Error al conectar con el backend:', error);
    mensajeBotTemp.textContent = '🤖 Lo sentimos, no se pudo conectar con el servidor en la nube.';
  }
}

function agregarMensaje(texto, emisor) {
  const div = document.createElement('div');
  div.className = emisor === 'usuario' ? 'mensaje-usuario' : 'mensaje-bot';
  div.textContent = (emisor === 'bot' ? '🤖 ' : '') + texto;
  respuestaIa.appendChild(div);
  respuestaIa.scrollTop = respuestaIa.scrollHeight;
  return div;
}

// Funcionalidad del Responsive (Menú Hamburguesa)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}