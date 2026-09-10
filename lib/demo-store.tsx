'use client';
import {createContext,useContext,useEffect,useState} from 'react'; import {DemoState,Evidence,TopicStatus,CommitmentStatus} from '@/types/demo'; import {initialState} from '@/data/demo-data';
type Ctx={state:DemoState; register:()=>void; progress:(n:number,note:string)=>void; evidence:(e:Evidence)=>void; escalate:()=>void; close:()=>void; reset:()=>void};
const C=createContext<Ctx|undefined>(undefined);
const stamp=()=>new Date().toLocaleDateString('es-BO',{day:'2-digit',month:'short',year:'numeric'})+' · '+new Date().toLocaleTimeString('es-BO',{hour:'2-digit',minute:'2-digit'});
const event=(title:string,detail:string,actor='María Fernández')=>({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,date:stamp(),title,detail,actor});
export const getTopicStatus=(state:DemoState):TopicStatus=>state.closed?'Cerrado':state.decisionRegistered?'Decisión adoptada':'Listo para comité';
export const getCommitmentStatus=(state:DemoState):CommitmentStatus=>state.closed?'Cumplido':state.decisionRegistered?'En riesgo':'Pendiente';
export function DemoProvider({children}:{children:React.ReactNode}){const [state,setState]=useState(initialState);
useEffect(()=>{const saved=localStorage.getItem('ende-demo');if(saved){try{setState(JSON.parse(saved))}catch{localStorage.removeItem('ende-demo')}}},[]);
useEffect(()=>localStorage.setItem('ende-demo',JSON.stringify(state)),[state]);
const value={state,
register:()=>setState(s=>s.decisionRegistered?s:({...s,decisionRegistered:true,progress:70,note:'Se registra el avance inicial del 70%. Las actividades técnicas y administrativas avanzan conforme a la planificación ajustada.',events:[event('Responsable notificado','La Gerencia de Generación recibió el compromiso, plazo e indicador asignados.','Sistema'),event('Decisión registrada','Se aprueba el inicio de la siguiente etapa del proyecto y se crea el compromiso de seguimiento.','Secretaría Técnica'),...s.events]})),
progress:(n:number,note:string)=>setState(s=>!s.decisionRegistered||s.closed?s:({...s,progress:Math.min(99,Math.max(0,n)),note:note||s.note,events:[event('Avance actualizado',`Se registra un avance de ${Math.min(99,Math.max(0,n))}%.`),...s.events]})),
evidence:(e:Evidence)=>setState(s=>!s.decisionRegistered||s.closed?s:({...s,evidence:[e,...s.evidence],events:[event('Evidencia cargada',`Se adjuntó ${e.name}.`),...s.events]})),
escalate:()=>setState(s=>!s.decisionRegistered||s.closed?s:({...s,escalated:true,events:[event('Compromiso escalado','Se solicitó atención prioritaria al responsable y al comité.'),...s.events]})),
close:()=>setState(s=>!s.decisionRegistered||s.closed?s:({...s,closed:true,progress:100,escalated:false,note:'Compromiso cumplido y evidencia validada por la instancia correspondiente.',events:[event('Cierre validado','La evidencia fue revisada y el compromiso fue validado como cumplido.','Instancia de validación'),...s.events]})),
reset:()=>{localStorage.removeItem('ende-demo');setState(initialState)}};return <C.Provider value={value}>{children}</C.Provider>};export const useDemo=()=>{const c=useContext(C);if(!c)throw Error('DemoProvider');return c};
