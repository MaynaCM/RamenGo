let activeBrothId = null;

function setActiveBrothId(activeId) {
    activeBrothId = activeId;
}

export function getActiveBrothId(){
    return activeBrothId
}

function updateBrothImages(slides) {
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

export function updateBrothCarousel(data) {
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
              var activeId = slide.id;
              setActiveBrothId(activeId)
          } else {
            activeBrothId = null; 
          }

          updateBrothImages(slides);
      });
  });

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
          indicators.forEach(i => i.classList.remove('active'));
          indicator.classList.add('active');
      });
  })
}

