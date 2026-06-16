const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && siteHeader && mainNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteHeader.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const target = Number(entry.target.getAttribute("data-count"));
            const suffix = entry.target.getAttribute("data-suffix") || "";
            if (Number.isNaN(target)) {
                return;
            }

            const duration = 1200;
            const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                entry.target.textContent = `${Math.round(target * eased)}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.35 }
);

document.querySelectorAll("[data-count]").forEach((element) => {
    counterObserver.observe(element);
});

const facultySearch = document.querySelector("[data-faculty-search]");
const facultyCards = Array.from(document.querySelectorAll("[data-faculty-card]"));

if (facultySearch && facultyCards.length) {
    facultySearch.addEventListener("input", () => {
        const query = facultySearch.value.trim().toLowerCase();

        facultyCards.forEach((card) => {
            const tags = (card.getAttribute("data-tags") || "").toLowerCase();
            const text = card.textContent.toLowerCase();
            const matches = !query || tags.includes(query) || text.includes(query);
            card.hidden = !matches;
        });
    });
}

document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.querySelector("[name='name']")?.value.trim() || "Website Visitor";
        const email = form.querySelector("[name='email']")?.value.trim() || "";
        const message = form.querySelector("[name='message']")?.value.trim() || "";
        const status = form.querySelector(".form-status");

        if (!message) {
            if (status) {
                status.textContent = "Please add your message before sending.";
            }
            return;
        }

        const subject = encodeURIComponent(`Department enquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:scppbn@hotmail.com?subject=${subject}&body=${body}`;

        if (status) {
            status.textContent = "Your email app should open with the enquiry draft.";
        }
    });
});

const currentYear = document.querySelector("[data-current-year]");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}



/* Hod message toggle */

document.addEventListener("DOMContentLoaded", () => {

    const toggle =
        document.getElementById("languageToggle");

    const englishContent =
        document.getElementById("englishContent");

    const marathiContent =
        document.getElementById("marathiContent");

    if (!toggle || !englishContent || !marathiContent) {
        return;
    }

    toggle.addEventListener("change", () => {

        if(toggle.checked){

            englishContent.style.display = "none";
            marathiContent.style.display = "block";

        }else{

            englishContent.style.display = "block";
            marathiContent.style.display = "none";

        }

    });

});



// Future enhancements

console.log("Academic Activities Page Loaded");





document.addEventListener("DOMContentLoaded", function() {

    const popup = document.getElementById("noticePopup");
    const closeBtn = document.querySelector(".close-btn");

    if (!popup || !closeBtn) {
        return;
    }

    // Check if popup was already closed in this session
    if(sessionStorage.getItem("popupClosed")) {
        popup.style.display = "none";
    }

    // Close popup
    closeBtn.addEventListener("click", function() {
        popup.style.display = "none";

        // Remember popup was closed
        sessionStorage.setItem("popupClosed", "true");
    });

});
