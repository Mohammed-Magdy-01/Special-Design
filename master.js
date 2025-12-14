// local Storage
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    mainColor,
    // Remove Active Class From All List Items
    document.querySelectorAll(".color-list li").forEach((element) => {
      element.classList.remove("active");
      // Add Active Class If Elemant  With Data-Color === Local Storage Item
      if (element.dataset.color === mainColor) {
        // Asdd Active Class
        element.classList.add("active");
      }
    })
  );
}
// Random Background Option
let backgroundOption = true;
// Varibale To Control The Background Interval
let backgroundInterval;
// Check If There Is Local Storage Random Background Item
let backgroundItem = localStorage.getItem("background-option");

// Check if localStorage-backgrounnd is not null
if (backgroundItem !== null) {
  if (backgroundItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Start Setting box

// Start toogle Sitting
// Toggle Spin Class On Icon
document.querySelector(".settings-box .fa-gear").onclick = function () {
  // Toggle Class Fa-spin for Rotation On Self
  this.classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};
// End toogle Sitting

let colorsli = document.querySelectorAll(".settings-container li");

colorsli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color in local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    setAndRemoveActive(e);
  });
});

// Start Random Background Box
let randomBackground = document.querySelectorAll(".random-background span");
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Add And Remove Active
    setAndRemoveActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// End Random Background Box

// End Setting box
// Start LandingPage
let landingPage = document.querySelector(".landing-page");
// get Images By URL
let imgArray = [
  "imgs/01.jpg",
  "imgs/02.jpg",
  "imgs/03.jpg",
  "imgs/04.jpg",
  "imgs/05.jpg",
];

// Preload
imgArray.forEach((src) => {
  let img = new Image();
  img.src = src;
});

// function for Randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Change Background Img URL
      landingPage.style.backgroundImage =
        `url("` + imgArray[Math.floor(Math.random() * imgArray.length)] + `")`;
    }, 5000);
  }
}
randomizeImgs();
// Random Option
// Start hoverColor
let links = document.querySelectorAll(".links a");
let activeA = document.querySelector(".links .active");
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    activeA.classList.remove("active");
    link.classList.add("hover-temp");
  });

  link.addEventListener("mouseleave", () => {
    link.classList.remove("hover-temp");
    activeA.classList.add("active");
  });
});

// Start Menu
let menu = document.querySelector(".header-area .links-container .toggle-menu");
let linksOpen = document.querySelector(".links");

menu.addEventListener("click", (e) => {
  // Stop Propagation on menu
  e.stopPropagation();
  // Toggle class("menu-active") on menu
  menu.classList.toggle("menu-active");
  // Toggle class("open") on links
  linksOpen.classList.toggle("open");
});
// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== menu && e.target !== linksOpen) {
    if (linksOpen.classList.contains("open")) {
      menu.classList.remove("menu-active");
      linksOpen.classList.remove("open");
    }
  }
});
// Stop Propagation on links
linksOpen.onclick = function (e) {
  e.stopPropagation();
};
// End Menu

// End hoverColor

// End LandingPage

// Start Skills

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skill Offset Top
  let skillOffsetTop = ourSkills.offsetTop;
  // Skill Offset Top
  let skillOffsetHeight = ourSkills.offsetHeight;
  // window hieght
  let windowHeight = this.innerHeight;
  // window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOffsetHeight - windowHeight) {
    let Myspans = document.querySelectorAll(".skills .skill-progress span");
    Myspans.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// End Skills

// Start Gallery Popup

// Selcet All Images

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "last-overlay";

    // add overlay to Body
    document.body.appendChild(overlay);

    // Creat popup
    let popupBox = document.createElement("div");

    // add class to PopupBox
    popupBox.classList.add("popup-box");

    // add Alt to img

    if (img.alt !== null) {
      // Creat Heading Elemant
      let imgHeading = document.createElement("h3");

      // Creat Hedding Text
      let imgText = document.createTextNode(img.alt);

      // add Hedding Text To Heading
      imgHeading.appendChild(imgText);

      // add Hedding To body
      popupBox.appendChild(imgHeading);
    }

    // creat img
    let popupImg = document.createElement("img");

    // Set img Source
    popupImg.src = img.src;

    // add Img To popupBox
    popupBox.appendChild(popupImg);

    // add PopupBox To Body
    document.body.appendChild(popupBox);

    // creat Close Button
    let closeButton = document.createElement("span");

    // creat The close Button Text
    let closeButtonText = document.createTextNode("X");

    //add Close Button Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Clase To Close Button
    closeButton.classList.add("close-button");

    //add Close Button To Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className === `close-button`) {
    //Remove The Current Popup
    e.target.parentNode.remove();

    //  Remove Over lay
    // document.querySelectorAll(".overlay").forEach((e) => {
    //   e.remove();
    // });

    document.querySelector(".last-overlay").remove();
  }
});

/* End Nav Bullet */

// Start Functions

//  Select All Bullets
let AllBullets = document.querySelectorAll(".nav-bullets .bullet");
//  Select All Links
let AllLinkes = document.querySelectorAll(".links a");

// Function For swip
function forSwap(elements) {
  elements.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

forSwap(AllBullets);
forSwap(AllLinkes);

// Function For Add And Remove Active
function setAndRemoveActive(ev) {
  // remove active
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add active
  ev.target.classList.add("active");
}
// End Functions

// select All display Spans
let bulletsSpans = document.querySelectorAll(".display-bullets span");
// select navBullets
let navBullets = document.querySelector(".nav-bullets");

let bulletlocalitem = localStorage.getItem("bullet-option");

if (bulletlocalitem === null) {
  bulletlocalitem = "block";
}

if (bulletlocalitem !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletlocalitem === "block") {
    navBullets.style.display = "block";

    document.querySelector(".display-bullets .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".display-bullets .no").classList.add("active");
  }
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }
    setAndRemoveActive(e);
  });
});

// Start Reset Option
let reset = document.querySelector(".reset-box .reset");
reset.addEventListener("click", (e) => {
  // Remove Specific Item In local Storage
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");

  // Relode Window
  window.location.reload();
});
// End Reset Option
