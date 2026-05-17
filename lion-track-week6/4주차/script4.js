const summaryList = document.getElementById("summaryList");
const detailList = document.getElementById("detailList");
const countText = document.getElementById("countText");
const statusText = document.getElementById("statusText");

const nameInput = document.getElementById("name");
const partInput = document.getElementById("part");
const gradeInput = document.getElementById("grade");
const introInput = document.getElementById("intro");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const websiteInput = document.getElementById("website");

let currentFilter = "all";
let currentSort = "latest";
let currentSearch = "";

let lions = [
  {
    name: "김아기사자",
    part: "Frontend",
    grade: "2",
    tech: "Java",
    intro: "굉장한 프론트엔트 개발자가 되기를 준비중입니다.",
    detailIntro: "HTML과 CSS를 처음 배우면서 화면이 어떻게 구성되는지에 흥미를 느꼈습니다. 기본기를 탄탄히 다지는 개발자가 되고 싶습니다.",
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
    detailIntro: "웹 설계를 기초부터 차근차근 배우며, 훌륭한 개발자로의 도약을 준비하고 있습니다.",
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
    intro: "어떻게 하면 뛰어난 사용자 맞춤형 디자인을 만들지 꾸준히 고민합니다.",
    detailIntro: "사용자의 시선과 흐름을 고려한 인터페이스를 만드는 데 관심이 있습니다.",
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
    detailIntro: "아직 초보이지만 좋은 서비스를 만드는 개발자가 되고 싶습니다.",
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
    detailIntro: "데이터 구조와 데이터 처리에 관심이 많습니다. 데이터를 잘 다루는 개발자로 성장하고 싶습니다.",
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
    detailIntro: "사람들이 편하게 이용할 수 있는 웹 디자인을 항상 고민하고 있습니다.",
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
    intro: "실용적인 기능을 구현하는데 집중하고 있습니다.",
    detailIntro: "좋은 서비스 구조를 구축하는 것을 공부하고 있습니다.",
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
    detailIntro: "웹 설계는 아직 서툴지만, 열심히 공부하고 있습니다.",
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
    detailIntro: "디자인을 배우며 사용자에게 편한 화면을 고민하고 있습니다.",
    email: "lion9@example.com",
    phone: "010-0000-0000",
    website: "https://design.dev",
    image: "../2주차/images/in_a_man.jpeg"
  }
];

function getVisibleData() {
  let data = [...lions];

  if (currentFilter !== "all") {
    data = data.filter((lion) => lion.part === currentFilter);
  }

  if (currentSearch.trim() !== "") {
    data = data.filter((lion) => lion.name.includes(currentSearch.trim()));
  }

  if (currentSort === "asc") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (currentSort === "desc") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  }

  return data;
}

function render() {
  const data = getVisibleData();

  countText.textContent = `총 ${lions.length}명`;

  if (statusText.textContent === "") {
    statusText.textContent = "준비 완료";
  }

  if (data.length === 0) {
    summaryList.innerHTML = `<p>조건에 맞는 아기 사자가 없습니다.</p>`;
    detailList.innerHTML = "";
    return;
  }

  summaryList.innerHTML = data.map((lion) => `
    <article class="summary-card">
      <div class="image-wrap">
        <img src="${lion.image}" alt="${lion.name} 프로필 이미지" />
        <span class="badge">${lion.tech}</span>
      </div>
      <div class="summary-content">
        <h3>${lion.name}</h3>
        <p class="part">${lion.part}</p>
        <p class="one-line">${lion.intro}</p>
      </div>
    </article>
  `).join("");

  detailList.innerHTML = data.map((lion) => `
    <article class="detail-card">
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
    </article>
  `).join("");
}

async function fetchUsers(count) {
  statusText.textContent = "불러오는 중...";

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const json = await response.json();

    statusText.textContent = "불러오기 성공";

    return json.results.map((user) => {
      const parts = ["Frontend", "Backend", "Design"];
      const techs = ["JavaScript", "React", "HTML / CSS", "Node.js", "Figma"];

      return {
        name: `${user.name.first}기사자`,
        part: parts[Math.floor(Math.random() * parts.length)],
        grade: String(Math.floor(Math.random() * 4) + 1),
        tech: techs[Math.floor(Math.random() * techs.length)],
        intro: "외부 API에서 불러온 아기 사자입니다.",
        detailIntro: "fetch를 사용해 외부 데이터를 불러오고 화면에 동적으로 렌더링했습니다.",
        email: user.email,
        phone: user.phone,
        website: "https://example.com",
        image: user.picture.large
      };
    });
  } catch (error) {
    statusText.textContent = "불러오기 실패";
    return [];
  }
}

document.getElementById("addFormBtn").addEventListener("click", () => {
  const newLion = {
    name: nameInput.value || "새아기사자",
    part: partInput.value,
    grade: gradeInput.value || "1",
    tech: "JS",
    intro: introInput.value || "새롭게 추가된 아기 사자입니다.",
    detailIntro: introInput.value || "상세 자기소개가 아직 없습니다.",
    email: emailInput.value || "lion@example.com",
    phone: phoneInput.value || "010-0000-0000",
    website: websiteInput.value || "https://example.com",
    image: "../2주차/images/baem.jpeg"
  };

  lions.push(newLion);
  statusText.textContent = "직접 입력 데이터 추가 완료";
  render();
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  if (lions.length > 0) {
    lions.pop();
  }

  statusText.textContent = "마지막 항목 삭제 완료";
  render();
});

document.getElementById("add1Btn").addEventListener("click", async () => {
  const newUsers = await fetchUsers(1);
  lions.push(...newUsers);
  render();
});

document.getElementById("add5Btn").addEventListener("click", async () => {
  const newUsers = await fetchUsers(5);
  lions.push(...newUsers);
  render();
});

document.getElementById("resetBtn").addEventListener("click", async () => {
  const newUsers = await fetchUsers(9);

  if (newUsers.length > 0) {
    lions = newUsers;
  }

  render();
});

document.getElementById("filterSelect").addEventListener("change", (event) => {
  currentFilter = event.target.value;
  render();
});

document.getElementById("sortSelect").addEventListener("change", (event) => {
  currentSort = event.target.value;
  render();
});

document.getElementById("searchInput").addEventListener("input", (event) => {
  currentSearch = event.target.value;
  render();
});

render();