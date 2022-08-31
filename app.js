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
                    
                    

                    <button
                        onclick="loadPhoneDetails('${phone.slug}')
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                        Launch
                        static
                        backdrop
                        modal
                    </button>
                </div>
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

// clicked function

// const clickedPhone = () => {
//   document.getElementById;
// };

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

loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data.mainFeatures);
  const datas = data.data;
  const div = document.createElement("div");
  const phoneDetailsContainer = document.getElementById(
    "phone-details-container"
  );
  phoneDetailsContainer.innerHTML = "";

  div.innerHTML = `
    <div class="col w-50">
            <div class="card m-4 ">
                <img src="${datas.image}" class="card-img-top px-4 py-5 h-50 w-50 mx-auto" alt="...">
                <div class="card-body bg-secondary text-white">
                    <h1 class="card-title text-white-50 text-center">Phone details</h1>

                    <h1 class="card-title">${datas.name}</h1>
                    <h3 class="card-title">${datas.releaseDate}</h3>
                    <p>${datas.mainFeatures.storage}</p>
                    <p>${datas.mainFeatures.displaySize}</p>
                    <p>${datas.mainFeatures.chipSet}</p>
                    <p>${datas.mainFeatures.sensors}</p>                  
                </div>
            </div>
    </div>
  `;

  // alert("btn works");
  phoneDetailsContainer.appendChild(div);
};
