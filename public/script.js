// script.js

async function cargarImagenes() {
  const contenedor = document.getElementById("galeria");

  // Crear un loader
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Cargando imágenes…";
  contenedor.appendChild(loader);

  try {
    const res = await fetch("/api/images");
    if (!res.ok) throw new Error("Error en la petición");
    const imagenes = await res.json();

    // Quitar el loader
    contenedor.removeChild(loader);

    // Añadir sección de info sobre la UAS
    agregarInformacionUAS(contenedor);

    // Por cada imagen, crear una tarjeta
    imagenes.forEach(img => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3 class="card-title">${img.nombre}</h3>
        <div class="image-wrapper">
          <img src="${img.url}" alt="${img.nombre}" loading="lazy">
        </div>
      `;

      // Animación de aparición
      card.style.opacity = 0;
      contenedor.appendChild(card);
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease-in";
        card.style.opacity = 1;
      }, 50);
    });

  } catch (err) {
    console.error("Error al cargar imágenes:", err);
    loader.textContent = "Error cargando imágenes";
  }
}

// Función para inyectar la información de la UAS
function agregarInformacionUAS(container) {
  const info = document.createElement("div");
  info.className = "uas-info";

  info.innerHTML = `
    <h2>Sobre la Universidad Autónoma de Sinaloa (UAS)</h2>
    <p>
      La <strong>Universidad Autónoma de Sinaloa (UAS)</strong> es una institución pública con sede principal en Culiacán, Sinaloa. Fue fundad el <strong>5 de mayo de 1873</strong> como Liceo Rosales y ha sido un pilar educativo del noroeste de México. :contentReference[oaicite:0]{index=0}  
    </p>
    <p>
      Su misión es formar profesionales de calidad comprometidos con el desarrollo humano sustentable y promover la ciencia, tecnología y las humanidades, con un fuerte sentido social. :contentReference[oaicite:1]{index=1}  
    </p>
    <p>
      Cuenta con más de <strong>160,000 estudiantes</strong> y múltiples campus en el estado de Sinaloa, incluyendo Culiacán, Mazatlán, Los Mochis y Guamúchil. :contentReference[oaicite:2]{index=2}  
    </p>
    <p>
      Sus valores institucionales incluyen la honestidad, la equidad, la solidaridad, el respeto, la integridad y la ética profesional. :contentReference[oaicite:3]{index=3}  
    </p>
  `;

  container.appendChild(info);
}

// Llamar la función
cargarImagenes();

