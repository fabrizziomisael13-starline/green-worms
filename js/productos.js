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