// Tạo một hàm để lấy dữ liệu từ tệp JSON
function getListFilm(callback, search) {
  fetch("https://mor-start.onrender.com/listfilm") // Đường dẫn đến tệp JSON
    .then((response) => response.json())
    .then((data) => {
      // Lấy mảng "listfilm" từ dữ liệu JSON
      const listfilm = data;
      // Gọi hàm callback và truyền giá trị "listfilm" vào nó
      callback(listfilm);
    });
//     .catch((error) => {
//       alert("Lỗi khi đọc tệp JSON:", error);
//     });
}
// Hàm để hiển thị danh sách phim lên màn hình
function listProduct(listfilm) {
  const itemContainer = document.getElementById("item");

  listfilm.forEach((item) => {
    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");

    // Sử dụng một sự kiện click chung cho cả hình ảnh và tiêu đề để vào trang "detail"
    filmCard.addEventListener("click", function () {
      window.location.href = "detail.html" + `?idx=${item.id}`;
    });

    const image = document.createElement("img");
    image.src = item.image;
    image.classList.add("film-image");

    // Sử dụng cùng một sự kiện click cho hình ảnh
    image.addEventListener("click", function () {
      window.location.href = "detail.html" + `?idx=${item.id}`;
    });

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.textContent = item.name;

    const details = document.createElement("p");
    details.textContent = `${item.time} | ${item.date}`;


    const detailButton = document.createElement("input");
    detailButton.type = "button";
    detailButton.value = "Detail";
    detailButton.addEventListener("click", function () {
      window.location.href = "detail.html" + `?idx=${item.id}`;
    });

    cardBody.appendChild(title);
    cardBody.appendChild(details);

    filmCard.appendChild(image);
    filmCard.appendChild(cardBody);

    itemContainer.appendChild(filmCard);
  });
}

// Gọi hàm getListFilm và truyền hàm listProduct làm callback
getListFilm(listProduct);
