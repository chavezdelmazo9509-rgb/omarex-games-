// ==========================================================
//  🎨 Generador de títulos de OMAREX
//  {X} se cambia por el juego o anime que escribas.
//  Para agregar títulos, copia una línea dentro del momento que quieras.
// ==========================================================

const TIPOS = {
    juego: {
        nombre: "🎮 Videojuego",
        hashtags: ["#gaming", "#gamer", "#videojuegos"],
        momentos: {
            epico: {
                nombre: "😱 Jugada épica",
                hashtags: ["#epico", "#jugadaepica"],
                titulos: [
                    "Nadie esperaba esta jugada en {X} 😱",
                    "La mejor jugada que he hecho en {X} 🔥",
                    "Esto en {X} no debería ser posible 🤯",
                    "Mírala hasta el final... {X} 💀",
                    "Mis amigos no me creían esto en {X} 😳",
                    "¿Suerte o habilidad? {X} 🎯",
                    "Así se juega {X} 😎🔥",
                    "Momento épico en {X} que tienes que ver 👀"
                ]
            },
            fail: {
                nombre: "😂 Fail gracioso",
                hashtags: ["#fail", "#gracioso", "#humor"],
                titulos: [
                    "Mi peor momento en {X} 😂",
                    "Esto me pasa solo a mí en {X} 💀",
                    "Cuando {X} te odia 😭",
                    "No sé qué hice aquí... {X} 🤡",
                    "El fail más tonto de {X} 😂😂",
                    "POV: eres yo jugando {X} 💀",
                    "Iba ganando hasta que... {X} 😭",
                    "{X} me hizo esto y no lo supero 😂"
                ]
            },
            clutch: {
                nombre: "🏆 Clutch / remontada",
                hashtags: ["#clutch", "#remontada", "#victoria"],
                titulos: [
                    "1 contra todos en {X} 😤🔥",
                    "Lo daban por perdido... {X} 🏆",
                    "El clutch más loco de {X} 😱",
                    "Remontada imposible en {X} 💪",
                    "Gané con 1 de vida en {X} ❤️‍🔥",
                    "Esto es aguantar la presión en {X} 😎",
                    "Nadie apostaba por mí en {X} 🏆",
                    "Último en pie en {X} ⚔️"
                ]
            },
            top: {
                nombre: "🔝 Top / ranking",
                hashtags: ["#top5", "#ranking"],
                titulos: [
                    "Top 5 momentos de {X} que debes ver 🔥",
                    "Top 3 jugadas de la semana en {X} 🏆",
                    "Las 5 cosas que nadie sabe de {X} 🤫",
                    "Top 5 errores que todos cometen en {X} ❌",
                    "Mis 3 momentos favoritos de {X} ❤️",
                    "Ranking de las mejores jugadas en {X} 📊",
                    "Top 5 fails de {X} 😂",
                    "El número 1 te va a sorprender... {X} 😱"
                ]
            },
            tips: {
                nombre: "💡 Truco o tip",
                hashtags: ["#tips", "#trucos", "#tutorial"],
                titulos: [
                    "El truco de {X} que nadie te dice 🤫",
                    "Mejora en {X} con este tip 💡",
                    "Haz esto en {X} y gana más 🏆",
                    "Si juegas {X} tienes que saber esto 👀",
                    "Deja de hacer esto en {X} ❌",
                    "3 tips para dominar {X} 🔥",
                    "Así gano siempre en {X} 😎",
                    "Secreto de {X} revelado 🔓"
                ]
            },
            primera: {
                nombre: "🆕 Primera vez",
                hashtags: ["#primeravez", "#reaccion"],
                titulos: [
                    "Mi primera vez jugando {X} 😳",
                    "Probé {X} por primera vez y... 😱",
                    "¿Vale la pena {X}? Lo probé 🤔",
                    "Novato en {X}: así me fue 😂",
                    "Jugué {X} sin saber nada 💀",
                    "Mi primera partida de {X} fue un desastre 😭",
                    "Primeras impresiones de {X} 🎮",
                    "Empecé {X} hoy y esto pasó 👀"
                ]
            }
        }
    },
    anime: {
        nombre: "🎌 Anime",
        hashtags: ["#anime", "#otaku", "#animeedit"],
        momentos: {
            pelea: {
                nombre: "⚔️ Pelea épica",
                hashtags: ["#pelea", "#epico"],
                titulos: [
                    "La pelea más épica de {X} 🔥",
                    "Esta escena de {X} me dio escalofríos 🥶",
                    "Nadie olvida esta pelea de {X} ⚔️",
                    "El momento en que {X} se volvió legendario 👑",
                    "Animación de otro nivel en {X} 🤯",
                    "Si no viste esta pelea de {X}, no viste nada 😤",
                    "{X}: la escena que todos esperaban 😱",
                    "Piel de gallina con esta pelea de {X} 🔥"
                ]
            },
            triste: {
                nombre: "😭 Momento triste",
                hashtags: ["#triste", "#sad", "#llorar"],
                titulos: [
                    "La escena más triste de {X} 😭",
                    "Si no lloraste con esto de {X}, no tienes corazón 💔",
                    "{X} me rompió el corazón aquí 😢",
                    "Nadie estaba listo para esto en {X} 💔",
                    "El momento de {X} que nunca voy a olvidar 😭",
                    "Todavía me duele esta escena de {X} 🥲",
                    "{X} y el final que nos destruyó 😭",
                    "Prepárate para llorar con {X} 💧"
                ]
            },
            teoria: {
                nombre: "🤔 Teoría / opinión",
                hashtags: ["#teoria", "#opinion"],
                titulos: [
                    "La teoría de {X} que te va a volar la cabeza 🤯",
                    "Nadie se dio cuenta de esto en {X} 👀",
                    "Opinión impopular sobre {X} 😬",
                    "¿{X} está sobrevalorado? 🤔",
                    "El detalle de {X} que se te pasó 🔍",
                    "Esto cambia todo en {X} 😱",
                    "Lo que nadie te explicó de {X} 🧠",
                    "¿Tengo razón con {X}? Comenta 👇"
                ]
            },
            top: {
                nombre: "🔝 Top / ranking",
                hashtags: ["#top5", "#ranking"],
                titulos: [
                    "Top 5 momentos de {X} 🔥",
                    "Los 3 personajes más fuertes de {X} 💪",
                    "Top 5 escenas que marcaron {X} 🏆",
                    "Ranking de las peleas de {X} ⚔️",
                    "Top 3 momentos más tristes de {X} 😭",
                    "Mis personajes favoritos de {X} ❤️",
                    "Top 5 frases épicas de {X} 🗣️",
                    "El número 1 de {X} te va a sorprender 😱"
                ]
            },
            opening: {
                nombre: "🎵 Opening / música",
                hashtags: ["#opening", "#animeopening", "#musica"],
                titulos: [
                    "El mejor opening de {X} 🎵🔥",
                    "Este opening de {X} es una obra maestra 🎶",
                    "¿Cuál es tu opening favorito de {X}? 🎤",
                    "No puedo dejar de escuchar este opening de {X} 🔁",
                    "Si reconoces este opening de {X}, eres otaku 😎",
                    "El opening de {X} que todos se saben 🎵",
                    "Escalofríos con este opening de {X} 🥶",
                    "Opening de {X}: ¿10 de 10? 🎧"
                ]
            },
            personaje: {
                nombre: "⭐ Personaje favorito",
                hashtags: ["#personaje", "#waifu", "#husbando"],
                titulos: [
                    "Por qué es el mejor personaje de {X} 👑",
                    "El personaje de {X} que todos subestiman 😤",
                    "Mi personaje favorito de {X} ❤️",
                    "¿El personaje más fuerte de {X}? 💪",
                    "El mejor desarrollo de personaje en {X} 📈",
                    "Este personaje de {X} merecía más 😢",
                    "Nadie es tan genial como este personaje de {X} 😎",
                    "Si fueras de {X}, ¿quién serías? 👀"
                ]
            }
        }
    },
    pagina: {
        nombre: "🕹️ Mi página",
        hashtags: ["#OMAREXGames", "#minijuegos", "#juegosgratis"],
        momentos: {
            reto: {
                nombre: "🎯 Reto",
                hashtags: ["#reto", "#challenge"],
                titulos: [
                    "¿Me ganas en {X}? 🎮",
                    "Nadie ha superado mi récord en {X} 😎",
                    "Te reto a jugar {X} 🔥",
                    "Solo el 1% gana en {X} 😱",
                    "¿Cuántos puntos sacas en {X}? 👇",
                    "Reto: supera mi puntaje en {X} 🏆",
                    "Si ganas en {X}, eres un pro 😤",
                    "Juega {X} gratis y comenta tu puntaje 🎮"
                ]
            },
            record: {
                nombre: "🏆 Mi récord",
                hashtags: ["#record", "#nuevorecord"],
                titulos: [
                    "Nuevo récord en {X} 🏆🔥",
                    "Así llegué al Top 1 en {X} 👑",
                    "Mi mejor partida en {X} 😎",
                    "Batí mi propio récord en {X} 💪",
                    "Primer lugar en {X} 🥇",
                    "Esto es jugar perfecto en {X} 😤",
                    "¿Récord imposible en {X}? 🤯",
                    "Mi récord en {X}: ¿lo superas? 👀"
                ]
            },
            nuevo: {
                nombre: "🆕 Juego nuevo",
                hashtags: ["#nuevojuego", "#juegosgratis"],
                titulos: [
                    "Agregué un juego nuevo a mi página: {X} 🎮",
                    "{X} ya está disponible gratis 🔥",
                    "Hice {X} y lo puedes jugar gratis 😎",
                    "Nuevo minijuego en mi página: {X} 🕹️",
                    "Prueba {X}, el juego que hice yo 💻",
                    "{X}: mi nuevo juego, link en mi perfil 🔗",
                    "¿Te gusta el anime? Juega {X} 🎌",
                    "Lancé {X} y esto pasó 👀"
                ]
            },
            detras: {
                nombre: "💻 Cómo lo hice",
                hashtags: ["#programacion", "#desarrolloweb", "#html"],
                titulos: [
                    "Hice mi propio juego: {X} 💻",
                    "Así programé {X} desde cero 👨‍💻",
                    "De no saber nada a crear {X} 🚀",
                    "Aprendí a programar y creé {X} 🔥",
                    "Programando {X}: antes vs después 📈",
                    "Lo que aprendí haciendo {X} 🧠",
                    "Mi primer juego web: {X} 🎮",
                    "Creé {X} en mi página web 😎"
                ]
            }
        }
    }
};

const HASHTAGS_GENERALES = ["#fyp", "#parati", "#viral", "#OMAREX"];
const CLAVE_PLANIFICADOR = "planificadorTikTok";

let tipoElegido = "juego";
let momentoElegido = Object.keys(TIPOS.juego.momentos)[0];
let ultimosTitulos = [];

const $ = (id) => document.getElementById(id);

function mezclar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function avisar(texto) {
    const aviso = $("aviso");
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => aviso.classList.remove("visible"), 2000);
}

// "Rocket League" -> "#rocketleague"
function hashtagDe(nombre) {
    const limpio = nombre.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return limpio ? "#" + limpio : "";
}

// ====== Botones de tipo y momento ======
function dibujarChips() {
    const tipos = $("tipos");
    tipos.innerHTML = "";
    Object.entries(TIPOS).forEach(([id, t]) => {
        const b = document.createElement("button");
        b.textContent = t.nombre;
        b.className = id === tipoElegido ? "elegido" : "";
        b.onclick = () => {
            tipoElegido = id;
            momentoElegido = Object.keys(t.momentos)[0];
            $("nombre").placeholder = id === "anime" ? "Ej: Naruto, One Piece, Jujutsu Kaisen..."
                : id === "pagina" ? "Ej: Snake, Adivina el Anime, Adivina el Opening..."
                : "Ej: Fortnite, Rocket League, Minecraft...";
            dibujarChips();
        };
        tipos.appendChild(b);
    });

    const momentos = $("momentos");
    momentos.innerHTML = "";
    Object.entries(TIPOS[tipoElegido].momentos).forEach(([id, m]) => {
        const b = document.createElement("button");
        b.textContent = m.nombre;
        b.className = id === momentoElegido ? "elegido" : "";
        b.onclick = () => { momentoElegido = id; dibujarChips(); };
        momentos.appendChild(b);
    });
}

// ====== Generar ======
function generar() {
    let nombre = $("nombre").value.trim();
    if (!nombre) {
        if (tipoElegido === "pagina") {
            nombre = "OMAREX Games";
        } else {
            avisar("✏️ Escribe el nombre del juego o anime");
            $("nombre").focus();
            return;
        }
    }

    const tipo = TIPOS[tipoElegido];
    const momento = tipo.momentos[momentoElegido];

    // 5 títulos al azar: primero los que no salieron la vez pasada
    const nuevos = momento.titulos.filter(t => !ultimosTitulos.includes(t));
    const repetidos = momento.titulos.filter(t => ultimosTitulos.includes(t));
    const elegidos = [...mezclar(nuevos), ...mezclar(repetidos)].slice(0, 5);
    ultimosTitulos = elegidos;
    const titulos = elegidos.map(t => t.replaceAll("{X}", nombre));

    const hashtags = [...new Set([hashtagDe(nombre), ...tipo.hashtags, ...momento.hashtags, ...HASHTAGS_GENERALES].filter(Boolean))].join(" ");

    const invitacion = tipoElegido === "pagina"
        ? "🕹️ Juega gratis en mi página: link en mi perfil 🔗"
        : `🎮 Sígueme para más videos de ${nombre}.\n🕹️ Juega mis minijuegos gratis: link en mi perfil 🔗`;

    // Lista de títulos
    const cont = $("titulos");
    cont.innerHTML = "";
    titulos.forEach(titulo => {
        const fila = document.createElement("div");
        fila.className = "titulo";
        const texto = document.createElement("span");
        texto.textContent = titulo;

        const acciones = document.createElement("div");
        acciones.className = "acciones-titulo";

        const copiar = document.createElement("button");
        copiar.className = "copiar";
        copiar.textContent = "📋 Copiar";
        copiar.onclick = () => copiarTexto(titulo, copiar);

        const guardar = document.createElement("button");
        guardar.className = "chico";
        guardar.textContent = "➕ Planificador";
        guardar.title = "Guardar como idea en tu planificador";
        guardar.onclick = () => guardarEnPlanificador(titulo, hashtags, guardar);

        acciones.append(copiar, guardar);
        fila.append(texto, acciones);
        cont.appendChild(fila);
    });

    $("hashtags").textContent = hashtags;
    $("descripcion").textContent = `${titulos[0]}\n\n${invitacion}\n\n${hashtags}`;
    $("resultados").classList.remove("oculto");
}

// ====== Copiar ======
async function copiarTexto(texto, boton) {
    try {
        await navigator.clipboard.writeText(texto);
    } catch (e) {
        // Plan B para navegadores sin permiso al portapapeles
        const area = document.createElement("textarea");
        area.value = texto;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
    }
    if (boton) {
        const original = boton.textContent;
        boton.textContent = "✅ Copiado";
        boton.classList.add("listo");
        setTimeout(() => { boton.textContent = original; boton.classList.remove("listo"); }, 1500);
    }
}

// ====== Mandar al planificador (comparten el mismo navegador) ======
function guardarEnPlanificador(titulo, hashtags, boton) {
    let videos = [];
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE_PLANIFICADOR));
        if (Array.isArray(datos)) videos = datos;
    } catch (e) {}

    if (videos.some(v => v.titulo === titulo)) {
        avisar("👍 Esa idea ya está en tu planificador");
        return;
    }

    videos.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        estado: "idea",
        creadoEn: Date.now(),
        titulo: titulo.slice(0, 100),
        tipo: tipoElegido,
        plataforma: "tiktok",
        fecha: "",
        notas: "",
        hashtags: hashtags.slice(0, 200)
    });

    try {
        localStorage.setItem(CLAVE_PLANIFICADOR, JSON.stringify(videos));
        boton.textContent = "✅ Guardado";
        boton.disabled = true;
        avisar("➕ Guardado en tu planificador");
    } catch (e) {
        avisar("⚠️ No se pudo guardar en este navegador");
    }
}

// ====== Arranque ======
$("btn-generar").onclick = generar;
$("btn-otros").onclick = generar;
$("nombre").addEventListener("keydown", (e) => { if (e.key === "Enter") generar(); });
$("copiar-hashtags").onclick = (e) => copiarTexto($("hashtags").textContent, e.currentTarget);
$("copiar-descripcion").onclick = (e) => copiarTexto($("descripcion").textContent, e.currentTarget);
dibujarChips();
