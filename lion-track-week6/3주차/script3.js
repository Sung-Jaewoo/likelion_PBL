const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const techInput = document.getElementById("tech");
const detailIntroInput = document.getElementById("detailIntro");
const commentInput = document.getElementById("comment");

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
    tech: "Java",
    intro: "굉장한 프론트엔트 개발자가 되기를 준비중입니다.",
    email: "lion1@example.com",
    phone: "010-0000-0000",
    website: "https://example.com",
    image: "../2주차/images/lion_yell.jpeg"
  },
  {
    name: "성아기사자",
    part: "Frontend",
    grade: "2",
    tech: "HTML / CSS",
    intro: "웹 개발에 관심이 많습니다.",
    email: "lion2@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/maeng_soo.jpeg"
  },
  {
    name: "오아기사자",
    part: "Design",
    grade: "1",
    tech: "Figma",
    intro: "사용자 맞춤형 디자인을 꾸준히 고민합니다.",
    email: "lion3@example.com",
    phone: "010-0000-0000",
    website: "https://design.me",
    image: "../2주차/images/star_paint.jpeg"
  },
  {
    name: "최아기사자",
    part: "Frontend",
    grade: "2",
    tech: "TypeScript",
    intro: "컴포넌트 단위 설계에 흥미가 있습니다.",
    email: "lion4@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/baem.jpeg"
  },
  {
    name: "정아기사자",
    part: "Backend",
    grade: "2",
    tech: "Spring",
    intro: "데이터 흐름을 명확히 하는 개발을 지향합니다.",
    email: "lion5@example.com",
    phone: "010-0000-0000",
    website: "https://backend.dev",
    image: "../2주차/images/hippo.jpeg"
  },
  {
    name: "박아기사자",
    part: "Design",
    grade: "2",
    tech: "Design System",
    intro: "디자인 시스템에 관심이 많습니다.",
    email: "lion6@example.com",
    phone: "010-0000-0000",
    website: "https://design.dev",
    image: "../2주차/images/monarija.jpeg"
  },
  {
    name: "황아기사자",
    part: "Backend",
    grade: "2",
    tech: "Node.js",
    intro: "실용적인 기능을 구현하는 데 집중하고 있습니다.",
    email: "lion7@example.com",
    phone: "010-0000-0000",
    website: "https://backend.dev",
    image: "../2주차/images/jerry.jpeg"
  },
  {
    name: "한아기사자",
    part: "Frontend",
    grade: "2",
    tech: "CSS Grid",
    intro: "정돈된 레이아웃 구성을 만드는 데 노력하고 있습니다.",
    email: "lion8@example.com",
    phone: "010-0000-0000",
    website: "https://frontend.dev",
    image: "../2주차/images/tom.jpeg"
  },
  {
    name: "송아기사자",
    part: "Design",
    grade: "2",
    tech: "Typography",
    intro: "사용자 접근성이 좋은 화면을 만드는 것을 공부하고 있습니다.",
    email: "lion9@example.com",
    phone: "010-0000-0000",
    website: "https://design.dev",
    image: "../2주차/images/in_a_man.jpeg"
  }
];

function render() {
  summaryList.innerHTML = "";
  detailList.innerHTML = "";

  countText.textContent = `총 ${lions.length}명`;

  lions.forEach(function (lion) {
    const summaryCard = document.createElement("article");
    summaryCard.className = "summary-card";

    summaryCard.innerHTML = `
      <div class="image-wrap">
        <img src="${lion.image}" alt="${lion.name} 프로필 이미지">
        <span class="badge">${lion.tech}</span>
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
        <p>${lion.intro}</p>
      </section>

      <section>
        <h4>관심 기술</h4>
        <p>${lion.tech}</p>
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

addBtn.addEventListener("click", function () {
  const newLion = {
    name: nameInput.value || "새아기사자",
    part: partInput.value || "Frontend",
    grade: gradeInput.value || "1",
    tech: "JS",
    intro: introInput.value || "새롭게 추가된 아기 사자입니다.",
    email: emailInput.value || "lion@example.com",
    phone: phoneInput.value || "010-0000-0000",
    website: websiteInput.value || "https://example.com",
    image: "../2주차/images/baem.jpeg"
  };

  lions.push(newLion);
  render();
});

deleteBtn.addEventListener("click", function () {
  if (lions.length > 0) {
    lions.pop();
    render();
  }
});

render();