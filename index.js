// Get All Necessary Elements From The DOM
const slidesContainer = document.querySelector("#slides-container");
const images = document.querySelectorAll(".main-img");
const imagesLight = document.querySelectorAll(".main-img-light");
const thumbnails = document.querySelectorAll(".thumb-container");
const thumbnailsLight = document.querySelectorAll(".thumb-container-light");
const previousIcon = document.querySelector("#previous");
const nextIcon = document.querySelector("#next");
const previousIconLight = document.querySelector("#previous-light");
const nextIconLight = document.querySelector("#next-light");
const count = document.querySelector("#count");
const plus = document.querySelector("#plus-sign");
const minus = document.querySelector("#minus-sign");
const cartTop = document.querySelector("#cart-top");
const cartLargeScreen = document.querySelector("#cart-large-screen");
const cartSmallScreen = document.querySelector("#cart-small-screen");
const productTitle = document.querySelector("#product-title");
const price = document.querySelector("#price");
const backgroundImageUrl = "./images/image-product-1.jpg";
const cartItemContainerSmallScreen = document.querySelector(
  "#cart-items-small-screen"
);
const cartItemContainerLargeScreen = document.querySelector(
  "#cart-items-large-screen"
);
const addToCartButton = document.querySelector("#add-to-cart");
const cartNotification = document.querySelector("#notify-cart-count");
const lightBox = document.querySelector("#left-main-light");
const closeIcon = document.querySelector("#close-icon");
const closeIconMobile = document.querySelector("#close-icon-mobile");
const navMobile = document.querySelector("#Nav-mobile-container");
const menuIcon = document.querySelector("#menu-icon");

// Initialize values for Swipe Event
let xDown = null;
let yDown = null;

// initialize Cart Item Count
let cartItemCount = 0;

// initialize item added in cart status
let isCartAdded = false;

// initialize slide index for image carousel
let slideIndex = 0;
images[slideIndex].dataset.show = true;

thumbnails[slideIndex].dataset.active = true;

let slideIndexLight = 0;
imagesLight[slideIndexLight].dataset.show = true;

// Function to disable Scroll
function disableScroll() {
  let scrollTop = window.scrollY;
  let scrollLeft = window.scrollX;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };

  lightBox.style.left = `${scrollLeft}px`;
  lightBox.style.top = `${scrollTop}px`;

  navMobile.style.left = `${scrollLeft}px`;
  navMobile.style.top = `${scrollTop}px`;
}

// function to enable scroll
function enableScroll() {
  window.onscroll = function () {};
}

// Function to add item to cart
const handleAddToCart = (val) => {
  if (isCartAdded === false) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("item-description");

    //Create New Item Image
    let newItemImage = document.createElement("div");
    newItemImage.classList.add("item-image");
    newItemImage.style.backgroundImage = `url(${backgroundImageUrl})`;

    // Create New Item Text Contents
    let newItemTextContent = document.createElement("div");
    newItemTextContent.classList.add("new-item-text-content");

    // // Create New Title For New Item
    let newTitle = document.createElement("p");
    newTitle.classList.add("new-item-title");
    newTitle.textContent = productTitle.textContent;

    // // Create New Price Text For New Item
    let newCalculatedItemPrice = document.createElement("span");
    newCalculatedItemPrice.textContent = `$${
      Number(price.textContent.toString().slice(1)) * Number(count.textContent)
    }.00`;

    newCalculatedItemPrice.classList.add("bold");

    let newItemPrice = document.createElement("p");
    newItemPrice.textContent = `${price.textContent} x ${count.textContent} `;

    newItemPrice.classList.add("new-item-price");
    newItemPrice.appendChild(newCalculatedItemPrice);

    // Append All Text Content
    newItemTextContent.appendChild(newTitle);
    newItemTextContent.appendChild(newItemPrice);

    // Create New Delete Icon For New Item
    let newItemDelete = document.createElement("img");
    newItemDelete.classList.add("delete-icon");
    newItemDelete.setAttribute("id", "delete-icon");
    newItemDelete.setAttribute("src", "./images/icon-delete.svg");

    // Append All New Item Content/Elements
    let cartItemTop = document.createElement("div");
    cartItemTop.classList.add("cart-item-top");
    cartItemTop.appendChild(newItemImage);
    cartItemTop.appendChild(newItemTextContent);
    cartItemTop.appendChild(newItemDelete);

    // Create New Item Checkout Button
    let cartItemButton = document.createElement("button");
    cartItemButton.classList.add("cart-item-button");
    cartItemButton.textContent = "Checkout";

    // Append New Cart Item  ****THIS is only ideal for one item, if there are multiple, a check out button will be created multiple times
    cartItem.appendChild(cartItemTop);
    cartItem.appendChild(cartItemButton);

    // Clone Cart Item And Append To The Existing Cart
    let cloneChild = cartItem.cloneNode(true);
    cartItemContainerSmallScreen.textContent = "";
    cartItemContainerSmallScreen.appendChild(cloneChild);
    cartItemContainerLargeScreen.textContent = "";
    cartItemContainerLargeScreen.appendChild(cartItem);
    if (Number(count.textContent) > 0) {
      cartItemCount = 1;
    }
    isCartAdded = true;

    // Function To Delete Item
    const handleDeleteItem = (e) => {
      let cartItemToRemove = e.target.parentNode.parentNode;

      cartItemToRemove.remove();
      cartItemCount -= 1;
      if (cartItemCount <= 0) {
        cartItemCount = 0;
      }
      if (cartItemCount === 0) {
        cartItemContainerLargeScreen.innerHTML = `<p id="empty-cart-large-screen" class="empty-cart">Your cart is empty</p>`;
        cartItemContainerSmallScreen.innerHTML = `<p id="empty-cart-small-screen" class="empty-cart">Your cart is empty</p>`;
        cartNotification.textContent = "0";
      }
      isCartAdded = false;
    };

    let deleteIcons = document.querySelectorAll(".delete-icon");
    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", handleDeleteItem);
    });
  }
};

function handleAdd() {
  let getCount = Number(count.textContent);
  count.textContent = getCount + 1;
  // cartNotification.textContent = count.textContent;
  // if (Number(count.textContent) > 0) {
  //   cartItemCount = 1;
  // }
  // if (isCartAdded) {
  //   isCartAdded = false;
  //   cartNotification.textContent = count.textContent;
  //   handleAddToCart(count.textContent);
  // }
}

function handleMinus() {
  let getCount = Number(count.textContent);
  if (getCount <= 0) {
    count.textContent = 0;
  } else {
    count.textContent = getCount - 1;
    // cartNotification.textContent = count.textContent;
  }
  // if (count.textContent === 0) {
  //   cartItemCount = 0;
  // }
  // if (isCartAdded) {
  //   isCartAdded = false;
  //   cartNotification.textContent = count.textContent;
  //   handleAddToCart(count.textContent);
  // }
}

function handleThumbnails(index) {
  let newIndex = index;

  images[slideIndex].dataset.show = false;
  images[newIndex].dataset.show = true;
  thumbnails[newIndex].dataset.active = true;
  thumbnails[slideIndex].dataset.active = false;
  slideIndex = newIndex;
}

function handleThumbnailsLight(index) {
  let newIndex = index;
  imagesLight[slideIndexLight].dataset.show = false;
  imagesLight[newIndex].dataset.show = true;
  thumbnailsLight[newIndex].dataset.active = true;
  thumbnailsLight[slideIndexLight].dataset.active = false;
  slideIndexLight = newIndex;
}

function handlePrevious(e) {
  e.stopPropagation();
  if (slideIndex === 0) {
    let newIndex = images.length - 1;
    images[slideIndex].dataset.show = false;
    images[newIndex].dataset.show = true;
    thumbnails[newIndex].dataset.active = true;
    thumbnails[slideIndex].dataset.active = false;
    slideIndex = newIndex;
  } else {
    let newIndex = slideIndex - 1;
    images[slideIndex].dataset.show = false;
    images[newIndex].dataset.show = true;
    thumbnails[newIndex].dataset.active = true;
    thumbnails[slideIndex].dataset.active = false;
    slideIndex = newIndex;
  }
}

function handlePreviousLight() {
  if (slideIndexLight === 0) {
    let newIndex = imagesLight.length - 1;
    imagesLight[slideIndexLight].dataset.show = false;
    imagesLight[newIndex].dataset.show = true;
    thumbnailsLight[newIndex].dataset.active = true;
    thumbnailsLight[slideIndexLight].dataset.active = false;
    slideIndexLight = newIndex;
  } else {
    let newIndex = slideIndexLight - 1;
    imagesLight[slideIndexLight].dataset.show = false;
    imagesLight[newIndex].dataset.show = true;
    thumbnailsLight[newIndex].dataset.active = true;
    thumbnailsLight[slideIndexLight].dataset.active = false;
    slideIndexLight = newIndex;
  }
}

function handleNext(e) {
  e.stopPropagation();
  if (slideIndex === images.length - 1) {
    let newIndex = 0;
    images[slideIndex].dataset.show = false;
    images[newIndex].dataset.show = true;
    thumbnails[newIndex].dataset.active = true;
    thumbnails[slideIndex].dataset.active = false;
    slideIndex = newIndex;
  } else {
    let newIndex = slideIndex + 1;
    images[slideIndex].dataset.show = false;
    images[newIndex].dataset.show = true;
    thumbnails[newIndex].dataset.active = true;
    thumbnails[slideIndex].dataset.active = false;
    slideIndex = newIndex;
  }
}

function handleNextLight() {
  if (slideIndexLight === imagesLight.length - 1) {
    let newIndex = 0;
    imagesLight[slideIndexLight].dataset.show = false;
    imagesLight[newIndex].dataset.show = true;
    thumbnailsLight[newIndex].dataset.active = true;
    thumbnailsLight[slideIndexLight].dataset.active = false;
    slideIndexLight = newIndex;
  } else {
    let newIndex = slideIndexLight + 1;
    imagesLight[slideIndexLight].dataset.show = false;
    imagesLight[newIndex].dataset.show = true;
    thumbnailsLight[newIndex].dataset.active = true;
    thumbnailsLight[slideIndexLight].dataset.active = false;
    slideIndexLight = newIndex;
  }
}

function handleLightBox() {
  if (window.innerWidth > 450) {
    lightBox.classList.toggle("active");
    disableScroll();
  }
}

function handleNavMobile() {
  if (window.innerWidth < 630) {
    navMobile.classList.toggle("active");
    disableScroll();
  }
}

function handleNavMobileResize() {
  if (window.innerWidth > 630) {
    navMobile.classList.add("disabled");
    if (!lightBox.classList.contains("active")) {
      enableScroll();
    }
  } else {
    navMobile.classList.remove("disabled");
    if (
      navMobile.classList.contains("active") &&
      !navMobile.classList.contains("disabled")
    ) {
      disableScroll();
    }
  }
}

function handleLightBoxSmallScreen() {
  if (window.innerWidth <= 450) {
    if (!navMobile.classList.contains("active")) {
      enableScroll();
    }
    lightBox.classList.add("disabled");
  } else {
    lightBox.classList.remove("disabled");
    if (
      lightBox.classList.contains("active") &&
      !lightBox.classList.contains("disabled")
    ) {
      disableScroll();
    }
  }
}

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      if (evt.target.classList.contains("main-img")) {
        handleNext(evt);
      } else if (evt.target.classList.contains("main-img-light")) {
        handleNextLight();
      }
    } else {
      if (evt.target.classList.contains("main-img")) {
        handlePrevious(evt);
      } else if (evt.target.classList.contains("main-img-light")) {
        handlePreviousLight();
      }
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

previousIcon.addEventListener("click", handlePrevious);
nextIcon.addEventListener("click", handleNext);
previousIconLight.addEventListener("click", handlePreviousLight);
nextIconLight.addEventListener("click", handleNextLight);
plus.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// Event To Display Or Hide Cart On Cart Icon Click
cartTop.addEventListener("click", (e) => {
  if (cartTop.dataset.cart == "true") {
    cartTop.dataset.cart = false;
    cartLargeScreen.classList.toggle("active");
    cartSmallScreen.classList.toggle("active");
  } else {
    cartTop.dataset.cart = true;
    cartLargeScreen.classList.toggle("active");
    cartSmallScreen.classList.toggle("active");
    let scrollTop = window.scrollY;
    if (scrollTop != 0) {
      cartSmallScreen.style.top = `calc(${scrollTop}px + 53px)`;
    }

    if (scrollTop == 0) {
      cartSmallScreen.style.top = ``;
    }
  }
});

// Event To Display Or Hide Cart On Cart Notification Icon Click
cartNotification.addEventListener("click", (e) => {
  if (cartTop.dataset.cart == "true") {
    cartTop.dataset.cart = false;
    cartLargeScreen.classList.toggle("active");
    cartSmallScreen.classList.toggle("active");
  } else {
    cartTop.dataset.cart = true;
    cartLargeScreen.classList.toggle("active");
    cartSmallScreen.classList.toggle("active");
    let scrollTop = window.scrollY;
    if (scrollTop != 0) {
      cartSmallScreen.style.top = `calc(${scrollTop}px + 53px)`;
    }

    if (scrollTop == 0) {
      cartSmallScreen.style.top = ``;
    }
  }
});

// Event To Close Slide Show When In Modal
closeIcon.addEventListener("click", () => {
  lightBox.classList.toggle("active");
  if (!navMobile.classList.contains("active")) {
    enableScroll();
  }
});

// Event To Close Mobile Nav
closeIconMobile.addEventListener("click", () => {
  navMobile.classList.toggle("active");
  if (!lightBox.classList.contains("active")) {
    enableScroll();
  }
});

// Event To Navigate Slide Show From Thumbnails
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => handleThumbnails(index));
});

// Event To Navigate Slide Show From Thumbnails When In Modal
thumbnailsLight.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => handleThumbnailsLight(index));
});

// Event To Show Modal On Image Click And Activate Enable Swipe
images.forEach((image) => {
  image.addEventListener("click", handleLightBox);
  image.addEventListener("touchstart", handleTouchStart, false);
  image.addEventListener("touchmove", handleTouchMove, false);
});

imagesLight.forEach((image) => {
  image.addEventListener("touchstart", handleTouchStart, false);
  image.addEventListener("touchmove", handleTouchMove, false);
});

// Event To Show Mobile Nav On Menu Icon Click
menuIcon.addEventListener("click", handleNavMobile);

// Event To Add New Item To Cart On Add To Cart Button Click
addToCartButton.addEventListener("click", (e) => {
  cartNotification.textContent = count.textContent;
  if (Number(count.textContent) > 0) {
    cartItemCount = 1;
  }
  if (!isCartAdded && Number(count.textContent) == 0) {
    cartNotification.textContent = 1;
  }
  handleAddToCart();
  isCartAdded = false;
});

// Event To Check If Modal/Mobile Nav Is Active And Trigger Scrolling On/Off As The Case May Be
window.onresize = () => {
  handleLightBoxSmallScreen();
  handleNavMobileResize();
};

// Event For Modal That Checks If Click Is ON Modal Or Not
window.onclick = function (e) {
  if (e.target == lightBox && window.innerWidth > 450) {
    lightBox.classList.remove("active");
    if (
      !navMobile.classList.contains("active") ||
      navMobile.classList.contains("disabled")
    ) {
      enableScroll();
    }
  }

  if (e.target == navMobile && window.innerWidth < 630) {
    navMobile.classList.remove("active");
    if (!lightBox.classList.contains("active")) {
      enableScroll();
    }
  }
};

// Disable Hover Effect On Non Mouse Enadbled Devices
function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  let lastTouchTime = 0;

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add("hasHover");
  }

  function disableHover() {
    document.body.classList.remove("hasHover");
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener("touchstart", updateLastTouchTime, true);
  document.addEventListener("touchstart", disableHover, true);
  document.addEventListener("mousemove", enableHover, true);

  enableHover();
}

watchForHover();

// document.addEventListener("touchstart", handleTouchStart, false);
// document.addEventListener("touchmove", handleTouchMove, false);
