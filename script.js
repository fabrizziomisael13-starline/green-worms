// 1. Catálogo 
const productos = [
  {
    id: 1,
    nombre: "Planta Valeriana en Maceta",
    categoria: "Planta Pequeña",
    precio: "$3.50",
    descripcion: "Planta medicinal e interior en etapa inicial. Ideal para escritorios o repisas con buena luz.",
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400"
  },
  {
    id: 2,
    nombre: "Monstera Deliciosa (Mediana)",
    categoria: "Planta Mediana",
    precio: "$12.00",
    descripcion: "Elegante y de follaje exuberante. Aporta frescura y un toque tropical único a tus espacios.",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400"
  },
  {
    id: 3,
    nombre: "Colección Mini Suculentas",
    categoria: "Mini Planta",
    precio: "$2.50",
    descripcion: "Variedad de suculentas de bajo mantenimiento. Perfectas para recuerdos o decoración minimalista.",
    img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400"
  },
  {
    id: 4,
    nombre: "Maceta Ceramica Artesanal",
    categoria: "Accesorios",
    precio: "$6.00",
    descripcion: "Maceta moldeada y pintada a mano. Personaliza colores y grabados especiales.",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"
  },
  {
    id: 5,
    nombre: "Humus de Lombriz Puro (2 kg)",
    categoria: "Insumos Orgánicos",
    precio: "$3.00",
    descripcion: "Abono 100% orgánico elaborado por lombriz roja californiana. Nutre y fortalece las raíces.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
  },
  {
    id: 6,
    nombre: "Asesoría de Cuidado Virtual",
    categoria: "Servicios",
    precio: "$5.00 / sesión",
    descripcion: "Consulta de 30 min para evaluar diagnóstico de hojas, sustrato y control de plagas.",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400"
  },
  {
    id: 7,
    nombre: "Ficus Lyrata (Pila de Hoja Grande)",
    categoria: "Planta Mediana",
    precio: "$15.00",
    descripcion: "Planta ornamental destacada por sus hojas en forma de violín. Ideal para salas luminosas.",
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400"
  },
  {
    id: 8,
    nombre: "Cactus San Pedro Pequeño",
    categoria: "Planta Pequeña",
    precio: "$4.00",
    descripcion: "Cactus resistente y de fácil adaptación en maceta. Requiere riego muy espaciado.",
    img: "https://images.unsplash.com/photo-1508022057371-4f937727f440?w=400"
  },
  {
    id: 9,
    nombre: "Sustrato Botánico Preparado (5 L)",
    categoria: "Insumos",
    precio: "$4.50",
    descripcion: "Mezcla balanceada de tierra vegetal, perlita y cascarilla de arroz con excelente drenaje.",
    img: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400"
  },
  {
    id: 10,
    nombre: "Maceta Colgante de Tejido Macramé",
    categoria: "Accesorios",
    precio: "$7.50",
    descripcion: "Soporte artesanal tejido a mano para lucir tus plantas en balcones o ventanas.",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400"
  },
  {
    id: 11,
    nombre: "Pothos Dorado en Esqueje",
    categoria: "Planta Pequeña",
    precio: "$3.00",
    descripcion: "Planta trepadora o colgante muy resistente. Ideal para purificar el aire de espacios cerrados.",
    img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400"
  },
  {
    id: 12,
    nombre: "Kit de Jardinería Inicial",
    categoria: "Kits",
    precio: "$9.50",
    descripcion: "Incluye mini herramientas, guantes, pulverizador de agua y muestra de humus de lombriz.",
    img: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400"
  }
];

// Cargar catálogo en el HTML
const gridProductos = document.getElementById('grid-productos');

function cargarCatalogo() {
  if (!gridProductos) return;
  gridProductos.innerHTML = productos.map(p => `
    <div class="card">
      <div>
        <div class="card-img-wrapper">
          <img src="${p.img}" alt="${p.nombre}">
        </div>
        <span class="card-tag">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p class="desc">${p.descripcion}</p>
      </div>
      <div>
        <p class="precio">${p.precio}</p>
        <button class="btn" onclick="solicitarProducto('${p.nombre}')">Consultar / Pedir</button>
      </div>
    </div>
  `).join('');
}

function solicitarProducto(nombre) {
  alert(`¡Has seleccionado: ${nombre}! Puedes detallar tu pedido en el formulario de contacto al final de la página.`);
  const mensajeInput = document.getElementById('mensaje');
  if (mensajeInput) {
    mensajeInput.value = `Hola Green Worms, estoy interesado/a en adquirir: ${nombre}.`;
    window.location.href = '#contacto';
  }
}

cargarCatalogo();

// 2. Chatbot con API (Backend)
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
    // Petición POST al servidor Express
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
      mensajeBotTemp.textContent = '🤖 Lo sentimos, en este momento el asistente virtual no está disponible. Por favor, inténtalo más tarde.';
    }
  
  } catch (error) {
    console.error('Error al conectar con el backend:', error);
    mensajeBotTemp.textContent = '🤖 Lo sentimos, en este momento el asistente virtual no está disponible. Por favor, inténtalo más tarde o contáctanos por el formulario de contacto.';
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

// 3. Confirmación Formulario
const formContacto = document.getElementById('formulario-contacto');
const respuestaForm = document.getElementById('respuesta-form');

if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    if (respuestaForm) {
      respuestaForm.textContent = "Enviando mensaje...";
      respuestaForm.style.color = "#40916c";
    }
  });
}