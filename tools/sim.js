const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/../index.html','utf8');
const code=h.slice(h.indexOf('const RC='),h.indexOf('function eraIdx')).replace('let S;','');
function run(pp,label){const ctx={S:{b:0,tot:0,own:{},ups:[],pp,sk:[]},extra:()=>{},costMul:()=>1,console};vm.createContext(ctx);vm.runInContext(code+';this.B=B;this.UP=UP;this.ERA=ERA;this.GOAL=GOAL;this.stats=stats;this.cost=cost;this.ppGain=ppGain;',ctx);
 const {S,B,UP,ERA,GOAL,stats,cost,ppGain}=ctx;const TAP=5,dt=.25;let t=0,st=stats(),first=null,last=0,gaps=[],eraT=[],buys=0;
 const val=s=>s.bps+TAP*s.click;
 while(S.tot<GOAL&&t<6*3600){S.b+=(st.bps+TAP*st.click)*dt;S.tot+=(st.bps+TAP*st.click)*dt;t+=dt;
  for(let k=0;k<50;k++){let best=null,bv=Infinity;const v0=val(st);
   B.forEach((b,i)=>{if(i>0&&!(S.own[B[i-1].id]>0))return;const c=cost(b);S.own[b.id]=(S.own[b.id]||0)+1;const g=val(stats())-v0;S.own[b.id]--;const sc=c/g+Math.max(0,c-S.b)/v0;if(sc<bv){bv=sc;best={c,f:()=>S.own[b.id]=(S.own[b.id]||0)+1}}});
   UP.forEach(u=>{if(S.ups.includes(u.id)||S.tot<u.c*.1)return;S.ups.push(u.id);const g=val(stats())-v0;S.ups.pop();const sc=u.c/g+Math.max(0,u.c-S.b)/v0;if(sc<bv){bv=sc;best={c:u.c,f:()=>S.ups.push(u.id)}}});
   if(best&&best.c>S.b&&(best.c-S.b)/v0>30){let b2=null,bv2=Infinity;B.forEach((b,i)=>{if(i>0&&!(S.own[B[i-1].id]>0))return;const c=cost(b);if(c>S.b)return;S.own[b.id]=(S.own[b.id]||0)+1;const g=val(stats())-v0;S.own[b.id]--;if(c/g<bv2){bv2=c/g;b2={c,f:()=>S.own[b.id]=(S.own[b.id]||0)+1}}});if(b2)best=b2}
   if(best&&best.c<=S.b){S.b-=best.c;best.f();st=stats();buys++;if(first==null)first=t;gaps.push([t,t-last]);last=t}else break}
  ERA.forEach((e,i)=>{if(i&&!eraT[i]&&S.tot>=e.at)eraT[i]=t})}
 const m=x=>x?(x/60).toFixed(1)+' dk':'-';const early=gaps.filter((g,i)=>1).slice(0,60);
 console.log(`| ${label} | ${first?.toFixed(0)}s | ${ERA.slice(1).map((e,i)=>m(eraT[i+1])).join(' | ')} | ${m(S.tot>=GOAL?t:0)} | ${Math.max(...gaps.filter(g=>g[0]<300).map(g=>g[1])).toFixed(0)}s | ${Math.max(...gaps.filter(g=>g[0]<1800).map(g=>g[1])).toFixed(0)}s | ${Math.max(...gaps.map(g=>g[1])).toFixed(0)}s | ${buys} | ⚛ ${ppGain(S.tot)} |`);return ppGain(S.tot)}
console.log('| Koşu | 1. alım | Startup | Datacenter | AI Lab | Singularity | AGI | max bekleme ilk 5dk | ilk 30dk | tüm koşu | alım | prestige |');
let p=0;for(let r=1;r<=4;r++)p+=run(p,r+'. koşu ('+p+' ⚛)');
