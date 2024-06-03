

window.onload = function() {
    var apiKey = '4676677e-8a89-4331-bc32-89ad03576a4a';

    axios.get('https://ramengo-backend.onrender.com/broths', {
        headers: {
            'x-api-key': apiKey
        }
    })
        .then(function(response) {
        var data = response.data;
        console.log(data)
        updateSlides(data);
    })
        .catch(function(error) {
            console.error('Erro ao buscar os dados da API:', error);
    });  

    function updateSlides(data) {
        var slides = document.querySelectorAll('.slide');
        data.forEach(function (broth, index) {
          var slide = slides[index];
          slide.querySelector('img').src = broth.imageInactive; 
          slide.querySelector('h3').textContent = broth.name;
          slide.querySelector('#broth-description').textContent = broth.description;
          slide.querySelector('#broth-price').textContent = 'US$ ' + broth.Price;
    
          slide.addEventListener('click', function () {
            slide.classList.toggle('active');
    
            if (slide.classList.contains('active')) {
              slide.querySelector('img').src = broth.imageActive; 
            } else {
              slide.querySelector('img').src = broth.imageInactive; 
            }
    
    
          slide.dataset.imageActive = broth.imageActive;
        });
      }
)}
};

const carousel = document.querySelector('.carousel');
const slides = carousel.querySelector('.slides');
const indicators = carousel.querySelector('.indicators');

let currentSlideIndex = 0;
let isDragging = false;
let startX = 0;

function moveToSlide(index) {
  index = Math.max(0, Math.min(slides.children.length - 1, index));

  slides.style.transform = `translateX(-${index * 100}%)`;
  currentSlideIndex = index;

  slides.querySelectorAll('.slide-out').forEach(slide => {
    slide.classList.remove('active');
  });
  indicators.querySelectorAll('.indicator').forEach(indicator => {
    indicator.classList.remove('active');
  });

  indicators.querySelector(`[data-index="${index}"]`).classList.add('active');
}

indicators.querySelectorAll('.indicator').forEach(indicator => {
  indicator.addEventListener('click', (event) => {
    event.preventDefault();

    const newSlideIndex = parseInt(indicator.dataset.index);
    moveToSlide(newSlideIndex);
  });
});

slides.querySelectorAll('.slide-out').forEach(slide => {
  slide.addEventListener('click', () => {
    slide.classList.toggle('active');

    slides.querySelectorAll('.slide-out.active').forEach(otherSlide => {
      if (otherSlide !== slide) {
        otherSlide.classList.remove('active');
      }
    });
  });
});

carousel.addEventListener('touchstart', (event) => {
  event.stopPropagation(); 
  isDragging = true;
  startX = event.touches[0].clientX;
});

document.addEventListener('touchmove', (event) => {
  if (!isDragging) return;

  const deltaX = event.touches[0].clientX - startX;
  const slideWidth = carousel.clientWidth;

  let newSlideIndex = Math.round(currentSlideIndex - deltaX / slideWidth);

  newSlideIndex = Math.max(0, Math.min(slides.children.length - 1, newSlideIndex));

  moveToSlide(newSlideIndex);
  startX = event.touches[0].clientX; 
});

document.addEventListener('touchend', (event) => {
  isDragging = false;
});

slides.querySelectorAll('.slide-out').forEach(slide => {
  slide.classList.remove('active');
});
