const upload = async () => {
  try {
    const formData = new FormData();

    // 3. Agregamos el archivo (el nombre 'photo' debe coincidir con lo que espera tu API)
    // formData.append("dogImage", archivoImagen);

    const dogName = document.querySelector("#dog-name");
    const description = document.querySelector("#dog-desc");
    const dogPhoto = document.querySelector("#dog-photo");

    console.log("dogName ", dogName.value);
    console.log("description ", description.value);
    console.log("dogPhoto ", dogPhoto.files[0]);

    formData.append("dogName", dogName.value);
    formData.append("description", description.value);

    formData.append("dogImage", dogPhoto.files[0]);

    const res = await fetch("http://localhost:3000/dogs/photos", {
      method: "POST",
      body: formData,
    });

    console.log("res ", res);

    if (res.ok) {
      showToash("Foto subida correctamente");
    } else {
      try {
        const parsedError = await res.json();
        console.log("parsedError", parsedError);
        showToash(parsedError?.error || "Error al subir archivo", "error");
      } catch (error) {
        console.error("error al parsear el error ", error);
      }
    }
  } catch (error) {
    console.error("Error al subir la imagen ", error);
  }
};

const showToash = (message, type = "success") => {
  // const mainContainerEl = document.getElementById("main-container");

  const divToastEl = document.createElement("div");
  divToastEl.setAttribute("class", "toast");
  divToastEl.innerText = message;
  divToastEl.style.display = "block";
  // mainContainerEl.appendChild(divToastEl);

  divToastEl.classList.add(type == "success" ? "sucess-toast" : "error-toast");
  document.body.appendChild(divToastEl);

  setTimeout(() => {
    divToastEl.remove();
  }, 3000);
};
