// Tạo một hàm để lấy dữ liệu từ tệp JSON
function getListFilm(callback) {
  fetch("../../../database/data.json") // Đường dẫn đến tệp JSON
    .then((response) => response.json())
    .then((data) => {
      // Lấy mảng "listfilm" từ dữ liệu JSON
      const listfilm = data.listfilm;

      // Gọi hàm callback và truyền giá trị "listfilm" vào nó
      callback(listfilm);
    })
    .catch((error) => {
      console.error("Lỗi khi đọc tệp JSON:", error);
    });
}
// Hàm để hiển thị danh sách phim lên màn hình
function listProduct(listfilm) {
  const itemContainer = document.getElementById("item");

  listfilm.forEach((item, idx) => {
    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");

    const image = document.createElement("img");
    image.src = item.image;
    image.classList.add("film-image");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.textContent = item.name;

    const details = document.createElement("p");
    details.textContent = `${item.time} | ${item.date}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const detailButton = document.createElement("input");
    detailButton.type = "button";
    detailButton.value = "Detail";
    detailButton.addEventListener("click", function () {
      window.location.href = "detail.html" + `?idx=${idx}`;
    });
    detailButton.setAttribute("class", "btn-detail-phim");

    const bookingButton = document.createElement("input");
    bookingButton.type = "button";
    bookingButton.value = "Booking Now";
    bookingButton.setAttribute("data-bs-toggle", "modal");
    bookingButton.setAttribute("data-bs-target", "#staticBackdrop");
    bookingButton.setAttribute("data-firm-id", `${item.id}`);
    bookingButton.setAttribute("class", "btn-booking");

    buttonsContainer.appendChild(detailButton);
    buttonsContainer.appendChild(bookingButton);

    const viewDetailsButtons = document.querySelectorAll('[data-bs-toggle="modal"]');

    viewDetailsButtons.forEach(button => {
      button.addEventListener("click", function (event) {
        const targetModalId = event.getAttribute("data-bs-target");
        const myModal = new bootstrap.Modal(document.querySelector(targetModalId));
        myModal.hide();
      });
    })



    cardBody.appendChild(title);
    cardBody.appendChild(details);
    cardBody.appendChild(buttonsContainer);

    filmCard.appendChild(image);
    filmCard.appendChild(cardBody);

    itemContainer.appendChild(filmCard);
  });
}

// Gọi hàm getListFilm và truyền hàm listProduct làm callback
getListFilm(listProduct);

function getFileName() {
  const fileInput = document.getElementById('fileInput');

  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    console.log(fileName);
  } else {
    console.log('Không có file nào được chọn.');
  }
}
