// Viewport height 계산해서 CSS 변수로 설정
function setVhVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariable();
window.addEventListener('resize', setVhVariable);


    const slidesWrapper = document.getElementById('slidesWrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let current = 0;

    const slideIndicator = document.getElementById('slideIndicator');

    slidesWrapper.style.width = `${totalSlides * 100}vw`;

    function updateSlide() {
      slidesWrapper.style.transform = `translateX(-${current * 100}vw)`;
      slideIndicator.textContent = `${current + 1} / ${totalSlides}`;
    }

    function changeSlide(direction) {
      slidesWrapper.style.transition = 'transform 0.5s ease';
      current += direction;
      if (current < 0) current = 0;
      if (current >= totalSlides) current = totalSlides - 1;
      updateSlide();
    }

    function toggleMenu() {
      document.getElementById('menuList').classList.toggle('show');
    }

    function goToSlideInstant(index) {
      slidesWrapper.style.transition = 'none';
      current = index;
      updateSlide();
      setTimeout(() => {
        slidesWrapper.style.transition = 'transform 0.5s ease';
      }, 50);
      document.getElementById('menuList').classList.remove('show');
    }

    let startX = 0, startY = 0;
    let endX = 0, endY = 0;
    let isPinchZoom = false;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        isPinchZoom = true;
        return;
      }
      isPinchZoom = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      if (isPinchZoom || e.changedTouches.length > 1) return;

      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);

      if (Math.abs(deltaX) > 50 && (angle < 15 || angle > 165)) {
        if (deltaX < 0) changeSlide(1);
        else changeSlide(-1);
      }
    });

    updateSlide();