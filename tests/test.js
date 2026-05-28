let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.carousel-item');
  
  // Remove a classe ativa do slide atual
  slides[currentSlide].classList.remove('active');
  
  // Calcula o novo índice
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  // Adiciona a classe ativa ao novo slide
  slides[currentSlide].classList.add('active');
}

// Opcional: Rotação automática a cada 3 segundos
setInterval(() => moveSlide(1), 3000);