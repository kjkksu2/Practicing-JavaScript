const textForm = document.querySelector(".write-text");
const input = textForm.querySelector("input");

let listArray = [];

const showSeeMoreList = () => {
  const seeMoreList = document.querySelector(".seeMoreList");

  if (seeMoreList.classList.contains("hidden")) {
    // 창을 열 때
    seeMoreList.animate(
      [{ opacity: 0 }, { transform: "translateY(30px)", opacity: 1 }],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    seeMoreList.classList.remove("hidden");
  } else {
    // 창을 닫을 때
    seeMoreList.animate(
      [{ opacity: 1 }, { transform: "translateY(-5px)", opacity: 0 }],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    timeoutID = setTimeout(() => {
      seeMoreList.classList.add("hidden");
    }, 510);
  }
};

const deleteList = (event) => {
  const removeList = event.target.parentNode;
  removeList.remove();

  listArray = listArray.filter((item) => {
    return parseInt(removeList.id) !== item.id;
  });

  addLocalStorage();
  window.location.reload();
};

const showList = (listObj, len) => {
  const ul = document.querySelector(".write-list");
  const li = document.createElement("li");
  const span_text = document.createElement("span");
  const span_delete = document.createElement("span");
  const div = document.createElement("div");

  span_text.innerText = `🗹 ${listObj.text}`;
  li.id = listObj.id;
  li.appendChild(span_text);
  span_delete.innerText = "delete";
  span_delete.addEventListener("click", deleteList);
  li.appendChild(span_delete);

  if (len < 9) {
    ul.appendChild(li);
  } else {
    const seeMoreUl = document.querySelector(".write-seeMore-list");
    seeMoreUl.appendChild(li);
  }

  if (len === 9) {
    div.innerHTML = "<button>See More</button>";
    div.className = "seeMore";
    ul.appendChild(div);
    const seeMoreBtn = document.querySelector(".seeMore button");
    seeMoreBtn.addEventListener("click", showSeeMoreList);
  }
};

const addLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(listArray));
};

const getTextValue = (event) => {
  event.preventDefault();
  if (input.value === "") {
    return alert("Please write down your plan.");
  }
  listObj = {
    id: Date.now(),
    text: input.value,
  };
  input.value = "";

  if (listArray.length < 16) {
    listArray.push(listObj);
  } else {
    return alert("Storage is full. Please empty your list.");
  }

  showList(listObj, listArray.length);
  addLocalStorage();
};

textForm.addEventListener("submit", getTextValue);

const savedList = JSON.parse(localStorage.getItem("todo"));
if (savedList) {
  savedList.forEach((item, idx) => {
    showList(item, idx + 1);
    listArray.push(item);
  });
}
