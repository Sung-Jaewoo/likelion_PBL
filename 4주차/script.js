const API_URL = "https://randomuser.me/api/?nat=us,gb,ca,au";

const loadBtn = document.querySelector("#loadBtn");
const loadFiveBtn = document.querySelector("#loadFiveBtn");
const loadAllBtn = document.querySelector("#loadAllBtn");
const lionForm = document.querySelector("#lionForm");

const nameInput = document.querySelector("#nameInput");
const partInput = document.querySelector("#partInput");
const emailInput = document.querySelector("#emailInput");

const partFilter = document.querySelector("#partFilter");
const sortSelect = document.querySelector("#sortSelect");
const searchInput = document.querySelector("#searchInput");

const statusText = document.querySelector("#statusText");
const cardList = document.querySelector("#cardList");

let lions = [];

function getRandomPart() {
  const parts = ["Frontend", "Backend", "Design"];
  const randomIndex = Math.floor(Math.random() * parts.length);
  return parts[randomIndex];
}

function setStatus(message, type) {
  statusText.textContent = message;

  statusText.classList.remove("loading", "success", "error");

  if (type) {
    statusText.classList.add(type);
  }
}

function convertUserToLion(user) {
  return {
    id: crypto.randomUUID(),
    name: `${user.name.first} ${user.name.last}`,
    part: getRandomPart(),
    email: user.email,
    image: user.picture.large
  };
}

async function fetchRandomUsers(count) {
  const response = await fetch(`${API_URL}&results=${count}`);

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }

  const data = await response.json();

  return data.results.map(function (user) {
    return convertUserToLion(user);
  });
}

function getFilteredLions() {
  let filteredLions = [...lions];

  const selectedPart = partFilter.value;
  const keyword = searchInput.value.trim().toLowerCase();
  const sortType = sortSelect.value;

  if (selectedPart !== "all") {
    filteredLions = filteredLions.filter(function (lion) {
      return lion.part === selectedPart;
    });
  }

  if (keyword !== "") {
    filteredLions = filteredLions.filter(function (lion) {
      return lion.name.toLowerCase().includes(keyword);
    });
  }

  if (sortType === "name") {
    filteredLions.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  return filteredLions;
}

function renderLions() {
  const filteredLions = getFilteredLions();

  cardList.innerHTML = "";

  if (filteredLions.length === 0) {
    cardList.innerHTML = `
      <div class="empty">
        조건에 맞는 아기 사자가 없습니다.
      </div>
    `;
    return;
  }

  filteredLions.forEach(function (lion) {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${lion.image}" alt="${lion.name} 프로필 이미지" />
      <div class="card-content">
        <h3>${lion.name}</h3>
        <p>${lion.email}</p>
        <span class="badge">${lion.part}</span>
      </div>
    `;

    cardList.appendChild(card);
  });
}

async function addRandomLions(count) {
  try {
    setStatus("데이터를 불러오는 중입니다...", "loading");

    const newLions = await fetchRandomUsers(count);

    lions = [...lions, ...newLions];

    renderLions();

    setStatus(`${count}명의 아기 사자를 추가했습니다.`, "success");
  } catch (error) {
    setStatus("데이터를 불러오지 못했습니다. 다시 시도해주세요.", "error");
  }
}

async function resetRandomLions() {
  try {
    setStatus("전체 명단을 새로 불러오는 중입니다...", "loading");

    const newLions = await fetchRandomUsers(9);

    lions = newLions;

    renderLions();

    setStatus("전체 명단을 새로고침했습니다.", "success");
  } catch (error) {
    setStatus("새로고침에 실패했습니다. 다시 시도해주세요.", "error");
  }
}

function addManualLion(event) {
  event.preventDefault();

  const newLion = {
    id: crypto.randomUUID(),
    name: nameInput.value.trim(),
    part: partInput.value,
    email: emailInput.value.trim(),
    image: "https://randomuser.me/api/portraits/lego/1.jpg"
  };

  lions = [...lions, newLion];

  lionForm.reset();

  renderLions();

  setStatus("직접 입력한 아기 사자가 추가되었습니다.", "success");
}

loadBtn.addEventListener("click", function () {
  addRandomLions(1);
});

loadFiveBtn.addEventListener("click", function () {
  addRandomLions(5);
});

loadAllBtn.addEventListener("click", function () {
  resetRandomLions();
});

lionForm.addEventListener("submit", addManualLion);

partFilter.addEventListener("change", renderLions);
sortSelect.addEventListener("change", renderLions);
searchInput.addEventListener("input", renderLions);

renderLions();