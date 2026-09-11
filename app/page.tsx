import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Route,
  ShieldCheck,
} from 'lucide-react'
export default function Home() {
  return (
    <main className='welcome'>
      <div className='welcome-grid' />
      <section className='welcome-content'>
        <img
          src='/ende-logo.png'
          alt='ENDE Corporación'
          className='welcome-logo'
        />
        <div className='welcome-rule' />
        <p className='welcome-eyebrow'>ENDE Corporación</p>
        <h1>ENDE DECIDE DIGITAL</h1>
        <h2>Información para mejores decisiones</h2>
        <p className='welcome-description'>
          Plataforma para la gestión, trazabilidad y
          seguimiento de decisiones estratégicas.
        </p>
        <Link
          href='/dashboard'
          className='btn primary welcome-cta'
        >
          Ingresar al Dashboard <ArrowRight size={18} />
        </Link>
        <div className='welcome-labels'>
          <span>
            <FileText size={15} />
            Evidencia
          </span>
          <span>
            <CheckCircle2 size={15} />
            Decisiones
          </span>
          <span>
            <Route size={15} />
            Seguimiento
          </span>
          <span>
            <ShieldCheck size={15} />
            Trazabilidad
          </span>
        </div>
      </section>
    </main>
  )
}
