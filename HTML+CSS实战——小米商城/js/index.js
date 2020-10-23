const topbarCart = document.querySelector(".topbar-cart");
const cartSpans = topbarCart.querySelectorAll("span");
const cartList = topbarCart.querySelector(".cart-list");
const logo = document.querySelector(".mi-logo");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const miNavs = document.querySelectorAll(".mi-nav > a");
const miNavContent = document.querySelectorAll(".mi-nav-content");
const circleContainer = document.querySelector(".banner-circles");
const circles = circleContainer.querySelectorAll("li");
const preBtn = document.querySelector(".btn-pre");
const nextBtn = document.querySelector(".btn-next");
const currentBanner = document.querySelector(".banner-item a");
const hourNode = document.querySelector(".hour");
const minNode = document.querySelector(".minute");
const secNode = document.querySelector(".second");
const videoPlays = document.querySelectorAll(".play");
const videoItems = document.querySelectorAll(".mi-video-item");

let currentIndex = 0;
currentBanner.interval = setInterval(playNext, 2000)
let countdown = setInterval(countdownTime, 1000)

topbarCart.addEventListener("mouseover", function(){
  topbarCart.style.backgroundColor = "#fff";
  cartSpans.forEach(item => {
    item.style.color = "#FF6700";
  });
  cartList.style.visibility = "visible";
});

topbarCart.addEventListener("mouseout", function(){
  topbarCart.style.backgroundColor = "#424242";
  cartSpans.forEach(item => {
    item.style.color = "#ccc";
  });
  cartList.style.visibility = "hidden";
});

searchInput.addEventListener("focus", function(){
  searchInput.placeholder = "";
  searchBtn.classList.add("search-active");
});
searchInput.addEventListener("blur", function(){
  searchInput.placeholder = "家电";
  searchBtn.classList.remove("search-active")
});

miNavs.forEach((item,index) => {
  if(index >= 6) return;
  item.addEventListener("mouseover", function(){
    miNavContent[index].style.visibility = "visible";
  });
  item.addEventListener("mouseout", function(){
    miNavContent[index].style.visibility = "hidden";
  });
});

preBtn.addEventListener("click", function(){
  removeBannerInterval();
  if(currentIndex==0) currentIndex = 6;
  currentIndex--;
  currentIndex %= 6;
  changeBanner();
  currentBanner.interval = setInterval(playNext, 4000)
});

nextBtn.addEventListener("click", function(){
  removeBannerInterval();
  playNext();
  currentBanner.interval = setInterval(playNext, 4000);
});

currentBanner.addEventListener("mouseover", function(){
  removeBannerInterval();
});

currentBanner.addEventListener("mouseout", function(){
  currentBanner.interval = setInterval(playNext, 4000)
});

circleContainer.addEventListener("click", function(event){
  let index = event.target.getAttribute("data-index");
  if(index!=null) {
    currentIndex = parseInt(index);
    removeBannerInterval();
    changeBanner();
    currentBanner.interval = setInterval(playNext, 4000)
  }
})

videoItems.forEach((item,index) => {
  item.addEventListener("mouseover", function(){
    videoPlays[index].classList.add("play-active");
  });
  item.addEventListener("mouseout", function(){
    videoPlays[index].classList.remove("play-active");
  });
})

function playNext(){
  currentIndex++;
  currentIndex %= 6; 
  changeBanner();
}

function changeBanner() {
  let suffix = '.webp';
  if(currentIndex===0) suffix = '.jpg';
  currentBanner.style.backgroundImage = `url(./imgs/banner/banner${currentIndex+1}${suffix})`;
  lightCircle();
}

function lightCircle(){
  circles.forEach(item => {
    item.classList.remove("circle-active");
  });
  circles[currentIndex].classList.add("circle-active");
}

function removeBannerInterval(){
  clearInterval(currentBanner.interval);
  currentBanner.interval = null;
}

function countdownTime(){
  let end = + new Date("2020-10-23 00:00:00");
  let now = + new Date();
  let diff = (end - now)/1000;
  if(diff <= 0) {
    clearInterval(countdown);
    return;
  }
  let hour = Math.floor(diff/60/60);
  let min = Math.floor(diff/60%60);
  let sec = Math.floor(diff%60);

  hour = hour > 9 ? hour : '0' + hour;
  min = min > 9 ? min : '0' + min;
  sec = sec > 9 ? sec : '0' + sec;

  hourNode.innerHTML = hour;
  minNode.innerHTML = min;
  secNode.innerHTML = sec;
}
