const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const imageCount = document.getElementById("imageCount");

let visibleItems = Array.from(galleryItems);
let currentIndex = 0;

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        visibleItems = Array.from(galleryItems).filter(item => {
            const matches = category === "all" ||
                item.dataset.category === category;

            item.style.display = matches ? "block" : "none";

            return matches;
        });

        imageCount.textContent = `${visibleItems.length} photographs`;
    });
});

function openLightbox() {
    if (!visibleItems.length) return;

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const title = item.querySelector("h3");
    const category = item.querySelector("span");

    if (!image || !title || !category) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = category.textContent;

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
}

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        currentIndex = visibleItems.indexOf(item);

        if (currentIndex !== -1) {
            openLightbox();
        }
    });
});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

function nextImage() {
    if (!visibleItems.length) return;

    currentIndex = (currentIndex + 1) % visibleItems.length;

    openLightbox();
}

function previousImage() {
    if (!visibleItems.length) return;

    currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;

    openLightbox();
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", previousImage);

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }
});

imageCount.textContent = `${visibleItems.length} photographs`;