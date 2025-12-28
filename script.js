// ============================================
// SISTEMA DE FILTRO DE PROJETOS
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Remove classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona classe 'active' ao botão clicado
        button.classList.add('active');
        
        // Filtra os projetos
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'todos' || category === filterValue) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================
// DARK MODE TOGGLE
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Verifica se há preferência salva no localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateDarkModeIcon(currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
});

// Atualiza o ícone do botão dark mode
function updateDarkModeIcon(theme) {
    darkModeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================
// ANIMAÇÃO DE SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMAÇÃO DE ENTRADA DOS CARDS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    observer.observe(card);
});

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
const backToTopButton = document.getElementById('backToTop');

// Função para verificar a posição do scroll e mostrar/ocultar o botão
function toggleBackToTopButton() {
    // Calcula 50% da altura total da página
    const scrollThreshold = (document.documentElement.scrollHeight - window.innerHeight) * 0.5;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostra o botão se o usuário rolou mais de 50% da página
    if (scrollPosition > scrollThreshold) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// Adiciona o listener de scroll
window.addEventListener('scroll', toggleBackToTopButton);

// Função para rolar suavemente até o topo
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});