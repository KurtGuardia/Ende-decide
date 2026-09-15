'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  Shell,
  Card,
  PageTitle,
  Badge,
} from '@/components/ui'
import {
  getCommitmentStatus,
  useDemo,
} from '@/lib/demo-store'
import { DocumentPreview } from '@/components/assistive-modal'

export default function Tracking() {
  const { state, progress, evidence, escalate, close } =
    useDemo()
  const [modal, setModal] = useState('')
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')
  const closed = state.closed
  const status = getCommitmentStatus(state)
  const act = (f: () => void, msg: string) => {
    f()
    setModal('')
    setMessage(msg)
  }
  return (
    <Shell>
      <PageTitle
        title='Seguimiento del compromiso'
        subtitle='Control y trazabilidad del cumplimiento de la decisión.'
        actions={
          <Badge kind={closed ? 'green' : 'amber'}>
            {status}
          </Badge>
        }
      />
      <div className='hero'>
        <Card>
          <div className='decisioninfo'>
            <div>
              <b>DEC-2026-0042</b>
              <h2 style={{ margin: '4px 0' }}>
                Implementar siguiente etapa de generación
                renovable
              </h2>
              <p>
                Comité ENDE Corporación
                <br />
                Sesión del 20 de septiembre de 2026
              </p>
            </div>
            <div>
              Responsable<strong>María Fernández</strong>
              <small>Gerencia de Generación</small>
              <br />
              <br />
              Comité<strong>Comité ENDE Corporación</strong>
            </div>
            <div>
              Fecha de decisión<strong>20 sep. 2026</strong>
              <br />
              <br />
              Fecha límite<strong>30 sep. 2026</strong>
            </div>
          </div>
        </Card>
        <Card title='Estado del compromiso'>
          <div
            className='panel'
            style={{ textAlign: 'center' }}
          >
            <span style={{ fontSize: 36 }}>
              {closed ? '✓' : '◷'}
            </span>
            <h2>
              <Badge kind={closed ? 'green' : 'amber'}>
                {status}
              </Badge>
            </h2>
            <p>
              {closed
                ? 'Cierre validado; no se requieren acciones adicionales.'
                : 'Existe riesgo por actividades clave pendientes.'}
            </p>
          </div>
        </Card>
      </div>
      <div className='grid twocol'>
        <Card title='Avance e hitos del compromiso'>
          <div className='panel'>
            <div
              className='row'
              style={{ justifyContent: 'space-between' }}
            >
              <b>Avance general</b>
              <h2>{state.progress}%</h2>
            </div>
            <div
              className='progress'
              style={{ width: '100%' }}
            >
              <i style={{ width: state.progress + '%' }} />
            </div>
            <div className='milestones'>
              {[
                '✓ Decisión registrada',
                '✓ Notificación enviada',
                '✓ Avance reportado',
                '✓ Evidencia cargada',
                closed
                  ? '✓ Validación completada'
                  : '○ Validación pendiente',
              ].map((x, i) => (
                <div
                  key={x}
                  className={
                    'milestone ' +
                    (i < 4 || closed ? 'check' : '')
                  }
                >
                  <b>{x}</b>
                  <small>
                    {[20, 21, 24, 26, 30][i]} sep. 2026
                  </small>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card title='Semáforo y cumplimiento'>
          <div className='panel'>
            <div className='row'>
              <span className='dot green' /> En plazo　
              {closed ? 1 : 0}
            </div>
            <p className='row'>
              <span className='dot amber' /> En riesgo　
              {closed ? 0 : 1}
            </p>
            <div className='row'>
              <span className='dot red' /> Vencido　0
            </div>
            <h1 style={{ textAlign: 'center' }}>
              {state.progress}%
            </h1>
          </div>
        </Card>
      </div>
      <div
        className='grid threecol'
        style={{ marginTop: 12 }}
      >
        <Card
          title={
            closed
              ? 'Cierre y validación'
              : 'Alertas y recordatorios'
          }
        >
          <div className='list'>
            {(closed
              ? [
                  'Cierre validado',
                  'Evidencia revisada',
                  'Compromiso cumplido',
                ]
              : [
                  '🕒 Faltan 4 días para el comité',
                  'Recordatorio de carga de evidencia',
                  'Recordatorio de avance',
                  'Notificación de decisión',
                ]
            ).map((x, i) => (
              <div
                className={
                  'listitem ' +
                  (i === 0 && !closed ? 'red-alert' : '')
                }
                key={x}
              >
                <span
                  className={
                    'dot ' +
                    (closed
                      ? 'green'
                      : i === 0
                        ? 'red'
                        : 'amber')
                  }
                />
                <span>
                  <b>{x}</b>
                  <br />
                  <small>
                    {closed
                      ? 'El registro fue consolidado en el expediente.'
                      : i === 0
                        ? 'Falta adjuntar el Contrato firmado para completar el expediente del comité.'
                        : i
                          ? 'Se solicita actualizar información del compromiso.'
                          : 'El avance requiere atención prioritaria.'}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card title='Última evidencia'>
          <div className='panel'>
            {state.evidence.length ? (
              state.evidence.slice(0, 2).map((e) => (
                <div
                  key={e.name}
                  className='soft panel evidence-link'
                  style={{ marginBottom: 8 }}
                  role='button'
                  tabIndex={0}
                  onClick={() => setPreview(e.name)}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    )
                      setPreview(e.name)
                  }}
                >
                  <b>PDF　{e.name}</b>
                  <br />
                  <small>
                    Cargado el {e.date} · {e.author}
                  </small>
                  <p>{e.note}</p>
                </div>
              ))
            ) : (
              <div className='empty'>
                La evidencia se cargará durante el
                seguimiento.
              </div>
            )}
          </div>
        </Card>
        <Card title='Bitácora de avances'>
          <div className='timeline'>
            {state.events.slice(0, 6).map((e) => (
              <div className='event' key={e.id}>
                <i className='dot' />
                <small>{e.date}</small>
                <div>
                  <b>{e.title}</b>
                  <br />
                  <small>{e.detail}</small>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title='Acciones'>
          <div className='actions'>
            {closed ? (
              <>
                <Link
                  className='btn primary'
                  href='/dashboard'
                >
                  Volver al Dashboard　→
                </Link>
                <Link
                  className='btn'
                  href='/temas/DEC-2026-0042'
                >
                  Ver expediente　→
                </Link>
              </>
            ) : (
              <>
                <button
                  className='btn primary'
                  onClick={() => setModal('progress')}
                >
                  ▥　Registrar avance
                </button>
                <button
                  className='btn'
                  onClick={() => setModal('evidence')}
                >
                  ▤　Cargar evidencia
                </button>
                <button
                  className='btn danger'
                  onClick={() => setModal('escalate')}
                >
                  ↑　Escalar
                </button>
                <button
                  className='btn'
                  onClick={() => setModal('close')}
                >
                  ✓　Validar cierre
                </button>
              </>
            )}
          </div>
        </Card>
      </div>
      {message && (
        <div
          className='panel mint'
          style={{ marginTop: 12 }}
        >
          <b>✓ {message}</b>
        </div>
      )}
      {modal && (
        <Modal
          type={modal}
          dismiss={() => setModal('')}
          requiredDocuments={state.requiredDocuments}
          initialProgress={state.progress}
          done={(p?: number, n?: string) => {
            if (modal === 'progress')
              act(
                () => progress(p ?? 65, n || ''),
                'Avance actualizado.',
              )
            if (modal === 'evidence')
              act(
                () =>
                  evidence({
                    name: n || 'Contrato firmado_sept.pdf',
                    date: '26 sep. 2026',
                    note: 'Documentación de respaldo cargada durante la demo.',
                    author: 'María Fernández',
                  }),
                'Evidencia cargada exitosamente.',
              )
            if (modal === 'escalate')
              act(
                escalate,
                'Compromiso escalado y registrado en bitácora.',
              )
            if (modal === 'close')
              act(
                close,
                'Cierre validado. El dashboard refleja el cumplimiento.',
              )
          }}
        />
      )}
      {preview && (
        <DocumentPreview
          title={preview}
          onClose={() => setPreview('')}
        />
      )}
    </Shell>
  )
}

function Modal({
  type,
  dismiss,
  done,
  requiredDocuments,
  initialProgress,
}: {
  type: string
  dismiss: () => void
  done: (p?: number, n?: string) => void
  requiredDocuments: string[]
  initialProgress: number
}) {
  const [n, setN] = useState('')
  const [file, setFile] = useState(
    'Contrato firmado_sept.pdf',
  )
  const [p, setP] = useState(initialProgress || 65)
  const [selectedDocument, setSelectedDocument] =
    useState('')
  const title =
    type === 'progress'
      ? 'Registrar avance'
      : type === 'evidence'
        ? 'Cargar evidencia'
        : type === 'escalate'
          ? 'Escalar compromiso'
          : 'Validar cierre'
  return (
    <div className='modalback'>
      <div className='modal'>
        <h2>{title}</h2>
        {type === 'progress' && (
          <>
            <label>
              Documento obligatorio asociado
              <select
                value={selectedDocument}
                onChange={(event) => {
                  setSelectedDocument(event.target.value)
                  if (event.target.value) setP(80)
                }}
              >
                <option value=''>
                  Seleccione un documento
                </option>
                {requiredDocuments.map((document) => (
                  <option key={document} value={document}>
                    {document}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Porcentaje de avance
              <input
                type='number'
                min='0'
                max='99'
                value={p}
                onChange={(e) => setP(+e.target.value)}
              />
              <small className='field-help'>
                Al seleccionar un documento obligatorio, el
                avance se actualiza a 80%.
              </small>
            </label>
          </>
        )}
        {type === 'evidence' && (
          <label>
            Archivo simulado
            <input
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
          </label>
        )}
        {type !== 'close' && (
          <label>
            Nota / observación
            <textarea
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder='Ingrese un comentario para la bitácora...'
            />
          </label>
        )}
        <p>
          {type === 'close'
            ? '¿Confirma que la evidencia fue revisada y el compromiso está cumplido?'
            : type === 'escalate'
              ? 'Se creará una alerta prioritaria y un registro en el historial.'
              : ''}
        </p>
        <div className='row'>
          <button className='btn' onClick={dismiss}>
            Cancelar
          </button>
          <button
            className={
              'btn ' +
              (type === 'escalate' ? 'danger' : 'primary')
            }
            onClick={() =>
              done(
                p,
                type === 'evidence'
                  ? file
                  : selectedDocument
                    ? `Avance reportado con ${selectedDocument}. ${n}`
                    : n,
              )
            }
          >
            {type === 'close'
              ? 'Confirmar validación'
              : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}
