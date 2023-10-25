// =========  common ==============
const initialData = [
  {
    id: 0,
    value: 60,
  },
  {
    id: 1,
    value: 150,
  },
  {
    id: 2,
    value: 75,
  },
];

const updateData = (newData) => {
  localStorage.setItem("data", JSON.stringify(newData));
  data = newData;
};

const render = (data) => {
  updateData(data);
  displayData(data);
  showTable(data);
  showDetailData(data);
};

//get Data from LocalStorage
let localStorageData, data;
localStorageData = localStorage.getItem("data");

if (localStorageData !== null) {
  data = JSON.parse(localStorageData);
} else {
  updateData(initialData);
}

// ========= 1) 그래프 ==============
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createKeyframes = (height) => {
  const keyframes = document.styleSheets[0].insertRule(
    `@keyframes ${height} {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: ${height}%;
      opacity: 1;
    }
  }`,
    0
  );
};

const displayData = (data) => {
  const graphDataSection = document.getElementById("graphData");
  graphDataSection.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");
    div.style.setProperty("--height", `${item.value / 2}%`);
    div.classList.add("graph", "stack");

    const h3 = document.createElement("h3");
    h3.textContent = item.id;

    const span = document.createElement("span");
    span.textContent = item.value;
    span.style.backgroundColor = getRandomColor();

    div.appendChild(span);
    div.appendChild(h3);

    graphDataSection.appendChild(div);
  });
};

displayData(data);

// ========= 2) 값 편집 ==============
const saveTable = () => {
  const table = document.querySelector("#editDataSection table");
  const rows = table.rows;
  const newData = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.cells;

    const value = parseFloat(cells[1].textContent);

    newData.push({
      id: i - 1,
      value: value,
    });
  }

  render(newData);
};

const resetTable = () => {
  showTable(data);
};
const showTable = (data) => {
  const table = document.querySelector("#editDataSection table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  data.forEach((item) => {
    const row = table.insertRow();

    // 항목, 값, 삭제 열에 데이터 추가
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = item.id;
    cell2.textContent = item.value;

    // 삭제 버튼을 추가하고 클릭 이벤트 처리
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      table.deleteRow(row.rowIndex);
    });

    cell3.appendChild(deleteButton);
  });
};
showTable(data);

// ========= 3) 값 추가 ==============
const isValidNumber = (textValue) => {
  return 0 <= textValue && textValue <= 200;
};
const addData = () => {
  const textarea = document.getElementById("dataId");
  const textValue = parseFloat(textarea.value);

  if (!isNaN(textValue) && isValidNumber(textValue)) {
    const newData = [...data];
    newData.push({
      id: data.length,
      value: textValue,
    });

    render(newData);
    textarea.value = "";
  } else {
    alert("0이상 200이하의 숫자만 입력해주세요");
  }
};

// ========= 4) 값 고급 편집 ==============
const isValidData = (data) => {
  let idx = 0;

  for (const item of data) {
    const numProperties = Object.keys(item).length;
    if (numProperties != 2 || !("id" in item) || !("value" in item)) {
      return false; // 필수 속성(id, value, label)이 누락된 경우
    }
    if (typeof item.id !== "number" || typeof item.value !== "number") {
      return false; // id, value가 숫자가 아닌 경우
    }
    if (item.id !== idx++) return false;
    if (!isValidNumber(item.value)) return false;
    // id, value가 값이 형식에 맞지 않을 경우
  }
  return true;
};
const showDetailData = (data) => {
  const textarea = document.getElementById("editDetailId");
  textarea.textContent = JSON.stringify(data, null, 2);
};

showDetailData(data);

let textareaValue;
const handleTextarea = (textarea) => {
  textareaValue = textarea.value;
};
const editDetailData = () => {
  let newData;
  try {
    newData = JSON.parse(textareaValue);
  } catch (error) {
    alert("consol을 확인하여 유효한 json 형식으로 입력해주세요.");
    console.error(error);
  }
  if (isValidData(newData)) {
    render(newData);
  } else {
    alert("data의 유효한 프로퍼티를 입력해주세요. ");
  }
};

// ========= +) typing effect ==============
const content = "React, React Native, Javascript, Typescript, Html, Css";
const text = document.querySelector(".text");
let i = 0;

const typing = () => {
  let txt = content[i++];
  text.innerHTML += txt === "\n" ? "<br/>" : txt;
  if (i > content.length) {
    text.textContent = "";
    i = 0;
  }
};
setInterval(typing, 200);
