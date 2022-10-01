import React,{useState} from "react";
import "./Footer.scss";
import { useLocation } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";


function Footer() {
    const { pathname } = useLocation();
    if (pathname === "/chat" || pathname === "/sale-chat") return null;
  const [isSubmit,setSubmit]=useState(false);
  const handleSubmit=()=>{
    console.log("submit");
    setSubmit(true);
  }
  return (
    <footer>
      <div className="footer-regist">
        <div className="regist-content">
          <h1>Đăng ký nhận tin</h1>
          <p>
            Tổng hợp những chương trình room theo tháng, du lịch vòng quanh thế
            giới với mức chi phí cực rẻ. Để nhận ngay những thông tin chương
            trình room hot, Sale. Quý khách hàng vui lòng nhập thông tin email
            tại đây ! Thanks
          </p>

          
          { isSubmit  && <div className="form-result">Xin cảm ơn, form đã được gửi thành công.</div>}
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-item">
          <h3 className="footer-heading">LIÊN HỆ</h3>
          <h4 className="footer-title">Địa chỉ:</h4>
          <span>
            Lô 10, Liền kề 3, Khu đô thị Văn Khê, La Khê, Hà Đông, Hà Nội
          </span>
          <h4 className="footer-title">Điện thoại:</h4>
          <span>+84867672497</span>
          <h4 className="footer-title">Email:</h4>
          <a className="footer-link" href="#">
            phoenix.travel24@gmail.com
          </a>
        </div>
        <div className="footer-item">
          <h3 className="footer-heading">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="icon-container">
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsPinterest />
          </div>
          <h3 className="footer-heading">CHẤP NHẬN THANH TOÁN</h3>
          <div className="icon-container">
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_1.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_2.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_3.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_4.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_5.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_6.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_7.png" />
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/img_payment_8.jpg" />
          </div>
        </div>
        <div className="footer-item">
          <h3 className="footer-heading">TRONG NƯỚC</h3>
          <a className="footer-link" href="#">
            Hạ Long
          </a>
          <a className="footer-link" href="#">
            Ninh Bình
          </a>
          <a className="footer-link" href="#">
            Nghệ An
          </a>
          <a className="footer-link" href="#">
            Đà Nẵng
          </a>
          <a className="footer-link" href="#">
            Tam Đảo
          </a>
          <a className="footer-link" href="#">
            Quảng Ninh
          </a>
        </div>

        <div className="footer-item">
          <h3 className="footer-heading">NGOÀI NƯỚC</h3>
          <a className="footer-link" href="#">
            Tây Ban Nha
          </a>
          <a className="footer-link" href="#">
            Ý
          </a>
          <a className="footer-link" href="#">
            Pháp
          </a>
          <a className="footer-link" href="#">
            Anh
          </a>
          <a className="footer-link" href="#">
            Thái Lan
          </a>
          <a className="footer-link" href="#">
            Hàn Quốc
          </a>
          <a className="footer-link" href="#">
            Trung Quốc
          </a>
        </div>

        <div className="footer-item">
          <h3 className="footer-heading">THÔNG TIN</h3>
          <a className="footer-link" href="#">
            Tin tức
          </a>
          <a className="footer-link" href="#">
            Tạp chí du lịch
          </a>
          <a className="footer-link" href="#">
            Cẩm nang du lịch
          </a>
          <a className="footer-link" href="#">
            Kinh nghiệm du lịch
          </a>
          <a className="footer-link" href="#">
            Liên hệ
          </a>
        </div>
      </div>

      <div className="credit">
        <p>
          @ Bản quyền thuộc về PHOENIX TRAVEL | Cung cấp bởi
          <span className="credit-name"> A2Z Tech</span>{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
