const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const countText = document.getElementById("countText");

const nameInput = document.getElementById("name");
const partInput = document.getElementById("part");
const gradeInput = document.getElementById("grade");
const introInput = document.getElementById("intro");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const websiteInput = document.getElementById("website");

const summaryList = document.getElementById("summaryList");
const detailList = document.getElementById("detailList");

const lions = [
  {
    name: "김아기사자",
    part: "Frontend",
    grade: "2",
    intro: "굉장한 프론트엔트 개발자가 되기를 준비중입니다.",
    detailIntro:
      "HTML과 CSS를 처음 배우면서 화면이 어떻게 구성되는지에 흥미를 느꼈습니다. 기본기를 탄탄히 다지는 개발자가 되고 싶습니다.",
    email: "lion1@example.com",
    phone: "010-0000-0000",
    website: "https://example.com",
    image: "../2주차/images/lion_yell.jpeg",
    badge: "Java"
  },
  {
    name: "성아기사자",
    part: "Frontend",
    grade: "2",
    intro: "웹 개발에 관심이 많습니다.",
    detailIntro:
      "웹 설계를 기초부터 차근차근 배우며, 훌륭한 개발자로의 도약을 준비하고 있습니다.",
    email: "lion2@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/maeng_soo.jpeg",
    badge: "HTML / CSS"
  },
  {
    name: "오아기사자",
    part: "Design",
    grade: "1",
    intro: "어떻게 하면 뛰어난 사용자 맞춤형 디자인을 만들지 꾸준히 고민합니다.",
    detailIntro:
      "사용자의 시선과 흐름을 고려한 인터페이스를 만드는 데 관심이 있습니다.",
    email: "lion3@example.com",
    phone: "010-0000-0000",
    website: "https://design.me",
    image: "../2주차/images/star_paint.jpeg",
    badge: "Figma"
  },
  {
    name: "최아기사자",
    part: "Frontend",
    grade: "2",
    intro: "컴포넌트 단위 설계에 흥미가 있습니다.",
    detailIntro:
      "아직 초보이지만 좋은 서비스를 만드는 개발자가 되고 싶습니다.",
    email: "lion4@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/baem.jpeg",
    badge: "TypeScript"
  },
  {
    name: "정아기사자",
    part: "Backend",
    grade: "2",
    intro: "데이터 흐름을 명확히 하는 개발을 지향합니다.",
    detailIntro:
      "데이터 구조와 데이터 처리에 관심이 많습니다. 데이터를 잘 다루는 개발자로 성장하고 싶습니다.",
    email: "lion5@example.com",
    phone: "010-0000-0000",
    website: "https://backend.dev",
    image: "../2주차/images/hippo.jpeg",
    badge: "Spring"
  },
  {
    name: "박아기사자",
    part: "Design",
    grade: "2",
    intro: "디자인 시스템에 관심이 많습니다.",
    detailIntro:
      "사람들이 편하게 이용할 수 있는 웹 디자인을 항상 고민하고 있습니다.",
    email: "lion6@example.com",
    phone: "010-0000-0000",
    website: "https://design.dev",
    image: "../2주차/images/monarija.jpeg",
    badge: "Design System"
  },
  {
    name: "황아기사자",
    part: "Backend",
    grade: "2",
    intro: "실용적인 기능을 구현하는데 집중하고 있습니다.",
    detailIntro: "좋은 서비스 구조를 구축하는 것을 공부하고 있습니다.",
    email: "lion7@example.com",
    phone: "010-0000-0000",
    website: "https://backend.dev",
    image: "../2주차/images/jerry.jpeg",
    badge: "Node.js"
  },
  {
    name: "한아기사자",
    part: "Frontend",
    grade: "2",
    intro: "정돈된 레이아웃 구성을 만드는 데 노력하고 있습니다.",
    detailIntro:
      "웹 설계는 아직 서툴지만, 열심히 공부하고 있습니다.",
    email: "lion8@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/tom.jpeg",
    badge: "CSS Grid"
  },
  {
    name: "송아기사자",
    part: "Design",
    grade: "2",
    intro: "사용자 접근성이 좋은 화면을 만드는 것을 공부하고 있습니다.",
    detailIntro: "디자인을 배우며 사용자에게 편한 화면을 고민하고 있습니다.",
    email: "lion9@example.com",
    phone: "010-0000-0000",
    website: "https://design.dev",
    image: "../2주차/images/in_a_man.jpeg",
    badge: "Typography"
  }
];

const defaultImage = "../2주차/images/baem.jpeg";

function render() {
  summaryList.innerHTML = "";
  detailList.innerHTML = "";

  countText.textContent = `총 ${lions.length}명`;

  if (lions.length === 0) {
    summaryList.innerHTML = `<p class="empty-message">아직 등록된 아기 사자가 없습니다.</p>`;
    detailList.innerHTML = `<p class="empty-message">상세 정보가 없습니다.</p>`;
    return;
  }

  lions.forEach(function (lion) {
    const summaryCard = document.createElement("article");
    summaryCard.className = "summary-card";

    summaryCard.innerHTML = `
      <div class="image-wrap">
        <img src="${lion.image}" alt="${lion.name} 프로필 이미지">
        <span class="badge">${lion.badge}</span>
      </div>

      <div class="summary-content">
        <h3>${lion.name}</h3>
        <p class="part">${lion.part}</p>
        <p class="one-line">${lion.intro}</p>
      </div>
    `;

    summaryList.appendChild(summaryCard);

    const detailCard = document.createElement("article");
    detailCard.className = "detail-card";

    detailCard.innerHTML = `
      <h3>${lion.name}</h3>
      <p class="part">${lion.part}</p>
      <p><strong>학년:</strong> ${lion.grade}학년</p>

      <section>
        <h4>자기소개</h4>
        <p>${lion.detailIntro}</p>
      </section>

      <section>
        <h4>연락처</h4>
        <ul>
          <li>이메일: ${lion.email}</li>
          <li>전화번호: ${lion.phone}</li>
          <li>웹사이트: <a href="${lion.website}" target="_blank">${lion.website}</a></li>
        </ul>
      </section>
    `;

    detailList.appendChild(detailCard);
  });
}

function resetErrors() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("partError").textContent = "";
  document.getElementById("gradeError").textContent = "";
  document.getElementById("introError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("websiteError").textContent = "";
}

function validateInputs() {
  let isValid = true;
  resetErrors();

  if (nameInput.value.trim() === "") {
    document.getElementById("nameError").textContent = "이름을 입력해주세요.";
    isValid = false;
  }

  if (partInput.value === "") {
    document.getElementById("partError").textContent = "파트를 선택해주세요.";
    isValid = false;
  }

  if (gradeInput.value.trim() === "") {
    document.getElementById("gradeError").textContent = "학년을 입력해주세요.";
    isValid = false;
  }

  if (introInput.value.trim() === "") {
    document.getElementById("introError").textContent = "자기소개를 입력해주세요.";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    document.getElementById("emailError").textContent = "이메일을 입력해주세요.";
    isValid = false;
  }

  if (phoneInput.value.trim() === "") {
    document.getElementById("phoneError").textContent = "전화번호를 입력해주세요.";
    isValid = false;
  }

  if (websiteInput.value.trim() === "") {
    document.getElementById("websiteError").textContent = "웹사이트 주소를 입력해주세요.";
    isValid = false;
  }

  return isValid;
}

function clearInputs() {
  nameInput.value = "";
  partInput.value = "";
  gradeInput.value = "";
  introInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  websiteInput.value = "";
}

addBtn.addEventListener("click", function () {
  if (!validateInputs()) {
    return;
  }

  const newLion = {
    name: nameInput.value.trim(),
    part: partInput.value,
    grade: gradeInput.value.trim(),
    intro: introInput.value.trim(),
    detailIntro: introInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    website: websiteInput.value.trim(),
    image: defaultImage,
    badge: "JS"
  };

  lions.push(newLion);
  render();
  clearInputs();
  resetErrors();
});

deleteBtn.addEventListener("click", function () {
  if (lions.length > 0) {
    lions.pop();
    render();
  }
});

render();