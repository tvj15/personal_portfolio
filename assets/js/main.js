(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /*
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          console.log("mobile view");
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        section.scrollIntoView();
      }
    },
    true
  );

  //   const links = document.querySelectorAll("a");

  //   window.addEventListener("scroll", () => {
  //     let scrollPosition = window.scrollY;
  //     let sections = select("section", true);
  //     let links = select("#navbar .nav-link", true);
  //     let navbar = select("#navbar");

  //     if (scrollPosition >= 480) {
  //       if (!navbar.classList.contains("navbar-top")) {
  //         navbar.classList.add("navbar-top");
  //       }
  //       console.log("here1");
  //     } else {
  //       if (navbar.classList.contains("navbar-top")) {
  //         navbar.classList.remove("navbar-top");
  //       }
  //       console.log("here2");
  //     }
  //     // sections.forEach((section) => {
  //     //   if (scrollPosition >= section.offsetTop) {
  //     //     links.forEach((link) => {
  //     //       link.classList.remove("active");
  //     //       if (
  //     //         section.getAttribute("id") ===
  //     //         link.getAttribute("href").substring(1)
  //     //       ) {
  //     //         link.classList.add("active");
  //     //       }
  //     //     });
  //     //   }
  //     // });
  //   });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  // const sendEmail = () => {
  //   Email.send({
  //     Host: "smtp.elasticemail.com",
  //     Username: "username",
  //     Password: "password",
  //     To: "them@website.com",
  //     From: "you@isp.com",
  //     Subject: "This is the subject",
  //     Body: "And this is the body",
  //   }).then((message) => alert(message));
  // };

})();
