async function cargarApoyos(causaId) {
  const contador = document.getElementById(`contador-${causaId}`);
  const contenedorApoyos = document.getElementById(`apoyos-${causaId}`);

  try {
    const response = await fetch(`/api/apoyos/${causaId}`);
    const data = await response.json();

    if (!response.ok || !data.ok) {
      contador.textContent = "No fue posible cargar apoyos.";
      contenedorApoyos.textContent = "";
      return;
    }

    contador.textContent = `Apoyos registrados: ${data.total}`;

    if (data.apoyos.length === 0) {
      contenedorApoyos.textContent = "Aún no hay comentarios de apoyo.";
      return;
    }

    contenedorApoyos.innerHTML = data.apoyos
      .map((apoyo) => {
        return `
          <div class="apoyo">
            <strong>${apoyo.nombre}</strong>
            <p>${apoyo.comentario || "Sin comentario."}</p>
            <small>${apoyo.fecha}</small>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    contador.textContent = "Error consultando apoyos.";
    contenedorApoyos.textContent = "";
    console.error(error);
  }
}

async function registrarApoyo(event, causaId) {
  event.preventDefault();

  const nombre = document.getElementById(`nombre-${causaId}`).value.trim();
  const comentario = document.getElementById(`comentario-${causaId}`).value.trim();

  if (!nombre) {
    alert("El nombre de práctica es obligatorio.");
    return;
  }

  try {
    const response = await fetch("/api/apoyos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        causa_id: causaId,
        nombre,
        comentario
      })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      alert(data.error || "No fue posible registrar el apoyo.");
      return;
    }

    document.getElementById(`nombre-${causaId}`).value = "";
    document.getElementById(`comentario-${causaId}`).value = "";

    await cargarApoyos(causaId);
    alert("Apoyo registrado correctamente.");
  } catch (error) {
    alert("Error conectando con el servidor.");
    console.error(error);
  }
}