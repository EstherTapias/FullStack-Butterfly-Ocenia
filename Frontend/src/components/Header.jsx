import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Header.css';

const images = [
  "https://res.cloudinary.com/duyzpare7/image/upload/v1753098123/mariposa-monarca-lila_ybiyaw.jpg",
  "https://res.cloudinary.com/duyzpare7/image/upload/v1753098123/mariposa-kahukura_chi8kr.png",
  "https://res.cloudinary.com/duyzpare7/image/upload/v1753098122/mariposa-ulises_xkzkry.png"
];

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="carousel-box">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Mariposa ${index + 1}`} className="carousel-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="header-right">
        <p>
          <strong>Sumérgete en el colorido mundo de las mariposas polinizadoras de Oceanía.</strong><br />
          Esta plataforma interactiva te invita a conocer sus especies, aprender sobre su importancia ecológica y contribuir al cuidado de la biodiversidad.
          Navega por sus fichas, explora el mapa y sé parte de esta comunidad que construye, día a día, un atlas vivo de la naturaleza.
        </p>
      </div>
    </header>
  );
};

export default Header;
