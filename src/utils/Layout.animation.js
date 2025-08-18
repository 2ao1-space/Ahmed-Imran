import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Optimized GSAP loading with CDN as fallback
const loadGSAP = () => {
  if (window.gsap) return Promise.resolve(window.gsap);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.onload = () => resolve(window.gsap);
    script.onerror = reject;
    script.async = true;
    document.head.appendChild(script);
  });
};

// Initialize loading animation
export const initLoadingAnimation = async () => {
  try {
    const gsap = await loadGSAP();

    let count = { value: 0 };
    const loadingNumEl = document.querySelector(".loading-num");
    const loadingScreenEl = document.querySelector(".loading-screen");
    const pageContentEl = document.querySelector("#page-content");

    if (!loadingNumEl || !loadingScreenEl || !pageContentEl) return;

    // Prevent scroll during loading
    document.body.classList.add("overflow-hidden");

    gsap.to(count, {
      value: 100,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        if (loadingNumEl) {
          loadingNumEl.textContent = Math.floor(count.value) + "%";
        }
      },
      onComplete: () => {
        const tl = gsap.timeline();

        tl.to(loadingScreenEl, {
          y: "-100%",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            loadingScreenEl.remove();
            document.body.classList.remove("overflow-hidden");
            initPageAnimations();
          },
        }).to(
          pageContentEl,
          {
            opacity: 1,
            duration: 0.2,
            ease: "none",
          },
          "-=0.3"
        );
      },
    });
  } catch (error) {
    console.error("Failed to load GSAP:", error);
    handleLoadingError();
  }
};

// Handle loading errors gracefully
const handleLoadingError = () => {
  const loadingScreenEl = document.querySelector(".loading-screen");
  const pageContentEl = document.querySelector("#page-content");
  if (loadingScreenEl) loadingScreenEl.remove();
  if (pageContentEl) {
    pageContentEl.style.opacity = "1";
  }
  document.body.classList.remove("overflow-hidden");
};

// Initialize page animations
const initPageAnimations = () => {
  // Split text animations for headings
  const headings = document.querySelectorAll("h1, h2, h3");
  headings.forEach((heading) => {
    const split = new SplitText(heading, {
      type: "lines,words,chars",
      linesClass: "split-line",
    });

    gsap.from(split.chars, {
      duration: 0.8,
      y: 100,
      opacity: 0,
      stagger: 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Animate sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    gsap.from(section, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Animate images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    gsap.from(img, {
      duration: 1,
      scale: 1.2,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: img,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Header animation
  const header = document.querySelector("header");
  if (header) {
    let lastScroll = window.scrollY;
    const headerTl = gsap.timeline({ paused: true });

    headerTl.to(header, {
      yPercent: -100,
      duration: 0.3,
      ease: "power2.inOut",
    });

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        headerTl.play();
      } else {
        headerTl.reverse();
      }

      lastScroll = currentScroll;
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLoadingAnimation);
} else {
  initLoadingAnimation();
}

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
};
