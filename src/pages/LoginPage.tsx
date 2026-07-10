import { LoginForm } from '@/components/admin/login/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-primary">
            Sylviniho<span className="text-foreground">.</span>
          </h1>
          <h2 className="text-foreground text-xl font-semibold mt-4">Administration</h2>
          <p className="text-muted text-sm mt-1">
            Connectez-vous pour gérer votre portfolio
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted mt-6">
          Accès réservé à l'administrateur.
        </p>
      </div>
    </div>
  );
}