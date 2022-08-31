const loadPhone = async (searchPhone, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const showAll = document.getElementById("show-all");

  if (phones.length === 0) {
    const notFound = document.getElementById("no-found-msg");
    notFound.classList.remove("d-none");
    showAll.classList.add("d-none");
    // console.log(notFound.innerHTML);
  } else {
    if (dataLimit && phones.length > 10) {
      phones = phones.slice(0, 10);
      showAll.classList.remove("d-none");
    } else {
      showAll.classList.add("d-none");
    }
    for (const phone of phones) {
      // console.log(phone.slug);
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="col" id="${phone.slug}">
            <div class="card m-4 shadow">
                <img src="${phone.image}" class="card-img-top px-4 pt-2 h-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                        additional
                        content. This content is a little bit longer.</p>
                    
                    
                  

                    <!-- Button trigger modal -->
                  <button
                      onclick="loadPhoneDetails('${phone.slug}')"
                      href="#"
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#phoneDetailModal">
                      Show detail
                  </button>


            </div>
    </div>
  `;
      phoneContainer.appendChild(div);

      const notFound = document.getElementById("no-found-msg");
      notFound.classList.add("d-none");
    }
  }
  loadingBtn(false);
};
loadPhone("a");

const displaySearch = (dataLimit) => {
  loadingBtn(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

const search = () => {
  document.getElementById("btn-search").addEventListener("click", function () {
    const phoneDetailsContainer = document.getElementById(
      "phone-details-container"
    );
    phoneDetailsContainer.innerHTML = "";

    displaySearch(10);

    searchField.value = "";
  });
};
search();

const input = document.getElementById("search-field");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-search").click();
  }
});

function loadingBtn(isLoading) {
  const loadingBtn = document.getElementById("loading-btn");
  if (isLoading) {
    loadingBtn.classList.remove("d-none");
  } else {
    loadingBtn.classList.add("d-none");
  }
}

document.getElementById("show-all").addEventListener("click", function () {
  displaySearch();
});

const loadPhoneDetails = async (id) => {
  // alert("f works");
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  const modalImage = document.getElementById("phoneDetailModalImage");
  modalImage.src = `${phone.image}`;
  modalTitle.innerHTML = `${phone.name}`;
  console.log(phone);
};
