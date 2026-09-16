import{t as e}from"./pagination.BiouBCp5.js";var t=`https://rent-safe.onrender.com`,n=document.getElementById(`stats-grid`),r=document.getElementById(`recent-body`),i=document.getElementById(`recent-pagination`),a=[],o=1;async function s(e){let n=await fetch(`${t}${e}`,{credentials:`include`}),r=await n.json();if(!n.ok)throw Error(r.message||`Request failed`);return r}function c(e){n.innerHTML=[[`Total Cars`,e.totalCars,`🚗`],[`Available Cars`,e.availableCars,`✅`],[`Currently Rented`,e.currentlyRented,`📌`],[`Active Rentals`,e.activeRentals,`📝`],[`Blacklisted Renters`,e.blacklistedRenters,`⚠️`],[`Total Revenue`,`₱${Number(e.totalRevenue||0).toLocaleString()}`,`💰`]].map(([e,t,n])=>`
          <div class="card stat-card">
            <div class="stat-header">
              <div class="stat-label">${e}</div>
              <div class="stat-icon">${n}</div>
            </div>
            <div class="stat-value">${t}</div>
          </div>
        `).join(``)}function l(t){if(!t.length){r.innerHTML=`<tr><td colspan="6" class="empty">No rentals recorded yet.</td></tr>`,i.innerHTML=``;return}a=t,r.innerHTML=t.slice((o-1)*5,o*5).map(e=>`
          <tr>
            <td>${e.renter}</td>
            <td>${e.vehicle}</td>
            <td>${e.duration} days</td>
            <td>₱${Number(e.totalAmount||0).toLocaleString()}</td>
            <td>${e.paymentMethod||`Cash`}</td>
            <td>${e.status}</td>
          </tr>
        `).join(``),e(i,t.length,o,e=>{o=e,l(a)})}async function u(){try{let[e,t]=await Promise.all([s(`/api/dashboard/stats`),s(`/api/dashboard/recent-rentals`)]);c(e),l(t)}catch(e){n.innerHTML=`<div class="card"><div class="empty">Unable to load dashboard: ${e.message}</div></div>`}}u();