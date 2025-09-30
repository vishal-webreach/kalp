import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import logo from '@assets/images/logo.png';
import whitelogo from '@assets/images/white-logo.png';
import slide_1 from '@assets/images/slide-1.webp';
import slide_2 from '@assets/images/slide-2.webp';
import slide_3 from '@assets/images/slide-3.webp';
import slide_4 from '@assets/images/slide-4.webp';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay } from 'swiper/modules';


document.addEventListener("DOMContentLoaded", function() {
  // Scroll to top on page load (including reload)
  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Init smoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 4, // Lower value = faster, snappier scroll
    effects: true,
  });

 

  // const tl = gsap.timeline();

  // tl.to(".loader-text", {
  //   opacity: 1,
  //   duration: 1,
  //   yoyo: true,
  //   repeat: 1
  // });

  // tl.to("#loader", {
  //   opacity: 0,
  //   duration: 1,
  //   delay: 0.8,
  //   onComplete: () => {
  //     document.getElementById("loader").style.display = "none";
  //   }
  // });

  // tl.from("header", {
  //   opacity: 0,
  //   y: -40,
  //   duration: 1,
  //   ease: "power2.out"
  // },'same');

  // tl.from(".section-1 .head-1", {
  //   opacity: 0,
  //   y: -40,
  //   delay: 1,
  //   duration: 1,
  //   ease: "power2.out"
  // },'same');

  // tl.from(".firstStep", {
  //   opacity: 0,
  //   y: 30,
  //   duration: 1,
  //   ease: "power2.out"
  // });

  // circle glow 
  let glowTween;
  const circle = document.querySelector("#circle");

  // Start the glow animation
  function startGlow() {
    // Reset box-shadow before starting animation
    circle.style.boxShadow = "0 0 10px burlywood";

  // If already exists, skip
  if (glowTween) return;

  glowTween = gsap.to(circle, {
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      boxShadow: "0 0 40px 10px burlywood"
    });
  }

  // Stop and remove glow animation
  function stopGlow() {
    if (glowTween) {
      glowTween.kill();       // Remove animation
      glowTween = null;
    }
    // Reset box-shadow to OFF
    circle.style.boxShadow = "none";
  }

  // Initial start
  startGlow();

  // Scroll listener
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      startGlow(); // Only at top
    } else {
      stopGlow(); // Remove effect on scroll
    }
  });

  document.querySelector("#circle").addEventListener("click", () => {
    // Scroll to 1 full viewport height (assuming each section = 100vh)
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
  

  // Arrow fade
  gsap.to('#arrow-down', {
    scrollTrigger: {
      trigger: ".frame-2",
      start: "top bottom",
      scrub: true,
      end: "20% bottom",
    },
    opacity: 0
  });

  // Circle animation
const tl1 = gsap.timeline({
  scrollTrigger:{
    trigger: '.frame-2',
    start: "top bottom",
    scrub: true,
    end: "90% bottom",
    // markers: true,
  }
});

tl1.to('#circle',{
  scale: 2.5,
  zIndex: -1,
  top: "42.5%",
  ease: "power1.inOut",
  duration: 1
}, "same")


tl1.to('.head-1',{
  y: -30,
  opacity: 0,
  ease: "power1.inOut",
  duration: 1
}, "same")

tl1.to('.firstStep',{
  y: 30,
  opacity: 0,
  ease: "power1.inOut",
  duration: 1
}, "same")

// tl1.to('.first-human',{
//   y: 30,
//   opacity: 1,
//   position: 'fixed',
//   ease: "power1.inOut",
//   duration: 1
// })

tl1.to('.first-human',{
  y: -40,
  scale: 1.2,
  opacity: 1,
  position: 'fixed',
  ease: "power1.inOut",
  duration: 1
}, "same2")

tl1.to('.head-2',{
  opacity: 1,
  ease: "power1.inOut",
  duration: 1
}, "same2")


  // Circle animation
  const tl2 = gsap.timeline({
    scrollTrigger:{
      trigger: '.frame-3',
      start: "top bottom",
      scrub: true,
      end: "90% bottom",
      // markers: true,
    }
  });

  tl2.to('.text-3',{
    display: 'none',
    opacity: 0,
    ease: "power1.inOut",
    duration: 1
  })

  tl2.to('.text-4',{
    display: 'inline-block',
    opacity: 1,
    ease: "power1.inOut",
    duration: 1
  }, 'same')

  tl2.to('.first-human',{
    y: 30,
    scale: 0.950,
    ease: "power1.inOut",
    duration: 1
  }, 'same')

  tl2.to('.pepole-1',{
    // y: 20,
    opacity: 1,
    ease: "power1.inOut",
    duration: 1
  }, 'same')

  tl2.to('#circle',{
    scale: 4,
    top: "42.5%",
    ease: "power1.inOut",
    duration: 1
  }, 'same')

    
  // Circle animation
    const tl3 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-4',
        start: "top bottom",
        scrub: true,
        end: "90% bottom",
        // markers: true,
      }
    });
    
    tl3.to('.pepole-1',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    }, 'same')

    tl3.to('.text-2',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    }, 'same')

    tl3.to('.text-5',{
      opacity: 1,
      display: 'inline-block',
      ease: "power1.inOut",
      duration: 1
    }, 'same2')

    tl3.to('.first-human',{
      // y: 20,
      scale: 0.800,
      ease: "power1.inOut",
      duration: 1
    }, 'same2')
  
    tl3.to('.pepole-2',{
      // y: 20,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    }, 'same2')

    tl3.to('#circle',{
      scale: 6,
      top: "42.5%",
      ease: "power1.inOut",
      duration: 1
    }, 'same2')

  
    ScrollTrigger.create({
      trigger: ".frame-5",
      start: "8% bottom",
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

    const tl444 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-5',
        start: "top bottom",
        scrub: true,
        end: "15% bottom",
        // markers: true,
      }
    });
    
    tl444.to('.section-1',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl444.to('#circle',{
      backgroundColor: '#ffffff',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl444.to('body',{
      backgroundColor: '#000000',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl444.to('header .black',{
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#ffffff',
      ease: "power1.inOut",
      duration: 1
    },"same")



    const tl4 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-5',
        start: "15% bottom",
        scrub: true,
        end: "60% bottom",
        // markers: true,
      }
    });
    
    tl4.to('.section-1',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl4.to('#circle',{
      backgroundColor: '#ffffff',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl4.to('body',{
      backgroundColor: '#000000',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl4.to('#circle',{
      opacity: 0,
      scale: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    }, "same")

    tl4.to('.section-2',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    },"same2")


    
    const tl44 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-5',
        start: "60% bottom",
        toggleActions: "play none none none",
        once: true,
        // markers: true,
      }
    });

    // tl44.fromTo('.section-2 .circle-overlay',{
    //   scale: 0,
    // },{
    //   scale: 15,
    //   opacity: 0,
    //   ease: "power1.inOut",
    //   duration: 1
    // })

    tl44.fromTo('.section-2 .left-col',{
      x: -50,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5
    })

    tl44.fromTo('.section-2 .right-col .brown-logo',{
      x: 50,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5
    })

    tl44.fromTo('.section-2 .right-col .para',{
      y: -50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5
    })

    const lines = [
      'Empower <strong>your</strong> people <br class="hidden lg:block"> digitally',
      'Prosper <strong>your</strong> communities <br class="hidden lg:block"> digitally',
      'Transform <strong>your</strong> nation <br class="hidden lg:block"> digitally'
    ];
    
    const textEl = document.getElementById("changingText");
    
    const tl5 = gsap.timeline({ repeat: -1 });
    
    lines.forEach((line) => {
      tl5.to(textEl, {
        duration: 1,
        // opacity: 0.5,
        onComplete: () => {
          textEl.innerHTML = line; // ✅ render bold and <br>
        }
      })
      .to(textEl, {
        duration: 0.5,
        // opacity: 1
      }, "+=0.1");
    });


    ScrollTrigger.create({
      trigger: ".frame-6",
      start: "5% bottom",
      scrub: true,
      end: "bottom bottom",
      onEnter: () => {
        document.querySelector("header .logo img").src = logo;
      },
      onLeaveBack: () => {
        document.querySelector("header .logo img").src = whitelogo;
      },
      ease: "power1.inOut",
      duration: 1
    });

    const tl66 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-6',
        start: "top bottom",
        scrub: true,
        end: "5% bottom",
        // markers: true,
      }
    });

    tl66.to('header .black',{
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#000000',
      ease: "power1.inOut",
      duration: 1
    })

    tl66.to('body',{
      backgroundColor: '#ffffff',
      ease: "power1.inOut",
      duration: 1
    })


    const tl6 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-6',
        start: "top bottom",
        scrub: true,
        end: "5% bottom",
        // markers: true,
      }
    });
    
    tl6.to('.section-2',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    // tl6.to('.section-2',{
    //   opacity: 0,
    //   scale: 0,
    //   display: 'none',
    //   ease: "power1.inOut",
    //   duration: 1
    // })


    tl6.to('.section-3',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })

    
    // tl6.to('.section-3 .box',{
    //   opacity: 1,
    //   display: 'block',
    //   ease: "power1.inOut",
    //   duration: 1,
    // }, "+=10")

    const tl77 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-6',
        start: "5% bottom",
        toggleActions: "play none none none",
        once: true,
      }
    });

    // tl77.fromTo('.section-3 .left-col',{
    //   scale: 0,
    //   opacity: 0,
    // },{
    //   scale: 1,
    //   opacity: 1,
    //   ease: "power1.inOut",
    //   duration: 1
    // })

    tl77.fromTo('.section-3 .container',{
      y: 50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    })

    const tl7 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-6',
        start: "30% bottom",
        scrub: true,
        end: "60% bottom",
        // markers: true,
      }
    });

    // tl7.to('.section-3 .left-col',{
    //   rotate: 45,
    //   ease: "power1.inOut",
    //   duration: 1
    // }, 'same')

    tl7.to('.section-3 .box',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    }, 'same')

    tl7.to('.section-3 .video-wrapper',{
      scale: 1.5,
      ease: "power1.inOut",
      duration: 1
    }, 'same')


    const tl88 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-7',
        start: "3% bottom",
        toggleActions: "play none none none",
        once: true,
      }
    });

    tl88.fromTo('.section-4 .heading',{
      x: -50,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    })


    const tl8 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-7',
        start: "top bottom",
        scrub: true,
        end: "10% bottom",
        // markers: true,
      }
    });
    
    tl8.to('.section-3',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    tl8.to('.section-4',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })


// Content for each slide
    const slides = [
      {
        bg: slide_1,
        leftTitle: "Citizen Registry",
        leftText: "The unified banking system keeps a record of  all citizens, enabling easy financial inclusion, better access to credit, and automated tax  submission.",
        rightText: "Awa, a 32 year old artisan in a Senegalese village, was able to get a microloan for a small pottery business in 5 minutes by just showing her citizen ID connected with banking systems."
      },
      {
        bg: slide_2,
        leftTitle: "Education",
        leftText: "Digital education records enable online learning  management systems, universally verifiable certification, and easier access to grants,  scholarships, and employment opportunities",
        rightText: "Radhika, a 19 year old student from West Bengal, India, now receives her scholarship instantly by connecting his education records with the student registry system of the university, empowering her with education."
      },
      {
        bg: slide_3,
        leftTitle: "Healthcare",
        leftText: "Digitized Healthcare IDs allow easy access to  insurance, vaccination records, subsidized medicine, teleconsult and e-prescriptions.",
        rightText: "People in the Philippines now use a National Health Card to access insurance, free doctor visits, and public healthcare."
      },
      {
        bg: slide_4,
        leftTitle: "Ownership Intelligence",
        leftText: "Digital Land records have been made digital  secure and traceable, reducing land disputes,  transparent benefits transfer and even  additional revenue via Carbon Credits sale.",
        rightText: "Borai, a 37 year old farmer in  Cambodia now receives government subsidies and welfare benefits without the middlemen or delays."
      }
    ];

    const panel = document.getElementById("section-4");
    panel.style.backgroundImage = `url('${slides[0].bg}')`;

    let currentIndex = -1;

    function updateContent(i) {
      if (i === currentIndex) return;
      currentIndex = i;

      // LEFT TITLE
      gsap.fromTo("#leftTitle",
        { x: -50, opacity: 0 },   // slide in from left
        { 
          x: 0, 
          opacity: 1, 
          duration: 1,
          onStart: () => {
            document.querySelector("#leftTitle").textContent = slides[i].leftTitle;
          }
        }
      );

      // LEFT TEXT
      gsap.fromTo("#leftText",
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1,
          onStart: () => {
            document.querySelector("#leftText").textContent = slides[i].leftText;
          }
        }
      );

      // RIGHT TEXT
      gsap.fromTo("#rightText",
        { x: 50, opacity: 0 },   // slide in from right
        { 
          x: 0, 
          opacity: 1, 
          duration: 1,
          onStart: () => {
            document.querySelector("#rightText").textContent = slides[i].rightText;
          }
        }
      );

      // Background updates instantly (no animation)
      panel.style.backgroundImage = `url('${slides[i].bg}')`;
    }

    // ScrollTrigger
    ScrollTrigger.create({
      trigger: ".frame-7",
      start: "5% bottom",
      end: "bottom bottom",
      scrub: true,
      // snap: 1 / (slides.length - 1),
      onUpdate: self => {
        let progress = self.progress * (slides.length - 1);
        let i = Math.round(progress);
        updateContent(i);
      }
    });

    const tl110 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-8',
        start: "5% bottom",
        toggleActions: "play none none none",
        once: true,
      }
    });

    tl110.fromTo('.section-5 .container',{
      y: 50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    })

    const tl10 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-8',
        start: "top bottom",
        scrub: true,
        end: "5% bottom",
        // markers: true,
      }
    });
    
    tl10.to('.section-4',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    tl10.to('.section-5',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })

    
    // const tl11 = gsap.timeline({
    //   scrollTrigger:{
    //     trigger: '.frame-8',
    //     start: "40% bottom",
    //     scrub: true,
    //     end: "bottom bottom",
    //     markers: true,
    //   }
    // });
       

    const tl120 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-9',
        start: "5% bottom",
        toggleActions: "play none none none",
        once: true,
      }
    });

    tl120.fromTo('.section-6 .container',{
      y: 50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    })


    const tl12 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-9',
        start: "top bottom",
        scrub: true,
        end: "1% bottom",
        // markers: true,
      }
    });
    
    tl12.to('.section-5',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    tl12.to('.section-6',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })

    
    const questions = document.querySelectorAll(".question");
    const answers = document.querySelectorAll(".answer");
    const subQuestions = [
      "Understand your needs & priorities",
      "Deploy KALP core infra in 90 days",
      "Add services & connect citizens"
    ];

    // Save original question text
    questions.forEach(q => q.setAttribute("data-original", q.textContent));

    let currentAnswer;

    function setActive(index) {
      questions.forEach((q, i) => {
        q.classList.remove("active");
        q.textContent = q.getAttribute("data-original");
      });

      const activeQ = questions[index];
      activeQ.classList.add("active");
      activeQ.innerHTML = `${activeQ.getAttribute("data-original")}<br> <p>${subQuestions[index]}</p>`;

      if (currentAnswer) {
        gsap.to(currentAnswer, { autoAlpha: 0, duration: 0.5 });
      }
      currentAnswer = document.querySelector(`.answer[data-index="${index}"]`);
      gsap.to(currentAnswer, { autoAlpha: 1, duration: 0.5 });
    }

    // MAIN SCROLL LOGIC
    const frame = document.querySelector(".frame-9");
    const frameHeight = frame.offsetHeight;
    const totalAnswers = answers.length;

    // Create one ScrollTrigger that spans the whole frame-9 height
    ScrollTrigger.create({
      trigger: frame,
      start: "1% bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // progress 0 → 1 across frame-9
        const progress = self.progress;
        const index = Math.floor(progress * totalAnswers);

        if (index >= 0 && index < totalAnswers) {
          setActive(index);
        }
      }
    });

    // Default active state
    setActive(0);


    const tl130 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-10',
        start: "5% bottom",
        toggleActions: "play none none none",
        once: true,
      }
    });

    tl130.fromTo('.section-7 .container',{
      y: 50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    })


    const tl13 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-10',
        start: "top bottom",
        scrub: true,
        end: "1% bottom",
        // markers: true,
      }
    });
    
    tl13.to('.section-6',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    tl13.to('.section-7',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })

    // tl13.to('.section-7 .heading',{
    //   opacity: 1,
    //   display: 'block',
    //   ease: "power1.inOut",
    //   duration: 1
    // })

    // tl13.to('.section-7 .swiper',{
    //   opacity: 1,
    //   display: 'block',
    //   ease: "power1.inOut",
    //   duration: 1
    // })


    const swiper = new Swiper('.swiper', {
    modules: [Pagination, Autoplay],
      spaceBetween: 20,
      grabCursor: true,
      autoplay: {
          delay: 2000, // time in ms between slides
          disableOnInteraction: false, // keeps autoplay even if user interacts
          loop: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // Responsive settings
      breakpoints: {
        // when window width is >= 640px
        992: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });


    const tl14 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-11',
        start: "top bottom",
        scrub: true,
        end: "5% bottom",
        // markers: true,
      }
    });
    
    tl14.to('.section-7',{
      opacity: 0,
      display: 'none',
      ease: "power1.inOut",
      duration: 1
    })

    tl14.to('.section-8',{
      opacity: 1,
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })

    const tl15 = gsap.timeline({
      scrollTrigger:{
        trigger: '.frame-11',
        start: "5% center",
        toggleActions: "play none none none",
        once: true,
        // markers: true,
      }
    });

  if (window.innerWidth > 1024) {
   tl15.to('.section-8 .black-circle',{
      opacity: 1,
      scale: 1.1,
      bottom: '-5%',
      display: 'block',
      ease: "power1.inOut",
      duration: 1
    })
}

    tl15.fromTo('.section-8 .left-col',{
      x: 50,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    },'same')

    tl15.fromTo('.section-8 .right-col',{
      y: -50,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    },'same')

    
    
});


