import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import logo from '@assets/images/logo.png';
import whitelogo from '@assets/images/white-logo.png';


document.addEventListener("DOMContentLoaded", function() {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Init smoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
  });

 

  const tl6 = gsap.timeline();

  tl6.to(".loader-text", {
    opacity: 1,
    duration: 1,
    yoyo: true,
    repeat: 1
  });

  tl6.to("#loader", {
    opacity: 0,
    duration: 1,
    delay: 0.8,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
    }
  });


    ScrollTrigger.create({
      trigger: ".section-2",
      start: "95% bottom",
      scrub: true,
      end: "bottom bottom",
      onEnter: () => {
        document.querySelector("header .logo img").src = whitelogo;
      },
      onLeaveBack: () => {
        document.querySelector("header .logo img").src = logo;
      },
      ease: "power1.inOut",
      duration: 1
    });


    const tl1 = gsap.timeline({
      scrollTrigger:{
        trigger: '.section-2',
        start: "95% bottom",
        scrub: true,
        end: "bottom bottom",
        // markers: true,
      }
    });

    tl1.to('header',{
      backgroundColor: 'black',
      ease: "power1.inOut",
      duration: 1
    },"same2")
    
    tl1.to('header .logo',{
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    },"same2")

    tl1.to('header .black',{
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#ffffff',
      ease: "power1.inOut",
      duration: 1
    },"same2")


const panel = document.querySelector(".section-2");
const items = document.querySelectorAll(".item");
const star = document.querySelector(".star");
const visibleCount = 3;
const totalItems = items.length;

// Calculate total items height for scroll distance
function getItemsTotalHeight() {
  let total = 0;
  items.forEach(item => {
    total += item.offsetHeight;
  });
  return total;
}

// Helper to center active item
function getColumnYPercent(activeIndex) {
  const centerOffset = Math.floor(visibleCount / 2);
  const firstY = (centerOffset / totalItems) * 100;
  const lastY = -((totalItems - 1 - centerOffset) / totalItems * 100);

  if (totalItems <= visibleCount) return 0;

  const t = activeIndex / (totalItems - 1);
  return firstY + (lastY - firstY) * t;
}

// On load → center first item immediately
gsap.set(".column", {
  yPercent: getColumnYPercent(0)
});

// Track star rotation
let starRotation = 0;
let isScrolling = false; // Flag to throttle scroll events

// Throttle function to limit rotation frequency
function throttle(func, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
}

let scrollAnim = gsap.timeline({
  scrollTrigger: {
    trigger: panel,
    start: "top top",
    end: () => "+=" + (getItemsTotalHeight() * 5),
    pin: true,
    scrub: 1.2,
    snap: {
      snapTo: (value) => {
        // snap progress to nearest item index
        let step = 1 / (totalItems - 1);
        return Math.round(value / step) * step;
      },
      duration: 0.6, // snap animation duration
      ease: "power2.out"
    },
    onUpdate: (self) => {
      const progress = self.progress;
      let activeIndex = Math.round(progress * (totalItems - 1));
      activeIndex = Math.max(0, Math.min(activeIndex, totalItems - 1));

      // Rotate star
      gsap.to(star, {
        rotation: activeIndex * -45,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Items
      items.forEach((item, i) => {
        item.classList.toggle("active", i === activeIndex);

        if (i === activeIndex) {
          gsap.to(item, { rotate: 0, duration: 0.4, overwrite: "auto" });
        }

        const amplitude = 40;
        const x = -amplitude * Math.pow(progress - 0.5, 2) + amplitude / 4;
        gsap.to(item, { x, duration: 0.4, overwrite: "auto" });
      });

      // Column centering
      const yPercent = getColumnYPercent(activeIndex);
      gsap.to(".column", {
        yPercent,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
  },
});


// const panel = document.querySelector(".section-2");
// const items = document.querySelectorAll(".item");
// const star = document.querySelector(".star");
// const visibleCount = 3;
// const totalItems = items.length;

// let scrollAnim = gsap.timeline({
//   scrollTrigger: {
//     trigger: panel,
//     start: "top top",
//     end: `+=${panel.offsetHeight}`,
//     pin: true,
//     scrub: true,
//     onUpdate: (self) => {
//       const progress = self.progress;

//       let activeIndex = Math.floor(progress * (totalItems - 1));
//       activeIndex = Math.max(0, Math.min(activeIndex, totalItems - 1));

//       items.forEach((item, i) => {
//         item.classList.toggle("active", i === activeIndex);
//       });
//     }
//   }
// });

// scrollAnim.to(".column", {
//   yPercent: -((totalItems - visibleCount) / totalItems) * 100,
//   ease: "none"
// }, 0);

// scrollAnim.to(star, {
//   rotation: -360,
//   ease: "none"
// }, 0);


    ScrollTrigger.create({
      trigger: ".section-3",
      start: "18% center",
      scrub: true,
      end: "23% center",
      onEnter: () => {
        document.querySelector("header .logo img").src = logo;
      },
      onLeaveBack: () => {
        document.querySelector("header .logo img").src = whitelogo;
      },
      ease: "power1.inOut",
      duration: 1
    });


    const tl2 = gsap.timeline({
      scrollTrigger:{
        trigger: '.section-3',
        start: "15% center",
        scrub: true,
        end: "20% center",
        // markers: true,
      }
    });

    tl2.to('header',{
      backgroundColor: 'white',
      ease: "power1.inOut",
      duration: 1
    },"same2")

    
    tl2.to('header .black',{
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#000000',
      ease: "power1.inOut",
      duration: 0.5
    },"same2")

    tl2.to('header .white',{
      backgroundColor: '#ffffff',
      color: '#00000',
      borderColor: '#000000',
      ease: "power1.inOut",
      duration: 0.5
    },"same2")


    ScrollTrigger.create({
      trigger: ".section-4",
      start: "90% bottom",
      scrub: true,
      end: "bottom bottom",
      onEnter: () => {
        document.querySelector("header .logo img").src = whitelogo;
      },
      onLeaveBack: () => {
        document.querySelector("header .logo img").src = logo;
      },
      ease: "power1.inOut",
      duration: 1
    });


    const tl3 = gsap.timeline({
      scrollTrigger:{
        trigger: '.section-4',
        start: "90% bottom",
        scrub: true,
        end: "bottom bottom",
        // markers: true,
      }
    });

    tl3.to('header',{
      backgroundColor: 'black',
      ease: "power1.inOut",
      duration: 1
    },"same2")

    
    tl3.to('header .black',{
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#ffffff',
      ease: "power1.inOut",
      duration: 0.5
    },"same2")

    tl3.to('header .white',{
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#ffffff',
      ease: "power1.inOut",
      duration: 0.5
    },"same2")

    if (window.innerWidth > 1024) {

    const panell   = document.querySelector('.section-4');
    const years    = Array.from(document.querySelectorAll('.year'));
    const segments = Array.from(document.querySelectorAll('.segment'));
    const contents = Array.from(document.querySelectorAll('.content'));
    const yearsCol = document.getElementById('years-col');

    // Measure exact gap between consecutive years; store on segment.dataset.full
    function computeSegmentHeights() {
      segments.forEach((seg, i) => {
        const y1 = years[i];
        const y2 = years[i + 1];
        if (!y1 || !y2) return;
        const y1Bottom = y1.offsetTop + y1.offsetHeight; // within same column
        const gap = Math.max(100, y2.offsetTop - y1Bottom);
        seg.dataset.full = gap;
        seg.style.height = '0px'; // reset visual
      });
    }

    // Only the connector corresponding to the current index stays extended
    function setActive(index) {
      years.forEach((y, i) => y.classList.toggle('active', i === index));
      contents.forEach((c, i) => c.classList.toggle('active', i === index));

      // For index 0, extend the first segment; otherwise extend the one above current year
      const extendedIdx = Math.min(index, segments.length - 1);

      segments.forEach((seg, i) => {
        const target = (i === extendedIdx) ? (parseFloat(seg.dataset.full) || 60) : 0;
        gsap.to(seg, { height: target, duration: 0.3, overwrite: 'auto' });
      });
    }

    let tl; let currentIndex = -1;

    function build() {
      if (tl) { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); }

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: panell,
          start: "top top",
          end: "bottom+=2500 top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Single tween bound to panel height; we pick index from progress → robust even on fast scroll
      tl.to({}, {
        duration: 1,
        onUpdate: () => {
          const steps = years.length;
          const p = tl.progress();                                  // 0..1 within THIS panel
          const idx = Math.min(steps - 1, Math.floor(p * steps));   // split panel progress into equal steps
          if (idx !== currentIndex) { currentIndex = idx; setActive(idx); }
        }
      });
    }

    function init() {
      computeSegmentHeights();

      // Default: first year active & first connector extended
      years[0].classList.add('active');
      contents[0].classList.add('active');
      if (segments[0]) gsap.set(segments[0], { height: parseFloat(segments[0].dataset.full) || 60 });

      build();

      // Recalculate on resize
      window.addEventListener('resize', () => {
        computeSegmentHeights();
        // keep current active after resize
        const idx = Math.max(0, years.findIndex(y => y.classList.contains('active')));
        setActive(idx === -1 ? 0 : idx);
        ScrollTrigger.refresh();
      });
    }

    window.addEventListener('load', init);


    }else{

    const panell   = document.querySelector('.section-4');
    const years    = Array.from(document.querySelectorAll('.year'));
    const segments = Array.from(document.querySelectorAll('.segment'));
    const contents = Array.from(document.querySelectorAll('.content'));
    const yearsCol = document.getElementById('years-col');

    // Measure exact gap between consecutive years; store on segment.dataset.full
    function computeSegmentHeights() {
      segments.forEach((seg, i) => {
        const y1 = years[i];
        const y2 = years[i + 1];
        if (!y1 || !y2) return;
        const y1Bottom = y1.offsetTop + y1.offsetHeight; // within same column
        const gap = Math.max(10, y2.offsetTop - y1Bottom);
        seg.dataset.full = gap;
        seg.style.height = '0px'; // reset visual
      });
    }

    // Only the connector corresponding to the current index stays extended
    function setActive(index) {
      years.forEach((y, i) => y.classList.toggle('active', i === index));
      contents.forEach((c, i) => c.classList.toggle('active', i === index));

      // For index 0, extend the first segment; otherwise extend the one above current year
      const extendedIdx = Math.min(index, segments.length - 1);

      segments.forEach((seg, i) => {
        const target = (i === extendedIdx) ? (parseFloat(seg.dataset.full) || 60) : 0;
        gsap.to(seg, { height: target, duration: 0.3, overwrite: 'auto' });
      });
    }

    let tl; let currentIndex = -1;

    function build() {
      if (tl) { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); }

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: panell,
          start: "top top",
          end: "bottom+=2500 top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Single tween bound to panel height; we pick index from progress → robust even on fast scroll
      tl.to({}, {
        duration: 1,
        onUpdate: () => {
          const steps = years.length;
          const p = tl.progress();                                  // 0..1 within THIS panel
          const idx = Math.min(steps - 1, Math.floor(p * steps));   // split panel progress into equal steps
          if (idx !== currentIndex) { currentIndex = idx; setActive(idx); }
        }
      });
    }

    function init() {
      computeSegmentHeights();

      // Default: first year active & first connector extended
      years[0].classList.add('active');
      contents[0].classList.add('active');
      if (segments[0]) gsap.set(segments[0], { height: parseFloat(segments[0].dataset.full) || 60 });

      build();

      // Recalculate on resize
      window.addEventListener('resize', () => {
        computeSegmentHeights();
        // keep current active after resize
        const idx = Math.max(0, years.findIndex(y => y.classList.contains('active')));
        setActive(idx === -1 ? 0 : idx);
        ScrollTrigger.refresh();
      });
    }

    window.addEventListener('load', init);

    }

    // const tl55 = gsap.timeline({
    //   scrollTrigger:{
    //     trigger: '.section-5',
    //     start: "75% bottom",
    //     scrub: true,
    //     end: "bottom bottom",
    //     markers: true,
    //   }
    // });

    // tl55.to('header',{
    //   backgroundColor: 'transparent',
    //   ease: "power1.inOut",
    //   duration: 1
    // })


    const tl5 = gsap.timeline({
      scrollTrigger:{
        trigger: '.section-5',
        start: "30% center",
        toggleActions: "play none none none",
        once: true,
        // markers: true,
      }
    });

    if (window.innerWidth > 1024) {
      tl5.to('.section-5 .black-circle',{
      opacity: 1,
      scale: 1.1,
      bottom: '-5%',
      display: 'block',
      ease: "power1.inOut",
      duration: 1.1
    })
    }

    tl5.fromTo('.section-5 .left-col',{
      x: 50,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    },'same')

    tl5.fromTo('.section-5 .right-col',{
      y: -50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    },'same')

});


