const {useState,useEffect}=React;const h=htm.bind(React.createElement);
/* ===== DADOS FICTÍCIOS (substituir por API/backend) ===== */
const JOBS=[
{id:1,t:"Atendente de loja",e:"Empresa Exemplo A",area:"Atendimento e vendas",tipo:"CLT",mod:"Presencial",nv:"Sem experiência",req:"Ensino médio; boa comunicação",d:"Atendimento ao público e organização de vitrine.",dt:"2026-10-20"},
{id:2,t:"Auxiliar administrativo",e:"Empresa Exemplo B",area:"Administração",tipo:"CLT",mod:"Presencial",nv:"Júnior",req:"Pacote Office básico",d:"Rotinas de escritório e arquivo.",dt:"2026-10-18"},
{id:3,t:"Suporte técnico júnior",e:"Empresa Exemplo C",area:"Tecnologia",tipo:"CLT",mod:"Híbrido",nv:"Júnior",req:"Noções de redes e hardware",d:"Suporte a usuários e manutenção de equipamentos.",dt:"2026-10-15"},
{id:4,t:"Desenvolvedor front-end",e:"Empresa Exemplo D",area:"Tecnologia",tipo:"PJ",mod:"Remoto",nv:"Pleno",req:"React, HTML, CSS",d:"Desenvolvimento de interfaces web.",dt:"2026-10-12"},
{id:5,t:"Estagiário de marketing",e:"Empresa Exemplo E",area:"Comunicação",tipo:"Estágio",mod:"Híbrido",nv:"Sem experiência",req:"Cursando graduação",d:"Apoio em redes sociais e conteúdo.",dt:"2026-10-10"},
{id:6,t:"Operador de caixa",e:"Empresa Exemplo F",area:"Atendimento e vendas",tipo:"CLT",mod:"Presencial",nv:"Sem experiência",req:"Ensino médio",d:"Operação de caixa e fechamento diário.",dt:"2026-10-08"}];
const COURSES=[
{id:1,n:"Informática básica (exemplo)",cat:"Tecnologia",mod:"Online",h:"40h",nv:"Iniciante",d:"Conteúdo introdutório de informática."},
{id:2,n:"Atendimento ao cliente (exemplo)",cat:"Atendimento e vendas",mod:"Presencial",h:"30h",nv:"Iniciante",d:"Técnicas de comunicação e postura profissional."},
{id:3,n:"Gestão do pequeno negócio (exemplo)",cat:"Empreendedorismo",mod:"Online",h:"20h",nv:"Iniciante",d:"Noções de finanças e precificação."},
{id:4,n:"Rotinas administrativas (exemplo)",cat:"Administração",mod:"Online",h:"60h",nv:"Intermediário",d:"Documentos, planilhas e organização."},
{id:5,n:"Comunicação no trabalho (exemplo)",cat:"Competências profissionais",mod:"Online",h:"16h",nv:"Iniciante",d:"Escrita, oratória e trabalho em equipe."}];
const BIZ=[
{id:1,n:"Sabor da Vila (exemplo)",cat:"Alimentação",s:"Marmitas, bolos e salgados",d:"Negócio fictício de comida caseira."},
{id:2,n:"Studio Bela (exemplo)",cat:"Beleza e estética",s:"Cabelo, unhas e design de sobrancelhas",d:"Negócio fictício de beleza."},
{id:3,n:"Conserta Já (exemplo)",cat:"Manutenção e reparos",s:"Elétrica e hidráulica residencial",d:"Profissional fictício autônomo."},
{id:4,n:"Mãos de Arte (exemplo)",cat:"Artesanato",s:"Bordados e peças decoradas",d:"Ateliê fictício."},
{id:5,n:"TecAjuda (exemplo)",cat:"Tecnologia",s:"Formatação e reparo de celulares",d:"Assistência fictícia."}];
const uniq=(a,k)=>[...new Set(a.map(x=>x[k]))];
const mailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const Fake=()=>h`<span class="tag fake">Dado fictício</span>`;
/* ===== COMPONENTES ===== */
function Field({label,id,err,...p}){return h`<div><label htmlFor=${id}>${label}</label><input id=${id} aria-invalid=${!!err} aria-describedby=${err?id+"e":undefined} ...${p}/>${err&&h`<div className="err" id=${id+"e"} role="alert">${err}</div>`}</div>`}
function Sel({label,v,set,opts}){return h`<div><label>${label}<select value=${v} onChange=${e=>set(e.target.value)}><option value="">Todos</option>${opts.map(o=>h`<option key=${o}>${o}</option>`)}</select></label></div>`}
function Pass({label,id,err,value,onChange}){const[s,setS]=useState(false);return h`<div><${Field} label=${label} id=${id} err=${err} type=${s?"text":"password"} value=${value} onChange=${onChange} autoComplete="off"/><label style=${{fontWeight:400}}><input type="checkbox" style=${{width:"auto",minHeight:0}} checked=${s} onChange=${()=>setS(!s)}/> Mostrar senha</label></div>`}
function Header({route,user,out}){const L=[["inicio","Início"],["vagas","Vagas"],["capacitacao","Capacitação"],["empreendedorismo","Empreendedorismo"],["sobre","Sobre"]];
return h`<header><div className="wrap bar"><a className="logo" href="#inicio">Trabalha <b>Paulista</b></a>
<nav aria-label="Principal">${L.map(([k,t])=>h`<a key=${k} href=${"#"+k} className=${route===k?"on":""} aria-current=${route===k?"page":undefined}>${t}</a>`)}</nav>
${user?h`<a className="btn" href="#painel">Painel</a><a className="btn p" href="#logoff">Sair</a>`:h`<a className="btn" href="#login">Entrar</a><a className="btn p" href="#cadastro">Cadastrar-se</a>`}</div></header>`}
function Footer(){return h`<footer><div className="wrap"><b>Trabalha Paulista</b>: projeto acadêmico, Paulista–PE.<br/>Todos os dados exibidos são fictícios e servem apenas para demonstração. Sem contato institucional oficial nesta versão.</div></footer>`}
function JobCard({j,user,toast}){return h`<article className="card"><h3>${j.t}</h3><div className="mut">${j.e} · Paulista–PE</div>
<div><span className="tag">${j.tipo}</span><span className="tag">${j.mod}</span><span className="tag">${j.nv}</span><${Fake}/></div>
<details><summary>Ver detalhes</summary><p>${j.d}</p><p className="mut">Requisitos: ${j.req}<br/>Publicada em ${j.dt.split("-").reverse().join("/")}</p></details>
<button className="btn p" style=${{marginTop:10}} onClick=${()=>user?toast("Demonstração: nenhuma candidatura foi enviada."):(location.hash="login")}>Candidatar-se</button></article>`}
/* ===== PÁGINAS ===== */
function Home({user}){const[q,setQ]=useState("");
return h`<div><section className="hero"><div className="wrap"><h1>Seu próximo passo profissional começa aqui.</h1>
<p>Encontre oportunidades de emprego, descubra capacitações e fortaleça seu negócio em Paulista–PE.</p>
<form role="search" onSubmit=${e=>{e.preventDefault();sessionStorage.setItem&&0;location.hash="vagas";window.__q=q}}><input aria-label="Buscar oportunidades" placeholder="Cargo ou palavra-chave" value=${q} onChange=${e=>setQ(e.target.value)}/><button className="btn p">Encontrar vagas</button></form>
<a className="btn" style=${{color:"#fff",borderColor:"#fff"}} href="#capacitacao">Explorar cursos</a> <a className="btn" style=${{color:"#fff",borderColor:"#fff"}} href="#empreendedorismo">Divulgar meu negócio</a></div></section>
<div className="wrap"><div className="alert" role="note">Versão acadêmica: vagas, cursos e negócios abaixo são exemplos fictícios.</div>
<h2>Vagas recentes</h2><div className="grid">${JOBS.slice(0,3).map(j=>h`<article className="card" key=${j.id}><h3>${j.t}</h3><div className="mut">${j.e}</div><${Fake}/></article>`)}</div>
<h2>Capacitação em destaque</h2><div className="grid">${COURSES.slice(0,3).map(c=>h`<article className="card" key=${c.id}><h3>${c.n}</h3><span className="tag">${c.cat}</span><${Fake}/></article>`)}</div>
<h2>Negócios locais</h2><div className="grid">${BIZ.slice(0,3).map(b=>h`<article className="card" key=${b.id}><h3>${b.n}</h3><span className="tag">${b.cat}</span><${Fake}/></article>`)}</div>
<h2>Como funciona</h2><div className="grid">${["Busque oportunidades, cursos ou negócios.","Filtre por área, modalidade e categoria.","Crie uma conta para acessar o painel."].map((t,i)=>h`<div className="card" key=${i}><b>${i+1}.</b> ${t}</div>`)}</div></div></div>`}
function Jobs({user,toast}){const[q,setQ]=useState(window.__q||"");const[a,setA]=useState("");const[t,setT]=useState("");const[m,setM]=useState("");const[n,setN]=useState("");
const r=JOBS.filter(j=>(!a||j.area===a)&&(!t||j.tipo===t)&&(!m||j.mod===m)&&(!n||j.nv===n)&&(j.t+j.e+j.req).toLowerCase().includes(q.toLowerCase()));
return h`<div className="wrap"><h2>Vagas</h2><div className="alert">Vagas fictícias, apenas para demonstração.</div>
<${Field} label="Buscar por palavra-chave" id="qj" value=${q} onChange=${e=>setQ(e.target.value)}/>
<div className="filters"><${Sel} label="Área" v=${a} set=${setA} opts=${uniq(JOBS,"area")}/><${Sel} label="Contratação" v=${t} set=${setT} opts=${uniq(JOBS,"tipo")}/><${Sel} label="Modalidade" v=${m} set=${setM} opts=${uniq(JOBS,"mod")}/><${Sel} label="Experiência" v=${n} set=${setN} opts=${uniq(JOBS,"nv")}/></div>
<p role="status">${r.length} resultado(s) encontrado(s)</p>
${r.length?h`<div className="grid">${r.map(j=>h`<${JobCard} key=${j.id} j=${j} user=${user} toast=${toast}/>`)}</div>`:h`<div className="empty">Nenhuma vaga corresponde aos filtros. Tente limpar a busca.</div>`}</div>`}
function Training(){const[q,setQ]=useState("");const[c,setC]=useState("");const[m,setM]=useState("");
const r=COURSES.filter(x=>(!c||x.cat===c)&&(!m||x.mod===m)&&(x.n+x.d).toLowerCase().includes(q.toLowerCase()));
return h`<div className="wrap"><h2>Capacitação profissional</h2><div className="alert">Cursos fictícios. Não representam inscrições reais.</div>
<${Field} label="Buscar curso" id="qc" value=${q} onChange=${e=>setQ(e.target.value)}/>
<div className="filters"><${Sel} label="Categoria" v=${c} set=${setC} opts=${uniq(COURSES,"cat")}/><${Sel} label="Modalidade" v=${m} set=${setM} opts=${uniq(COURSES,"mod")}/></div>
<p role="status">${r.length} curso(s)</p>${r.length?h`<div className="grid">${r.map(x=>h`<article className="card" key=${x.id}><h3>${x.n}</h3><span className="tag">${x.cat}</span><span className="tag">${x.mod}</span><span className="tag">${x.h}</span><span className="tag">${x.nv}</span><${Fake}/><p>${x.d}</p></article>`)}</div>`:h`<div className="empty">Nenhum curso encontrado.</div>`}</div>`}
function Biz(){const[q,setQ]=useState("");const[c,setC]=useState("");
const r=BIZ.filter(x=>(!c||x.cat===c)&&(x.n+x.s).toLowerCase().includes(q.toLowerCase()));
return h`<div className="wrap"><h2>Empreendedorismo local</h2><div className="alert">Negócios fictícios, sem contatos reais.</div>
<${Field} label="Buscar por nome ou serviço" id="qb" value=${q} onChange=${e=>setQ(e.target.value)}/>
<div className="filters"><${Sel} label="Categoria" v=${c} set=${setC} opts=${uniq(BIZ,"cat")}/></div>
<p role="status">${r.length} negócio(s)</p>${r.length?h`<div className="grid">${r.map(x=>h`<article className="card" key=${x.id}><h3>${x.n}</h3><span className="tag">${x.cat}</span><${Fake}/><p>${x.s}</p><p className="mut">${x.d}</p></article>`)}</div>`:h`<div className="empty">Nenhum negócio encontrado.</div>`}</div>`}
function About(){return h`<div className="wrap"><h2>Sobre o projeto</h2><div className="card"><p><b>O que é:</b> plataforma que reúne vagas, capacitação e divulgação de pequenos negócios em Paulista–PE.</p><p><b>Problema (hipótese inicial):</b> informações sobre oportunidades podem estar dispersas em vários canais.</p><p><b>Objetivo:</b> facilitar o acesso a oportunidades e fortalecer a economia local.</p><p><b>Público:</b> candidatos, trabalhadores, jovens, empreendedores, empresas e instituições de ensino.</p><p><b>Benefícios esperados:</b> informação centralizada e navegação simples. São objetivos, sem impacto comprovado.</p><p><b>Limitações:</b> dados fictícios, autenticação demonstrativa, sem backend, e-mail ou persistência.</p></div></div>`}
function Login({users,setUser,msg}){const[em,setEm]=useState("");const[pw,setPw]=useState("");const[er,setEr]=useState({});const[ld,setLd]=useState(false);const[fail,setFail]=useState("");
const go=e=>{e.preventDefault();if(ld)return;const x={};if(!mailOk(em))x.em="Informe um e-mail válido.";if(pw.length<6)x.pw="A senha deve ter ao menos 6 caracteres.";setEr(x);setFail("");if(Object.keys(x).length)return;setLd(true);
setTimeout(()=>{const u=users.find(u=>u.email===em.toLowerCase()&&u.pw===pw);setLd(false);if(!u)return setFail("E-mail ou senha incorretos.");setUser({name:u.name,email:u.email,role:u.role});location.hash="painel"},700)};
return h`<div className="wrap"><form className="form" onSubmit=${go} noValidate><h2 style=${{marginTop:0}}>Entrar</h2>${msg&&h`<div className="alert" role="alert">${msg}</div>`}
<div className="alert">Autenticação demonstrativa, sem segurança de servidor. Conta de teste: demo@trabalhapaulista.demo / demo1234</div>
<${Field} label="E-mail" id="le" type="email" value=${em} err=${er.em} onChange=${e=>setEm(e.target.value)}/><${Pass} label="Senha" id="lp" value=${pw} err=${er.pw} onChange=${e=>setPw(e.target.value)}/>
${fail&&h`<div className="err" role="alert">${fail}</div>`}<button className="btn p" style=${{width:"100%",marginTop:14}} disabled=${ld}>${ld?"Entrando…":"Entrar"}</button>
<p><a href="#recuperar">Esqueci minha senha</a> · <a href="#cadastro">Cadastrar-se</a></p></form></div>`}
function Register({users,addUser}){const[f,setF]=useState({name:"",email:"",pw:"",pw2:"",role:"Candidato",ok:false});const[er,setEr]=useState({});const[ld,setLd]=useState(false);const[done,setDone]=useState(false);
const s=k=>e=>setF({...f,[k]:k==="ok"?e.target.checked:e.target.value});
const go=e=>{e.preventDefault();if(ld)return;const x={};if(f.name.trim().length<3)x.name="Informe o nome completo.";if(!mailOk(f.email))x.email="E-mail inválido.";else if(users.some(u=>u.email===f.email.toLowerCase()))x.email="E-mail já cadastrado nesta sessão.";if(f.pw.length<6)x.pw="Mínimo de 6 caracteres.";if(f.pw!==f.pw2)x.pw2="As senhas não coincidem.";if(!f.ok)x.ok="É necessário aceitar os termos.";setEr(x);if(Object.keys(x).length)return;
setLd(true);setTimeout(()=>{addUser({name:f.name.trim(),email:f.email.toLowerCase(),pw:f.pw,role:f.role});setLd(false);setDone(true)},700)};
return h`<div className="wrap"><form className="form" onSubmit=${go} noValidate><h2 style=${{marginTop:0}}>Cadastro</h2>
<div className="alert">Demonstração: a conta existe só na memória desta aba e some ao recarregar.</div>
<${Field} label="Nome completo" id="rn" value=${f.name} err=${er.name} onChange=${s("name")}/><${Field} label="E-mail" id="re" type="email" value=${f.email} err=${er.email} onChange=${s("email")}/>
<${Pass} label="Senha" id="rp" value=${f.pw} err=${er.pw} onChange=${s("pw")}/><${Pass} label="Confirmar senha" id="rp2" value=${f.pw2} err=${er.pw2} onChange=${s("pw2")}/>
<label>Perfil<select value=${f.role} onChange=${s("role")}><option>Candidato</option><option>Empreendedor</option><option>Empresa</option></select></label>
<label style=${{fontWeight:400}}><input type="checkbox" style=${{width:"auto",minHeight:0}} checked=${f.ok} onChange=${s("ok")}/> Aceito os termos de uso (fictícios)</label>${er.ok&&h`<div className="err" role="alert">${er.ok}</div>`}
${done&&h`<div className="ok" role="status">Conta criada (demonstração). <a href="#login">Ir para o login</a></div>`}
<button className="btn p" style=${{width:"100%",marginTop:14}} disabled=${ld||done}>${ld?"Criando…":"Criar conta"}</button><p><a href="#login">Voltar ao login</a></p></form></div>`}
function Forgot(){const[em,setEm]=useState("");const[er,setEr]=useState("");const[ld,setLd]=useState(false);const[done,setDone]=useState(false);
const go=e=>{e.preventDefault();if(ld)return;if(!mailOk(em))return setEr("Informe um e-mail válido.");setEr("");setLd(true);setTimeout(()=>{setLd(false);setDone(true)},800)};
return h`<div className="wrap"><form className="form" onSubmit=${go} noValidate><h2 style=${{marginTop:0}}>Esqueci minha senha</h2>
<${Field} label="E-mail" id="fe" type="email" value=${em} err=${er} onChange=${e=>setEm(e.target.value)}/>
${done&&h`<div className="ok" role="status">Fluxo demonstrativo concluído. Nenhum e-mail foi enviado, pois isso exigiria backend.</div>`}
<button className="btn p" style=${{width:"100%",marginTop:14}} disabled=${ld}>${ld?"Processando…":"Solicitar recuperação"}</button><p><a href="#login">Voltar ao login</a></p></form></div>`}
function Dash({user,out}){const T={Candidato:"Acompanhe vagas e cursos de interesse.",Empreendedor:"Gerencie a divulgação do seu negócio (em breve).",Empresa:"Publique e gerencie vagas (em breve)."};
return h`<div className="wrap"><h2>Painel</h2><div className="card"><h3>Olá, ${user.name}</h3><p className="mut">${user.email} · Perfil: ${user.role}</p><p>${T[user.role]||"Bem-vindo."}</p><a className="btn" href="#logoff">Sair e gerenciar conta</a></div></div>`}
function Logoff({user,out,deactivate,remove,saveProfile,access,allOut}){const[txt,setTxt]=useState("");const[c,setC]=useState(false);const[nm,setNm]=useState(user.name);const[rl,setRl]=useState(user.role);const[pe,setPe]=useState("");const[ps,setPs]=useState(false);const[ca,setCa]=useState(false);const bx={marginBottom:16};const dg={borderColor:"#c0392b",color:"#c0392b"};
return h`<div className="wrap"><h2>Sair e gerenciar conta</h2><div className="alert">Demonstração: as ações valem só na memória desta aba, sem servidor.</div>
<div className="card" style=${bx}><h3>Sessão atual</h3><p className="mut">${user.name} · ${user.email} · Perfil: ${user.role}</p><button className="btn p" onClick=${out}>Sair da conta</button> <a className="btn" href="#painel">Voltar ao painel</a></div>
<div className="card" style=${bx}><h3>Editar perfil</h3><${Field} label="Nome completo" id="pn" value=${nm} err=${pe} onChange=${e=>{setNm(e.target.value);setPs(false)}}/><label>Perfil<select value=${rl} onChange=${e=>{setRl(e.target.value);setPs(false)}}><option>Candidato</option><option>Empreendedor</option><option>Empresa</option></select></label><button className="btn p" style=${{marginTop:12}} onClick=${()=>{if(nm.trim().length<3)return setPe("Informe o nome completo.");setPe("");saveProfile(nm.trim(),rl);setPs(true)}}>Salvar perfil</button>${ps&&h`<div className="ok" role="status">Perfil atualizado (demonstração).</div>`}</div>
<div className="card" style=${bx}><h3>Últimos acessos</h3>${access.length?h`<ul>${access.map((a,i)=>h`<li key=${i}>${a}</li>`)}</ul>`:h`<p className="mut">Nenhum acesso registrado nesta aba.</p>`}<p className="mut">Registro demonstrativo, apenas desta sessão do navegador.</p></div>
<div className="card" style=${bx}><h3>Sair de todos os dispositivos</h3><p>Em um sistema real, o servidor encerraria todas as sessões. Aqui é demonstrativo e desconecta só esta aba.</p><button className="btn" onClick=${()=>ca?allOut():setCa(true)}>${ca?"Confirmar":"Sair de todos os dispositivos"}</button> ${ca&&h`<button className="btn" onClick=${()=>setCa(false)}>Cancelar</button>`}</div>
<div className="card" style=${bx}><h3>Desativar conta</h3><p>Sua conta fica inativa e você é desconectado. Entre novamente para reativá-la.</p><button className="btn" onClick=${()=>c?deactivate():setC(true)}>${c?"Confirmar desativação":"Desativar conta"}</button> ${c&&h`<button className="btn" onClick=${()=>setC(false)}>Cancelar</button>`}</div>
<div className="card" style=${bx}><h3>Excluir conta</h3><p>Remove a conta definitivamente. Digite EXCLUIR para confirmar.</p><${Field} label="Confirmação" id="ex" value=${txt} onChange=${e=>setTxt(e.target.value)}/><button className="btn" style=${{...dg,marginTop:12}} disabled=${txt!=="EXCLUIR"} onClick=${remove}>Excluir conta</button></div></div>`}
/* ===== APP ===== */
function App(){const[route,setRoute]=useState(location.hash.slice(1)||"inicio");
const[user,setUserS]=useState(()=>{try{return JSON.parse(sessionStorage.getItem("tp_s"))}catch(e){return null}});
const[users,setUsers]=useState([{name:"Usuária Demo",email:"demo@trabalhapaulista.demo",pw:"demo1234",role:"Candidato"}]);
const[tm,setTm]=useState("");const[flash,setFlash]=useState("");const[access,setAccess]=useState([]);
useEffect(()=>{const f=()=>{setRoute(location.hash.slice(1)||"inicio");window.scrollTo(0,0)};addEventListener("hashchange",f);return()=>removeEventListener("hashchange",f)},[]);
const setUser=u=>{setUserS(u);try{sessionStorage.setItem("tp_s",JSON.stringify(u))}catch(e){}};
const out=()=>{setFlash("");setUserS(null);try{sessionStorage.removeItem("tp_s")}catch(e){}location.hash="login"};
const toast=m=>{setTm(m);setTimeout(()=>setTm(""),3500)};
const gone=m=>{setFlash(m);setUserS(null);try{sessionStorage.removeItem("tp_s")}catch(e){}location.hash="login"};
const deactivate=()=>{setUsers(us=>us.map(x=>x.email===user.email?{...x,active:false}:x));gone("Conta desativada. Entre novamente para reativá-la.")};
const remove=()=>{setUsers(us=>us.filter(x=>x.email!==user.email));gone("Conta excluída.")};
const setUserR=u=>{setUsers(us=>us.map(x=>x.email===u.email?{...x,active:true}:x));setFlash("");setAccess(a=>[{e:u.email,t:new Date().toLocaleString("pt-BR")},...a]);setUser(u)};
const saveProfile=(n,r)=>{setUsers(us=>us.map(x=>x.email===user.email?{...x,name:n,role:r}:x));setUser({...user,name:n,role:r})};
const allOut=()=>gone("Demonstração: em um sistema real, todas as sessões seriam encerradas. Aqui, só esta aba foi desconectada.");
const guard=(route==="painel"||route==="logoff")&&!user;
useEffect(()=>{if(guard)location.hash="login"},[guard]);
const P={inicio:h`<${Home}/>`,vagas:h`<${Jobs} user=${user} toast=${toast}/>`,capacitacao:h`<${Training}/>`,empreendedorismo:h`<${Biz}/>`,sobre:h`<${About}/>`,
login:h`<${Login} users=${users} setUser=${setUserR} msg=${flash}/>`,cadastro:h`<${Register} users=${users} addUser=${u=>setUsers([...users,u])}/>`,recuperar:h`<${Forgot}/>`,painel:user?h`<${Dash} user=${user} out=${out}/>`:h`<${Login} users=${users} setUser=${setUserR} msg="Faça login para acessar a área restrita."/>`,logoff:user?h`<${Logoff} user=${user} out=${out} deactivate=${deactivate} remove=${remove} saveProfile=${saveProfile} access=${access.filter(a=>a.e===user.email).slice(0,5).map(a=>a.t)} allOut=${allOut}/>`:h`<${Login} users=${users} setUser=${setUserR} msg="Faça login para acessar a área restrita."/>`};
return h`<${React.Fragment}><${Header} route=${route} user=${user} out=${out}/><main>${P[route]||P.inicio}</main>${tm&&h`<div className="ok" role="status" style=${{position:"fixed",bottom:16,left:16,right:16,maxWidth:420,margin:"0 auto"}}>${tm}</div>`}<${Footer}/><//>`}
ReactDOM.createRoot(document.getElementById("root")).render(h`<${App}/>`);
