import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center space-y-6">
      <span className="text-7xl font-display font-black text-primary/30">404</span>
      <h1 className="text-3xl font-display font-bold text-slate-900">
        Página não encontrada
      </h1>
      <p className="text-slate-600 max-w-md mx-auto">
        A página que você está procurando não existe ou foi movida.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Button asChild className="gap-2">
          <Link to="/">
            <Home className="w-4 h-4" /> Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  );
}
