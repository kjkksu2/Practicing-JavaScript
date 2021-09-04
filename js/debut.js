const debut = document.querySelector(".debut");
const debutBtn = document.querySelector(".debut-button");
const anniversary = debut.querySelector("span:first-child");
const clock = debut.querySelector("span:last-child");

const getDates = () => {
  const currentTime = new Date();
  const debutTime = new Date("2016-08-08 00:00:00");
  let diff = Math.floor((currentTime.getTime() - debutTime.getTime()) / 1000);

  const days = Math.floor(diff / (24 * 60 * 60));
  diff %= 24 * 60 * 60;
  const hours = Math.floor(diff / (60 * 60));
  diff %= 60 * 60;
  const minutes = Math.floor(diff / 60);
  diff %= 60;
  const seconds = Math.floor(diff);

  const years = Math.floor(days / 365);

  anniversary.innerText = `${years}th anniversary of debut 🎉`;
  clock.innerText = `(${days}d ${String(hours).padStart(2, "0")}h ${String(
    minutes
  ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s)`;
};

getDates();
setInterval(getDates, 1000);

const clickDebutBtn = () => {
  if (debut.classList.contains("hidden")) {
    // 창을 열 때
    debut.animate(
      [{ opacity: 0 }, { transform: "translateY(50px)", opacity: 1 }],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    debut.classList.remove("hidden");
  } else {
    // 창을 닫을 때
    debut.animate(
      [{ opacity: 1 }, { transform: "translateY(-10px)", opacity: 0 }],
      {
        duration: 500,
        fill: "forwards",
      }
    );
    timeoutID = setTimeout(() => {
      debut.classList.add("hidden");
    }, 510);
  }
};

debutBtn.addEventListener("click", clickDebutBtn);
