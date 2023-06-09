// 상품 불러오기
async function loadCategoryProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category_id");
  console.log(categoryId);

  const response = await fetch(`https://lucedude.link/product/category/${categoryId}/`, {
    method: "GET",
  });

  response_json = await response.json();
  response_json_array = response_json.results;

  const products = document.getElementById("products");
  const category_h1 = document.getElementById("category_h1");
  const title = await getCategoryList()
  category_h1.innerText = title[categoryId-1].name

  response_json_array.forEach((product) => {
    const newProduct = document.createElement("div");
    newProduct.setAttribute("onclick", `productDetail(${product.id})`);
    newProduct.style = "width: 200px; height: 300px;";
    newProduct.style.border = "1px solid black";
    newProduct.style.margin = "10px";

    const newImage = document.createElement("img");
    newImage.style = "width: 200px; height: 200px; cursor: pointer;"; // 이미지 크기 지정
    newImage.style.backgroundColor = "black";
    newImage.style.objectFit = "cover";

    if (product.images && product.images.length !== 0) {
      newImage.src = product.images[0].image; // 이미지 URL 지정
      newProduct.appendChild(newImage);
    } else {
      newImage.src = `https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99F519345EE1ED620D`; // 이미지 URL 지정
      newProduct.appendChild(newImage);
    }

    const newTitle = document.createElement("h3");
    newTitle.textContent = product.title;
    newTitle.style = "cursor: pointer;"
    newProduct.appendChild(newTitle);

    const newPrice = document.createElement("p");
    newPrice.textContent = numberWithCommas(product.price) + " 원";
    newProduct.appendChild(newPrice);

    products.appendChild(newProduct);
  });
}

// 상세페이지 보기
function productDetail(product_id) {
  window.location.href = `/product_detail.html?product_id=${product_id}`;
}

window.onload = async function () {
  await loadCategoryProducts();
};

// 숫자 콤마 정규식
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
