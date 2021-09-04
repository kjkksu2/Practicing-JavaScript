let photos = [
  {
    image: "pictures/jennie.png",
    name: "jennie",
  },
  {
    image: "pictures/jisoo.png",
    name: "jisoo",
  },
  {
    image: "pictures/lisa.png",
    name: "lisa",
  },
  {
    image: "pictures/rose.png",
    name: "rosé",
  },
];

const changePhotos = () => {
  const idx = Math.floor(Math.random() * photos.length);
  const member = document.querySelector(".member");
  const img = member.querySelector("img");
  const span = member.querySelector("span");

  member.animate(
    [
      { opacity: 0 },
      { opacity: 1, offset: 0.2 },
      { opacity: 1, offset: 0.8 },
      { opacity: 0 },
    ],
    {
      duration: 10000,
    }
  );

  img.src = photos[idx].image;
  span.innerText = `<${photos[idx].name}>`;
};

changePhotos();
setInterval(changePhotos, 10000);
