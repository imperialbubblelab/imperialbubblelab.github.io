(() => {
  async function includePartials() {
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    for (const el of nodes) {
      const url = el.getAttribute('data-include');
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        const html = await res.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;
        el.replaceWith(...Array.from(temp.childNodes));
      } catch (err) {
        console.warn('Include failed:', url, err);
      }
    }

    // After header is injected, set aria-current on nav
    const nav = document.querySelector('.nav');
    if (nav) {
      const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      nav.querySelectorAll('a[href]').forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
        if (href === here) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });

      // Mark Blog active on any blog subpage
      if (/\/blog\//.test(location.pathname)) {
        const blogLink = nav.querySelector('a[data-tab="blog"]');
        if (blogLink) blogLink.setAttribute('aria-current', 'page');
      }

      // No dropdowns: simplified nav
    }

    // Nav runs full-bleed; content width remains constrained by CSS
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includePartials);
  } else {
    includePartials();
  }
})();

// Enhance dropdown to open on first click (mobile/quirks-friendly)
(function () {
  function setupDropdownClicks() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
      const trigger = e.target.closest('.dropdown > a');
      if (!trigger || !nav.contains(trigger)) return;
      const dd = trigger.parentElement;
      // If closed, open and prevent navigation this time
      if (!dd.classList.contains('open')) {
        e.preventDefault();
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        // If already open, allow navigation as normal
        trigger.removeAttribute('aria-expanded');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const anyOpen = nav.querySelector('.dropdown.open');
      if (!anyOpen) return;
      if (!anyOpen.contains(e.target)) {
        anyOpen.classList.remove('open');
        const t = anyOpen.querySelector('a');
        if (t) t.removeAttribute('aria-expanded');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      nav.querySelectorAll('.dropdown.open').forEach(dd => {
        dd.classList.remove('open');
        const t = dd.querySelector('a');
        if (t) t.removeAttribute('aria-expanded');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDropdownClicks);
  } else {
    setupDropdownClicks();
  }
})();
