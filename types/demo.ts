export type TopicStatus='Listo para comité'|'Decisión adoptada'|'En riesgo'|'Cerrado';
export type CommitmentStatus='Pendiente'|'En riesgo'|'Cumplido';
export type Event={id:string; date:string; title:string; detail:string; actor:string};
export type Evidence={name:string; date:string; note:string; author:string};
export type DemoState={decisionRegistered:boolean; progress:number; closed:boolean; escalated:boolean; note:string; evidence:Evidence[]; events:Event[]};
