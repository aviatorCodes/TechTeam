document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("img");
  trail.src = "../images/saransh_btn_small.png";
  trail.className = "cursor-trail";
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);
});