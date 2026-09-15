'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AlertTriangle, Bot, CalendarDays, CheckCircle2, ChevronRight, Clock3, FileText, MapPin, Target, Users } from 'lucide-react'
import { Shell, Card, PageTitle, Badge } from '@/components/ui'
import { AssistiveModal } from '@/components/assistive-modal'
import { agenda } from '@/data/demo-data'
import { getTopicStatus, useDemo } from '@/lib/demo-store'

const alerts = ['Retraso en proyecto Planta Solar El Títere', 'Solicitud de decisión pendiente en Contrato de Transmisión', 'Compromiso vencido de Gerencia de Distribución', 'Riesgo presupuestario en Proyecto IT Corporativo', 'Incumplimiento en hito ambiental – Central Río Madera']

export default function Dashboard() {
  const { state } = useDemo()
  const [chat, setChat] = useState(false)
  const closed = state.closed
  const decided = state.decisionRegistered
  const topicStatus = getTopicStatus(state)
  const pendingTopics = decided ? agenda.slice(1) : agenda
  const kpis = [[Target, 'Cumplimiento general', closed ? '81%' : '78%', 'good'], [AlertTriangle, 'Compromisos vencidos', closed ? '11' : '12', 'redtone'], [Clock3, 'En riesgo', closed ? '17' : '18', 'ambertone'], [FileText, 'Decisiones pendientes', closed ? '26' : '27', '']]

  return <Shell>
    <PageTitle title='Dashboard Presidencia' subtitle='Visión ejecutiva del estado de los comités, temas y decisiones en ENDE Corporación.' actions={<span>Últimos 3 meses　⌄</span>} />
    <div className='kpis'>{kpis.map(([X, label, value, style]) => { const Icon = X as typeof Target; return <div className={'kpi ' + style} key={String(label)}><Icon className='kicon' size={32} /><h4>{String(label)}</h4><strong>{String(value)}</strong><p>↑ +6%　vs. periodo anterior</p>{label === 'Cumplimiento general' && <div className='progress'><i style={{ width: closed ? '81%' : '78%' }} /></div>}</div> })}<Link href='/comites/ende-corporacion' className='kpi purple'><CalendarDays className='kicon' size={32} /><h4>Próximo comité</h4><strong>4 días</strong><p>20 sep. 2026<br /><b>Comité ENDE Corporación</b></p></Link></div>
    <div className='grid dashboard-grid'>
      <Card title='Alertas críticas' action={<a>Ver todas (8)</a>}><div className='list'>{alerts.map((alert, index) => <div className='listitem' key={alert}><AlertTriangle size={15} className='status-critical' /><span>{alert}<small>　{16 + index} sep. 2026</small></span><ChevronRight size={17} className='arrow' /></div>)}</div></Card>
      <Card title='Cumplimiento por gerencia/filial' action={<a>Ver detalle</a>}><div className='list'>{[['Corporación', 85], ['Generación', closed ? 100 : 72], ['Transmisión', 90], ['Distribución', 68], ['Comercialización', 76], ['Energías Renovables', 88], ['Servicios Corporativos', 70]].map(([name, percentage]) => <div className='listitem' key={String(name)}><span style={{ width: 120 }}>{name}</span><div className='progress'><i style={{ width: `${percentage}%` }} /></div><b>{percentage}%</b></div>)}</div></Card>
      <Card title='Temas que requieren decisión' action={<a>Ver todos ({closed ? '26' : '27'})</a>}><div className='tablewrap'><table><thead><tr><th>Tema / Asunto</th><th>Gerencia</th><th>Prioridad</th><th>Días</th></tr></thead><tbody>{pendingTopics.map((row, index) => <tr key={row[0]}><td>{row[0] === 'DEC-2026-0042' ? <Link href='/temas/DEC-2026-0042' className='table-link'>{row[1]}</Link> : row[1]}</td><td>{row[2]}</td><td><Badge kind={row[3] === 'Alta' ? 'red' : row[3] === 'Media' ? 'amber' : 'blue'}>{row[3]}</Badge></td><td>{index + 4}</td></tr>)}</tbody></table></div></Card>
      <Card title='Próxima reunión del Comité ENDE Corporación'><div className='meeting'><div className='meeting-row'><div className='dateblock'>Sáb <strong>20</strong><small>SEP 2026</small></div><div className='meeting-details'><span><Clock3 size={15} />09:00 - 12:00</span><span><MapPin size={15} />Sala de Directorio<br />ENDE Corporación</span><span><Users size={15} />8 miembros confirmados</span></div></div><Link className='btn full' href='/comites/ende-corporacion'>Ver agenda <ChevronRight size={16} /></Link></div></Card>
    </div>
    <div className='ai'><div className='ai-summary'><div className='ai-title'><h3><Bot size={19} /> IA asistiva</h3><button className='btn ai-chat' onClick={() => setChat(true)}><Bot size={15} />Chat</button></div><small>Análisis rápido para la toma de decisiones</small><div className='summary'><b>Resumen generado con apoyo de IA — sujeto a validación humana</b><br />{closed ? 'El compromiso DEC-2026-0042 fue validado y cerrado. El cumplimiento de Generación se actualizó a 100%.' : 'El cumplimiento general es de 78%, con mejoras en Transmisión y Energías Renovables. Se recomienda priorizar el tema de Generación Renovable Oriente y la resolución del contrato de Transmisión Norte.'}</div></div><div className='ai-list'><b>Principales riesgos detectados</b><p><AlertTriangle />Retrasos en proyectos de generación renovable.</p><p><AlertTriangle />Demoras en aprobaciones contractuales.</p><p><AlertTriangle />Riesgo reputacional ambiental.</p></div><div className='ai-list'><b>Acciones sugeridas</b><p><CheckCircle2 />{closed ? 'Mantener evidencia del cierre.' : 'Priorizar decisiones pendientes.'}</p><p><CheckCircle2 />Dar seguimiento a compromisos vencidos.</p><p><CheckCircle2 />Solicitar estado de proyectos en riesgo.</p><Badge kind={closed ? 'green' : decided ? 'amber' : 'blue'}>{closed ? 'Cumplido' : topicStatus}</Badge></div></div>
    {chat && <AssistiveModal onClose={() => setChat(false)} />}
  </Shell>
}
