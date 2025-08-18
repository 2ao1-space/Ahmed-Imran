import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function Btn({ onClick, disabled, className, children }) {
  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const animatedLinks = document.querySelectorAll(".animated-link");

    animatedLinks.forEach((link) => {
      const initialLink = link.querySelector(".initial-link");
      const secondLink = link.querySelector(".second-link");

      const hoverText = new SplitText(initialLink, {
        type: "chars,lines",
        charsClass: "char",
        mask: "chars",
      });

      const finalText = new SplitText(secondLink, {
        type: "chars,lines",
        charsClass: "char",
        mask: "chars",
      });

      gsap.set(hoverText.chars, { y: 0 });
      gsap.set(finalText.chars, { y: "100%" });

      const hoverTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      hoverTimeline
        .to(hoverText.chars, {
          y: "-100%",
          duration: 0.4,
          stagger: 0.01,
        })
        .to(
          finalText.chars,
          {
            y: 0,
            duration: 0.4,
            stagger: 0.01,
          },
          "<0.1"
        );

      link.addEventListener("mouseenter", () => {
        hoverTimeline.play();
      });

      link.addEventListener("mouseleave", () => {
        hoverTimeline.reverse();
      });
    });
  }, []);

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${className} animated-link flex flex-col justify-center items-center overflow-y-hidden`}
      >
        <div className="h-8 text-center overflow-hidden relative">
          <span className="initial-link">{children}</span>
          <span className="second-link absolute top-0 left-0">{children}</span>
        </div>
      </button>
    </div>
  );
}
