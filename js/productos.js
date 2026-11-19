const API_URL = 'https://green-worms-backend.onrender.com/api/productos';
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80';

let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const categoryCards = document.querySelectorAll('.category-card');
  const sectionTitle = document.getElementById('section-title');

  let currentCategory = 'todos';

  async function loadProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al conectar con el servidor');

      allProducts = await response.json();
      filterAndRender();
    } catch (error) {
      console.error('Error cargando productos:', error);
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px; background: #161b22; border-radius: 20px; border: 1px dashed rgba(255,255,255,0.1);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🌺</div>
          <h3 style="color: #fff; margin-bottom: 8px;">Conectando con el servidor en Render...</h3>
          <p style="color: #9ca3af; max-width: 400px; margin: 0 auto;">El servidor puede tardar unos segundos en despertar. Actualiza la página en un momento.</p>
        </div>
      `;
    }
  }

  function filterAndRender() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = allProducts.filter(prod => {
      const name = (prod.nombre || prod.name || '').toLowerCase();
      const desc = (prod.descripcion || prod.description || '').toLowerCase();
      
      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
      
      let matchesCategory = true;
      if (currentCategory === 'kits') matchesCategory = name.includes('kit') || desc.includes('kit');
      if (currentCategory === 'sustratos') matchesCategory = name.includes('sustrato') || desc.includes('sustrato') || name.includes('tierra');
      if (currentCategory === 'nutrientes') matchesCategory = name.includes('abono') || name.includes('nutriente') || name.includes('fertilizante');

      return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
  }

  function renderProducts(products) {
    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px; background: #161b22; border-radius: 20px;">
          <p style="color: #9ca3af;">No se encontraron productos en esta categoría o con esa búsqueda.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(prod => {
      const nombre = prod.nombre || prod.name || 'Insumo Botánico';
      const descripcion = prod.descripcion || prod.description || 'Elemento seleccionado para nutrición y cultivo.';
      const precio = prod.precio !== undefined ? Number(prod.precio).toFixed(2) : '0.00';
      const imagen = prod.imagen || prod.image || FALLBACK_IMG;

      return `
        <article class="kfc-product-card">
          <div class="kfc-img-box">
            <img src="${imagen}" alt="${nombre}" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';">
          </div>
          <div class="kfc-body">
            <div>
              <h3 class="kfc-title">${nombre}</h3>
              <p class="kfc-desc">${descripcion}</p>
            </div>
            <div class="kfc-footer">
              <span class="kfc-price">$${precio}</span>
              <a href="contacto.html" class="kfc-btn">Consultar ➔</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentCategory = card.getAttribute('data-category');
      sectionTitle.textContent = card.querySelector('.category-name').textContent;
      filterAndRender();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterAndRender);
  }

  loadProducts();
});


// ==========================================
// LÓGICA DEL CARRITO DE COMPRAS Y PAGOS
// ==========================================

// Inicializamos el carrito recuperándolo de localStorage (para que no se borre si recargan la página)
let carrito = JSON.parse(localStorage.getItem('greenWormsCart')) || [];

// 1. Agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: 1
        });
    }

    guardarYActualizar();
}

// 2. Modificar cantidad de un producto
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
    }
    guardarYActualizar();
}

// 3. Eliminar un producto por completo
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
}

// 4. Calcular el subtotal y total de la compra
function calcularTotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// 5. Guardar en localStorage y disparar actualización visual
function guardarYActualizar() {
    localStorage.setItem('greenWormsCart', JSON.stringify(carrito));
    // Esta función conectará después con la interfaz gráfica que creemos
    if (typeof actualizarVistaCarrito === 'function') {
        actualizarVistaCarrito();
    }
}

// ==========================================
// SIMULADOR DE PAGO DIGITAL (CHECKOUT)
// ==========================================

function simularProcesoPago(datosCliente, datosTarjeta) {
    return new Promise((resolve, reject) => {
        // Validaciones básicas de la lógica de pago
        if (carrito.length === 0) {
            return reject("El carrito está vacío. Agrega productos antes de pagar.");
        }

        if (!datosCliente.nombre || !datosCliente.email || !datosCliente.direccion) {
            return reject("Por favor, completa todos los datos de envío.");
        }

        // Simulamos una pasarela de pago segura con un retraso de 2 segundos (como una API real)
        setTimeout(() => {
            const totalPagado = calcularTotal();
            
            // Creamos el objeto de la orden de compra exitosa
            const orden = {
                idOrden: "GW-" + Math.floor(100000 + Math.random() * 900000),
                fecha: new Date().toISOString(),
                cliente: datosCliente,
                items: [...carrito],
                total: totalPagado,
                estado: "Pagado y en preparación"
            };

            // Vaciar el carrito tras el éxito del pago
            carrito = [];
            localStorage.removeItem('greenWormsCart');
            
            if (typeof actualizarVistaCarrito === 'function') {
                actualizarVistaCarrito();
            }

            resolve(orden);
        }, 2000);
    });
}

// Mostrar/Ocultar el panel lateral del carrito
function toggleCarritoModal() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    actualizarVistaCarrito();
}

// Actualizar los elementos visuales del carrito en pantalla
function actualizarVistaCarrito() {
    const contenedor = document.getElementById('lista-items-carrito');
    const contador = document.getElementById('contador-carrito');
    const totalSpan = document.getElementById('total-carrito');

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="color: #888; text-align: center;">El carrito está vacío</p>';
        totalSpan.textContent = '$0.00';
        return;
    }

    let html = '';
    carrito.forEach(item => {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <div>
                    <h4 style="margin: 0 0 5px 0; font-size: 14px;">${item.nombre}</h4>
                    <span style="font-size: 12px; color: #aaa;">$${item.precio.toFixed(2)} x ${item.cantidad}</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button onclick="cambiarCantidad(${item.id}, -1)" style="background: #444; color: white; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)" style="background: #444; color: white; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">+</button>
                    <button onclick="eliminarDelCarrito(${item.id})" style="background: #c62828; color: white; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer; margin-left: 5px;">🗑</button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    totalSpan.textContent = `$${calcularTotal().toFixed(2)}`;
}

// Abrir y cerrar el simulador de pago
function abrirSimuladorPago() {
    if (carrito.length === 0) {
        alert("Agrega productos al carrito antes de proceder al pago.");
        return;
    }
    toggleCarritoModal(); // Cierra el carrito
    document.getElementById('modal-pago').style.display = 'flex';
}

function cerrarSimuladorPago() {
    document.getElementById('modal-pago').style.display = 'none';
}

// Manejar el envío del formulario de pago simulado
function procesarPagoCheckout(event) {
    event.preventDefault();
    
    const datosCliente = {
        nombre: document.getElementById('pago-nombre').value,
        email: document.getElementById('pago-email').value,
        direccion: document.getElementById('pago-direccion').value
    };

    const datosTarjeta = {
        numero: document.getElementById('pago-tarjeta').value
    };

    const btnPagar = document.getElementById('btn-pagar-ahora');
    btnPagar.textContent = "Procesando pago seguro...";
    btnPagar.disabled = true;

    simularProcesoPago(datosCliente, datosTarjeta)
        .then(orden => {
            btnPagar.textContent = "Confirmar y Pagar";
            btnPagar.disabled = false;
            cerrarSimuladorPago();
            
            // Mostrar comprobante de éxito
            alert(`¡Pago exitoso!\n\nNúmero de Orden: ${orden.idOrden}\nCliente: ${orden.cliente.nombre}\nTotal Pagado: $${orden.total.toFixed(2)}\nEstado: ${orden.estado}`);
        })
        .catch(error => {
            btnPagar.textContent = "Confirmar y Pagar";
            btnPagar.disabled = false;
            alert("Error: " + error);
        });
}