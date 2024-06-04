let activeBrothId = null;
let activeProteinId = null;

function getBroth() {
  var apiKey = '4676677e-8a89-4331-bc32-89ad03576a4a';

  return axios.get('https://ramengo-backend.onrender.com/broths', {
      headers: {
          'x-api-key': apiKey
      }
  })
  .then(function(response) {
      return response.data;
  })
  .catch(function(error) {
      console.error('Erro ao buscar os dados da API:', error);
  });
}

function sendOrder() {
  var apiKey = '4676677e-8a89-4331-bc32-89ad03576a4a';

  if (activeBrothId && activeProteinId) {
      axios.post('https://ramengo-backend.onrender.com/orders', 
          { brothId: activeBrothId, proteinId: activeProteinId }, 
          { headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' } }
      )
      .then(function(response) {
          console.log('IDs enviados com sucesso:', response.data);
      })
      .catch(function(error) {
          console.error('Erro ao enviar os IDs:', error);
      });
  } else {
      console.log('IDs de broth e protein não encontrados');
  }
}

function updateSlideImages(slides) {
  let activeSlideExists = false;

  slides.forEach((slide) => {
      if (slide.classList.contains('active')) {
          activeSlideExists = true;
      }
  });

  slides.forEach((slide) => {
      if (activeSlideExists) {
          if (slide.classList.contains('active')) {
              slide.querySelector('img').src = slide.dataset.imageActive;
          } else {
              slide.querySelector('img').src = slide.dataset.imageInactive;
          }
      } else {
          slide.querySelector('img').src = slide.dataset.imageInactive;
      }
  });
}

function updateSlides(data) {
  var slides = document.querySelectorAll('.slide');
  var indicators = document.querySelectorAll('.indicator');

  data.forEach(function (broth, index) {
      var slide = slides[index];
      var indicator = indicators[index];
      slide.querySelector('img').src = broth.imageInactive; 
      slide.querySelector('h3').textContent = broth.name;
      slide.querySelector('#broth-description').textContent = broth.description;
      slide.querySelector('#broth-price').textContent = 'US$ ' + broth.Price;

      slide.dataset.imageActive = broth.imageActive;
      slide.dataset.imageInactive = broth.imageInactive;

      slide.addEventListener('click', function () {
          var isActive = slide.classList.contains('active');

          slides.forEach(s => s.classList.remove('active'));

          if (!isActive) {
              slide.classList.add('active');
              activeBrothId = slide.id;
          } else {
            activeBrothId = null; 
          }

          updateSlideImages(slides);
      });
  });

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
          indicators.forEach(i => i.classList.remove('active'));
          indicator.classList.add('active');
      });
  })
}

window.onload = function() {
  getBroth().then(function(data) {
      updateSlides(data);
  });
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
