'use client'
import { useRouter } from 'next/navigation'
import { Shell, Card, PageTitle } from '@/components/ui'
import { useDemo } from '@/lib/demo-store'
import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
export default function DecisionForm() {
  const r = useRouter()
  const { register } = useDemo()
  const [toast, setToast] = useState('')
  const [requiredDocuments, setRequiredDocuments] =
    useState(['Contrato firmado'])
  const updateDocument = (index: number, value: string) =>
    setRequiredDocuments((documents) =>
      documents.map((document, i) =>
        i === index ? value : document,
      ),
    )
  const addDocument = () =>
    setRequiredDocuments((documents) => [...documents, ''])
  const removeDocument = (index: number) =>
    setRequiredDocuments((documents) =>
      documents.filter((_, i) => i !== index),
    )
  const submit = () => {
    register(
      requiredDocuments
        .map((document) => document.trim())
        .filter(Boolean),
    )
    setToast(
      'Decisión registrada exitosamente. Se creó el compromiso de seguimiento.',
    )
    setTimeout(
      () => r.push('/seguimiento/DEC-2026-0042'),
      700,
    )
  }
  return (
    <Shell>
      <PageTitle
        title='Registrar decisión y acuerdo'
        subtitle='Complete la información de la decisión del comité.'
      />
      <div className='hero'>
        <Card>
          <div className='decisioninfo'>
            <span>▤</span>
            <div>
              <h2 style={{ margin: 0 }}>
                DEC-2026-0042 · Proyecto de Generación
                Renovable Oriente
              </h2>
              <p>
                Comité ENDE Corporación　|　20 sep.
                2026　|　Tema estratégico　|　Gerencia:
                Generación
              </p>
            </div>
            <span />
          </div>
        </Card>
        <Card title='Resumen del comité'>
          <div className='panel soft'>
            <b>Comité ENDE Corporación</b>
            <p>
              Sábado, 20 de septiembre de 2026
              <br />
              09:00 - 12:00
              <br />
              Sala de Directorio ENDE Corporación
            </p>
            <hr />
            <b>Miembros participantes (8)</b>
            <p>JP　MC　LR　AG　PC　VM　CT　RS</p>
          </div>
        </Card>
      </div>
      <div className='grid twocol'>
        <Card title='Información de la decisión'>
          <div className='formcard'>
            <div className='formgrid'>
              <label className='wide'>
                Decisión / acuerdo *
                <textarea defaultValue='Aprobar el inicio de la siguiente etapa del proyecto, sujeto al cumplimiento de los respaldos y acciones definidas.' />
              </label>
              <label>
                Tipo de decisión *
                <select defaultValue='Aprobación'>
                  <option>Aprobación</option>
                  <option>Instrucción</option>
                  <option>Resolución</option>
                </select>
              </label>
              <label>
                Responsable asignado *
                <select defaultValue='Gerencia de Generación'>
                  <option>Gerencia de Generación</option>
                  <option>Gerencia de Transmisión</option>
                </select>
              </label>
              <label>
                Fecha límite de cierre *
                <input defaultValue='30/09/2026' />
              </label>
              <label className='half'>
                Indicador de cumplimiento *
                <input defaultValue='Etapa de generación renovable habilitada con requisitos validados' />
              </label>
              <div className='required-documents wide'>
                <div className='required-documents-heading'>
                  <div>
                    <label>
                      Documentos obligatorios para validar
                      el cierre *
                    </label>
                    <small>
                      Defina cada respaldo que deberá
                      cargarse durante el seguimiento.
                    </small>
                  </div>
                </div>
                <div className='required-document-list'>
                  {requiredDocuments.map(
                    (document, index) => (
                      <div
                        className='required-document-row'
                        key={index}
                      >
                        <input
                          aria-label={`Documento obligatorio ${index + 1}`}
                          value={document}
                          onChange={(event) =>
                            updateDocument(
                              index,
                              event.target.value,
                            )
                          }
                          placeholder='Ej.: Contrato firmado'
                        />
                        <button
                          type='button'
                          className='icon-btn add-document'
                          onClick={addDocument}
                          aria-label='Agregar documento obligatorio'
                        >
                          <Plus size={17} />
                        </button>
                        <button
                          type='button'
                          className='icon-btn remove-document'
                          onClick={() =>
                            removeDocument(index)
                          }
                          disabled={
                            requiredDocuments.length === 1
                          }
                          aria-label='Eliminar documento'
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <label>
                Prioridad *
                <select defaultValue='Alta'>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </label>
              <label className='half'>
                Riesgos y mitigación
                <textarea defaultValue='Gestionar los permisos y seguimiento de los hitos técnicos conforme a la matriz de riesgos.' />
              </label>
              <label>
                Observaciones
                <textarea defaultValue='Información registrada en sesión de comité.' />
              </label>
            </div>
            <div className='formactions'>
              <button
                onClick={() => r.back()}
                className='btn'
              >
                Cancelar
              </button>
              <span>
                <button
                  className='btn'
                  onClick={() =>
                    setToast(
                      'Borrador guardado en este navegador.',
                    )
                  }
                >
                  ▣　Guardar borrador
                </button>
                　
                <button
                  className='btn primary'
                  onClick={submit}
                >
                  ✓　Registrar decisión
                </button>
              </span>
            </div>
            {toast && (
              <p
                className='check'
                style={{ marginBottom: 0 }}
              >
                ✓　{toast}
              </p>
            )}
          </div>
        </Card>
        <Card title='Validaciones'>
          <div className='panel'>
            {[
              'Decisión / acuerdo completada',
              'Tipo de decisión seleccionado',
              'Responsable asignado seleccionado',
              'Fecha límite definida',
              'Indicador de cumplimiento completado',
              'Documentos obligatorios definidos',
            ].map((x) => (
              <p className='check' key={x}>
                ●　{x}
              </p>
            ))}
            <p style={{ color: '#cb8c00' }}>
              ▲　Se recomienda completar riesgos y
              mitigación
            </p>
            <div className='panel mint'>
              <b>✓　Datos obligatorios completos</b>
              <br />
              Puede registrar la decisión del comité.
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  )
}
