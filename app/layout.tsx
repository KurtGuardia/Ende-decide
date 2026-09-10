import type { Metadata } from 'next';
import './globals.css';
import { DemoProvider } from '@/lib/demo-store';
export const metadata: Metadata = { title: 'ENDE Decide Digital', description: 'Demo ejecutivo de decisiones' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body><DemoProvider>{children}</DemoProvider></body></html> }
