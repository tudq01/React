import React from 'react'
import CardItem from '../../components/CardItem/CardItem'
import './About.css'
function About() {
  return (
    <>
     <section className ='home'>
      <div className='hello'>
            <h1 className='info'>Xin chào,dangquoctuhn!</h1>
            <p className='info'>Bạn chưa đăng ký khóa học nào</p>
            <h1 className='info'>Khóa học của tôi</h1>
            <p className='info'>Bạn chưa đăng ký khóa học nào</p>
            <h1 className='info'>Kết quả luyện thi mới nhất</h1>
            <p className='info'>Bạn chưa đăng ký khóa học nào</p>
            <div className='card'>
              <CardItem date='23/12/2001' time='22:10' result='32/100' score='486' />
              <CardItem date='23/12/2001' time='22:10' result='32/100' score='486' />
              <CardItem date='23/12/2001' time='22:10' result='32/100' score='486' />
              <CardItem date='23/12/2001' time='22:10' result='32/100' score='486' />
            </div>
      </div>
      </section>
      <section className ='course'>
      <div className='online-course'>
            <h1 className='heading'>Khoa hoc online noi bat</h1>
            <p>Bạn chưa đăng ký khóa học nào</p>
            <h1>Khóa học của tôi</h1>
            <p>Bạn chưa đăng ký khóa học nào</p>
            <h1>Kết quả luyện thi mới nhất</h1>
            <p>Bạn chưa đăng ký khóa học nào</p>
          
      </div>
      </section>
      </>
  )
}

export default About