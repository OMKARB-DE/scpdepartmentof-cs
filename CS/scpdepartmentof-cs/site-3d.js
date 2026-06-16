(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vantaEffects = [];

    const TILT_SELECTORS = [
        ".feature-card",
        ".program-card",
        ".metric-card",
        ".notice-card",
        ".timeline-card",
        ".faculty-card",
        ".media-card",
        ".achievement-card",
        ".aa-card",
        ".aa-activity",
        ".aa-stat",
        ".quote-card",
        ".info-card",
        ".directory-card",
        ".contact-card",
        ".comparison-card",
        ".hod-message-section",
        ".page-hero-shell"
    ].join(", ");

    function initPageHeroVanta() {
        if (prefersReducedMotion || typeof VANTA === "undefined" || typeof THREE === "undefined") {
            return;
        }

        document.querySelectorAll(".page-hero, .aa-hero").forEach((hero) => {
            hero.classList.add("scene-3d-wrap");

            const layer = document.createElement("div");
            layer.className = "scene-3d-layer";
            layer.setAttribute("aria-hidden", "true");
            hero.prepend(layer);

            const effect = VANTA.NET({
                el: layer,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                scaleMobile: 0.85,
                color: 0x7a1f24,
                backgroundColor: 0x101820,
                points: 10,
                maxDistance: 18,
                spacing: 16
            });

            vantaEffects.push(effect);
        });
    }

    function initCardTilt() {
        if (prefersReducedMotion) {
            return;
        }

        document.querySelectorAll(TILT_SELECTORS).forEach((card) => {
            card.classList.add("tilt-card");

            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.setProperty("--tilt-x", `${y * -14}deg`);
                card.style.setProperty("--tilt-y", `${x * 14}deg`);
                card.style.setProperty("--tilt-lift", "12px");
            });

            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--tilt-x", "0deg");
                card.style.setProperty("--tilt-y", "0deg");
                card.style.setProperty("--tilt-lift", "0px");
            });
        });
    }

    window.addEventListener("resize", () => {
        vantaEffects.forEach((effect) => {
            if (effect && typeof effect.resize === "function") {
                effect.resize();
            }
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        initPageHeroVanta();
        initCardTilt();
    });
})();
