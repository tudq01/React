import React from "react";
import "./Home.scss";
import Father from "../../components/Father"
import Child from "../../components/Child";
import SearchBar from "../../components/search/SearchBar";
function Home() {
  return (
    <>
      <section className="section section-booking">
       
        <SearchBar/>
        
      </section>
      <section className="section section-villa">
        <h1>Villa - Khách sạn nổi bật</h1>
        <p>
          Sale off tất cả các room trong tháng này. Nhanh tay đặt room để cho
          gia đình mình cùng quây quần bên nhau.
        </p>
        <div className="villa-list">List combo ảnh</div>
      </section>

      <section className="destination">
        <h1>Điểm đến yêu thích</h1>
        <div className="destination-list">
          <div className="destination-left">
            <img src="https://pipgo.vn/wp-content/uploads/2019/11/angkorwatwithwatersenantour-1.jpg" />
          </div>
          <div className="destination-right">
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
            <div className="right-item">
              <div className="right-content">
                <div className="icon">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/tour_icon_4.png" />
                </div>
                <p>Ha Noi</p>
                <h4 className="description">Dang cap nhat</h4>
                <button
                  className="
                button-content"
                >
                  Kham pha
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-resort">
        <h1>Khu nghỉ dưỡng Nổi bật</h1>
        <br />
        Bạn là người thích chinh phục, thử đếm xem bạn đã trải qua bao nhiêu
        quốc gia. Coca travel sẽ là đòn bẩy để đưa bạn đến mọi quốc gia trên thế
        giới.
      </section>

      <section className="news">
        <div className="news-container">
          <div className="news-content">
            <h1>Tin tức</h1>
            <p>
              {" "}
              Review, đánh giá và những trải nghiệm tuyệt vời của chúng tôi cùng
              khách hàng được cập nhật tại đây, giúp cho khách hàng cũ hay mới
              đều được có một cái nhìn khách quan khi tìm hiểu về room du lịch
              của chúng tôi
            </p>
            <div className="news-list">
              <div className="news-item">
                <div className="img">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/angkorwatwithwatersenantour-1.jpg" />
                </div>
                <h1>Khu chế biến thức ăn cho khách hàng sân bay</h1>
                <p>
                  Mỗi ngày, Công ty Cổ phần Suất ăn hàng không Nội Bài (NCS)
                  cung ứng 22.000 suất ăn trên máy bay
                </p>
              </div>
              <div className="news-item">
                <div className="img">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/angkorwatwithwatersenantour-1.jpg" />
                </div>
                <h1>Khu chế biến thức ăn cho khách hàng sân bay</h1>
                <p>Có thể tạo component cho phần này</p>
              </div>
              <div className="news-item">
                <div className="img">
                  <img src="https://pipgo.vn/wp-content/uploads/2019/11/angkorwatwithwatersenantour-1.jpg" />
                </div>
                <h1>Khu chế biến thức ăn cho khách hàng sân bay</h1>
                <p>
                  Mỗi ngày, Công ty Cổ phần Suất ăn hàng không Nội Bài (NCS)
                  cung ứng 22.000 suất ăn trên máy bay
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <h1 className="about-heading">Vì sao chọn PiP Go</h1>
        <div className="about-reason">
          <div className="about-content">
            <div className="about-container">
              <div className="about-item">
                <div className="about-item-number">1</div>
                <div className="about-detail">
                  <h3>MẠNG BÁN ROOM</h3>
                  <p>Số 1 tại Việt Nam</p>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-number">2</div>
                <div className="about-detail">
                  <h3>THANH TOÁN</h3>
                  <p>An toàn, linh hoạt. Liên kết với các tổ chức tài chính</p>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-number">3</div>
                <div className="about-detail">
                  <h3>GIÁ CẢ</h3>
                  <p>Luôn có mức giá tốt nhất. Bảo đảm giá cả tốt</p>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-number">4</div>
                <div className="about-detail">
                  <h3>SẢN PHẨM</h3>
                  <p>Đa dạng, chất lượng tốt nhất</p>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-number">5</div>
                <div className="about-detail">
                  <h3>ĐẶT ROOM</h3>
                  <p>Dễ dàng, nhanh chóng, thuận lợi</p>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-number">6</div>
                <div className="about-detail">
                  <h3>HỖ TRỢ</h3>
                  <p>Hỗ trợ 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-partner">
        <h1>Đối tác cùng phát triển</h1>

        <div className="partner-container">
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_3-1.png" />
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_4-1.png" />
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_5-1.png" />
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_6-1.png" />
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_1-1.png" />
          <img src="https://pipgo.vn/wp-content/uploads/2019/11/brand_2-1.png" />
        </div>
      </section>
    </>
  );
}

export default Home;
/* <div className="about-container">
          <div className="about-reason">
            <div className="about-item">
              <div className="about-item-number">1</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
            <div className="about-item">
              <div className="about-item-number">2</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
            <div className="about-item">
              <div className="about-item-number">3</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
            <div className="about-item">
              <div className="about-item-number">4</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
            <div className="about-item">
              <div className="about-item-number">5</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
            <div className="about-item">
              <div className="about-item-number">6</div>
              <h3>MẠNG BÁN ROOM</h3>
              <p>Số 1 tại Việt Nam</p>
            </div>
          </div>
        </div>*/
