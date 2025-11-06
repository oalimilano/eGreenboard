// Menu mobile
function initMenu() {
    const burger = document.querySelector('.nav-burger');
    const menu = document.querySelector('.nav-menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    menu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            menu.classList.remove('open');
        }
    });
}

// Expander per la sezione Acinque
function initAcinqueExpander() {
    var btn = document.querySelector('#acinque .expander-toggle');
    var panel = document.getElementById('acinque-content');

    if (btn && panel) {
        btn.addEventListener('click', function() {
            var isOpen = btn.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                // Chiude il pannello
                btn.setAttribute('aria-expanded', 'false');
                panel.classList.remove('open');
                panel.style.maxHeight = '0px';
            } else {
                // Apre il pannello
                btn.setAttribute('aria-expanded', 'true');
                panel.classList.add('open');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });

        // Aggiorna l'altezza se la finestra viene ridimensionata
        window.addEventListener('resize', function() {
            if (panel.classList.contains('open')) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    }
}
// SIMULATORE (versione default con dati locali)
function initSimulatore() {
    var btn = document.getElementById('simu_calcola');

    var inviiEl = document.getElementById('simu_invii');
    var presetEl = document.getElementById('simu_preset');
    var wrapCustom = document.getElementById('simu_wrap_custom');
    var fogliMedEl = document.getElementById('simu_fogli_med');

    var outFogli = document.getElementById('out_fogli');
    var outAlberi = document.getElementById('out_alberi');
    var outAcqua = document.getElementById('out_acqua');
    var outCO2 = document.getElementById('out_co2');

    if (!btn) return;

    // Valori di default (usati in locale), da Eglue
    var cAlb = 0.000012;
    var cH2O = 2.2;
    var cCO2foglio = 3.5;
    var cCO2mail = 2.1;

    // Calcolo fogli medi
    function getFogliMedi() {
        if (presetEl.value === 'custom') {
            return parseFloat(fogliMedEl.value || 0);
        } else {
            return parseFloat(presetEl.value || 0);
        }
    }

    function formatIT(n) {
        var num = Math.round(n * 100) / 100;
        return num.toLocaleString('it-IT');
    }

    function calcola() {
        var invii = parseFloat(inviiEl.value || 0);
        var fogli = getFogliMedi();

        var fogliEv = invii * fogli;
        var alberi = fogliEv * cAlb;
        var acqua = fogliEv * cH2O;
        var co2Cart = fogliEv * cCO2foglio;
        var co2Mail = invii * cCO2mail;
        var co2Net = co2Cart - co2Mail;

        outFogli.textContent = formatIT(fogliEv);
        outAlberi.textContent = formatIT(alberi);
        outAcqua.textContent = formatIT(acqua);
        outCO2.textContent = formatIT(co2Net);
    }

    presetEl.addEventListener('change', function() {
        if (presetEl.value === 'custom') {
            wrapCustom.style.display = 'block';
        } else {
            wrapCustom.style.display = 'none';
        }
    });

    btn.addEventListener('click', calcola);

    // Calcolo iniziale automatico
    calcola();
}

// Al caricamento del'intero DOM
window.addEventListener('load', () => {
    setTimeout(() => {
        let splashScreen = document.getElementById("splash-screen");
        let dashboard = document.getElementById("dashboard");

        if (splashScreen != null) {
            splashScreen.style.display = "none";
        }
        if (myElemFooterYear != null) {
            dashboard.style.display = "block";
        }
    }, 2000);

    initMenu();
    initAcinqueExpander();
    initSimulatore();

    // aggiorna l’anno nel footer
    let myElemFooterYear = document.getElementById('year');

    if (myElemFooterYear != null) {
        myElemFooterYear.textContent = new Date().getFullYear();
    }
});