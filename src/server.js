document.addEventListener("DOMContentLoaded", () => {
  const divAgregarNotas = document.getElementById("agregar-notas");
  const divNotas = document.getElementById("contenedor-notas");
  const botonMas = document.getElementById("mas");
  const inputTitle = document.getElementById("title");
  const inputContent = document.getElementById("content");
  const botonAgregar = document.getElementById("agregar");

  if (!inputTitle || !inputContent || !botonAgregar) {
    console.error("Falta algún elemento en el DOM", { inputTitle, inputContent, botonAgregar });
    return;
  }

  function mostrarDivAgregarNotas() {
    divAgregarNotas.style.display = "flex";
    divNotas.style.display = "none";
    botonMas.style.display = "none";
  }
  botonMas.addEventListener("click", mostrarDivAgregarNotas);

  botonAgregar.addEventListener("click", async (event) => {
    event.preventDefault();

    const data = {
      title: inputTitle.value.trim(),
      content: inputContent.value.trim()
    };

    try {
      const res = await fetch("https://backend-api-notas.onrender.com/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      console.log("Nota guardada:", result);

      // 👉 Crear la nota
      const notaDiv = document.createElement("div");
      notaDiv.classList.add("nota");
      notaDiv.dataset.id = result.id;
      notaDiv.innerHTML = `
        <h3>${result.title}</h3>
        <hr>
        <p>${result.content}</p>
        <button class="editar">Editar</button>
        <button class="borrar">Borrar</button>
      `;
      divNotas.appendChild(notaDiv);

      // 👉 Enganchar botones recién creados
      const botonEditar = notaDiv.querySelector(".editar");
      const botonBorrar = notaDiv.querySelector(".borrar");
      const h3 = notaDiv.querySelector("h3");
      const p = notaDiv.querySelector("p");

      botonEditar.addEventListener("click", () => {
        const editarDiv = document.createElement("div");
        editarDiv.classList.add("editar-contenedor");
        editarDiv.innerHTML = `
          <input id="input-title-editar" value="${h3.textContent}"></input>
          <textarea id="input-content-editar">${p.textContent}</textarea>
          <button id="confirmar">Confirmar</button>
        `;
        notaDiv.appendChild(editarDiv);

        const inputTitleEditado = editarDiv.querySelector("#input-title-editar");
        const inputContentEditado = editarDiv.querySelector("#input-content-editar");
        const botonConfirmarEdicion = editarDiv.querySelector("#confirmar");

        botonConfirmarEdicion.addEventListener("click", async () => {
          try {
            const id = notaDiv.dataset.id;
            const res = await fetch(`https://backend-api-notas.onrender.com/api/notes/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: inputTitleEditado.value,
                content: inputContentEditado.value
              })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            // actualizar en pantalla
            h3.textContent = inputTitleEditado.value;
            p.textContent = inputContentEditado.value;
            editarDiv.remove();
          } catch (err) {
            console.error("Error al editar la nota:", err);
            alert("Error al editar ❌");
          }
        });
      });

      // (opcional) borrar nota
      botonBorrar.addEventListener("click", async () => {
        try {
          const id = notaDiv.dataset.id;
          const res = await fetch(`https://backend-api-notas.onrender.com/api/notes/${id}`, {
            method: "DELETE"
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          notaDiv.remove();
        } catch (err) {
          console.error("Error al borrar nota:", err);
        }
      });

      // reset form
      alert("Nota guardada con éxito ✅");
      inputTitle.value = "";
      inputContent.value = "";
      divAgregarNotas.style.display = "none";
      divNotas.style.display = "flex";
      botonMas.style.display = "inline-block";

    } catch (err) {
      console.error("Error al guardar la nota:", err);
      alert("Error al guardar ❌");
    }
  });
});
