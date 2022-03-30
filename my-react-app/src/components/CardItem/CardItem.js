import React from 'react'
import './CardItem.css'
function CardItem({date,time,result,score}) {
  return (
    <div className='card-item'>
     <h1>ETS TOEIC 2020 Test 5</h1>
     <h3>Full Test</h3>
     <p>Ngày làm bài: {date}</p>
     <p>Thời gian hoàn thành: {time}</p>
     <p>Kết quả:{result}</p>
     <p>Điểm:{score}</p>
    </div>
  )
}

export default CardItem