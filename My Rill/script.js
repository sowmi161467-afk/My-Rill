
const pages = document.querySelectorAll(".page");
const progress = document.getElementById("progress");

let currentPage = 1;
let currentGiftIndex = 0;

function showPage(number) {
  currentPage = number;

  pages.forEach((page) => {
    page.classList.toggle("active", page.id === "page" + number);
  });

  progress.textContent =
    String(number).padStart(2, "0") + " / 08";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".next-page").forEach((button) => {
  button.addEventListener("click", () => {
    const next = Number(button.dataset.next);
    showPage(next);
  });
});

// Floating hearts in the background
function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 22) + "px";
  heart.style.setProperty("--duration", (6 + Math.random() * 6) + "s");
  heart.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");

  document.querySelector(".ambient-hearts").appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createFloatingHeart, 650);

// Gift photo popup
const gifts = Array.from(document.querySelectorAll(".gift"));
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const photoError = document.getElementById("photoError");

function openGift(index) {
  if (!gifts.length) return;

  currentGiftIndex = index;
  const gift = gifts[index];

  modalImage.onload = () => {
    photoError.hidden = true;
    modalCaption.textContent = gift.dataset.caption;
  };

  modalImage.onerror = () => {
    photoError.hidden = false;
    modalCaption.textContent = "A little memory is waiting for you ❤️";
  };

  photoError.hidden = true;
  modalCaption.textContent = "Opening your little memory... ❤️";
  modalImage.src = gift.dataset.photo;
  photoModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeGift() {
  photoModal.hidden = true;
  modalImage.src = "";
  document.body.style.overflow = "";
}

gifts.forEach((gift, index) => {
  gift.addEventListener("click", () => openGift(index));
});

document.getElementById("closePhoto").addEventListener("click", closeGift);

photoModal.addEventListener("click", (event) => {
  if (event.target === photoModal) closeGift();
});

document.getElementById("nextPhoto").addEventListener("click", () => {
  if (gifts.length) {
    openGift((currentGiftIndex + 1) % gifts.length);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !photoModal.hidden) closeGift();
});

// Birthday cake candles
const blowButton = document.getElementById("blowCandles");
const cutButton = document.getElementById("cutCake");
const candles = document.querySelectorAll(".candle");
const cakeInstruction = document.getElementById("cakeInstruction");
const cakeWish = document.getElementById("cakeWish");
const cakeScene = document.querySelector(".cake-scene");

blowButton.addEventListener("click", () => {
  candles.forEach((candle) => candle.classList.add("blown"));

  blowButton.textContent = "Candles Blown! ❤️";
  blowButton.disabled = true;
  cutButton.disabled = false;
  cakeInstruction.textContent =
    "You did it! Now cut your birthday cake, my love. 🎂";

  launchConfetti();
});

cutButton.addEventListener("click", () => {
  cakeScene.classList.add("cut");
  cakeWish.hidden = false;
  cutButton.textContent = "Cake Cut With Love ❤️";
  cutButton.disabled = true;
  cakeInstruction.textContent =
    "Make a wish, my Rill. You deserve all the happiness. 🥹";

  launchConfetti();
});

// Confetti burst
function launchConfetti() {
  const symbols = ["❤️", "♡", "✨", "🎉", "💗", "✦"];

  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.setProperty("--left", Math.random() * 100 + "vw");
    piece.style.setProperty("--size", (12 + Math.random() * 16) + "px");
    piece.style.setProperty("--duration", (2.5 + Math.random() * 2.5) + "s");
    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
  }
}

// Reveal one love message each time a box is touched
document.querySelectorAll(".message-box").forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.toggle("open");
  });
});

// Restart the complete experience
document.getElementById("restart").addEventListener("click", () => {
  closeGift();
  showPage(1);

  // Reset birthday cake
  candles.forEach((candle) => candle.classList.remove("blown"));
  blowButton.disabled = false;
  blowButton.textContent = "Blow the Candles 🕯️";
  cutButton.disabled = true;
  cutButton.textContent = "Cut the Cake 🔪";
  cakeScene.classList.remove("cut");
  cakeWish.hidden = true;
  cakeInstruction.textContent =
    "First, touch the candles to blow them out. 🕯️";

  // Reset message boxes
  document.querySelectorAll(".message-box").forEach((box) => {
    box.classList.remove("open");
  });

  launchConfetti();
});
