const products = [
  {
    id: 1,
    name: 'Loris Room Spray',
    category: 'women',
    price: 2000,
    swatches: ['sky', 'white', 'pink', 'orange', 'gold'],
    label: 'LORIS',
    sublabel: 'Room Spray',
    variant: 'blue'
  },
  {
    id: 2,
    name: 'SHIQUO Spring Gift',
    category: 'men',
    price: 2450,
    swatches: ['sky', 'white', 'pink', 'green', 'orange'],
    label: 'ANGEL',
    sublabel: 'Fresh Mist',
    variant: 'pink'
  },
  {
    id: 3,
    name: 'Baby Blanket Set',
    category: 'baby',
    price: 1600,
    swatches: ['green', 'white', 'pink', 'gold', 'navy'],
    label: 'BABY',
    sublabel: 'Soft Set',
    variant: 'green'
  },
  {
    id: 4,
    name: 'Classic Men Hoodie',
    category: 'men',
    price: 3200,
    swatches: ['black', 'white', 'tan', 'orange', 'green'],
    label: 'NOVA',
    sublabel: 'Urban Wear',
    variant: 'orange'
  },
  {
    id: 5,
    name: 'Women Daily Tote',
    category: 'women',
    price: 2800,
    swatches: ['navy', 'pink', 'white', 'purple', 'gold'],
    label: 'ELLA',
    sublabel: 'Classic Tote',
    variant: 'purple'
  },
  {
    id: 6,
    name: 'Baby Play Set',
    category: 'baby',
    price: 1950,
    swatches: ['pink', 'white', 'green', 'orange', 'purple'],
    label: 'KIDS',
    sublabel: 'Play Time',
    variant: 'blue'
  }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');

let activeCategory = 'all';

function createProductCard(product) {
  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-visual">
        <div class="bottle ${product.variant}">
          <div class="bottle-cap"></div>
          <div class="bottle-body">
            <div class="label">
              <strong>${product.label}</strong>
              <span>${product.sublabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-title-row">
        <h3 class="product-name">${product.name}</h3>
        <button class="favorite" aria-label="Add to favorites">♡</button>
      </div>

      <div class="price">Ksh ${product.price.toLocaleString()}</div>

      <div class="swatches" aria-label="Available colors">
        ${product.swatches
          .map((swatch) => `<span class="swatch ${swatch}"></span>`)
          .join('')}
      </div>
    </article>
  `;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.label.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filteredProducts.map(createProductCard).join('');

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <p>No products match your search.</p>
      </div>
    `;
  }
}

searchInput.addEventListener('input', renderProducts);

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

renderProducts();
