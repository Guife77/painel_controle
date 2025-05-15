import './globals.css';

export const metadata = {
  title: 'Painel de Controle',
  description: 'Gerencie os periféricos da sua empresa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
