// Catálogo de Productos y Servicios de Green Worms
const productos = [
  {
    id: 1,
    nombre: "Planta Valeriana en Maceta",
    categoria: "Planta Pequeña",
    precio: "$8.50",
    descripcion: "Planta medicinal e interior en etapa inicial de crecimiento, ideal para escritorio o espacios reducidos.",
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400"
  },
  {
    id: 2,
    nombre: "Monstera Deliciosa (Talla M)",
    categoria: "Planta Mediana",
    precio: "$18.00",
    descripcion: "Planta de follaje frondoso en maceta de cerámica. Perfecta para dar vida a salas y oficinas.",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400"
  },
  {
    id: 3,
    nombre: "Maceta de Cerámica Personalizada",
    categoria: "Accesorios",
    precio: "$12.00",
    descripcion: "Diseña tu propia maceta con colores, patrones o nombres grabados a mano.",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"
  },
  {
    id: 4,
    nombre: "Asesoría Virtual de Cuidado Botánico",
    categoria: "Servicios",
    precio: "$10.00 / sesión",
    descripcion: "Sesión personalizada de 30 min para evaluar la luz, riego y sustrato ideal para tus plantas.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
  }
];

// Cargar catálogo dinámico en la página
const gridProductos = document.getElementById('grid-productos');

function cargarCatalogo() {
  gridProductos.innerHTML = productos.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.nombre}">
      <span style="font-size: 0.8rem; background: #e2e8f0; padding: 2px 8px; border-radius: 12px; color: #475569;">${p.categoria}</span>
      <h3 style="margin-top: 8px;">${p.nombre}</h3>
      <p style="color: #64748b; font-size: 0.9rem; margin: 8px 0;">${p.descripcion}</p>
      <p style="font-weight: bold; color: #15803d; font-size: 1.1rem;">${p.precio}</p>
      <button class="btn" onclick="solicitarPlanta('${p.nombre}')">Consultar / Pedir</button>
    </div>
  `).join('');
}

function solicitarPlanta(nombre) {
  alert(`¡Has seleccionado: ${nombre}! Puedes detallar tu pedido o personalización en el formulario de contacto.`);
}

cargarCatalogo();

// Manejo del Formulario de Contacto
const formContacto = document.getElementById('formulario-contacto');
const respuestaForm = document.getElementById('respuesta-form');

formContacto.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  
  respuestaForm.textContent = `¡Gracias por escribirnos, ${nombre}! En Green Worms procesaremos tu mensaje para coordinar tu pedido o asesoría.`;
  respuestaForm.style.color = '#15803d';
  formContacto.reset();
});

// Asistente Inteligente Green Worms (IA Botánica)
const btnIa = document.getElementById('btn-ia');
const promptIa = document.getElementById('prompt-ia');
const respuestaIa = document.getElementById('respuesta-ia');

btnIa.addEventListener('click', () => {
  const pregunta = promptIa.value.trim().toLowerCase();
  
  if (!pregunta) {
    respuestaIa.textContent = "Por favor, escribe una duda sobre el cuidado de tus plantas o pedidos.";
    return;
  }

  respuestaIa.textContent = "🌱 Consultando a la IA Botánica de Green Worms...";

  setTimeout(() => {
    if (pregunta.includes('riego') || pregunta.includes('agua') || pregunta.includes('regar')) {
      respuestaIa.textContent = "🤖 IA Green Worms: La mayoría de las plantas de interior prefieren que el sustrato se seque entre riegos. Comprueba que el primer centímetro de tierra esté seco antes de volver a regar.";
    } else if (pregunta.includes('luz') || pregunta.includes('sol') || pregunta.includes('sombra')) {
      respuestaIa.textContent = "🤖 IA Green Worms: Para plantas en maceta pequeñas o en esqueje, la luz indirecta brillante es la mejor opción. Evita el sol directo de mediodía para no quemar las hojas.";
    } else if (pregunta.includes('maceta') || pregunta.includes('personaliz')) {
      respuestaIa.textContent = "🤖 IA Green Worms: ¡Claro! Puedes elegir el color, acabado de pintura e inclusive pedir un texto personalizado pintado en la maceta.";
    } else if (pregunta.includes('asesor') || pregunta.includes('cuida') || pregunta.includes('ayuda')) {
      respuestaIa.textContent = "🤖 IA Green Worms: Ofrecemos asesoramiento personalizado paso a paso para ayudarte con el enraizado, poda o diagnóstico de hojas amarillas.";
    } else {
      respuestaIa.textContent = `🤖 IA Green Worms: Gracias por consultar sobre "${pregunta}". Si necesitas asistencia específica para tu planta, déjanos tu mensaje en el formulario arriba.`;
    }
  }, 800);
});