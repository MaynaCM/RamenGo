let activeProteinId = null;

function setActiveProteinId(activeId) {
    activeProteinId = activeId;
}

export function getActiveProteinId(){
    return activeProteinId
}

function updateProteinImages(slides) {
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

export function updateProteinCarousel(data) {
  var slides = document.querySelectorAll('.protein-slide');
  var indicators = document.querySelectorAll('.protein-indicator');

  data.forEach(function (Protein, index) {
      var slide = slides[index];
      var indicator = indicators[index];
      slide.querySelector('img').src = Protein.imageInactive; 
      slide.querySelector('h3').textContent = Protein.name;
      slide.querySelector('#protein-description').textContent = Protein.description;
      slide.querySelector('#protein-price').textContent = 'US$ ' + Protein.price;

      slide.dataset.imageActive = Protein.imageActive;
      slide.dataset.imageInactive = Protein.imageInactive;

      slide.addEventListener('click', function () {
          var isActive = slide.classList.contains('active');

          slides.forEach(s => s.classList.remove('active'));

          if (!isActive) {
              slide.classList.add('active');
              var activeId = slide.id;
              setActiveProteinId(activeId)
          } else {
            activeProteinId = null; 
          }

          updateProteinImages(slides);
      });
  });

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
          indicators.forEach(i => i.classList.remove('active'));
          indicator.classList.add('active');
      });
  })
}

