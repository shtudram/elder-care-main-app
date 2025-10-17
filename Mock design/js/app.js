// ElderCare Companion - Plain JS app with hash routing
(function() {
  const routes = {
    '#/home': renderHome,
    '#/health': renderHealth,
    '#/community': renderCommunity,
    '#/center': renderControlCenter,
    '#/concierge': renderConcierge,
    '#/errands': renderErrands
  };

  function createAppShell() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'bg-brand-600 text-white sticky top-0 z-10 shadow-md';
    header.innerHTML = `
      <div class="max-w-screen-md mx-auto px-4 py-3 flex items-center justify-between">
        <button class="focus-ring inline-flex items-center justify-center h-12 px-3 rounded-xl text-2xl" aria-label="Menu">☰</button>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight">ElderCare</h1>
        <div class="flex items-center gap-2">
          <a href="#/center" class="focus-ring inline-flex items-center justify-center h-12 px-3 rounded-xl text-2xl" aria-label="Control Center">🔔</a>
          <button id="sosBtn" class="focus-ring inline-flex items-center justify-center text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl h-12 px-5 text-lg font-bold" aria-label="Emergency SOS">SOS</button>
        </div>
      </div>
    `;

    const main = document.createElement('main');
    main.id = 'main';
    main.className = 'flex-1';

    const nav = document.createElement('nav');
    nav.className = 'bg-white border-t border-slate-200 sticky bottom-0 z-10';
    nav.innerHTML = `
      <div class="max-w-screen-md mx-auto px-2 py-2 grid grid-cols-4 gap-2">
        ${navButton('Home', '#/home', 'home')}
        ${navButton('Health', '#/health', 'heart')}
        ${navButton('Community', '#/community', 'users')}
        ${navButton('Errands', '#/errands', 'bag')}
      </div>
    `;

    app.appendChild(header);
    app.appendChild(main);
    app.appendChild(nav);

    document.getElementById('sosBtn').addEventListener('click', openSosModal);
  }

  function navButton(label, href, icon) {
    return `
      <a href="${href}" data-nav="${href}" class="focus-ring group inline-flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-ink rounded-xl h-16 text-base font-semibold">
        <span aria-hidden="true" class="text-2xl">${iconGlyph(icon)}</span>
        <span>${label}</span>
      </a>
    `;
  }

  function iconGlyph(name) {
    if (name === 'home') return '⌂';
    if (name === 'heart') return '❤';
    if (name === 'users') return '👥';
    if (name === 'pill') return '💊';
    if (name === 'phone') return '📞';
    if (name === 'calendar') return '📅';
    if (name === 'shoe') return '👟';
    if (name === 'bag') return '👜';
    return '•';
  }

  function setActiveNav(hash) {
    document.querySelectorAll('[data-nav]').forEach(el => {
      if (el.getAttribute('data-nav') === hash) {
        el.classList.add('text-ink');
        el.classList.add('bg-slate-100');
      } else {
        el.classList.remove('text-ink');
        el.classList.remove('bg-slate-100');
      }
    });
  }

  // Renderers
  function renderHome(main) {
    const nextMed = window.MockData.medicines[0];
    const nextAppt = window.MockData.appointments[0];
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-3">Upcoming Medicine</h2>
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="text-lg font-semibold">${nextMed.name} • ${nextMed.dosage}</div>
              <div class="text-slate-600">${nextMed.schedule} • ${nextMed.nextTime}</div>
            </div>
            <span class="text-3xl" aria-hidden="true">${iconGlyph('pill')}</span>
          </div>
          <div class="mt-4 flex gap-3">
            <a href="#/health" class="focus-ring inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-12 px-5 text-lg font-bold">View all medicines</a>
            <button id="homeMedDone" class="focus-ring inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-5 text-lg font-bold">Completed</button>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-3">Next Appointment</h2>
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="text-lg font-semibold">${nextAppt.doctor} • ${nextAppt.specialty}</div>
              <div class="text-slate-600">${nextAppt.date} • ${nextAppt.time}</div>
              <div class="text-slate-600">${nextAppt.location}</div>
            </div>
            <span class="text-3xl" aria-hidden="true">${iconGlyph('calendar')}</span>
          </div>
          <div class="mt-4 flex gap-3">
            <a href="tel:+15550101" class="focus-ring inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-5 text-lg font-bold">Call clinic</a>
            <a href="#/community" class="focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-12 px-5 text-lg font-bold">View events</a>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-3">Activity</h2>
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="text-lg font-semibold">Today: ${window.MockData.todaySteps.toLocaleString()} steps</div>
              <div class="text-slate-600">Days over 5,000 in past 2 weeks: ${window.MockData.daysOver5k}</div>
            </div>
            <span class="text-3xl" aria-hidden="true">${iconGlyph('shoe')}</span>
          </div>
          <div class="mt-3 text-lg font-semibold text-green-700" id="activityEncouragement"></div>
        </div>
      </section>
    `;

    // Completed button handler
    const doneBtn = document.getElementById('homeMedDone');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        showToast('Great job! Medicine marked as completed.');
        const msg = document.getElementById('activityEncouragement');
        if (msg) msg.textContent = 'Keep it up! You are taking good care of your health.';
      });
    }
  }

  function renderHealth(main) {
    const meds = window.MockData.medicines;
    const team = window.MockData.careTeam;
    const family = window.MockData.familyContacts;
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Medicines</h2>
          <div class="grid gap-3">
            ${meds.map(m => `
              <div class="flex items-center justify-between p-3 border rounded-xl">
                <div>
                  <div class="text-lg font-semibold">${m.name} • ${m.dosage}</div>
                  <div class="text-slate-600">${m.schedule} • ${m.nextTime}</div>
                </div>
                <button class="focus-ring order-btn bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-12 px-5 text-lg font-bold" data-med-id="${m.id}">Order</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Care Team</h2>
          <div class="grid gap-3 md:grid-cols-2">
            ${team.map(p => `
              <div class="p-3 border rounded-xl">
                <div class="text-lg font-semibold">${p.name}</div>
                <div class="text-slate-600">${p.role} • ${p.specialty}</div>
                <div class="mt-3 flex gap-3">
                  <a class="focus-ring inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-5 text-lg font-bold" href="tel:${p.phone}">Call</a>
                  <button class="focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-12 px-5 text-lg font-bold" aria-label="Message ${p.name}">Message</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Family</h2>
          <div class="grid gap-3 md:grid-cols-2">
            ${family.map(f => `
              <div class="p-3 border rounded-xl">
                <div class="text-lg font-semibold">${f.name}</div>
                <div class="text-slate-600">${f.relation}</div>
                <div class="mt-3 flex gap-3">
                  <a class="focus-ring inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-5 text-lg font-bold" href="tel:${f.phone}">Call</a>
                  <button class="focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-12 px-5 text-lg font-bold" aria-label="Message ${f.name}">Message</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-3">Activity</h2>
          <div class="text-lg font-semibold mb-2">Today: ${window.MockData.todaySteps.toLocaleString()} steps</div>
          <div class="text-slate-600 mb-4">Days over 5,000 in past 2 weeks: ${window.MockData.daysOver5k}</div>
          <div class="grid grid-cols-7 gap-2" aria-label="Last 14 days steps">
            ${window.MockData.stepsHistory.map(d => {
              const level = d.steps >= 7000 ? 'bg-green-600' : d.steps >= 5000 ? 'bg-green-400' : 'bg-slate-300';
              const label = `${d.date.toLocaleDateString()} – ${d.steps} steps`;
              return `<div class="h-6 rounded ${level}" title="${label}" aria-label="${label}"></div>`;
            }).join('')}
          </div>
        </div>
      </section>
    `;

    // Attach order handlers
    main.querySelectorAll('.order-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const medId = e.currentTarget.getAttribute('data-med-id');
        const med = window.MockData.medicines.find(m => m.id === medId);
        openConfirmModal(`Order ${med.name} (${med.dosage})?`, () => {
          showToast(`${med.name} ordered!`);
        });
      });
    });
  }

  function renderCommunity(main) {
    const events = window.MockData.events;
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Your Events</h2>
          <div class="grid gap-3">
            ${events.map(ev => `
              <div class="p-3 border rounded-xl flex items-center justify-between">
                <div>
                  <div class="text-lg font-semibold">${ev.title}</div>
                  <div class="text-slate-600">${ev.date} • ${ev.location}</div>
                </div>
                <div class="flex gap-2 items-center">
                  <span class="text-sm px-2 py-1 rounded-full ${ev.registered ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}">${ev.registered ? 'Registered' : 'Open'}</span>
                  ${ev.registered
                    ? `<button class=\"focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-12 px-4 text-lg font-bold\" aria-label=\"View ${ev.title} details\">Event details</button>`
                    : `<button class=\"focus-ring inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-12 px-4 text-lg font-bold\" aria-label=\"Register for ${ev.title}\">Register for event</button>`}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderControlCenter(main) {
    const list = window.MockData.notifications;
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Control Center</h2>
          <div class="grid gap-3">
            ${list.map(n => `
              <div class="p-3 border rounded-xl flex items-center justify-between">
                <div>
                  <div class="text-lg font-semibold">${n.title}</div>
                  <div class="text-slate-600">${n.time}</div>
                </div>
                <a class="focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-12 px-4 text-lg font-bold" href="#/home">Open</a>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h3 class="text-lg md:text-xl font-bold mb-3">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-3">
            <a href="#/health" class="focus-ring inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-14 px-4 text-lg font-bold">Medicines</a>
            <a href="#/community" class="focus-ring inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-xl h-14 px-4 text-lg font-bold">Events</a>
            <a href="#/concierge" class="focus-ring inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl h-14 px-4 text-lg font-bold">Concierge</a>
            <button class="focus-ring inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-xl h-14 px-4 text-lg font-bold" onclick="location.hash='#/home'">SOS</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderConcierge(main) {
    const categories = window.MockData.conciergeCategories;
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Concierge</h2>
          <div class="grid gap-3">
            ${categories.map(c => `
              <div class="p-3 border rounded-xl flex items-center justify-between">
                <div>
                  <div class="text-lg font-semibold">${c.name}</div>
                  <div class="text-slate-600">${c.desc}</div>
                </div>
                <button class="focus-ring inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-12 px-4 text-lg font-bold" data-category-id="${c.id}">Request</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    main.querySelectorAll('[data-category-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cid = e.currentTarget.getAttribute('data-category-id');
        const cat = window.MockData.conciergeCategories.find(c => c.id === cid);
        openConfirmModal(`Connect with an agent for ${cat.name}?`, () => {
          showToast('Connecting you to an agent…');
        }, { confirmLabel: 'Connect', confirmClass: 'bg-green-600 hover:bg-green-700' });
      });
    });
  }

  function renderErrands(main) {
    const errands = window.MockData.errands;
    main.innerHTML = `
      <section class="max-w-screen-md mx-auto p-4 space-y-4">
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Errands</h2>
          <p class="text-slate-700 mb-3">Select an errand. We will connect you to a customer care agent who will place the order for you.</p>
          <div class="grid gap-3">
            ${errands.map(er => `
              <div class="p-3 border rounded-xl flex items-center justify-between">
                <div>
                  <div class="text-lg font-semibold">${er.name}</div>
                  <div class="text-slate-600">${er.examples}</div>
                </div>
                <button class="focus-ring inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-12 px-4 text-lg font-bold" data-errand-id="${er.id}">Request</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    main.querySelectorAll('[data-errand-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-errand-id');
        const er = window.MockData.errands.find(x => x.id === id);
        openConfirmModal(`Connect to an agent to help with ${er.name}?`, () => {
          showToast('Connecting you to an agent…');
        }, { confirmLabel: 'Connect', confirmClass: 'bg-green-600 hover:bg-green-700' });
      });
    });
  }

  // Modal helpers
  function openSosModal() {
    openConfirmModal('Are you in an emergency? Call emergency services now?', () => {
      showToast('Calling emergency services…');
    }, { confirmLabel: 'Call now', confirmClass: 'bg-red-600 hover:bg-red-700' });
  }

  function openConfirmModal(message, onConfirm, opts = {}) {
    const confirmLabel = opts.confirmLabel || 'Confirm';
    const confirmClass = opts.confirmClass || 'bg-brand-600 hover:bg-brand-700';
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-4 z-50';
    overlay.innerHTML = `
      <div role="dialog" aria-modal="true" class="bg-white rounded-2xl w-full max-w-md p-5 shadow-lg">
        <div class="text-xl font-bold mb-3">Please confirm</div>
        <div class="text-lg">${message}</div>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <button class="focus-ring h-12 rounded-xl border border-slate-300 text-ink text-lg font-bold" id="cancelModal">Cancel</button>
          <button class="focus-ring h-12 rounded-xl text-white text-lg font-bold ${confirmClass}" id="confirmModal">${confirmLabel}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#cancelModal').addEventListener('click', () => overlay.remove());
    overlay.querySelector('#confirmModal').addEventListener('click', () => { overlay.remove(); onConfirm && onConfirm(); });
  }

  function showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-xl px-4 py-3 text-lg shadow-lg z-50';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2000);
  }

  // Router
  function router() {
    const main = document.getElementById('main');
    const hash = location.hash || '#/home';
    const render = routes[hash] || renderHome;
    render(main);
    setActiveNav(hash);
  }

  // Init
  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', () => {
    if (!location.hash) location.hash = '#/home';
    createAppShell();
    router();
  });
})();


