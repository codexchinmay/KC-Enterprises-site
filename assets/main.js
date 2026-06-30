
/* ==========================================================================
KC ENTERPRISES — shared site script
Loaded on every page after assets/products.js and assets/cart.js.
========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Mobile nav toggle */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('is-open', !isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* 2. Scroll-reveal */
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* 3. Featured grid on homepage */
  var featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    var featured = PRODUCTS.filter(function (p) { return p.featured; }).sort(function (a,b) { return a.order - b.order; }).slice(0, 6);
    featuredGrid.innerHTML = featured.map(function (p) {
      var badge = p.isNew ? '<span class="tag tag--volt product-tag">New</span>' : '';
      var priceHTML = p.mrp && p.mrp > p.price
        ? formatINR(p.price) + ' <s style="color:var(--ash); font-weight:400;">' + formatINR(p.mrp) + '</s>'
        : formatINR(p.price);
      return '<article class="product-card">' +
        '<a href="product.html?id=' + p.id + '" class="product-figure">' + badge +
          '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg></a>' +
        '<div class="product-body">' +
          '<span class="product-sku">' + p.sku + ' · ' + p.colour + '</span>' +
          '<a href="product.html?id=' + p.id + '" class="product-name">' + p.name + '</a>' +
          '<div class="product-meta"><span class="product-price">' + priceHTML + '</span>' +
            '<button class="product-add" data-id="' + p.id + '" data-size="' + p.sizes[0] + '">Add to bag</button>' +
          '</div>' +
        '</div></article>';
    }).join('');
    featuredGrid.querySelectorAll('.product-add').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addToCart(btn.dataset.id, btn.dataset.size, 1);
        var original = btn.textContent;
        btn.textContent = 'Added';
        btn.classList.add('is-added');
        setTimeout(function () { btn.textContent = original; btn.classList.remove('is-added'); }, 1200);
      });
    });
  }

  /* 4. Next drop countdown */
  var countdownEl = document.getElementById('dropCountdown');
  if (countdownEl) {
    var dropDate = new Date(countdownEl.dataset.dropDate).getTime();
    function tick() {
      var now = Date.now();
      var diff = Math.max(0, dropDate - now);
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
      document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
      document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
      document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  /* 5. WhatsApp opt-in button (homepage promo) */
  var waOptIn = document.getElementById('waOptIn');
  if (waOptIn) {
    waOptIn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(buildWaLink('Hi KC Enterprises, please send me WhatsApp drop alerts.'), '_blank');
    });
  }

  /* 6. Newsletter form (front-end demo) */
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input[type="email"]');
      var msg = newsletterForm.parentElement.querySelector('.form-msg');
      var isValid = input && input.value.trim().length > 3 && input.value.includes('@');
      if (!msg) return;
      if (isValid) { msg.textContent = "You're on the list — check your inbox."; msg.dataset.state = 'ok'; input.value = ''; }
      else { msg.textContent = 'Enter a valid email to continue.'; msg.dataset.state = 'error'; }
    });
  }

  /* 7. Contact form (front-end demo) */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'email', 'message'].forEach(function (key) {
        var field = contactForm.querySelector('[name="' + key + '"]');
        var wrap = field ? field.closest('.field') : null;
        if (!field || !wrap) return;
        var ok = field.value.trim().length > 1;
        if (key === 'email') ok = ok && field.value.includes('@');
        wrap.classList.toggle('has-error', !ok);
        if (!ok) valid = false;
      });
      var success = document.querySelector('.contact-success');
      if (valid) { if (success) success.classList.add('is-visible'); contactForm.reset(); contactForm.style.display = 'none'; }
    });
  }

  /* 8. FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (panel) panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '0px';
    });
  });

});
