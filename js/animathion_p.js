document.addEventListener("DOMContentLoaded", function () {

    const transitionOverlay = document.createElement("div");
    transitionOverlay.classList.add("transition-overlay");
    document.body.appendChild(transitionOverlay);


    document.body.classList.add("appear");


    const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");


            if (this.classList.contains("logo") || href === "#") {
                if (isHomePage) {
                    event.preventDefault();


                    if (window.scrollY > 0) {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }
                    return;
                }
            }

            if (href.startsWith("#") && href.length > 1) {
                event.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
                return;
            }

            if (this.hostname !== window.location.hostname || this.href === window.location.href) {
                return;
            }

            event.preventDefault();
            transitionOverlay.style.opacity = "1";

            setTimeout(() => {
                window.location.href = href;
            }, 700);
        });
    });
});
