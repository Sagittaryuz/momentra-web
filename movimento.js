const stamp = document.querySelector('#stamp-toggle');
const preview = document.querySelector('#demo-stamp');
stamp.addEventListener('change', () => { preview.hidden = !stamp.checked; });

const destinations = [...document.querySelectorAll('[name="destination"]')];
const status = document.querySelector('#demo-status');
const list = new Intl.ListFormat('pt-BR');
for (const item of destinations) {
  item.addEventListener('change', () => {
    const selected = destinations.filter(input => input.checked).map(input => input.value);
    status.textContent = selected.length
      ? `Destino${selected.length > 1 ? 's selecionados' : ' selecionado'}: ${list.format(selected)}.`
      : 'Escolha pelo menos um destino.';
  });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && !CSS.supports('animation-timeline', 'view()') && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('arrived');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('.feature-grid article, .cloud-layout, .demo-photo, .demo-camera, .download').forEach(el => observer.observe(el));
}
