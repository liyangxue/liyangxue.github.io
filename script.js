'use strict';
const citations = {
  jmir: `@article{xue2026stigma,
  title = {Stigmatizing Language in Gender-Expansive Patient Records: Corpus Development, Disparity Analysis, and Natural Language Processing-Based Detection Study},
  author = {Xue, Liyang and Chayko, Mary and Singh, Vivek K.},
  journal = {Journal of Medical Internet Research},
  year = {2026},
  volume = {28},
  pages = {e91089},
  doi = {10.2196/91089}
}`,
  jamia: `@article{xue2026transfer,
  title = {Automated detection of stigmatizing language in Electronic Health Records (EHRs) using a multi-stage transfer learning approach},
  author = {Xue, Liyang and Rahman, A. M. Muntasir and Senteio, Charles R. and Singh, Vivek K.},
  journal = {Journal of the American Medical Informatics Association},
  year = {2026},
  volume = {33},
  number = {2},
  pages = {283--294},
  doi = {10.1093/jamia/ocaf193}
}`,
  electronics: `@article{ahmed2023loneliness,
  title = {Predicting Loneliness through Digital Footprints on Google and YouTube},
  author = {Ahmed, E. and Xue, Liyang and Sankalp, A. and Kong, H. and Matos, A. and Silenzio, V. and Singh, V. K.},
  journal = {Electronics},
  year = {2023},
  volume = {12},
  number = {23},
  pages = {4821},
  doi = {10.3390/electronics12234821}
}`,
  dataset: `@article{PhysioNet-mimic-iv-ext-gender-stigma-1.0.0,
  author = {Xue, Liyang and Chayko, Mary and Singh, Vivek},
  title = {{MIMIC-IV-Ext Gender-Expansive Patient Stigmatizing Language Annotations}},
  journal = {{PhysioNet}},
  year = {2026},
  month = oct,
  note = {Version 1.0.0},
  doi = {10.13026/x00d-c603},
  url = {https://doi.org/10.13026/x00d-c603}
}`
};
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});

document.querySelectorAll('#primary-nav a[href^="#"], .site-name').forEach(link => {
  link.addEventListener('click', event => {
    const section = document.querySelector(link.hash);
    if (section) {
      event.preventDefault();
      closeMenu();
      section.scrollIntoView({ block: 'start', behavior: 'instant' });
      history.pushState(null, '', link.hash);
    }
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
}

const dialog = document.querySelector('#citation-dialog');
const citationText = document.querySelector('#citation-text');

document.querySelectorAll('.citation-button').forEach(button => {
  button.addEventListener('click', async () => {
    const citation = citations[button.dataset.citation];
    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(citation);
      showToast('BibTeX citation copied.');
    } catch {
      citationText.value = citation;
      dialog.showModal();
      citationText.focus();
      citationText.select();
    }
  });
});

document.querySelector('#close-citation').addEventListener('click', () => dialog.close());
document.querySelector('#select-citation').addEventListener('click', () => {
  citationText.focus();
  citationText.select();
});

document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());

if ('IntersectionObserver' in window) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}
