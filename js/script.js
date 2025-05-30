searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}
let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');

}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}



var swiper = new Swiper(".books-slider", {
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

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

let swiperInstance;

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector(".arrivals-slider .swiper-wrapper");
            wrapper.innerHTML = "";  // Clear previous items

            data.forEach(product => {
                const productHTML = `
                    <a href="#" class="swiper-slide box">
                        <div class="image">
                            <img src="${product.image_url}" alt="${product.title}">
                        </div>
                        <div class="content">
                            <h3>${product.title}</h3>
                            <div class="price">$${product.price} <span>$${product.original_price}</span></div>
                            <div class="stars">
                                ${generateStars(product.rating)}
                            </div>
                        </div>
                    </a>
                `;
                wrapper.innerHTML += productHTML;
            });

            initializeSwiper();
        })
        .catch(error => console.error("Error fetching products:", error));
});

function initializeSwiper() {
    if (swiperInstance) swiperInstance.destroy(true, true);

    swiperInstance = new Swiper(".arrivals-slider", {
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return stars;
}




var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
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



