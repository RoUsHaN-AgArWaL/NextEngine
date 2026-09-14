// ;(function () {

// const { ipcRenderer } = require("electron")

// /* ============================
//    CONFIG
// ============================ */

// const BLOCKED_HOSTS = [
//   "instagram.com",
//   "twitter.com",
//   "x.com",
//   "facebook.com",
//   "reddit.com",
//   "tiktok.com",
//   "youtube.com"
// ]

// let studyActive = false
// let timerId = null
// let timerEnd = 0

// const stats = {
//   sites: new Set(),
//   distractionsBlocked: 0
// }

// const lastSafeUrl = {}
// const tempAllow = {}

// /* ============================
//    UI
// ============================ */

// function createUI(){

// if(document.getElementById("ne-focus-root")) return

// const root=document.createElement("div")
// root.id="ne-focus-root"

// root.innerHTML=`

// <style>
// #ne-focus-root{
//  position:fixed;
//  inset:0;
//  z-index:999999;
//  pointer-events:none;
//  font-family:system-ui;
// }

// /* overlay */
// .ne-overlay{
//  position:absolute;
//  inset:0;
//  background: radial-gradient(circle at top, #0b1020 0%, #020617 40%, #000 100%);
//  backdrop-filter: blur(30px);
//  display:flex;
//  align-items:center;
//  justify-content:center;
//  pointer-events:auto;
// }

// /* card */
// .ne-card{
//  width:480px;
//  border-radius:28px;
//  padding:30px;
//  background: rgba(15,23,42,0.95);

//  box-shadow:
//  0 30px 80px rgba(0,0,0,0.9),
//  0 0 60px rgba(129,140,248,0.25);

//  border:1px solid rgba(255,255,255,0.08);

//  animation:fadeIn 0.4s ease;
// }

// @keyframes fadeIn{
//  from{opacity:0; transform:translateY(20px)}
//  to{opacity:1; transform:translateY(0)}
// }

// .ne-title{
//  font-size:24px;
//  font-weight:700;
//  margin-bottom:10px;
// }

// .ne-sub{
//  font-size:14px;
//  opacity:.7;
//  margin-bottom:20px;
// }

// .ne-btn{
//  padding:10px 18px;
//  border-radius:10px;
//  border:none;
//  cursor:pointer;
//  font-weight:600;
//  margin-right:10px;
//  transition:all .2s;
// }

// .ne-btn-primary{
//  background:#22c55e;
//  color:black;
// }

// .ne-btn:hover{
//  transform:translateY(-2px);
// }

// /* timer */
// .ne-timer{
//  position:fixed;
//  top:15px;
//  left:50%;
//  transform:translateX(-50%);
//  background:#22c55e;
//  color:black;
//  padding:6px 16px;
//  border-radius:999px;
//  font-weight:600;
//  display:none;
// }

// /* block */
// .ne-block{
//  position:fixed;
//  inset:0;
//  background:#020617;
//  display:none;
//  align-items:center;
//  justify-content:center;
//  z-index:999999;
// }

// .ne-block-card{
//  padding:30px;
//  border-radius:20px;
//  background:rgba(15,23,42,0.95);
//  color:white;
//  text-align:center;
// }

// body.study-mode-active{
//  filter:brightness(.7);
// }
// </style>

// <div class="ne-overlay" id="ne-start">
//  <div class="ne-card">
//   <div class="ne-title">Welcome to Study Mode</div>
//   <div class="ne-sub">Stay focused and block distractions</div>
//   <button class="ne-btn ne-btn-primary" id="ne-begin">Start</button>
//  </div>
// </div>

// <div class="ne-timer" id="ne-timer">25:00</div>

// <div class="ne-block" id="ne-block">
//  <div class="ne-block-card">
//   <h2>Stay Focused</h2>
//   <p>This site is blocked</p>
//   <button id="ne-return">Return</button>
//  </div>
// </div>

// `

// document.body.appendChild(root)

// /* events */

// document.getElementById("ne-begin").onclick=()=>{
//  startSession(25*60*1000)
//  document.getElementById("ne-start").remove()
// }

// document.getElementById("ne-return").onclick=()=>{
//  navigateSafe()
//  document.getElementById("ne-block").style.display="none"
// }

// }

// /* ============================
//    TIMER
// ============================ */

// function startSession(ms){

// studyActive=true
// timerEnd=Date.now()+ms

// document.body.classList.add("study-mode-active")

// const timerEl=document.getElementById("ne-timer")
// timerEl.style.display="block"

// timerId=setInterval(()=>{
//  const left=timerEnd-Date.now()
//  if(left<=0){
//   clearInterval(timerId)
//   endSession()
//  }
//  timerEl.innerText=format(left)
// },1000)

// }

// function endSession(){
// studyActive=false
// clearInterval(timerId)
// document.body.classList.remove("study-mode-active")
// alert("Session complete!")
// }

// function format(ms){
//  const s=Math.floor(ms/1000)
//  const m=Math.floor(s/60)
//  return m+":"+String(s%60).padStart(2,"0")
// }

// /* ============================
//    BLOCKING
// ============================ */

// function checkBlocked(){

// if(!studyActive) return
// if(!window.tabs) return

// const id=window.tabs.getSelected()
// const tab=window.tabs.get(id)

// if(!tab || !tab.url) return

// const url=tab.url

// if(url.startsWith("min://")) return

// let host=""
// try{host=new URL(url).hostname}catch{}

// if(!host) return

// if(tempAllow[host] && tempAllow[host]>Date.now()) return

// const blocked=BLOCKED_HOSTS.some(h=>host.includes(h))

// if(!blocked){
//  lastSafeUrl[id]=url
//  return
// }

// stats.distractionsBlocked++

// document.getElementById("ne-block").style.display="flex"

// navigateSafe()

// }

// /* ============================
//    SAFE NAV
// ============================ */

// function navigateSafe(){

// const id=window.tabs.getSelected()
// const tab=window.tabs.get(id)

// const safe=lastSafeUrl[id] || "min://app/index.html"

// window.webviews.update
// ? window.webviews.update(tab.id,safe)
// : window.webviews.callAsync(tab.id,"loadURL",safe)

// }

// /* ============================
//    TAB LOCK
// ============================ */

// function enforceSingleTab(){

// if(!studyActive) return

// const tabs=window.tabs.getAll()

// if(tabs.length>1){
//  tabs.slice(1).forEach(t=>window.tabs.close(t.id))
// }

// }

// /* ============================
//    KEYBOARD LOCK
// ============================ */

// document.addEventListener("keydown",e=>{

// if(!studyActive) return

// if(
// (e.ctrlKey && e.key==="t") ||
// (e.ctrlKey && e.key==="n")
// ){
//  e.preventDefault()
// }

// })

// /* ============================
//    LOOP
// ============================ */

// setInterval(()=>{
//  checkBlocked()
//  enforceSingleTab()
// },1000)

// /* ============================
//    IPC
// ============================ */

// ipcRenderer.on("enterFocusMode",()=>{
//  createUI()
// })

// ipcRenderer.on("exitFocusMode",()=>{
//  studyActive=false
//  clearInterval(timerId)
//  document.getElementById("ne-focus-root")?.remove()
// })

// })()