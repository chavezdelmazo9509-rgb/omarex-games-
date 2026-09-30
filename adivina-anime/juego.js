// ==========================================================
//  🎌 Lógica del juego "Adivina el Anime"
//  (La lista de animes está en animes.js)
// ==========================================================
(function () {
    const TOTAL_RONDAS = 10;
    const SEGUNDOS = 15;

    let preguntas = [];
    let ronda = 0;
    let puntos = 0;
    let racha = 0;
    let aciertos = 0;
    let usoPista = false;
    let tiempoRestante = SEGUNDOS;
    let temporizador = null;

    const $ = (id) => document.getElementById("anime-" + id);

    // Récord guardado en el navegador
    function leerRecord() {
        try { return Number(localStorage.getItem("animeRecord")) || 0; } catch (e) { return 0; }
    }
    function guardarRecord(valor) {
        try { localStorage.setItem("animeRecord", valor); } catch (e) {}
    }

    // Mezcla una lista al azar (como barajar cartas)
    function mezclar(lista) {
        const copia = [...lista];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    function mostrarPantalla(nombre) {
        ["portada", "juego", "final"].forEach(p => $(p).classList.add("anime-oculto"));
        $(nombre).classList.remove("anime-oculto");
    }

    function empezar() {
        preguntas = mezclar(ANIMES).slice(0, TOTAL_RONDAS);
        ronda = 0; puntos = 0; racha = 0; aciertos = 0;
        $("puntos").textContent = 0;
        $("racha").textContent = 0;
        mostrarPantalla("juego");
        siguienteRonda();
    }

    function siguienteRonda() {
        if (ronda >= TOTAL_RONDAS) return terminar();

        const actual = preguntas[ronda];
        usoPista = false;
        $("ronda").textContent = ronda + 1;
        $("emojis").textContent = actual.emojis;
        $("pista").textContent = "";
        $("mensaje").textContent = "";
        $("btn-pista").disabled = false;

        // 1 respuesta correcta + 3 incorrectas al azar
        const incorrectas = mezclar(ANIMES.filter(a => a.nombre !== actual.nombre)).slice(0, 3);
        const opciones = mezclar([actual, ...incorrectas]);

        const cont = $("opciones");
        cont.innerHTML = "";
        opciones.forEach(op => {
            const b = document.createElement("button");
            b.textContent = op.nombre;
            b.onclick = () => responder(b, op.nombre === actual.nombre);
            cont.appendChild(b);
        });

        iniciarTiempo();
    }

    function iniciarTiempo() {
        clearInterval(temporizador);
        tiempoRestante = SEGUNDOS;
        pintarTiempo();
        temporizador = setInterval(() => {
            tiempoRestante -= 0.1;
            pintarTiempo();
            if (tiempoRestante <= 0) responder(null, false);
        }, 100);
    }

    function pintarTiempo() {
        const porcentaje = Math.max(0, tiempoRestante / SEGUNDOS * 100);
        const barra = $("tiempo-relleno");
        barra.style.width = porcentaje + "%";
        barra.style.background = porcentaje > 50 ? "#39ff14" : porcentaje > 25 ? "#ffd23f" : "#ff3b5c";
    }

    function responder(boton, esCorrecta) {
        clearInterval(temporizador);
        const actual = preguntas[ronda];

        // Bloquear botones y marcar la correcta en verde
        $("opciones").querySelectorAll("button").forEach(b => {
            b.disabled = true;
            if (b.textContent === actual.nombre) b.classList.add("correcta");
        });
        $("btn-pista").disabled = true;

        if (esCorrecta) {
            racha++;
            aciertos++;
            // 100 base + bonus por tiempo, x racha (máx x5), mitad si usó pista
            let ganados = Math.round((100 + tiempoRestante * 10) * Math.min(racha, 5));
            if (usoPista) ganados = Math.round(ganados / 2);
            puntos += ganados;
            $("mensaje").style.color = "#39ff14";
            $("mensaje").textContent = `¡Correcto! +${ganados} ${racha >= 3 ? "🔥 ¡EN RACHA!" : ""}`;
        } else {
            racha = 0;
            if (boton) boton.classList.add("incorrecta");
            $("mensaje").style.color = "#ff3b5c";
            $("mensaje").textContent = boton ? `❌ Era ${actual.nombre}` : `⏰ ¡Se acabó el tiempo! Era ${actual.nombre}`;
        }

        $("puntos").textContent = puntos;
        $("racha").textContent = racha;
        $("racha").classList.remove("anime-salto");
        void $("racha").offsetWidth; // reinicia la animación
        if (esCorrecta) $("racha").classList.add("anime-salto");

        ronda++;
        setTimeout(siguienteRonda, 1400);
    }

    function pedirPista() {
        usoPista = true;
        $("pista").textContent = "💡 " + preguntas[ronda].pista;
        $("btn-pista").disabled = true;
    }

    function terminar() {
        mostrarPantalla("final");
        $("final-puntos").textContent = puntos;
        $("final-detalle").textContent = `Acertaste ${aciertos} de ${TOTAL_RONDAS}`;

        let rango = "🥚 Novato del anime";
        if (aciertos >= 4) rango = "🍥 Genin otaku";
        if (aciertos >= 7) rango = "⚔️ Cazador de animes";
        if (aciertos >= 9) rango = "👑 Rey OTAKU";
        if (aciertos === 10) rango = "🐉 ¡LEYENDA OMAREX!";
        $("rango").textContent = rango;

        const record = leerRecord();
        if (puntos > record) {
            guardarRecord(puntos);
            $("nuevo-record").textContent = "🏆 ¡NUEVO RÉCORD!";
        } else {
            $("nuevo-record").textContent = `Récord: ${record}`;
        }
        $("record").textContent = leerRecord();
    }

    $("btn-empezar").onclick = empezar;
    $("btn-otra").onclick = empezar;
    $("btn-pista").onclick = pedirPista;
    $("record").textContent = leerRecord();
})();
