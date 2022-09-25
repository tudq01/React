import React from "react";
import "./Contact.scss";
import { GoLocation } from "react-icons/go";
import { AiOutlinePhone, AiFillMail } from "react-icons/ai";
import { BsClockFill } from "react-icons/bs";
function Contact() {
  return (
    <section className="contact">
      <div className="contact-location">
        
      </div>

      <div className="contact-content">
        <div className="content-item contact-form">
          <h1>LOCATION</h1>
          <form className="form">
            <input
              className="input"
              type="text"
              value="Họ tên"
              id="name"
              name="fname"
            />
            <br />
            <input
              className="input"
              type="text"
              id="email"
              value="Email"
              name="lname"
            />
            <br />
            <input
              className="input"
              type="text"
              id="content"
              value="Nội dung"
              name="lname"
            />
            <br />
            <input className="submit" type="submit" value="Submit" />
          </form>
        </div>

        <div className="content-item contact-info">
          <h1>Phonenix Travel</h1>
          <p>
            Tổng hợp những chương trình room theo tháng, du lịch vòng quanh thế
            giới với mức chi phí cực rẻ. Để nhận ngay những thông tin chương
            trình room hot, Sale. Quý khách hàng vui lòng nhập thông tin email
            tại đây ! Thanks
          </p>

          <div className="contact-container">
            <div className="contact-items">
              <GoLocation /> Lô 10, Liền kề 3, Khu đô thị Văn Khê, La Khê, Hà
              Đông, Hà Nội
            </div>
            <div className="contact-items">
              <AiOutlinePhone style={{ color: "red" }} /> +84867672497
            </div>
            <div className="contact-items">
              <AiFillMail style={{ color: "#003580" }} />
              phoenix.travel24@gmail.com
            </div>
            <div className="contact-items">
              <BsClockFill /> 8:30 - 17:30
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
