(function () {
  const container = document.getElementById('accordion');
  let items = Array.from(container.querySelectorAll('.accordion-item'));
  const headers = Array.from(container.querySelectorAll('.accordion-header'));
  const MOBILE_BREAKPOINT = 768;
  let lastWidth = window.innerWidth;

  const curveStep = 25; // px vertical drop per step (change for steeper curve)

  // Get vertical offsets for each item based on visual position
  function getCurveOffsets() {
    const n = items.length;
    const middle = Math.floor(n / 2);
    return items.map((it, idx) => {
      const visualIndex = parseInt(it.style.order || idx);
      const distance = Math.abs(visualIndex - middle);
      return distance * curveStep;
    });
  }

  function setExplicitNaturalOrder() {
    items.forEach((it, idx) => it.style.order = idx);
  }

  function clearOrderStyles() {
    items.forEach(it => it.style.order = '');
  }

  // Clear transforms for mobile simple dropdown mode
  function clearTransforms() {
    items.forEach(it => {
      it.style.transform = '';
      it.style.transition = '';
    });
  }

  // FLIP animation with curve baked in
  function doFlip(reorderFn) {
    const firstRects = items.map(it => it.getBoundingClientRect());
    const firstOffsets = getCurveOffsets();

    reorderFn();

    const lastRects = items.map(it => it.getBoundingClientRect());
    const lastOffsets = getCurveOffsets();

    items.forEach((it, idx) => {
      const dx = firstRects[idx].left - lastRects[idx].left;
      const dy = firstRects[idx].top - lastRects[idx].top;
      const curveDiff = firstOffsets[idx] - lastOffsets[idx];

      it.style.transition = 'none';
      it.style.transform = `translate(${dx}px, ${dy + curveDiff}px)`;
    });

    container.offsetWidth; // force reflow

    items.forEach((it, idx) => {
      it.style.transition = 'transform 500ms cubic-bezier(.2,.9,.3,1)';
      it.style.transform = `translateY(${lastOffsets[idx]}px)`;
    });

    setTimeout(() => {
      items.forEach((it, idx) => {
        it.style.transition = '';
        it.style.transform = `translateY(${lastOffsets[idx]}px)`;
      });
    }, 470);
  }

  function rotateToCenter(clickedIndex) {
    const n = items.length;
    const middle = Math.floor(n / 2);
    const shift = (middle - clickedIndex + n) % n;

    doFlip(() => {
      items.forEach((it, idx) => {
        it.style.order = (idx + shift) % n;
      });
    });
  }

  function resetToNatural() {
    setExplicitNaturalOrder();
    doFlip(() => {});
    setTimeout(() => clearOrderStyles(), 500);
  }

  function initLayout() {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      const section4Index = 3;
      items[section4Index].classList.add('active');
      rotateToCenter(section4Index);
    } else {
      clearTransforms(); // make it a normal vertical accordion
    }
  }

  function onHeaderClick(e) {
    const header = e.currentTarget;
    const item = header.parentElement;
    const idx = items.indexOf(item);
    const wasActive = item.classList.contains('active');

    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      // Mobile simple dropdown behavior
      items.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
      return;
    }

    // Desktop curvy rotation behavior
    items.forEach(i => i.classList.remove('active'));

    if (wasActive) {
      resetToNatural();
      return;
    }

    item.classList.add('active');
    rotateToCenter(idx);
  }

  headers.forEach(h => h.addEventListener('click', onHeaderClick));

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    if ((lastWidth <= MOBILE_BREAKPOINT && w > MOBILE_BREAKPOINT) ||
        (lastWidth > MOBILE_BREAKPOINT && w <= MOBILE_BREAKPOINT)) {
      const activeIndex = items.findIndex(it => it.classList.contains('active'));
      if (w > MOBILE_BREAKPOINT) {
        if (activeIndex >= 0) rotateToCenter(activeIndex);
      } else {
        clearTransforms();
      }
    }
    lastWidth = w;
  });

  initLayout();

})();
