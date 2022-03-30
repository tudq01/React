import React from 'react';
import './Footer.css'
export default function Footer() {
  return <>
  <div className='footer-container'>
    <div className='wrap'>
   <div className='footer'>
     <h1>TOEIC ONLINE</h1>
     <div className='icon'>
   <i class="fab fa-facebook"></i>
   <i class="fab fa-instagram"></i>
   <i class="fab fa-twitter"></i>
   <i class="fab fa-linkedin"></i>
   <i class="fab fa-tiktok"></i>
   </div>
   </div>
   <div className='footer'>
     <h1>Tai nguyen</h1>
     
     <a>Lich khai giang</a>
     <a>Thu vien</a>
     <a>Cong dong</a>
   
   </div>
   <div className='footer'>
     <h1>STUDY</h1>
     <a href="#">+123-456-7890</a>
     <a href="#">+111-222-3333</a>
     <a href="#">shaikhanas@gmail.com</a>
  
   </div>
   </div>
   </div>
  </>;
}
