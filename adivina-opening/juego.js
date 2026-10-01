// ==========================================================
//  🎵 Lógica del juego "Adivina el Opening"
//  (La lista de openings está en openings.js)
//  La música son las vistas previas oficiales de Apple Music.
// ==========================================================
(function () {
    const TOTAL_RONDAS = 10;
    const SEGUNDOS = 15;
    const ESPERA_AUDIO = 9000; // si una canción no suena en 9 s, se salta

    const $ = (id) => document.getElementById("op-" + id);
    const audio = new Audio();
    audio.preload = "auto";

    let preguntas = [];
    let ronda = 0;
    let aciertos = 0;
    let segundosTotales = 0;
    let tiempoRestante = SEGUNDOS;
    let temporizador = null;
    let esperaAudio = null;
    let respondida = false;
    let ultimoRango = "";
    const cache = {};

    // ====== Utilidades ======
    function normalizar(texto) {
        return String(texto || "").toLowerCase().normalize("NFD")
            .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
    }

    function mezclar(lista) {
        const copia = [...lista];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    function mostrarPantalla(nombre) {
        ["portada", "cargando", "juego", "final"].forEach(p => $(p).classList.add("anime-oculto"));
        $(nombre).classList.remove("anime-oculto");
    }

    // Un sonido en silencio para "despertar" el audio en iPhone con el primer toque
    function sonidoSilencio() {
        const muestras = 800;
        const buffer = new ArrayBuffer(44 + muestras * 2);
        const v = new DataView(buffer);
        const escribir = (pos, texto) => [...texto].forEach((c, i) => v.setUint8(pos + i, c.charCodeAt(0)));
        escribir(0, "RIFF"); v.setUint32(4, 36 + muestras * 2, true); escribir(8, "WAVE");
        escribir(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
        v.setUint32(24, 8000, true); v.setUint32(28, 16000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
        escribir(36, "data"); v.setUint32(40, muestras * 2, true);
        return URL.createObjectURL(new Blob([buffer], { type: "audio/wav" }));
    }
    const SILENCIO = sonidoSilencio();

    // ====== Buscar la canción en Apple Music (iTunes Search API) ======
    let contadorJsonp = 0;
    function jsonp(url, ms) {
        return new Promise((resolver, rechazar) => {
            const nombre = "__opening" + (++contadorJsonp);
            const script = document.createElement("script");
            const reloj = setTimeout(() => { limpiar(); rechazar(new Error("tiempo")); }, ms);
            function limpiar() {
                clearTimeout(reloj);
                window[nombre] = function () {}; // por si responde tarde
                script.remove();
            }
            window[nombre] = (datos) => { limpiar(); resolver(datos); };
            script.onerror = () => { limpiar(); rechazar(new Error("red")); };
            script.src = url + "&callback=" + nombre;
            document.head.appendChild(script);
        });
    }

    async function buscarCancion(op) {
        const llave = op.artista + "|" + op.cancion;
        if (llave in cache) return cache[llave];
        let encontrada = null;
        try {
            const url = "https://itunes.apple.com/search?media=music&entity=song&limit=15&term=" +
                encodeURIComponent(op.artista + " " + op.cancion);
            const datos = await jsonp(url, 7000);
            const delArtista = (datos.results || []).filter(r => r.previewUrl && normalizar(r.artistName).includes(op.clave));
            const inicioCancion = normalizar(op.cancion).slice(0, 5);
            const mejor = delArtista.find(r => normalizar(r.trackName).includes(inicioCancion)) || delArtista[0];
            if (mejor) {
                encontrada = {
                    ...op,
                    previewUrl: mejor.previewUrl,
                    enlace: mejor.trackViewUrl || "",
                    titulo: mejor.trackName,
                    artistaReal: mejor.artistName
                };
            }
        } catch (e) {
            console.log("No se encontró:", op.cancion, e.message);
        }
        cache[llave] = encontrada;
        return encontrada;
    }

    // Busca canciones de 4 en 4 hasta tener las 10 de la partida
    async function prepararCanciones() {
        const pendientes = mezclar(OPENINGS);
        const listas = [];
        while (listas.length < TOTAL_RONDAS && pendientes.length) {
            const grupo = pendientes.splice(0, 4);
            const resultados = await Promise.all(grupo.map(buscarCancion));
            resultados.forEach(r => { if (r && listas.length < TOTAL_RONDAS) listas.push(r); });
            $("cargando-texto").textContent = `🎧 Preparando canciones... ${listas.length}/${TOTAL_RONDAS}`;
        }
        return listas;
    }

    // ====== Partida ======
    async function empezar() {
        // Desbloquear el audio con este toque (necesario en celulares)
        audio.src = SILENCIO;
        audio.play().catch(() => {});

        mostrarPantalla("cargando");
        $("cargando-texto").textContent = "🎧 Preparando canciones...";
        preguntas = await prepararCanciones();

        if (preguntas.length < 4) {
            $("cargando-texto").textContent = "⚠️ No se pudo cargar la música. Revisa tu internet e intenta otra vez.";
            $("btn-reintentar").classList.remove("anime-oculto");
            return;
        }
        $("btn-reintentar").classList.add("anime-oculto");

        ronda = 0; aciertos = 0; segundosTotales = 0;
        $("aciertos").textContent = 0;
        mostrarPantalla("juego");
        siguienteRonda();
    }

    function siguienteRonda() {
        clearInterval(temporizador);
        temporizador = null;
        clearTimeout(esperaAudio);
        if (ronda >= preguntas.length) return terminar();

        const actual = preguntas[ronda];
        respondida = false;
        $("ronda").textContent = ronda + 1;
        $("total").textContent = preguntas.length;
        $("revelado").innerHTML = "";
        $("mensaje").textContent = "";
        $("estado-audio").textContent = "🎧 Cargando canción...";
        $("btn-escuchar").classList.add("anime-oculto");
        $("disco").classList.remove("girando");
        pintarTiempo(SEGUNDOS);

        // 1 respuesta correcta + 3 animes distintos al azar
        const otros = mezclar([...new Set(OPENINGS.map(o => o.anime))].filter(a => a !== actual.anime)).slice(0, 3);
        const cont = $("opciones");
        cont.innerHTML = "";
        mezclar([actual.anime, ...otros]).forEach(nombre => {
            const b = document.createElement("button");
            b.textContent = nombre;
            b.disabled = true; // se activan cuando empieza a sonar
            b.onclick = () => responder(b, nombre === actual.anime);
            cont.appendChild(b);
        });

        audio.src = actual.previewUrl;
        audio.currentTime = 0;
        audio.play().catch(() => {
            // El navegador pidió un toque para reproducir
            $("estado-audio").textContent = "";
            $("btn-escuchar").classList.remove("anime-oculto");
        });

        // Si no suena a tiempo, se salta esta canción
        esperaAudio = setTimeout(() => {
            if (!respondida && audio.paused) saltarCancion();
        }, ESPERA_AUDIO);
    }

    function saltarCancion() {
        clearInterval(temporizador);
        temporizador = null;
        clearTimeout(esperaAudio);
        audio.pause();
        $("mensaje").style.color = "#ffd23f";
        $("mensaje").textContent = "⚠️ Esa canción no cargó, ¡vamos con otra!";
        preguntas.splice(ronda, 1);
        setTimeout(siguienteRonda, 1200);
    }

    // Cuando la canción empieza a sonar, arranca el cronómetro
    audio.addEventListener("playing", () => {
        if (audio.src === SILENCIO || respondida || $("juego").classList.contains("anime-oculto")) return;
        clearTimeout(esperaAudio);
        $("estado-audio").textContent = "🎶 ¿De qué anime es?";
        $("btn-escuchar").classList.add("anime-oculto");
        $("disco").classList.add("girando");
        $("opciones").querySelectorAll("button").forEach(b => b.disabled = false);
        if (!temporizador) iniciarTiempo();
    });

    audio.addEventListener("error", () => {
        if (audio.src === SILENCIO || respondida || $("juego").classList.contains("anime-oculto")) return;
        saltarCancion();
    });

    function iniciarTiempo() {
        tiempoRestante = SEGUNDOS;
        temporizador = setInterval(() => {
            tiempoRestante -= 0.1;
            pintarTiempo(tiempoRestante);
            if (tiempoRestante <= 0) responder(null, false);
        }, 100);
    }

    function pintarTiempo(valor) {
        const porcentaje = Math.max(0, valor / SEGUNDOS * 100);
        const barra = $("tiempo-relleno");
        barra.style.width = porcentaje + "%";
        barra.style.background = porcentaje > 50 ? "#39ff14" : porcentaje > 25 ? "#ffd23f" : "#ff3b5c";
    }

    function responder(boton, esCorrecta) {
        if (respondida) return;
        respondida = true;
        clearInterval(temporizador);
        temporizador = null;
        const actual = preguntas[ronda];
        segundosTotales += SEGUNDOS - Math.max(0, tiempoRestante);

        $("opciones").querySelectorAll("button").forEach(b => {
            b.disabled = true;
            if (b.textContent === actual.anime) b.classList.add("correcta");
        });

        if (esCorrecta) {
            aciertos++;
            $("mensaje").style.color = "#39ff14";
            $("mensaje").textContent = "¡Correcto! 🎉";
        } else {
            if (boton) boton.classList.add("incorrecta");
            $("mensaje").style.color = "#ff3b5c";
            $("mensaje").textContent = boton ? `❌ Era ${actual.anime}` : `⏰ ¡Tiempo! Era ${actual.anime}`;
        }
        $("aciertos").textContent = aciertos;

        // Mostrar la canción (y su enlace a Apple Music)
        const rev = $("revelado");
        rev.innerHTML = "";
        rev.appendChild(document.createTextNode(`🎵 ${actual.titulo} — ${actual.artistaReal} `));
        if (actual.enlace) {
            const a = document.createElement("a");
            a.href = actual.enlace;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = "Escuchar en Apple Music ↗";
            rev.appendChild(a);
        }

        ronda++;
        setTimeout(siguienteRonda, 2600);
    }

    // ====== Fin ======
    function leerRecord() {
        try { return JSON.parse(localStorage.getItem("openingRecord")) || null; } catch (e) { return null; }
    }

    function terminar() {
        audio.pause();
        $("disco").classList.remove("girando");
        mostrarPantalla("final");
        const total = preguntas.length;
        $("final-aciertos").textContent = `${aciertos}/${total}`;
        $("final-detalle").textContent = `en ${segundosTotales.toFixed(1)} segundos`;

        const porcentaje = aciertos / total;
        let rango = "🎧 Oído novato";
        if (porcentaje >= 0.4) rango = "🎤 Fan de los openings";
        if (porcentaje >= 0.7) rango = "🎸 Melómano otaku";
        if (porcentaje >= 0.9) rango = "👑 DJ del anime";
        if (aciertos === total) rango = "🐉 ¡OÍDO LEGENDARIO!";
        $("rango").textContent = rango;
        ultimoRango = rango;

        // Récord: más aciertos; si empata, menos segundos
        const record = leerRecord();
        const nuevo = { aciertos, total, segundos: Math.round(segundosTotales * 10) / 10 };
        const esMejor = !record || nuevo.aciertos > record.aciertos ||
            (nuevo.aciertos === record.aciertos && nuevo.segundos < record.segundos);
        if (esMejor && aciertos > 0) {
            try { localStorage.setItem("openingRecord", JSON.stringify(nuevo)); } catch (e) {}
            $("nuevo-record").textContent = "🏆 ¡NUEVO RÉCORD!";
        } else {
            $("nuevo-record").textContent = record ? `Récord: ${record.aciertos}/${record.total} en ${record.segundos} s` : "";
        }
        pintarRecord();
    }

    function pintarRecord() {
        const r = leerRecord();
        $("record").textContent = r ? `${r.aciertos}/${r.total} en ${r.segundos} s` : "—";
    }

    function compartir() {
        compartirPuntaje({
            juego: "Adivina el Opening",
            grande: `${aciertos}/${preguntas.length}`,
            detalle: `en ${segundosTotales.toFixed(1)} segundos · ${ultimoRango}`,
            fondo: "portada-anime.jpg",
            boton: $("btn-compartir")
        });
    }

    // ====== Botones ======
    $("btn-empezar").onclick = empezar;
    $("btn-reintentar").onclick = empezar;
    $("btn-otra").onclick = empezar;
    $("btn-compartir").onclick = compartir;
    $("btn-escuchar").onclick = () => audio.play().catch(() => {});
    $("btn-repetir").onclick = () => { if (!respondida) { audio.currentTime = 0; audio.play().catch(() => {}); } };
    $("volumen").oninput = (e) => { audio.volume = Number(e.target.value); };
    audio.volume = Number($("volumen").value);
    pintarRecord();
})();
