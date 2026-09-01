import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/HomePage';
import QuemSomosPage from '@/pages/QuemSomosPage';
import EducacaoInfantilPage from '@/pages/EducacaoInfantilPage';
import ProjetosPage from '@/pages/ProjetosPage';
import TransparenciaPage from '@/pages/TransparenciaPage';
import QuerAjudarPage from '@/pages/QuerAjudarPage';
import ContatoPage from '@/pages/ContatoPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="quem-somos" element={<QuemSomosPage />} />
          <Route path="educacao-infantil" element={<EducacaoInfantilPage />} />
          <Route path="projetos" element={<ProjetosPage />} />
          <Route path="transparencia" element={<TransparenciaPage />} />
          <Route path="quer-ajudar" element={<QuerAjudarPage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
