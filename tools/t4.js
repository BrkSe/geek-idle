const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['iPhone 12']});
await c.addInitScript(()=>{if(!sessionStorage.x){sessionStorage.x=1;localStorage.geekidle=JSON.stringify({b:500,tot:800,own:{kb:3},ups:['u1'],pp:0,best:0,agi:0,t:Date.now()-600000,clicks:40})}});
const p=await c.newPage();let errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(process.argv[2]);await p.waitForTimeout(800);
console.log('old v1 save loaded',await p.evaluate(()=>[S.b|0,S.own.kb,S.ups,S.sk,S.ach]),await p.textContent('#mb').catch(()=>''),'ERRS',errs);await b.close()})();
