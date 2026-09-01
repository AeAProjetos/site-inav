import { Link, NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'INÍCIO', path: '/' },
  { label: 'QUEM SOMOS', path: '/quem-somos' },
  { label: 'EDUCAÇÃO INFANTIL', path: '/educacao-infantil' },
  { label: 'PROJETOS', path: '/projetos' },
  { label: 'TRANSPARÊNCIA', path: '/transparencia' },
  { label: 'CONTATO', path: '/contato' },
] as const;

export default function Header() {
  return (
    <header
      className="sticky top-0 z-10 w-full bg-white"
      style={{
        borderRadius: '0 0 15px 15px',
        boxShadow: '0 4px 16px -2px rgba(0, 60, 130, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '95px',
          gap: '32px',
        }}
      >

        {/* 1. LOGO INAV */}
        <Link
          to="/"
          aria-label="INAV - Instituto Nair Valadares"
          style={{ flexShrink: 0 }}
        >
          <img
            src="/img/logo-inav-header.png"
            alt="Instituto Nair Valadares"
            style={{ height: '110px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* 2. NAVEGAÇÃO CENTRAL */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 auto',
            gap: '32px',
          }}
          aria-label="Navegação Principal"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
              className={({ isActive }) =>
                [
                  'header-nav-link',
                  isActive ? 'header-nav-active' : 'header-nav-inactive',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 3. BOTÃO "SEJA UM DOADOR" */}
        <Link
          to="/quer-ajudar"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
            height: '48px',
            padding: '0 28px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px -2px rgba(245, 130, 32, 0.35)',
            color: 'white',
          }}
          className="bg-brandOrange hover:bg-brandOrange-dark text-white shadow-sm hover:shadow-md"
        >
          <Heart style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
          Seja um doador
        </Link>

      </div>
    </header>
  );
}

