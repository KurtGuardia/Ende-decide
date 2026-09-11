'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Building2,
  UsersRound,
  Flag,
  CalendarDays,
  UserRound,
  CircleCheckBig,
  UserRoundCheck,
  Landmark,
} from 'lucide-react'
import {
  Shell,
  Card,
  PageTitle,
  Badge,
} from '@/components/ui'
import { docs, topic } from '@/data/demo-data'
import { getTopicStatus, useDemo } from '@/lib/demo-store'
import { DocumentPreview } from '@/components/assistive-modal'

export default function Topic() {
  const [tab, setTab] = useState('Resumen')
  const { state } = useDemo()
  const topicStatus = getTopicStatus(state)
  const cta = state.closed
    ? {
        href: '/seguimiento/DEC-2026-0042',
        label: 'Ver compromiso cumplido',
      }
    : state.decisionRegistered
      ? {
          href: '/seguimiento/DEC-2026-0042',
          label: 'Ir al seguimiento',
        }
      : {
          href: '/temas/DEC-2026-0042/decision',
          label: 'Registrar decisión',
        }
  return (
    <Shell>
      <PageTitle
        title={`Tema ${topic.id}`}
        subtitle={topic.title}
        actions={
          <Badge
            kind={
              state.closed
                ? 'green'
                : state.decisionRegistered
                  ? 'blue'
                  : 'green'
            }
          >
            {topicStatus}
          </Badge>
        }
      />
      <div className='topic-header card'>
        <div className='row'>
          <Badge kind='green'>
            <CircleCheckBig />
            　Inversión estratégica simulada
          </Badge>
          　Código: {topic.id}
        </div>
        <div className='metabar'>
          <div>
            <Building2 />
            　Gerencia proponente
            <strong>{topic.origin}</strong>
            <small>ENDE Corporación</small>
          </div>
          <div>
            <Landmark />
            　Comité<strong>Corporativo</strong>
            <small>{topic.committee}</small>
          </div>
          <div>
            <Flag />
            　Prioridad
            <strong>
              <Badge kind='amber'>{topic.priority}</Badge>
            </strong>
          </div>
          <div>
            <CalendarDays />
            　Fecha de registro
            <strong>15 ago. 2026</strong>
          </div>
          <div>
            <UserRoundCheck />
            　Responsable proponente
            <strong>{topic.responsible}</strong>
            <small>Gerencia de Generación</small>
          </div>
        </div>
      </div>
      <div className='tabs'>
        {[
          'Resumen',
          'Respaldos',
          'Decisión',
          'Seguimiento',
          'Historial',
        ].map((t) => (
          <a
            className={tab === t ? 'active' : ''}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </a>
        ))}
      </div>
      {tab === 'Resumen' && <Summary />}
      {tab === 'Respaldos' && <Documents />}
      {tab === 'Decisión' && <Decision />}
      {tab === 'Seguimiento' && <Tracking />}
      {tab === 'Historial' && <History />}
      <div
        className='row'
        style={{
          justifyContent: 'flex-end',
          marginTop: 14,
        }}
      >
        <Link className='btn primary' href={cta.href}>
          {cta.label}　→
        </Link>
      </div>
      <small
        style={{
          display: 'block',
          marginTop: 8,
          color: '#6986b5',
        }}
      >
        Estado actual del tema: {topicStatus}
      </small>
    </Shell>
  )
}

function Summary() {
  const { state } = useDemo()
  const closed = state.closed
  const decided = state.decisionRegistered
  const current = closed
    ? 'El compromiso asociado fue cumplido y su cierre fue validado.'
    : decided
      ? 'La decisión fue adoptada y el compromiso se encuentra en seguimiento.'
      : 'El tema cuenta con los respaldos obligatorios completos y está disponible para la próxima reunión del comité.'
  return (
    <div className='grid threecol'>
      <div className='grid'>
        <Card title='Situación / Problema'>
          <div className='panel'>
            La creciente demanda de energía y los
            compromisos de transición energética requieren
            incrementar la capacidad de generación
            renovable. El tema plantea una etapa simulada de
            proyecto, sujeto a respaldos técnicos,
            financieros, legales y ambientales.
          </div>
        </Card>
        <Documents />
      </div>
      <div className='grid'>
        <Card title='Recomendación'>
          <div className='panel mint'>
            Se recomienda aprobar el inicio de la siguiente
            etapa del proyecto, conforme al análisis
            técnico, financiero y de riesgos presentado,
            instruyendo a la Gerencia de Generación a
            proceder con las acciones definidas.
          </div>
        </Card>
        <Card title='Alternativas analizadas'>
          <div className='tablewrap'>
            <table>
              <thead>
                <tr>
                  <th>Alternativa</th>
                  <th>Evaluación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    A. Ejecutar proyecto (recomendada)
                  </td>
                  <td>
                    <Badge kind='green'>
                      Más favorable
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>B. Ampliación de planta existente</td>
                  <td>
                    <Badge kind='red'>
                      Menos favorable
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>C. Postergar inversión</td>
                  <td>
                    <Badge kind='red'>
                      No recomendable
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        <Card title='Riesgos clave'>
          <div className='tablewrap'>
            <table className='risk-table'>
              <tbody>
                {[
                  'Retraso en permisos ambientales|Alto|Media|Alto',
                  'Variación en costos de equipos|Alto|Media|Alto',
                  'Oposición social en la zona|Medio|Media|Medio',
                  'Retrasos en conexión al SIN|Alto|Baja|Medio',
                ].map((x) => {
                  const r = x.split('|')
                  return (
                    <tr key={r[0]}>
                      <td>{r[0]}</td>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td>
                        <Badge
                          kind={
                            r[3] === 'Alto'
                              ? 'red'
                              : 'amber'
                          }
                        >
                          {r[3]}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div className='grid'>
        <Card title='Estado del tema'>
          <div className='panel'>
            <div
              className='row'
              style={{
                justifyContent: 'space-between',
                fontWeight: 700,
              }}
            >
              <span className='check'>● Registro</span>
              <span className='check'>● Preparación</span>
              <span
                className={decided ? 'check' : 'blue badge'}
              >
                {decided ? '● Decisión' : '3 Comité'}
              </span>
              <span className={closed ? 'check' : ''}>
                {closed ? '● Cierre' : '4 Seguimiento'}
              </span>
            </div>
            <div
              className='soft panel'
              style={{ marginTop: 16 }}
            >
              ⓘ　{current}
            </div>
          </div>
        </Card>
        <Checklist />
      </div>
    </div>
  )
}

function Checklist() {
  const { state } = useDemo()
  const closed = state.closed
  return (
    <Card title='Checklist de preparación para comité'>
      <div className='panel'>
        {[
          'Informe técnico completo',
          'Informe financiero completo',
          'Criterio legal revisado',
          'Matriz de riesgos incluida',
          'Otros documentos (opcional)',
          'Resumen ejecutivo elaborado',
          'Tema listo para agenda de comité',
        ].map((x, i) => (
          <p key={x} className={i === 4 ? '' : 'check'}>
            {i === 4 ? '◯' : '●'}　{x}
          </p>
        ))}
        <div
          className='panel'
          style={{
            background: closed ? '#e9fbf2' : '#effff8',
          }}
        >
          <b>
            {closed
              ? '✓　Estado del tema'
              : '✓　Estado para agenda del comité'}
          </b>
          <h2 style={{ margin: '6px 0' }}>
            {closed
              ? 'Cerrado y validado'
              : 'Listo para comité'}
          </h2>
          {closed
            ? 'El compromiso fue cumplido y el cierre quedó registrado.'
            : 'Todos los requisitos obligatorios están completos. Los otros documentos son opcionales.'}
        </div>
      </div>
    </Card>
  )
}

function Documents() {
  const [selected, setSelected] = useState<string | null>(
    null,
  )
  return (
    <>
      <Card title='Respaldos presentados'>
        <div className='tablewrap'>
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Cargado por</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={d[0]}>
                  <td>
                    <button
                      className='document-link'
                      onClick={() => setSelected(d[0])}
                    >
                      {d[0]}
                    </button>
                    {i === 4 && <small>　(opcional)</small>}
                  </td>
                  <td>{d[1]}</td>
                  <td>
                    <Badge
                      kind={
                        d[2] === 'Completo'
                          ? 'green'
                          : 'amber'
                      }
                    >
                      {d[2]}
                    </Badge>
                  </td>
                  <td>{i + 1} ago. 2026</td>
                  <td>Secretaría Técnica</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {selected && (
        <DocumentPreview
          title={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
function Decision() {
  const { state } = useDemo()
  return (
    <Card title='Decisión / acuerdo'>
      <div className='panel'>
        {state.decisionRegistered ? (
          <>
            <Badge kind={state.closed ? 'green' : 'blue'}>
              {state.closed
                ? 'Decisión cumplida'
                : 'Decisión adoptada'}
            </Badge>
            <h2>
              Aprobar el inicio de la siguiente etapa del
              proyecto
            </h2>
            <p>
              Sujeto al cumplimiento de los respaldos y
              acciones definidas.
            </p>
            <p>
              <b>Responsable:</b> Gerencia de Generación　{' '}
              <b>Plazo:</b> 30 sep. 2026　 <b>Indicador:</b>{' '}
              Hito técnico y administrativo completado
            </p>
          </>
        ) : (
          <div className='empty'>
            ◷<h2>Decisión pendiente de registro</h2>La
            decisión será registrada durante la sesión del
            comité.
          </div>
        )}
      </div>
    </Card>
  )
}
function Tracking() {
  const { state } = useDemo()
  return (
    <Card title='Compromiso vinculado'>
      <div className='panel'>
        {state.decisionRegistered ? (
          <>
            <Badge kind={state.closed ? 'green' : 'amber'}>
              {state.closed ? 'Cumplido' : 'En riesgo'}
            </Badge>
            <h2>{state.progress}% de avance</h2>
            <div className='progress'>
              <i style={{ width: state.progress + '%' }} />
            </div>
            <p>{state.note}</p>
            <Link
              className='btn primary'
              href='/seguimiento/DEC-2026-0042'
            >
              {state.closed
                ? 'Ver cierre validado'
                : 'Ir al seguimiento'}
              　→
            </Link>
          </>
        ) : (
          <div className='empty'>
            El compromiso se crea al registrar la decisión.
          </div>
        )}
      </div>
    </Card>
  )
}
function History() {
  const { state } = useDemo()
  return (
    <Card title='Historial y trazabilidad'>
      <div className='timeline'>
        {state.events.map((e) => (
          <div className='event' key={e.id}>
            <i className='dot' />
            <small>{e.date}</small>
            <div>
              <b>{e.title}</b>
              <br />
              <small>
                {e.detail} · {e.actor}
              </small>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
