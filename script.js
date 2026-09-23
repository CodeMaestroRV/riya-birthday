const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");
const surpriseButton = document.getElementById("surpriseButton");
const loveButton = document.getElementById("loveButton");
const finalMessage = document.getElementById("finalMessage");
const heartLayer = document.getElementById("heart-layer");

// Reveal sections as the user scrolls.
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Background music.
// Add your MP3 as assets/music/our-song.mp3.
// Browsers normally require a user action before audio can play.
musicButton.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicIcon.textContent = "❚❚";
      musicText.textContent = "Music playing";
      musicButton.classList.add("playing");
    } else {
      music.pause();
      musicIcon.textContent = "♪";
      musicText.textContent = "Play our song";
      musicButton.classList.remove("playing");
    }
  } catch (error) {
    musicText.textContent = "Add our-song.mp3";
  }
});

// Heart animation.
function releaseHearts(count = 30) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.2 ? "♥" : "♡";

    heart.style.left = `${45 + (Math.random() - 0.5) * 20}vw`;
    heart.style.top = `${48 + (Math.random() - 0.5) * 12}vh`;
    heart.style.fontSize = `${12 + Math.random() * 24}px`;
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 360}px`);
    heart.style.setProperty("--y", `${-150 - Math.random() * 500}px`);
    heart.style.setProperty("--duration", `${1.3 + Math.random() * 1.4}s`);

    heartLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

surpriseButton.addEventListener("click", () => {
  releaseHearts(45);
  document.getElementById("memories").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

loveButton.addEventListener("click", () => {
  finalMessage.classList.add("show");
  finalMessage.style.maxHeight = `${finalMessage.scrollHeight}px`;
  loveButton.textContent = "I love you, Riya ♥";
  releaseHearts(55);

  setTimeout(() => {
    finalMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 250);
});

// A small initial heart ambience.
window.addEventListener("load", () => {
  setTimeout(() => releaseHearts(12), 700);
});
