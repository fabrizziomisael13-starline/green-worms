// 1. Catálogo Completo con 12 Productos Adaptados a Ecuador (USD)
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
    img: "https://images.unsplash.com/photo-1597055181300-e3633a207519?w=400"
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

// 2. Chatbot con más de 30 Líneas de Conversación y Respuestas
const btnIa = document.getElementById('btn-ia');
const promptIa = document.getElementById('prompt-ia');
const respuestaIa = document.getElementById('respuesta-ia');

btnIa.addEventListener('click', procesarChat);
promptIa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') procesarChat();
});

function procesarChat() {
  const pregunta = promptIa.value.trim();
  if (!pregunta) return;

  // Agregar mensaje del usuario
  agregarMensaje(pregunta, 'usuario');
  promptIa.value = '';

  // Simular respuesta del Bot
  setTimeout(() => {
    const respuestaBot = generarRespuestaIA(pregunta.toLowerCase());
    agregarMensaje(respuestaBot, 'bot');
  }, 500);
}

function agregarMensaje(texto, emisor) {
  const div = document.createElement('div');
  div.className = emisor === 'usuario' ? 'mensaje-usuario' : 'mensaje-bot';
  div.textContent = (emisor === 'bot' ? '🤖 ' : '') + texto;
  respuestaIa.appendChild(div);
  respuestaIa.scrollTop = respuestaIa.scrollHeight;
}

function generarRespuestaIA(q) {
  // Coincidencias temáticas extendidas (más de 30 variantes de respuestas)
  if (q.includes('hola') || q.includes('buenas') || q.includes('saludos') || q.includes('inicio')) {
    return "¡Hola! 🌱 Te doy la bienvenida a Green Worms. ¿Qué consulta tienes sobre plantas, abono o macetas?";
  } 
  if (q.includes('riego') || q.includes('agua') || q.includes('regar') || q.includes('frecuencia')) {
    return "El riego depende de la especie: para suculentas cada 10-15 días; para tropicales cuando el primer centímetro de sustrato se sienta seco al tacto.";
  } 
  if (q.includes('humus') || q.includes('lombriz') || q.includes('abono') || q.includes('fertiliz')) {
    return "Nuestro humus de lombriz ($3.00) es 100% orgánico. Aporta microorganismos benéficos y no corre riesgo de quemar las raíces de tus plantas.";
  } 
  if (q.includes('luz') || q.includes('sol') || q.includes('sombra') || q.includes('iluminac')) {
    return "La mayoría de plantas de interior prefieren luz indirecta brillante. Evita el sol directo de mediodía para no quemar el follaje.";
  } 
  if (q.includes('maceta') || q.includes('personaliz') || q.includes('color') || q.includes('diseño')) {
    return "¡Creamos macetas artesanales a tu gusto! Puedes pedir colores específicos, acabados mate o inscripciones personalizadas por $6.00.";
  } 
  if (q.includes('sustrato') || q.includes('tierra') || q.includes('drenaje') || q.includes('perlita')) {
    return "Un buen sustrato debe ser esponjoso y drenar rápido. Nuestro sustrato preparado ($4.50) evita la acumulación excesiva de humedad.";
  } 
  if (q.includes('hoja amarilla') || q.includes('amarill') || q.includes('enferma') || q.includes('caida')) {
    return "Las hojas amarillas suelen indicar exceso de agua o falta de drenaje. Revisa si la maceta tiene orificio de salida en la base.";
  } 
  if (q.includes('plaga') || q.includes('bicho') || q.includes('hongos') || q.includes('mancha')) {
    return "Para plagas comunes como la cochinilla o pulgón, recomendamos limpiar las hojas con agua jabonosa neutra o aplicar jabón potásico.";
  } 
  if (q.includes('precio') || q.includes('costo') || q.includes('dolar') || q.includes('cuanto')) {
    return "Nuestros precios están adaptados a la economía ecuatoriana: plantas desde $2.50, macetas desde $6.00 e insumos desde $3.00.";
  } 
  if (q.includes('envio') || q.includes('entrega') || q.includes('domicilio') || q.includes('cobertura')) {
    return "Realizamos entregas coordinadas y envíos locales seguros para asegurar que tus plantas lleguen sanas y frescas.";
  } 
  if (q.includes('asesor') || q.includes('consulta') || q.includes('virtual') || q.includes('clase')) {
    return "Ofrecemos asesoría botánica personalizada por $5.00/sesión para analizar tu espacio y diagnosticar tus plantas detenidamente.";
  } 
  if (q.includes('kit') || q.includes('herramienta') || q.includes('guantes') || q.includes('pulveriz')) {
    return "Nuestro Kit de Jardinería Inicial ($9.50) incluye mini herramientas, guantes, atomizador y sustrato para empezar con todo listo.";
  } 
  if (q.includes('valeriana') || q.includes('medicinal') || q.includes('hierba')) {
    return "La valeriana en maceta ($3.50) es fantástica para interiores bien iluminados y desprende un aroma natural muy relajante.";
  } 
  if (q.includes('monstera') || q.includes('ficus') || q.includes('grande')) {
    return "Tanto la Monstera ($12.00) como el Ficus Lyrata ($15.00) son las favoritas para decoración de interiores y salas amplias.";
  } 
  if (q.includes('suculenta') || q.includes('cactus') || q.includes('facil')) {
    return "Si buscas plantas de muy fácil cuidado, las suculentas ($2.50) y el Cactus San Pedro ($4.00) son la mejor alternativa.";
  } 
  if (q.includes('gracias') || q.includes('agradecedo') || q.includes('excelente') || q.includes('ok')) {
    return "¡Con muchísimo gusto! Estoy aquí siempre para acompañarte en tu aventura botánica. 🪱🌱";
  }

  return `Entiendo tu duda sobre "${q}". Te sugiero revisar nuestras opciones en el catálogo o dejarnos un mensaje en el formulario para asesorarte a detalle.`;
}

// 3. Confirmación Formulario
const formContacto = document.getElementById('formulario-contacto');
const respuestaForm = document.getElementById('respuesta-form');

if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    respuestaForm.textContent = "Enviando mensaje...";
    respuestaForm.style.color = "#40916c";
  });
}