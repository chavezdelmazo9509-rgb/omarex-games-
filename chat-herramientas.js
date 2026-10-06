// ==========================================================
//  💬 Lo que dice el chat de las HERRAMIENTAS (planificador y generador)
//  (respuestas preparadas + IA)
//
//  Para agregar una respuesta, copia un bloque { ... }, cambia:
//    id          un nombre corto sin espacios
//    chip        el texto del botoncito (opcional)
//    claves      palabras que activan la respuesta (en minúsculas)
//    respuesta   lo que contesta. [texto](enlace) crea un enlace
//    sugerencias botones que salen después (ids de otras respuestas)
//  Cada bloque termina con coma.
// ==========================================================
OmarexChat.iniciar({
    titulo: "🛠️ Ayuda de las herramientas",
    lado: "derecha",
    etiquetaBoton: "Abrir chat de ayuda",
    aviso: "🤖 Asistente automático con IA, no una persona. Puede equivocarse. No escribas datos personales: lo que no esté en mis respuestas preparadas se envía a Google para generar la respuesta.",

    // Respuestas con IA cuando la pregunta no está en la lista de abajo
    ia: { url: "https://omarex-puntajes-server.onrender.com/chat", sitio: "herramientas" },

    tema: { fondo: "#0d0d1a", texto: "#e0e0ff", burbuja: "#1e1e3d", acento: "#39ff14", sobreAcento: "#0d0d1a", linea: "#3a3a6e", enlace: "#ff2ec4" },

    saludo: "¡Hola! 👋 Soy el asistente (con IA) de las herramientas para creadores de OMAREX: el planificador de TikToks y el generador de títulos. ¿En qué te ayudo?",
    noEntendi: "No estoy seguro de haber entendido 😅. Puedo fallar. Prueba con un botón o escríbele a Omar en [TikTok @omarex690](https://www.tiktok.com/@omarex690).",

    inicio: ["planificador", "generador", "datos", "copia"],

    intenciones: [
        {
            id: "saludo",
            claves: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos"],
            respuesta: "¡Hola! 😊 ¿Te ayudo con el planificador o con el generador de títulos?",
            sugerencias: ["planificador", "generador", "datos"]
        },
        {
            id: "planificador",
            chip: "📋 ¿Cómo uso el planificador?",
            claves: ["planificador", "planificar", "tablero", "columnas", "estados", "como uso el planificador"],
            respuesta: "El planificador 📋 ordena tus videos en 4 columnas: 💡 Idea → 🎬 Grabado → ✂️ Editado → ✅ Subido.\n1. Toca ➕ Nueva idea y escribe el título (lo demás es opcional).\n2. Cuando avances, mueve la tarjeta con los botones de la tarjeta.\n3. Al marcarla como subida, suma a tu 🎯 meta de la semana.\nSi no sabes qué grabar, usa 🎲 Idea al azar.",
            sugerencias: ["nueva", "meta", "datos", "generador"]
        },
        {
            id: "nueva",
            chip: "➕ Crear una idea",
            claves: ["nueva idea", "crear", "agregar", "anadir", "editar", "borrar", "eliminar", "tarjeta", "fecha", "notas", "mover", "avanzar"],
            respuesta: "Para crear una idea ➕ toca Nueva idea. Escribes el título y, si quieres, eliges el tipo (videojuego, anime, mi página u otro), dónde la subirás (TikTok, YouTube, Shorts o todas), la fecha, notas (guion, clips, música) y hashtags.\nPara editar o borrar, toca el ✏️ de la tarjeta (el botón 🗑️ Borrar está dentro de esa ventana). Para cambiar de columna, usa los botones de avanzar y retroceder de la tarjeta.",
            sugerencias: ["meta", "azar", "datos"]
        },
        {
            id: "meta",
            claves: ["meta", "meta de la semana", "objetivo", "barra", "semana", "cuantos videos"],
            respuesta: "La 🎯 meta de la semana es cuántos videos quieres subir. Elige el número arriba (de 1 a 14) y la barra se llena cada vez que mueves un video a ✅ Subido. Se cuenta por semana.",
            sugerencias: ["planificador", "nueva"]
        },
        {
            id: "azar",
            claves: ["idea al azar", "azar", "no se que grabar", "no tengo ideas", "sin ideas", "inspiracion", "aleatoria", "dado"],
            respuesta: "El botón 🎲 Idea al azar te propone una idea lista (por ejemplo un top de anime o un reto de tus juegos) con sus hashtags. Si te gusta, la guardas en el tablero; si no, vuelve a tocarlo.",
            sugerencias: ["generador", "nueva"]
        },
        {
            id: "generador",
            chip: "🎨 ¿Cómo uso el generador?",
            claves: ["generador", "generar", "titulo", "titulos", "hashtags", "descripcion", "otros titulos", "tipo de video", "momento"],
            respuesta: "El generador 🎨 crea títulos, hashtags y descripción para tus videos:\n1. Elige de qué es tu video (videojuego, anime o mi página).\n2. Escribe qué juego o anime.\n3. Elige qué pasa (momento épico, fail, clutch, top, tip...).\n4. Toca ✨ Generar títulos.\nSi no te convence, usa 🎲 Otros títulos. Con 📋 Copiar lo pegas donde quieras.",
            sugerencias: ["alplanificador", "copiar", "planificador"]
        },
        {
            id: "alplanificador",
            chip: "➕ Del generador al planificador",
            claves: ["al planificador", "mandar al planificador", "pasar al planificador", "guardar titulo", "conectados", "conectar"],
            respuesta: "Cada título del generador tiene un botón ➕ Planificador: lo guarda como una idea nueva (con sus hashtags) en tu tablero. Luego lo ves en la página del [planificador](../planificador/).",
            sugerencias: ["generador", "planificador"]
        },
        {
            id: "copiar",
            claves: ["copiar", "pegar", "portapapeles", "no copia", "no se copia"],
            respuesta: "El botón 📋 Copiar copia el título, los hashtags o la descripción para que los pegues en TikTok o YouTube. Si no copia, el navegador puede estar bloqueando el portapapeles: selecciona el texto con el dedo o el mouse y cópialo a mano.",
            sugerencias: ["generador", "alplanificador"]
        },
        {
            id: "datos",
            chip: "🔒 ¿Dónde se guardan mis ideas?",
            claves: ["donde se guardan", "se guardan", "guardado", "privacidad", "privado", "datos", "cuenta", "seguro", "localstorage", "navegador"],
            respuesta: "Tus ideas se guardan solo en este navegador de este dispositivo 🔒: no hay cuenta ni servidor. Por eso no las ve nadie más… y también por eso, si borras los datos del navegador, usas otro navegador o el modo incógnito, no las verás. Para protegerlas o pasarlas a otro aparato, usa 💾 Guardar copia.",
            sugerencias: ["copia", "perdi"]
        },
        {
            id: "copia",
            chip: "💾 Guardar y cargar copia",
            claves: ["copia", "guardar copia", "cargar copia", "respaldo", "backup", "exportar", "importar", "otro dispositivo", "otro celular", "otro telefono", "otra pc", "otra computadora", "pasar a otro", "pasar mis ideas", "pasar las ideas", "paso las ideas", "paso mis ideas", "celular y pc", "archivo"],
            respuesta: "Para pasar tus ideas a otro dispositivo 💾:\n1. En el planificador toca 💾 Guardar copia: se descarga un archivo .json.\n2. Envíatelo (por ejemplo por Drive o WhatsApp).\n3. En el otro dispositivo abre el planificador y toca 📂 Cargar copia y elige ese archivo.\nHaz una copia de vez en cuando por seguridad.",
            sugerencias: ["datos", "perdi"]
        },
        {
            id: "perdi",
            chip: "😟 No veo mis ideas",
            claves: ["perdi", "se perdieron", "desaparecieron", "no veo mis ideas", "no aparecen", "vacio", "borraron", "no esta mi", "donde estan"],
            respuesta: "Si no ves tus ideas 😟 revisa:\n• ¿Es el mismo navegador y dispositivo donde las creaste? Se guardan solo ahí.\n• ¿Estás en modo incógnito? Ahí no se conservan.\n• ¿Borraste los datos del navegador (cookies y datos de sitios)? Eso las elimina.\nSi tenías una copia, recupérala con 📂 Cargar copia.",
            sugerencias: ["copia", "datos"]
        },
        {
            id: "juegos",
            claves: ["juegos", "jugar", "minijuegos", "omarex games", "snake", "adivina el anime", "adivina el opening"],
            respuesta: "Los minijuegos de Omar están en la página principal: [OMAREX Games](../#jugar). Ahí hay Memoria, Snake, Adivina el Anime, Adivina el Opening y un test de personaje.",
            sugerencias: ["planificador", "generador"]
        },
        {
            id: "creador",
            claves: ["creador", "quien hizo", "quien creo", "quien lo hizo", "omar", "omarex", "autor", "desarrollador", "tiktok", "youtube", "contacto", "contactar", "escribir"],
            respuesta: "Estas herramientas las hizo Omar, creador de contenido gamer y desarrollador web 👤, con ayuda de IA (Claude): él definió las ideas y el diseño, las probó y las publicó. Puedes seguirlo en [TikTok @omarex690](https://www.tiktok.com/@omarex690) o [YouTube @omarex_official](https://www.youtube.com/@omarex_official).",
            sugerencias: ["planificador", "generador"]
        },
        {
            id: "ia",
            claves: ["eres una persona", "eres humano", "eres un robot", "eres una ia", "eres ia", "inteligencia artificial", "chatgpt", "bot", "robot", "quien eres", "que eres"],
            respuesta: "Soy un asistente automático 🤖, no una persona. Respondo con textos preparados y, si tu duda no está en ellos, uso una IA (un modelo de Google) que puede equivocarse.",
            sugerencias: ["planificador", "generador"]
        },
        {
            id: "gracias",
            claves: ["gracias", "genial", "perfecto", "excelente", "chao", "adios", "hasta luego"],
            respuesta: "¡De nada! 😄 ¡Mucho éxito con tus videos! 🎬"
        }
    ]
});
