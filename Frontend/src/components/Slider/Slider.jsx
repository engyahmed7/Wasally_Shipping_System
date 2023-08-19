// import React from 'react';
// import style from "./Slider.module.css"
// export default function Slider()  {
// let imgList =Array.from(document.getElementsByClassName('img-item'));
// let lightboxContainer = document.querySelector('.lightbox-container')
// let lightboxItem = document.querySelector('.lightbox-item');
// let nextButton =document.getElementById('next');
// let prevButton =document.getElementById('prev');
// let closeButton =document.getElementById('close');

// let currentIndex=0;

// for (let i = 0; i < imgList.length; i++) {
//     imgList[i].addEventListener('click',function (e) {
//         currentIndex= imgList.indexOf(e.target)
//         console.log(currentIndex)
//         var imgSrc= e.target.getAttribute('src');
//         lightboxContainer.classList.replace('d-none','d-flex')
//         lightboxItem.style.backgroundImage=`url(${imgSrc})`
//     })
// }
// function nextSlide(){
//     currentIndex++;
//     if(currentIndex===imgList.length){
//         currentIndex=0;
//     }
//     var  imgSrc =imgList[currentIndex].getAttribute('src')
//     lightboxItem.style.backgroundImage=`url(${imgSrc})`

// }
// function prevSlide(){
//     currentIndex--;
//     if(currentIndex===-1){
//         currentIndex=imgList.length-1;
//     }
//     let  imgSrc =imgList[currentIndex].getAttribute('src')
//     lightboxItem.style.backgroundImage=`url(${imgSrc})`

// }

// function closeSlide(){
//     lightboxContainer.classList.replace('d-flex','d-none')
// }

// nextButton.addEventListener('click',nextSlide)
// prevButton.addEventListener('click',prevSlide)
// closeButton.addEventListener('click',closeSlide)
// ////// slide by keyboard/////////////////////////
// document.addEventListener('keydown',function(e){
//     if (e.key=='ArrowRight')
//     {
//         nextSlide(1);
//     }
//     else if(e.key==='ArrowLeft'){
//         prevSlide(-1);
//     }
//     else if(e.key==='Escape'){
//         closeSlide();
//     }
// })
//     return (
//         <>
// <div>
//   <div className="container py-5">
//     <div className="row">
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/11.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/22.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/33.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/44.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/55.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>
//         <div className="col-md-4">
//         <div className={style.item}>
//         <img className="w-100 img-item" src={require('../../assets/images/66.jpg')}alt="" />
//           <div className={style.caption}>
//             <h3>Person Name</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
//           </div>
//         </div>  

//       </div>

//     </div>
//   </div>
//   <div className="lightbox-container d-none justify-content-center align-items-center">
//     <div className="lightbox-item d-flex align-items-center justify-content-between">
//       <i id="prev" className="far fa-arrow-alt-circle-left" />
//       <i id="close" className="fa-regular fa-circle-xmark" />
//       <i id="next" className="far fa-arrow-alt-circle-right" />
//     </div> 
//   </div>
// </div>

//         </>
//     );
// }

// ;
