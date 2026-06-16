(function () {
    "use strict";

    let vantaEffect = null;

    function initVanta() {
        const hero = document.getElementById("hero");
        if (!hero || typeof VANTA === "undefined" || typeof THREE === "undefined") {
            return;
        }

        vantaEffect = VANTA.NET({
            el: hero,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 0.9,
            color: 0x7a1f24,
            backgroundColor: 0x0a0f18,
            points: 14,
            maxDistance: 24,
            spacing: 17
        });
    }

    function initCardTilt() {
        document.querySelectorAll(".card").forEach((card) => {
            const content = card.querySelector(".card-content");
            if (!content) {
                return;
            }

            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                const rotateY = x * 28;
                const rotateX = y * -28;
                content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener("mouseleave", () => {
                content.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
            });
        });
    }

    function initBoxTilt() {
        const selectors = [
            ".feature-box",
            ".stat-card",
            ".lab-card",
            ".research-box",
            ".company",
            ".contact-box > div",
            ".program-card-3d .card-content"
        ].join(", ");

        document.querySelectorAll(selectors).forEach((box) => {
            box.addEventListener("mousemove", (event) => {
                const rect = box.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                box.style.transform = `perspective(800px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) translateY(-8px)`;
            });

            box.addEventListener("mouseleave", () => {
                box.style.transform = "";
            });
        });
    }

    function initScrollReveal() {
        const targets = document.querySelectorAll(
            ".reveal, .section-title, .about-content, .table-container, .stats-container, .lab-grid, .research-content, .company-grid, .courses, .course-container, .cta, .contact-box"
        );

        targets.forEach((el) => el.classList.add("reveal"));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }

    function initCounters() {
        const counters = document.querySelectorAll(".counter");
        if (!counters.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const el = entry.target;
                    const target = Number(el.getAttribute("data-target"));
                    if (Number.isNaN(target)) {
                        return;
                    }

                    const duration = 1400;
                    const start = performance.now();

                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = String(Math.round(target * eased));
                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        }
                    }

                    requestAnimationFrame(tick);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach((counter) => observer.observe(counter));
    }

    window.addEventListener("resize", () => {
        if (vantaEffect && typeof vantaEffect.resize === "function") {
            vantaEffect.resize();
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        initVanta();
        initCardTilt();
        initBoxTilt();
        initScrollReveal();
        initCounters();
    });
})();
