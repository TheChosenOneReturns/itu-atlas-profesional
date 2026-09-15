const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = __dirname;
const dataset = JSON.parse(fs.readFileSync(path.join(root,'dist/data.json'),'utf8'));
const original = JSON.parse(fs.readFileSync(path.join(root,'../output/investigacion_laboral_itu/datos_web.json'),'utf8'));
assert.deepEqual(dataset.relaciones,original.relaciones,'Las relaciones deben conservar la investigación original');
assert.deepEqual(dataset.puestos,original.puestos,'No alterar los puntajes ni los perfiles');
const elements = new Map();
function element(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',hidden:false,scrollTop:0,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},setAttribute(){},addEventListener(){},insertAdjacentHTML(_,html){this.innerHTML+=html},getBoundingClientRect(){return {width:1280,height:720}},querySelector(){return element('child')},querySelectorAll(){return []}});return elements.get(key)}
const context = vm.createContext({console,URLSearchParams,location:{search:''},document:{querySelector:element,body:element('body')},innerWidth:1280,requestAnimationFrame(){},setTimeout(){},clearTimeout(){}});
const code=fs.readFileSync(path.join(root,'dist/app.js'),'utf8');
vm.runInContext(code.slice(0,code.indexOf("document.addEventListener('click'")),context);
context.dataset=dataset;
vm.runInContext('data=dataset',context);
let shared=0;
for(const relation of dataset.relaciones){
  context.relation=relation;
  vm.runInContext('renderRelationDetails(relation)',context);
  const html=element('#detail-content').innerHTML;
  assert(!/undefined|NaN/.test(html),relation.materia_id+' '+relation.puesto_id);
  assert(html.includes('páginas '+relation.paginas_pdf_programa));
  assert(html.includes('4 · DEMOSTRACIÓN PRÁCTICA PROPUESTA'));
  assert(html.includes('no contiene su entrega ni su evaluación'));
  const profile=dataset.puestos.find(p=>p.puesto_id===relation.puesto_id);
  if(relation.aplicacion_al_perfil===profile.aporte_curricular){shared++;assert(html.includes('Esta síntesis reúne varias materias'));}
}
for(const transverse of [false,true]){
  context.transverse=transverse;
  vm.runInContext('showTransverse=transverse',context);
  for(const [type,items,key] of [['subject',dataset.materias,'materia_id'],['role',dataset.puestos,'puesto_id']]){
    for(const item of items){context.selection={type,id:item[key]};vm.runInContext('selected=selection;renderGraph();renderDetails()',context);
      const html=element('#detail-content').innerHTML;
      assert(!/undefined|NaN/.test(html),item[key]);
      const graph=vm.runInContext('({nodes,edges})',context);
      assert.equal(graph.edges.length,dataset.relaciones.filter(e=>e[key]===item[key]&&(transverse||!['Transversal','Integración condicionada'].includes(e.tipo_relacion))).length);
      for(const node of graph.nodes.filter(n=>n.relation)){assert.equal(node.action,'relation');assert.equal(node.score,undefined,'Un vínculo no recibe un porcentaje');}
    }
  }
}
const report={relations:dataset.relaciones.length,profiles:dataset.puestos.length,subjects:dataset.materias.length,sharedProfileSummaries:shared,sourceDataUnchanged:true,detailRenders:dataset.relaciones.length+2*(dataset.puestos.length+dataset.materias.length),result:'OK'};
console.log(JSON.stringify(report,null,2));
