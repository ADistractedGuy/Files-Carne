
/* =========================================
   FILES&CARNE - CONFIGURAÇÕES GERAIS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. ALTERNÂNCIA DE TEMA
    ===================================== */

    const themeToggleBtn =
        document.getElementById("theme-toggle");

    // Recupera o tema salvo.
    let clearMode = false;

    try {
        clearMode =
            localStorage.getItem("clear-mode") === "true";
    } catch (error) {
        console.warn("Não foi possível acessar o armazenamento.");
    }

    // Aplica o tema ao carregar a página.
    document.body.classList.toggle("white", clearMode);

    function updateThemeButton() {

        if (!themeToggleBtn) return;

        const lightMode =
            document.body.classList.contains("white");

        themeToggleBtn.textContent =
            lightMode ? "🌙" : "☀️";

        themeToggleBtn.setAttribute(
            "aria-pressed",
            String(lightMode)
        );
    }

    updateThemeButton();

    // Alterna o tema.
    if (themeToggleBtn) {

        themeToggleBtn.addEventListener("click", () => {

            document.body.classList.toggle("white");

            const lightMode =
                document.body.classList.contains("white");

            try {
                localStorage.setItem(
                    "clear-mode",
                    String(lightMode)
                );
            } catch (error) {
                console.warn("Não foi possível salvar o tema.");
            }

            updateThemeButton();

        });
    }


    /* =====================================
       2. ANO AUTOMÁTICO NO RODAPÉ
    ===================================== */

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

});
