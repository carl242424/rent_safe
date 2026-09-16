function e(e,t,n,r,i=5){let a=Math.max(1,Math.ceil(t/i));return e.innerHTML=t>i?`
    <div class="pagination-summary">Showing ${Math.min((n-1)*i+1,t)}-${Math.min(n*i,t)} of ${t}</div>
    <div class="pagination-controls">
      <button class="pagination-button" data-page="${n-1}" ${n===1?`disabled`:``}>Previous</button>
      <span>Page ${n} of ${a}</span>
      <button class="pagination-button" data-page="${n+1}" ${n===a?`disabled`:``}>Next</button>
    </div>`:``,e.querySelectorAll(`[data-page]`).forEach(e=>e.addEventListener(`click`,()=>r(Number(e.dataset.page)))),a}export{e as t};