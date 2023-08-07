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

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "100%",
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

  let clicks_count = select("#clicks_count");

  /**
   * DynamoDB stuff
   */
  // AWS.config.region = process.env.AWS_REGION;
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: process.env.IDENTITY_POOL_ID,
  // });
  // const dynamodb = new AWS.DynamoDB();

  // let params = {
  //   Item: {
  //     clickTime: {
  //       N: Date.now().toString(),
  //     },
  //   },
  //   TableName: "PortfolioClicks",
  // };
  // dynamodb.putItem(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  // });

  // params = {
  //   AttributesToGet: ["clickTime"],
  //   TableName: "PortfolioClicks",
  // };
  // dynamodb.scan(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else {
  //     // clicks_count.setAttribute("data-purecounter-end", data.Count.toString());
  //     clicks_count.style.display = "block";
  //   }
  // });
  clicks_count.setAttribute("data-purecounter-end", 54);
  clicks_count.style.display = "block";
})();
