import { Link } from 'react-router-dom';
import heroBgImg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Container com altura total ajustada ao viewport */}
      <section
        className="relative w-full h-[calc(100vh-95px)] min-h-[620px] max-h-[820px] overflow-hidden select-none bg-slate-950 flex flex-col justify-between"
        aria-label="Banner principal do Instituto Nair Valadares"
      >
        {/* Imagem de Fundo com posicionamento das crianças e professora */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src={heroBgImg}
            alt="Crianças e professora do Instituto Nair Valadares"
            className="w-full h-full object-cover object-[center_30%] md:object-[center_20%]"
            loading="eager"
            fetchPriority="high"
          />
          {/* Overlay suave e direcional para contraste dos textos */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)',
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-44 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Conteúdo Principal (Textos Organizados) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 md:pt-14 lg:pt-16 flex flex-col justify-start">
          <div className="max-w-2xl text-left">
            {/* Tagline / Nome da Instituição */}
            <span
              className="inline-block font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase mb-2"
              style={{
                color: '#f36f21',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Instituto Nair Valadares
            </span>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight uppercase mt-1 font-display">
              <span
                className="block"
                style={{
                  color: '#ffffff',
                  textShadow: '0 3px 8px rgba(0,0,0,0.9)',
                }}
              >
                CUIDADO QUE ACOLHE.
              </span>
              <span
                className="block mt-1 sm:mt-2"
                style={{
                  color: '#3ebd37',
                  textShadow: '0 3px 8px rgba(0,0,0,0.9)',
                }}
              >
                EDUCAÇÃO QUE TRANSFORMA.
              </span>
            </h1>

            {/* Descrição */}
            <p
              className="font-medium text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mt-4 sm:mt-5"
              style={{
                color: '#f1f5f9',
                textShadow: '0 2px 5px rgba(0,0,0,0.9)',
              }}
            >
              Educação, cuidado e oportunidades para o desenvolvimento integral de crianças e famílias.
            </p>
          </div>
        </div>

        {/* Ondas / Curvas Inferiores com SVG */}
        <div className="relative w-full z-20 pointer-events-none mt-auto">
          {/* SVG com curvas fluidas */}
          <svg
            className="w-full h-20 sm:h-24 md:h-28 lg:h-32 block -mb-[2px]"
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Onda Azul (Lado Esquerdo) */}
            <path
              d="M0 70C210 50 380 140 540 140C680 140 760 90 890 120C820 160 700 220 0 220V70Z"
              fill="#0077c8"
            />
            <path
              d="M0 100C160 80 320 160 480 150C620 140 710 180 800 220H0V100Z"
              fill="#0060a8"
              fillOpacity="0.4"
            />

            {/* Onda Laranja (Lado Direito / CTA de Doação) */}
            <path
              d="M580 220C720 190 880 130 1040 70C1180 20 1320 30 1440 60V220H580Z"
              fill="#f36f21"
            />
            <path
              d="M740 220C900 170 1060 100 1220 60C1340 30 1400 40 1440 50V220H740Z"
              fill="#e0580c"
              fillOpacity="0.2"
            />
          </svg>

          {/* Botão "SEJA UM DOADOR" posicionado sobre a onda laranja */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-7 right-6 sm:right-10 md:right-16 lg:right-24 pointer-events-auto">
            <Link
              to="/quer-ajudar"
              className="group inline-flex items-center gap-2 sm:gap-3 text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 hover:text-amber-100 focus:outline-none"
              style={{
                textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}
              aria-label="Seja um doador - Ajude o Instituto Nair Valadares"
            >
              <span>SEJA UM DOADOR</span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
