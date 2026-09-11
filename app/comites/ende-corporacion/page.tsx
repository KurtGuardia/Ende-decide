'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  ShieldCheck,
  CircleAlert,
  ChevronRight,
  UserX,
  Clock,
} from 'lucide-react'
import {
  Shell,
  Card,
  PageTitle,
  Badge,
} from '@/components/ui'
import { AssistiveModal } from '@/components/assistive-modal'
import { agenda } from '@/data/demo-data'
const people = [
  ['Juan Pérez', 'Presidente', 'Confirmado'],
  ['María González', 'Vicepresidente', 'Confirmado'],
  ['Carlos Mendoza', 'Gerente General', 'Confirmado'],
  ['Ana Rodríguez', 'Gerente de Generación', 'Confirmado'],
  [
    'Luis Fernández',
    'Gerente de Transmisión',
    'Confirmado',
  ],
  [
    'Patricia Soria',
    'Gerente de Comercialización',
    'Confirmado',
  ],
  [
    'Roberto Álvarez',
    'Gerente de Energías Renovables',
    'Confirmado',
  ],
  ['Claudia Vargas', 'Gerente Corporativo', 'Ausente'],
  ['Daniel Romero', 'Secretario Técnico', 'Pendiente'],
]
export default function Committee() {
  const [open, setOpen] = useState(false)
  const stat = (s: string) =>
    s === 'Confirmado' ? (
      <CheckCircle2 />
    ) : s === 'Ausente' ? (
      <UserX />
    ) : (
      <Clock />
    )
  return (
    <Shell>
      <PageTitle
        title='Próxima reunión del Comité ENDE Corporación'
        subtitle='Gestión de agenda, participantes y documentación para una toma de decisiones efectiva.'
      />
      <div className='metrics'>
        {[
          [
            CalendarDays,
            'Fecha de la reunión',
            'Vie 11',
            'septiembre 2026',
          ],
          [
            Clock3,
            'Horario',
            '09:00 - 12:00',
            '3 horas (aprox.)',
          ],
          [
            MapPin,
            'Lugar',
            'Sala de Directorio',
            'ENDE Corporación (La Paz)',
          ],
          [
            Users,
            'Miembros confirmados',
            '8 de 9',
            '89% de asistencia',
          ],
          [
            ShieldCheck,
            'Quórum',
            'Asegurado',
            'Se cuenta con quórum',
          ],
        ].map(([X, a, b, c]) => {
          const Icon = X as typeof CalendarDays
          return (
            <div className='metric' key={String(a)}>
              <Icon size={26} />
              <div>
                <b>{String(a)}</b>
                <strong>{String(b)}</strong>
                <small>{String(c)}</small>
              </div>
            </div>
          )
        })}
      </div>
      <div className='grid threecol'>
        <Card title='Agenda de la reunión (5 temas)'>
          <div className='tablewrap'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tema / Asunto</th>
                  <th>Gerencia</th>
                  <th>Prioridad</th>
                  <th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {agenda.map((r, i) => (
                  <tr key={r[0]}>
                    <td>{i + 1}</td>
                    <td>
                      {i === 0 ? (
                        <Link
                          href='/temas/DEC-2026-0042'
                          className='table-link'
                        >
                          {r[1]}
                        </Link>
                      ) : (
                        r[1]
                      )}
                    </td>
                    <td>{r[2]}</td>
                    <td>
                      <Badge
                        kind={
                          r[3] === 'Alta'
                            ? 'red'
                            : r[3] === 'Media'
                              ? 'amber'
                              : 'blue'
                        }
                      >
                        {r[3]}
                      </Badge>
                    </td>
                    <td>
                      {r[4]} <ChevronRight size={14} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title='Participantes (9 miembros)'>
          <div className='tablewrap'>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cargo / Rol</th>
                  <th>Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {people.map((a) => (
                  <tr key={a[0]}>
                    <td>{a[0]}</td>
                    <td>{a[1]}</td>
                    <td>
                      <span
                        className={
                          'attendance ' + a[2].toLowerCase()
                        }
                      >
                        {stat(a[2])}
                        {a[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title='Documentación por tema'>
          <div className='tablewrap'>
            <table className='doc-matrix'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tema</th>
                  <th>Técnica</th>
                  <th>Fin.</th>
                  <th>Legal</th>
                  <th>Riesgos</th>
                </tr>
              </thead>
              <tbody>
                {agenda.map((r, i) => (
                  <tr key={r[0]}>
                    <td>{i + 1}</td>
                    <td>{r[1]}</td>
                    <td>
                      <CheckCircle2 />
                    </td>
                    <td>
                      <CheckCircle2 />
                    </td>
                    <td>
                      <CheckCircle2 />
                    </td>
                    <td>
                      {i === 1 ? (
                        <CircleAlert className='missing' />
                      ) : (
                        <CheckCircle2 />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='panel warning'>
            <CircleAlert size={17} />1 tema con
            documentación pendiente
            <br />
            <small>
              El tema 2 presenta documentación de riesgos
              pendiente.
            </small>
          </div>
        </Card>
      </div>
      <div
        className='grid twocol'
        style={{ marginTop: 13 }}
      >
        <Card title='Temas listos para decisión'>
          <div className='tablewrap'>
            <table>
              <tbody>
                {agenda
                  .filter((_, i) => i !== 1)
                  .map((r, i) => (
                    <tr key={r[0]}>
                      <td>{i + 1}</td>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td className='check'>
                        <CheckCircle2 size={15} /> Listo
                        para decisión
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title='Resumen previo (preparado por Secretaría Técnica)'>
          <div className='panel soft'>
            <b>Resumen ejecutivo de la próxima reunión</b>
            <p>
              Se someterán a consideración 5 temas, de los
              cuales 4 cuentan con documentación completa y
              están listos para decisión. Se espera
              participación de 8 de 9 miembros, con quórum
              asegurado.
            </p>
            <button
              className='btn'
              onClick={() => setOpen(true)}
            >
              Ver resumen completo{' '}
              <ChevronRight size={16} />
            </button>
          </div>
        </Card>
      </div>
      {open && (
        <AssistiveModal onClose={() => setOpen(false)} />
      )}
    </Shell>
  )
}
