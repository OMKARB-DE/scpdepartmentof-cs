```javascript id="n7u4xk"
/* ==========================
   ANIMATED COUNTERS
========================== */

const counters = document.querySelectorAll('.counter');

const startCounters = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute('data-target');
        const speed = 200;

        const updateCounter = () => {

            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {

                counter.innerText =
                Math.ceil(count + increment);

                setTimeout(updateCounter, 10);

            } else {

                counter.innerText = target;

            }
        };

        updateCounter();
    });
};

/* ==========================
   START COUNTER WHEN VISIBLE
========================== */

const statsSection =
document.querySelector('.stats');

let counterStarted = false;

window.addEventListener('scroll', () => {

    const sectionTop =
    statsSection.offsetTop - 300;

    if (
        window.scrollY > sectionTop &&
        !counterStarted
    ) {
        startCounters();
        counterStarted = true;
    }
});

/* ==========================
   STICKY HEADER EFFECT
========================== */

const header =
document.querySelector('header');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        header.style.background =
        "rgba(109,31,31,0.98)";

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.15)";

    }
    else{

        header.style.background =
        "rgba(109,31,31,.92)";

        header.style.boxShadow =
        "none";

    }

});

/* ==========================
   SMOOTH SCROLLING
========================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
    'click',
    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
        this.getAttribute('href'));

        if(target){

            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });

        }
    });
});

/* ==========================
   ACTIVE MENU HIGHLIGHT
========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(
"nav ul li a"
);

window.addEventListener(
"scroll",
() => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.clientHeight;

        if(
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ){
            current =
            section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){
            link.classList.add("active");
        }

    });

});

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const revealElements =
document.querySelectorAll(
'.program-card, .feature-box, .lab-card, .research-box, .company, .contact-box div'
);

function revealOnScroll(){

    revealElements.forEach(element => {

        const windowHeight =
        window.innerHeight;

        const revealTop =
        element.getBoundingClientRect().top;

        const revealPoint = 120;

        if(
            revealTop <
            windowHeight - revealPoint
        ){

            element.classList.add('show');

        }

    });
}

window.addEventListener(
'scroll',
revealOnScroll
);

revealOnScroll();

/* ==========================
   HERO TEXT ANIMATION
========================== */

const heroTitle =
document.querySelector(".hero h1");

window.addEventListener(
"load",
() => {

    heroTitle.style.opacity = "0";
    heroTitle.style.transform =
    "translateY(40px)";

    setTimeout(() => {

        heroTitle.style.transition =
        "1s ease";

        heroTitle.style.opacity = "1";

        heroTitle.style.transform =
        "translateY(0px)";

    },300);

});

/* ==========================
   BUTTON HOVER RIPPLE
========================== */

const buttons =
document.querySelectorAll(
'.primary-btn, .secondary-btn, .btn, .cta-btn'
);

buttons.forEach(button => {

    button.addEventListener(
    'mouseenter',
    () => {

        button.style.transition =
        ".3s";

        button.style.transform =
        "translateY(-5px) scale(1.03)";

    });

    button.addEventListener(
    'mouseleave',
    () => {

        button.style.transform =
        "translateY(0) scale(1)";

    });

});

/* ==========================
   PRELOADER OPTIONAL
========================== */

window.addEventListener(
"load",
() => {

    document.body.classList.add(
    "loaded"
    );

});

/* ==========================
   CONSOLE MESSAGE
========================== */

console.log(
"Department of Computer Science Website Loaded Successfully"
);
```



const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        }else{

            counter.innerText = target;

        }
    };

    updateCounter();
});





const popup = document.getElementById("noticePopup");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", function() {
    popup.style.display = "none";
});