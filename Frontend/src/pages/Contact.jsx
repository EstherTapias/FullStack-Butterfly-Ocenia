import styled from 'styled-components';

const Card = ({name, role, image, linkedin, github, message}) => {
  return (
      <div className="parent">
        <div className="card">
          <div className="glass" />
          <img
            src={image}
            alt={`${name} avatar`} 
            className="card-avatar"
          />
          <div className="content">
            <span className="title">{name}</span>
            <span className="text">{role}</span><br/>
            <span className="text">{message}</span>
          </div>
          <div className="bottom">
            <div className="social-buttons-container">

              {/* Botón de LinkedIn */}
              <a
                href={linkedin}
                className="social-button .social-button1"
                aria-label="Visitar perfil de LinkedIn"
                target="_blank">

                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-1.2-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.3a3.5 3.5 0 013.1-1.8C17.5 9.5 19 11.3 19 14z" />
                </svg>
              </a>

              {/* Botón de GitHub */}
              <a
                href={github}
                className="social-button .social-button2"
                aria-label="Visitar perfil de GitHub"
                target="_blank">

                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="svg">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>

            </div>
          </div>
        </div>
      </div>
  );
};

  const Contact = () => {
    const team = [
      {
        name: "Camila Arenas",
        role: "Web Developer",
        image: "../src/assets/imgcontact/camila-avatar.jpeg",
        linkedin: "https://linkedin.com/in/mcarenash",
        github: "https://github.com/mcarenashd",
        message: "¡Gracias por visitar nuestro sitio!"
      },
      {
        name: "Gabriela Hernandez",
        role: "Web Developer",
        image: "../src/assets/imgcontact/gabriela-avatar.jpg",
        linkedin: "https://www.linkedin.com/in/arianna-hernandez-berbesi-67aa491b3/",
        github: "https://github.com/gabriela-her",
        message: "¡Gracias por visitar nuestro sitio!"
      },
      {
        name: "Julia Zarco",
        role: "Web Developer",
        image: "../src/assets/imgcontact/julia-avatar.png",
        linkedin: "https://linkedin.com/in/",
        github: "https://github.com/juliazmor",
        message: "¡Gracias por visitar nuestro sitio!"
      },
    {
      name: "Luisa Silva",
        role: "Web Developer",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQFRwCQfvCdxXw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705925392107?e=1756944000&v=beta&t=sgXqvALqh6DrX9hB6p6rfRhfJnkeBmyhxs9DNv6HX6w",
        linkedin: "https://linkedin.com/in/luisa-silva-martinez",
        github: "https://github.com/luisasilva99",
        message: "¡Gracias por visitar nuestro sitio!"
    },
    {
      name: "Michelle Gelves",
        role: "Web Developer",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQFs_8HwKaQJbg/profile-displayphoto-scale_200_200/B4DZgaDHjIG8AY-/0/1752783682275?e=1756944000&v=beta&t=_0L5N21_UakhBiIuH15-eqf8YGZ3OoMzEmMSlzhzcSk",
        linkedin: "https://linkedin.com/in/michelle-gelves",
        github: "https://github.com/MichelleGel",
        message: "¡Gracias por visitar nuestro sitio!"
    }
    ];
    
    return (
      <StyledWrapper>
        <h2 className="contact-title">Contacta con las creadoras</h2>

      <div className="card-grid">
        {team.map((person, index) => (
          <Card key={index} {...person} />
        ))}
      </div>
    </StyledWrapper>
    )
  }

  export default Contact;

const StyledWrapper = styled.div`
  .parent {
    width: 300px;
    height: 500px;
    perspective: 1000px;
  }

  .contact-title {
  text-align: center;
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1B4332;
  font-family:'Playfair Display', serif;
}

  .card {
    height: 30rem;
    border-radius: 40px;
    background: linear-gradient(135deg, #1B4332, #32775aff);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(5, 71, 17, 0) 40px 50px 25px -40px, rgba(5, 71, 17, 0.2) 0px 25px 25px -5px;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.349) 0%, rgba(255, 255, 255, 0.34) 100%);
    backdrop-filter: blur(5px); */
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: all 0.5s ease-in-out;
  }

  .content {
    padding: 260px 20px 0px 20px;
    transform: translate3d(0, 0, 26px);
    text-align: center;
  }

  .card-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  border: 3px solid #1B4332;
}

  .content .title {
    display: block;
    color: #1B4332;
    font-weight: 900;
    font-size: 20px;
    margin-bottom:10px;
  }

  .content .text {
    font-family: 'Open Sans'
    display: flex;
    color: rgba(255, 255, 255, 1);
    font-size: 17px;
  }

  .card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 6px);
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 30px;
    aspect-ratio: 1;
    padding: 5px;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(5, 71, 17, 0.5) 0px 7px 5px -5px;
  }

  .bottom .social-buttons-container .social-button:first-child {
    transition: transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s;
  }

  .bottom .social-buttons-container .social-button:nth-child(2) {
    transition: transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s;
  }

  .bottom .social-buttons-container .social-button .svg {
    width: 15px;
    fill: #1B4332;
  }

  .bottom .social-buttons-container .social-button:hover {
    background: #235540ff;
  }

  .bottom .social-buttons-container .social-button:hover .svg {
    fill: white;
  }

  .bottom .social-buttons-container .social-button:active {
    background: #03632bff;
  }

  .bottom .social-buttons-container .social-button:active .svg {
    fill: white;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 13deg);
    box-shadow: rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(5, 71, 17, 0.2) -5px 20px 10px 0px;
  }
`;

