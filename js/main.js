
//Botão que muda de cor
const themeToggleBtn = document.getElementById('theme-toggle');

// 1. Ao carregar QUALQUER página, verifica se o usuário já ativou o modo claro antes
if (localStorage.getItem('clear-mode') === 'true') {
    document.body.classList.add('white');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙​';
}
// 2. Escuta o clique do botão
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('white');
        
        // Verifica se o modo claro está ativo para atualizar o ícone e a memória
        if (document.body.classList.contains('white')) {
            themeToggleBtn.textContent = '🌙​';
            localStorage.setItem('clear-mode', 'true');  // Salva que quer modo claro
        } else {
            themeToggleBtn.textContent = '​☀️​';
            localStorage.setItem('clear-mode', 'false'); // Salva que quer voltar ao escuro
        }
    });
}
