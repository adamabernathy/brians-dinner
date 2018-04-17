(() => {
  const px = (value) => `${value}px`;
  const half = (value) => value / 2.0;

  /**
   * Moves the overlay on top of an image
   * @param {HTMLNode} overlayImage
   */
  const adjustImageOverlay = ($overlayImage) => {
    const imageWidth = $overlayImage.offsetWidth;
    const imageHeight = $overlayImage.offsetHeight;

    // Create the slider
    let sliderActive = false;
    const $slider = document.createElement('DIV');
    $slider.classList.add('img-comp-slider');

    $overlayImage.style.width = px(half(imageWidth));
    $overlayImage.parentElement.insertBefore($slider, $overlayImage);

    // Position the slide in the center
    $slider.style.top = px(half(imageHeight) - half($slider.offsetHeight));
    $slider.style.left = px(half(imageWidth) - half($slider.offsetWidth));

    // Event handlers
    const getCursorPos = (e) =>
      ((e || window.event).pageX - $overlayImage.getBoundingClientRect().left) - window.pageXOffset;

    const slideMove = (e) => {
      if (!sliderActive) return false;
      let newXPos = getCursorPos(e);

      // Prevent the slider from being positioned outside the image
      if (newXPos < 0) newXPos = 0;
      if (newXPos > imageWidth) newXPos = imageWidth;

      $overlayImage.style.width = px(newXPos)
      $slider.style.left = px(newXPos - half($slider.offsetWidth))
    }

    const slideReady = (e) => {
      e.preventDefault();
      sliderActive = true;
      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }

    const slideFinish = () => { sliderActive = false; }

    // Set listeners on the mouse and touch screens.  Because iPhones ya know
    $slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    $slider.addEventListener('touchstart', slideReady);
    window.addEventListener('touchstop', slideFinish);
  }

  // Find any image with the overlay class and work on it
  const $overlayImage = document.getElementsByClassName('img-comp-overlay')
  for (let i = 0, l = $overlayImage.length; i < l; i++) adjustImageOverlay($overlayImage[i]);
})();