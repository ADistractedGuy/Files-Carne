
const carousel = document.querySelector("#articles-carousel");

if (carousel) {
    const slides = carousel.querySelectorAll(".carousel-item");
    const prevButton = carousel.querySelector("#prev-article");
    const nextButton = carousel.querySelector("#next-article");

    let currentIndex = 0;

    function showSlide(index) {
        slides[currentIndex].classList.remove("active");

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add("active");
    }

    prevButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
    });
}
