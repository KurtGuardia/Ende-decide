'use client'
import {
  Bell,
  Monitor,
  Plug,
  SlidersHorizontal,
} from 'lucide-react'
import { Shell, Card, PageTitle } from '@/components/ui'
const items = [
  [
    SlidersHorizontal,
    'Preferencias de interfaz',
    'Densidad y navegación de la plataforma',
  ],
  [
    Bell,
    'Notificaciones',
    'Recordatorios y alertas del ciclo de decisiones',
  ],
  [
    Monitor,
    'Modo de visualización',
    'Configuración de presentación ejecutiva',
  ],
  [
    Plug,
    'Integraciones (Demo)',
    'Servicios simulados para esta demostración',
  ],
]
export default function Configuracion() {
  return (
    <Shell>
      <PageTitle
        title='Configuración'
        subtitle='Preferencias de la plataforma para la demostración ejecutiva.'
      />
      <div className='config-grid'>
        {items.map(([Icon, title, detail]) => {
          const X = Icon as typeof SlidersHorizontal
          return (
            <Card key={String(title)}>
              <div className='config-item'>
                <X size={20} />
                <div>
                  <h3>{String(title)}</h3>
                  <p>{String(detail)}</p>
                </div>
                <button
                  className='config-switch'
                  aria-label={`Configurar ${String(title)}`}
                />
              </div>
            </Card>
          )
        })}
      </div>
      <p className='easter-egg'>
        Demo hecho por Kurt Guardia
      </p>
    </Shell>
  )
}
