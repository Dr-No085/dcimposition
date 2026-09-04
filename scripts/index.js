
  // --- Search / filter ---
  const search = document.getElementById('search');
  const cards = Array.from(document.querySelectorAll('.card'));
  const emptyState = document.getElementById('emptyState');

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach(card => {
      const match = card.dataset.name.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visibleCount++;
    });
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  });

  // --- Subtle tilt + spotlight glow following cursor ---
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // --- Click ripple ---
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });