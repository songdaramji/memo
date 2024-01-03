const apiUrl = "http://localhost:8000"; // FastAPI 서버 주소로 변경

async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정사항을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  console.log(res);
  readMemo();
}

async function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
}

async function readMemo() {
  try {
    const res = await fetch(`${apiUrl}/memos`);
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerText = "";
    jsonRes.forEach(displayMemo);
  } catch (error) {
    console.error("readMemo error:", error);
  }
}

async function createMemo(value) {
  try {
    const res = await fetch(`${apiUrl}/memos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: new Date().getTime().toString(),
        content: value,
      }),
    });
    readMemo();
  } catch (error) {
    console.error("createMemo error:", error);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
