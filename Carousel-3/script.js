const track = document.querySelector('.carousel_track');
//to make a array of all the track children ie images
const slides = Array.from(track.children);
const nextButton = document.querySelector('.button--right');
const prevButton = document.querySelector('.button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

//to find the size and dimension of the selected slide 
const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide,index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


//single function to move slides left or right
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX( -'+ targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}



const updateDots = (currentDot, targetDot) => {
 currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}


//hideShowArrows

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) =>{
  if(targetIndex === 0){
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
  else if(targetIndex === slides.length -1){
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  }
  else{
    nextButton.classList.remove('is-hidden');
    prevButton.classList.remove('is-hidden');
  }
}

//when I click left, move the slides to the left
prevButton.addEventListener('click', e => {
 const currentSlide = track.querySelector('.current-slide');
 const prevSlide = currentSlide.previousElementSibling;
 const currentDot = dotsNav.querySelector('.current-slide');
 const prevDot = currentDot.previousElementSibling;
 const prevIndex = slides.findIndex(slide => slide === prevSlide);
 
 moveToSlide(track, currentSlide, prevSlide);
 updateDots(currentDot, prevDot);
 hideShowArrows(slides, prevButton, nextButton, prevIndex);

})

//when I click right , move slides to the right
nextButton.addEventListener('click' , e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide =currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track,currentSlide,nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
 
})


//when click on dots, move to that slide
dotsNav.addEventListener('click', e => {
  //which indicator is clicked on
  const targetDot = e.target.closest('button');
  if(!targetDot) return;
  
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track,currentSlide,targetSlide);

  // currentDot.classList.remove('current-slide');
  // targetDot.classList.add('current-slide');
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
 
})

