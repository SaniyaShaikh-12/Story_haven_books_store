function decreaseQuantity() {
  let quantity = document.getElementById("quantity");
  if (quantity.value > 1) {
      quantity.value = parseInt(quantity.value) - 1;
  }
}

function increaseQuantity() {
  let quantity = document.getElementById("quantity");
  quantity.value = parseInt(quantity.value) + 1;
}
var swiper = new Swiper(".listProduct-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function addToWishlist(name, img, price) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let existingItem = wishlist.find(item => item.name === name);
  if (!existingItem) {
      wishlist.push({ name, img: `img/${img}`, price });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist!");
  } else {
      alert("This item is already in your Wishlist!");
  }

}

