document.addEventListener('DOMContentLoaded', function() {
  const proteinCarouselElement = document.querySelector('.protein-carousel');
  initializeCarousel(proteinCarouselElement);
});

function initializeCarousel(proteinCarouselElement) {
  const protein_slides = proteinCarouselElement.querySelector('.protein-slides');
  const protein_indicators = proteinCarouselElement.querySelector('.protein-indicators');

  let currentProteinSlideIndex = 0;
  let ProteinSlideIsDragging = false;
  let ProteinSlideStartX = 0;

  protein_indicators.querySelectorAll('.protein-indicator').forEach(protein_indicator => {
    protein_indicator.addEventListener('click', (event) => {
      event.preventDefault();

      const proteinNewSlideIndex = parseInt(protein_indicator.dataset.index);
      moveToProteinSlide(proteinNewSlideIndex);
    });
  });

  protein_slides.querySelectorAll('.protein-slide-out').forEach(proteinSlide => {
    proteinSlide.addEventListener('click', () => {
      proteinSlide.classList.toggle('active');

      protein_slides.querySelectorAll('.protein-slide-out.active').forEach(otherProteinSlide => {
        if (otherProteinSlide !== proteinSlide) {
          otherProteinSlide.classList.remove('active');
        }
      });
    });
  });

  proteinCarouselElement.addEventListener('touchstart', (event) => {
    event.stopPropagation(); 
    ProteinSlideIsDragging = true;
    ProteinSlideStartX = event.touches[0].clientX;
  });

  document.addEventListener('touchmove', (event) => {
    if (!ProteinSlideIsDragging) return;

    const ProteinDeltaX = event.touches[0].clientX - ProteinSlideStartX;
    const PorteinSlideWidth = proteinCarouselElement.clientWidth;

    let proteinNewSlideIndex = Math.round(currentProteinSlideIndex - ProteinDeltaX / PorteinSlideWidth);

    proteinNewSlideIndex = Math.max(0, Math.min(protein_slides.children.length - 1, proteinNewSlideIndex));

    moveToProteinSlide(proteinNewSlideIndex);
    ProteinSlideStartX = event.touches[0].clientX; 
  });

  document.addEventListener('touchend', (event) => {
    ProteinSlideIsDragging = false;
  });

  protein_slides.querySelectorAll('.protein-slide-out').forEach(proteinSlide => {
    proteinSlide.classList.remove('active');
  });

  function moveToProteinSlide(index) {
    index = Math.max(0, Math.min(protein_slides.children.length - 1, index));

    protein_slides.style.transform = `translateX(-${index * 100}%)`;
    currentProteinSlideIndex = index;

    protein_slides.querySelectorAll('.protein-slide-out').forEach(proteinSlide => {
      proteinSlide.classList.remove('active');
    });
    protein_indicators.querySelectorAll('.protein-indicator').forEach(protein_indicator => {
      protein_indicator.classList.remove('active');
    });

    protein_indicators.querySelector(`[data-index="${index}"]`).classList.add('active');
  }
}
