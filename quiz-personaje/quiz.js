// ==========================================================
//  ⚔️ Lógica del test "¿Qué personaje de anime eres?"
//  (Los personajes y preguntas están en personajes.js)
// ==========================================================
(function () {
    const $ = (id) => document.getElementById("quiz-" + id);

    let pregunta = 0;
    let puntos = {};
    let resultado = null;

    function mostrarPantalla(nombre) {
        ["portada", "pregunta-pantalla", "resultado"].forEach(p => $(p).classList.add("anime-oculto"));
        $(nombre).classList.remove("anime-oculto");
    }

    function empezar() {
        pregunta = 0;
        puntos = {};
        Object.keys(PERSONAJES).forEach(id => puntos[id] = 0);
        mostrarPantalla("pregunta-pantalla");
        mostrarPregunta();
    }

    function mostrarPregunta() {
        const actual = PREGUNTAS[pregunta];
        $("numero").textContent = pregunta + 1;
        $("total").textContent = PREGUNTAS.length;
        $("progreso").style.width = (pregunta / PREGUNTAS.length * 100) + "%";
        $("pregunta").textContent = actual.texto;

        const cont = $("opciones");
        cont.innerHTML = "";
        actual.respuestas.forEach(r => {
            const b = document.createElement("button");
            b.textContent = r.texto;
            b.onclick = () => elegir(r);
            cont.appendChild(b);
        });
    }

    function elegir(respuesta) {
        respuesta.da.forEach(id => puntos[id]++);
        pregunta++;
        if (pregunta < PREGUNTAS.length) {
            mostrarPregunta();
        } else {
            terminar();
        }
    }

    function terminar() {
        // El personaje con más puntos; si hay empate, se elige uno al azar entre ellos
        const maximo = Math.max(...Object.values(puntos));
        const empatados = Object.keys(puntos).filter(id => puntos[id] === maximo);
        const id = empatados[Math.floor(Math.random() * empatados.length)];
        resultado = PERSONAJES[id];

        $("progreso").style.width = "100%";
        $("res-emoji").textContent = resultado.emoji;
        $("res-nombre").textContent = resultado.nombre;
        $("res-nombre").style.color = resultado.color;
        $("res-nombre").style.textShadow = `0 0 14px ${resultado.color}`;
        $("res-anime").textContent = resultado.anime;
        $("res-descripcion").textContent = resultado.descripcion;
        $("res-frase").textContent = `"${resultado.frase}"`;

        const rasgos = $("res-rasgos");
        rasgos.innerHTML = "";
        resultado.rasgos.forEach(r => {
            const span = document.createElement("span");
            span.textContent = r;
            rasgos.appendChild(span);
        });

        mostrarPantalla("resultado");
    }

    function compartir() {
        compartirPuntaje({
            juego: "¿Qué personaje de anime eres?",
            antes: "Soy...",
            emoji: resultado.emoji,
            grande: resultado.nombre,
            detalle: `${resultado.anime} · "${resultado.frase}"`,
            reto: "¿Y TÚ QUIÉN ERES? 👀",
            fondo: "portada-anime.jpg",
            boton: $("btn-compartir")
        });
    }

    $("btn-empezar").onclick = empezar;
    $("btn-otra").onclick = empezar;
    $("btn-compartir").onclick = compartir;
})();
