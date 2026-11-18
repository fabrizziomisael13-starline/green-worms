document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebarDrawer = document.getElementById('sidebar-drawer');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');

  // Elementos de la Flashcard flotante
  const floatingBtn = document.getElementById('floating-btn');
  const flashcardModal = document.getElementById('flashcard-modal');
  const flashcardContainer = document.getElementById('flashcard-container');
  const flashcardClose = document.getElementById('flashcard-close');

  // Efecto sombra Navbar al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Abrir / Cerrar Sidebar Drawer
  function toggleDrawer() {
    sidebarDrawer.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleDrawer);
  if (sidebarClose) sidebarClose.addEventListener('click', toggleDrawer);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleDrawer);

  // Control Flashcard Modal
  if (floatingBtn && flashcardModal) {
    floatingBtn.addEventListener('click', () => {
      flashcardModal.classList.add('open');
    });

    flashcardClose.addEventListener('click', (e) => {
      e.stopPropagation();
      flashcardModal.classList.remove('open');
      flashcardContainer.classList.remove('flipped');
    });

    flashcardModal.addEventListener('click', (e) => {
      if (e.target === flashcardModal) {
        flashcardModal.classList.remove('open');
        flashcardContainer.classList.remove('flipped');
      }
    });

    // Voltear tarjeta al hacer clic
    flashcardContainer.addEventListener('click', () => {
      flashcardContainer.classList.toggle('flipped');
    });
  }
});