import type { Metadata } from 'next';
import './globals.css';
import { DemoProvider } from '@/lib/demo-store';
export const metadata: Metadata = {
  title: 'ENDE Decide Digital',
  description: 'Demo ejecutivo de decisiones',
  icons: {
    icon: [{ url: '/ende-favicon.png', type: 'image/png' }],
    shortcut: '/ende-favicon.png',
  },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body><DemoProvider>{children}</DemoProvider></body></html> }
