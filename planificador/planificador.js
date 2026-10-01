// ==========================================================
//  📋 Planificador de TikToks de OMAREX
//  Todo se guarda en el navegador (localStorage).
// ==========================================================

const ESTADOS = [
    { id: "idea",    nombre: "💡 Idea",    color: "#ffd23f" },
    { id: "grabado", nombre: "🎬 Grabado", color: "#5fa8d3" },
    { id: "editado", nombre: "✂️ Editado", color: "#ff2ec4" },
    { id: "subido",  nombre: "✅ Subido",  color: "#39ff14" }
];

const TIPOS = { juego: "🎮 Juego", anime: "🎌 Anime", pagina: "🕹️ Mi página", otro: "✨ Otro" };
const PLATAFORMAS = { tiktok: "📱 TikTok", youtube: "▶️ YouTube", shorts: "⚡ Shorts", todas: "🌐 Todas" };

// Ideas para el botón 🎲 (puedes agregar más copiando una línea)
const IDEAS_AL_AZAR = [
    { titulo: "Top 5 momentos épicos de la semana en Fortnite", tipo: "juego", hashtags: "#fortnite #gaming #top5" },
    { titulo: "Jugada imposible en Rocket League 🤯", tipo: "juego", hashtags: "#rocketleague #gaming #epico" },
    { titulo: "Mi peor partida de CS2 😂", tipo: "juego", hashtags: "#cs2 #counterstrike #fails" },
    { titulo: "Apex Legends: clutch 1 contra 3", tipo: "juego", hashtags: "#apexlegends #clutch #gaming" },
    { titulo: "El momento más triste del anime 😭", tipo: "anime", hashtags: "#anime #triste #otaku" },
    { titulo: "Top 3 peleas más épicas del anime", tipo: "anime", hashtags: "#anime #peleas #top3" },
    { titulo: "Este opening es el mejor de todos 🔥", tipo: "anime", hashtags: "#anime #opening #otaku" },
    { titulo: "Personaje que todos subestiman", tipo: "anime", hashtags: "#anime #personajes #otaku" },
    { titulo: "Escena de anime que me dio escalofríos", tipo: "anime", hashtags: "#anime #epico #escalofrios" },
    { titulo: "¿Qué personaje de anime eres? Haz el test 👀", tipo: "pagina", hashtags: "#anime #test #OMAREXGames" },
    { titulo: "¿Me ganas en Adivina el Anime? 🎌", tipo: "pagina", hashtags: "#anime #reto #OMAREXGames" },
    { titulo: "Récord en mi propio Snake 🐍 ¿Lo superas?", tipo: "pagina", hashtags: "#snake #reto #OMAREXGames" },
    { titulo: "Hice mis propios juegos en mi página web 💻", tipo: "pagina", hashtags: "#programacion #juegos #OMAREXGames" },
    { titulo: "Antes vs ahora: cómo juego después de 1 año", tipo: "juego", hashtags: "#gaming #antesydespues" },
    { titulo: "Reacciono a mi primer video 😅", tipo: "otro", hashtags: "#youtuber #reaccion" }
];

const CLAVE = "planificadorTikTok";
const CLAVE_META = "planificadorMeta";

let videos = cargar();
let editandoId = null;

// ====== Guardar y cargar ======
function cargar() {
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE));
        return Array.isArray(datos) ? datos : [];
    } catch (e) {
        return [];
    }
}

function guardar() {
    try {
        localStorage.setItem(CLAVE, JSON.stringify(videos));
    } catch (e) {
        avisar("⚠️ No se pudo guardar en este navegador");
    }
}

// ====== Utilidades ======
const $ = (id) => document.getElementById(id);

function nuevoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function avisar(texto) {
    const aviso = $("aviso");
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => aviso.classList.remove("visible"), 2200);
}

function hoyTexto() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function fechaBonita(texto) {
    const [a, m, d] = texto.split("-").map(Number);
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${d} ${meses[m - 1]}`;
}

// Lunes de esta semana a las 00:00
function inicioSemana() {
    const d = new Date();
    const dia = (d.getDay() + 6) % 7; // lunes = 0
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - dia);
    return d.getTime();
}

function crearElemento(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
}

// ====== Dibujar el tablero ======
function dibujar() {
    const tablero = $("tablero");
    tablero.innerHTML = "";
    const hoy = hoyTexto();

    ESTADOS.forEach((estado, i) => {
        const columna = crearElemento("section", "columna");
        columna.style.setProperty("--color-col", estado.color);

        const lista = videos.filter(v => v.estado === estado.id);
        // Los que tienen fecha más cercana primero
        lista.sort((a, b) => (a.fecha || "9999").localeCompare(b.fecha || "9999"));

        const titulo = crearElemento("h2", "", estado.nombre);
        titulo.appendChild(crearElemento("span", "contador", lista.length));
        columna.appendChild(titulo);

        if (lista.length === 0) {
            columna.appendChild(crearElemento("div", "vacio", i === 0 ? "Toca ➕ Nueva idea o 🎲 para empezar" : "Nada por aquí todavía"));
        }

        lista.forEach(v => {
            const t = crearElemento("article", "tarjeta");
            t.appendChild(crearElemento("div", "tarjeta-titulo", v.titulo));

            const etiquetas = crearElemento("div", "etiquetas");
            etiquetas.appendChild(crearElemento("span", "etiqueta", TIPOS[v.tipo] || TIPOS.otro));
            etiquetas.appendChild(crearElemento("span", "etiqueta", PLATAFORMAS[v.plataforma] || PLATAFORMAS.tiktok));
            if (v.fecha) {
                const atrasada = v.estado !== "subido" && v.fecha < hoy;
                const fecha = crearElemento("span", "etiqueta fecha" + (atrasada ? " atrasada" : ""),
                    (atrasada ? "⏰ " : "📅 ") + (v.fecha === hoy ? "Hoy" : fechaBonita(v.fecha)));
                etiquetas.appendChild(fecha);
            }
            t.appendChild(etiquetas);

            if (v.notas) t.appendChild(crearElemento("div", "tarjeta-notas", v.notas));
            if (v.hashtags) t.appendChild(crearElemento("div", "tarjeta-hashtags", v.hashtags));

            const acciones = crearElemento("div", "acciones");
            const atras = crearElemento("button", "", "◀");
            atras.title = "Volver al paso anterior";
            atras.disabled = i === 0;
            atras.onclick = () => mover(v.id, -1);

            const editar = crearElemento("button", "", "✏️");
            editar.title = "Editar";
            editar.onclick = () => abrirVentana(v.id);

            const avanzar = crearElemento("button", "avanzar", i < ESTADOS.length - 1 ? ESTADOS[i + 1].nombre + " ▶" : "🎉 ¡Listo!");
            avanzar.title = "Pasar al siguiente paso";
            avanzar.disabled = i === ESTADOS.length - 1;
            avanzar.onclick = () => mover(v.id, 1);

            acciones.append(atras, editar, avanzar);
            t.appendChild(acciones);
            columna.appendChild(t);
        });

        tablero.appendChild(columna);
    });

    dibujarMeta();
}

function dibujarMeta() {
    let meta = 3;
    try { meta = Number(localStorage.getItem(CLAVE_META)) || 3; } catch (e) {}
    $("meta-numero").value = String(meta);

    const desde = inicioSemana();
    const hechos = videos.filter(v => v.estado === "subido" && v.subidoEn >= desde).length;
    $("meta-hechos").textContent = hechos;
    $("meta-relleno").style.width = Math.min(100, hechos / meta * 100) + "%";
    $("meta-emoji").textContent = hechos >= meta ? "🏆 ¡Meta cumplida!" : "";
}

// ====== Mover entre columnas ======
function mover(id, paso) {
    const v = videos.find(x => x.id === id);
    if (!v) return;
    const i = ESTADOS.findIndex(e => e.id === v.estado);
    const nuevo = Math.max(0, Math.min(ESTADOS.length - 1, i + paso));
    v.estado = ESTADOS[nuevo].id;
    if (v.estado === "subido") {
        v.subidoEn = Date.now();
        avisar("🎉 ¡Video subido! Sigue así");
    } else {
        delete v.subidoEn;
    }
    guardar();
    dibujar();
}

// ====== Ventana para crear / editar ======
function abrirVentana(id, datosIniciales) {
    editandoId = id || null;
    const v = id ? videos.find(x => x.id === id) : (datosIniciales || {});
    $("ventana-titulo").textContent = id ? "✏️ Editar video" : "➕ Nueva idea";
    $("campo-titulo").value = v.titulo || "";
    $("campo-tipo").value = v.tipo || "juego";
    $("campo-plataforma").value = v.plataforma || "tiktok";
    $("campo-fecha").value = v.fecha || "";
    $("campo-notas").value = v.notas || "";
    $("campo-hashtags").value = v.hashtags || "";
    $("btn-borrar").style.display = id ? "inline-block" : "none";
    $("fondo-ventana").classList.add("abierta");
    setTimeout(() => $("campo-titulo").focus(), 50);
}

function cerrarVentana() {
    $("fondo-ventana").classList.remove("abierta");
    editandoId = null;
}

$("formulario").addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = {
        titulo: $("campo-titulo").value.trim(),
        tipo: $("campo-tipo").value,
        plataforma: $("campo-plataforma").value,
        fecha: $("campo-fecha").value,
        notas: $("campo-notas").value.trim(),
        hashtags: $("campo-hashtags").value.trim()
    };
    if (!datos.titulo) return;

    if (editandoId) {
        Object.assign(videos.find(x => x.id === editandoId), datos);
        avisar("✅ Cambios guardados");
    } else {
        videos.push({ id: nuevoId(), estado: "idea", creadoEn: Date.now(), ...datos });
        avisar("💡 Idea agregada");
    }
    guardar();
    cerrarVentana();
    dibujar();
});

$("btn-borrar").onclick = () => {
    if (!editandoId) return;
    if (!confirm("¿Seguro que quieres borrar este video?")) return;
    videos = videos.filter(x => x.id !== editandoId);
    guardar();
    cerrarVentana();
    dibujar();
    avisar("🗑️ Video borrado");
};

$("btn-cancelar").onclick = cerrarVentana;
$("fondo-ventana").addEventListener("click", (e) => { if (e.target.id === "fondo-ventana") cerrarVentana(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarVentana(); });

// ====== Botones de arriba ======
$("btn-nueva").onclick = () => abrirVentana();

$("btn-azar").onclick = () => {
    const idea = IDEAS_AL_AZAR[Math.floor(Math.random() * IDEAS_AL_AZAR.length)];
    abrirVentana(null, { ...idea, plataforma: "tiktok" });
};

$("meta-numero").onchange = () => {
    try { localStorage.setItem(CLAVE_META, $("meta-numero").value); } catch (e) {}
    dibujarMeta();
};

// Guardar una copia en un archivo (para pasarla a otro dispositivo)
$("btn-exportar").onclick = () => {
    const blob = new Blob([JSON.stringify({ app: "planificador-omarex", version: 1, videos }, null, 2)], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "planificador-omarex-" + hoyTexto() + ".json";
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    avisar("💾 Copia descargada");
};

// Cargar una copia desde un archivo
$("btn-importar").onclick = () => $("archivo-importar").click();
$("archivo-importar").onchange = async (e) => {
    const archivo = e.target.files[0];
    e.target.value = "";
    if (!archivo) return;
    try {
        const datos = JSON.parse(await archivo.text());
        const lista = Array.isArray(datos) ? datos : datos.videos;
        if (!Array.isArray(lista)) throw new Error("formato");
        const limpios = lista
            .filter(v => v && typeof v.titulo === "string" && v.titulo.trim())
            .map(v => ({
                id: String(v.id || nuevoId()),
                titulo: String(v.titulo).slice(0, 100),
                estado: ESTADOS.some(s => s.id === v.estado) ? v.estado : "idea",
                tipo: TIPOS[v.tipo] ? v.tipo : "otro",
                plataforma: PLATAFORMAS[v.plataforma] ? v.plataforma : "tiktok",
                fecha: /^\d{4}-\d{2}-\d{2}$/.test(v.fecha || "") ? v.fecha : "",
                notas: String(v.notas || "").slice(0, 1000),
                hashtags: String(v.hashtags || "").slice(0, 200),
                creadoEn: Number(v.creadoEn) || Date.now(),
                ...(v.estado === "subido" && v.subidoEn ? { subidoEn: Number(v.subidoEn) } : {})
            }));
        if (!confirm(`Se cargarán ${limpios.length} videos y se reemplazará lo que tienes ahora. ¿Continuar?`)) return;
        videos = limpios;
        guardar();
        dibujar();
        avisar(`📂 ${limpios.length} videos cargados`);
    } catch (err) {
        alert("Ese archivo no es una copia del planificador.");
    }
};

dibujar();
