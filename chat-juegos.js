// ==========================================================
//  💬 Lo que dice el chat de OMAREX GAMES (respuestas preparadas + IA)
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
    titulo: "🎮 Ayuda de OMAREX Games",
    lado: "derecha",
    etiquetaBoton: "Abrir chat de ayuda",
    aviso: "🤖 Asistente automático con IA, no una persona. Puede equivocarse. No escribas datos personales: lo que no esté en mis respuestas preparadas se envía a Google para generar la respuesta.",

    // Respuestas con IA cuando la pregunta no está en la lista de abajo
    ia: { url: "https://omarex-puntajes-server.onrender.com/chat", sitio: "juegos" },

    tema: { fondo: "#0d0d1a", texto: "#e0e0ff", burbuja: "#1e1e3d", acento: "#39ff14", sobreAcento: "#0d0d1a", linea: "#3a3a6e", enlace: "#ff2ec4" },

    saludo: "¡Hola! 👋 Soy el asistente de OMAREX Games. Te ayudo con los juegos, los Top 10 y más. ¿Qué quieres saber?",
    noEntendi: "No estoy seguro de haber entendido 😅. Soy un asistente con respuestas preparadas y puedo fallar. Prueba con un botón, o escríbele al creador en [TikTok @omarex690](https://www.tiktok.com/@omarex690).",

    inicio: ["recomendar", "top10", "compartir", "creador"],

    intenciones: [
        {
            id: "saludo",
            claves: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos"],
            respuesta: "¡Hola! 😊 ¿Te ayudo a elegir un juego o con algún problema?",
            sugerencias: ["recomendar", "top10", "audio"]
        },
        {
            id: "recomendar",
            chip: "🎯 ¿Qué juego juego?",
            claves: ["recomienda", "recomiendas", "recomendar", "recomendacion", "cual juego", "que juego juego", "que juego me", "por donde empiezo", "empezar", "sugerencia", "aburrido", "no se que jugar", "que juegos hay", "que juegos tienen", "cuantos juegos"],
            respuesta: "Depende de lo que te guste 🎯\n• Anime: Adivina el Anime, Adivina el Opening o el test de personaje.\n• Reflejos: Snake 🐍\n• Relajarte y concentrarte: Memoria 🧠\n• Curiosidad: ¿Qué personaje de anime eres?\nTodos están en [Jugar ahora](#jugar).",
            sugerencias: ["anime", "snake", "memoria", "quiz"]
        },
        {
            id: "memoria",
            chip: "🧠 Memoria",
            claves: ["memoria", "cartas", "parejas", "emoji"],
            respuesta: "Memoria 🧠: tocas ▶ Jugar y se muestran las cartas unos segundos para memorizarlas. Después se tapan y tienes un límite de 15 movimientos para encontrar las 8 parejas. Si ganas, puedes guardar tu nombre en el Top 10, que se guarda solo en tu navegador.",
            sugerencias: ["top10", "compartir", "recomendar"]
        },
        {
            id: "snake",
            chip: "🐍 Snake",
            claves: ["snake", "serpiente", "culebra", "diamante", "turbo", "ladrillo", "flechas"],
            respuesta: "Snake 🐍: muévete con las flechas o con W A S D (en celular, con los botones de abajo). Come los puntos verdes para crecer. Los diamantes 💎 dan +50 puntos y 5 segundos de turbo. Si llegas a un borde, apareces del otro lado, pero no choques contigo mismo ni con los ladrillos 🧱.",
            sugerencias: ["top10", "compartir", "celular"]
        },
        {
            id: "anime",
            chip: "🎌 Adivina el Anime",
            claves: ["adivina el anime", "emojis", "anime", "pista", "racha", "adivinar"],
            respuesta: "Adivina el Anime 🎌: son 10 rondas con emojis y 4 opciones, con 15 segundos por ronda. Si respondes rápido y aciertas seguido, la racha multiplica tus puntos (hasta ×5). Puedes pedir una 💡 pista, pero vale la mitad de puntos. Al final puedes entrar al Top 10 de los reales otakus.",
            sugerencias: ["top10", "opening", "compartir"]
        },
        {
            id: "opening",
            chip: "🎵 Adivina el Opening",
            claves: ["opening", "openings", "cancion", "canciones", "musica", "adivina el opening"],
            respuesta: "Adivina el Opening 🎵: suena un pedazo de un opening de anime y eliges de qué anime es (10 canciones, 15 segundos cada una). La música son vistas previas de Apple Music, y al responder ves la canción con un enlace para escucharla completa. Si no escuchas nada, mira la ayuda de sonido.",
            sugerencias: ["audio", "compartir", "anime"]
        },
        {
            id: "quiz",
            chip: "⚔️ Test de personaje",
            claves: ["test", "personaje", "quien soy", "que personaje", "goku", "naruto", "luffy", "gojo"],
            respuesta: "¿Qué personaje de anime eres? ⚔️: respondes 6 preguntas rápidas y te dice cuál de 8 personajes eres (Goku, Naruto, Luffy, Levi, Tanjiro, Gojo, Light o Anya). Al final puedes compartir tu resultado como imagen.",
            sugerencias: ["compartir", "recomendar", "anime"]
        },
        {
            id: "top10",
            chip: "🏆 Top 10",
            claves: ["top 10", "top10", "ranking", "puntaje", "puntajes", "marcador", "record", "aparecer", "guardar nombre", "mejores"],
            respuesta: "Top 10 🏆\n• Snake y Adivina el Anime tienen un Top 10 compartido: lo ven todos. En el de anime gana quien acierta más y, si empatan, el más rápido.\n• Memoria guarda su Top 10 solo en tu navegador.\n• Adivina el Opening guarda tu récord solo en tu navegador. El test de personaje no tiene puntaje.\nPara aparecer, escribe tu nombre cuando termines la partida y toca Guardar.",
            sugerencias: ["top10falla", "compartir", "recomendar"]
        },
        {
            id: "top10falla",
            chip: "⏳ El Top 10 no carga",
            claves: ["top 10 no carga", "top no carga", "no carga el top", "no me carga", "carga el top", "no carga", "no cargo", "cargando", "no aparece", "no sale", "tarda", "tarda mucho", "lento", "error", "no se pudo cargar", "no se guarda", "desaparecio", "vacio"],
            respuesta: "El servidor de los Top 10 es gratuito y se \"duerme\" cuando nadie lo usa 😴. Al despertar puede tardar cerca de un minuto. La página lo intenta 4 veces sola; si dice que no pudo, espera un momento y recarga con Ctrl + F5. Si guardaste tu puntaje y no ves tu nombre, vuelve a intentarlo.",
            sugerencias: ["top10", "creador"]
        },
        {
            id: "compartir",
            chip: "📤 Compartir mi puntaje",
            claves: ["compartir", "compartirlo", "imagen", "tiktok", "historia", "publicar", "subir mi puntaje", "captura"],
            respuesta: "Al terminar cada juego aparece el botón 📤 Compartir mi puntaje. Crea una imagen vertical (formato TikTok) con tu resultado, un reto y el enlace de la página. En celular se abre el menú para compartirla; en computadora se descarga la imagen. Si no ves el botón, termina una partida primero.",
            sugerencias: ["top10", "recomendar", "creador"]
        },
        {
            id: "audio",
            chip: "🔊 No suena la música",
            claves: ["sonido", "audio", "no suena", "no escucho", "no se escucha", "volumen", "silencio", "mudo", "sin sonido"],
            respuesta: "Si no escuchas la música del Adivina el Opening 🔊:\n• Sube el volumen del dispositivo y el control de volumen del juego.\n• Si aparece el botón \"Tocar para escuchar\", tócalo (algunos navegadores piden un toque).\n• Revisa que la pestaña no esté silenciada.\n• Necesitas internet. Si una canción no carga, el juego la salta solo.",
            sugerencias: ["opening", "celular"]
        },
        {
            id: "celular",
            chip: "📱 ¿Funciona en celular?",
            claves: ["celular", "movil", "telefono", "android", "iphone", "tablet", "touch", "tactil"],
            respuesta: "Sí, los juegos funcionan en celular 📱. En Snake usa los botones de flechas que están debajo del tablero. En Adivina el Opening sube el volumen y toca el botón de escuchar si te lo pide.",
            sugerencias: ["snake", "audio", "recomendar"]
        },
        {
            id: "gratis",
            claves: ["gratis", "gratuito", "cuesta", "cobran", "pagar", "precio", "registrarme", "registro", "cuenta", "descargar", "instalar"],
            respuesta: "Todo es gratis 🆓. No necesitas cuenta, registro ni instalar nada: abres la página y juegas. En los Top 10 solo se guarda el nombre o apodo que tú escribes y tu puntaje.",
            sugerencias: ["recomendar", "privacidad"]
        },
        {
            id: "privacidad",
            claves: ["privacidad", "datos", "seguro", "seguridad", "guardan", "cookies", "informacion personal"],
            respuesta: "Sobre tus datos 🔒: no pedimos cuenta ni correo. En los Top 10 se guarda solo el nombre que escribes y tu puntaje. Contamos las visitas de forma anónima. Las preguntas que el chat no tiene preparadas se envían a Google para que una IA las responda; Omar no las guarda. No escribas datos personales.",
            sugerencias: ["gratis", "creador"]
        },
        {
            id: "creador",
            chip: "👤 ¿Quién lo hizo?",
            claves: ["creador", "quien hizo", "quien creo", "quien lo hizo", "quien programo", "omar", "omarex", "autor", "desarrollador", "hecho por"],
            respuesta: "OMAREX Games lo hizo Omar, creador de contenido gamer y desarrollador web 👤. Se desarrolló con ayuda de IA (Claude): Omar definió las ideas y el diseño, probó los juegos, corrigió errores y los publicó. Mira su [portafolio](https://chavezdelmazo9509-rgb.github.io/mi-portafolio-/).",
            sugerencias: ["contacto", "recomendar"]
        },
        {
            id: "contacto",
            claves: ["contacto", "contactar", "escribir", "escribirle", "correo", "email", "mensaje", "sugerencia de juego", "reportar", "bug", "falla", "problema"],
            respuesta: "Para hablar con Omar 💬:\n• TikTok: [@omarex690](https://www.tiktok.com/@omarex690)\n• YouTube: [@omarex_official](https://www.youtube.com/@omarex_official)\n• Correo: [chavezdelmazo9509@gmail.com](mailto:chavezdelmazo9509@gmail.com)\nSi encontraste un error, cuéntale qué juego era y qué pasó.",
            sugerencias: ["creador", "top10falla"]
        },
        {
            id: "catalogo",
            claves: ["catalogo", "juegos de pc", "juegos de consola", "juegos de navegador", "pc", "consola", "navegador", "fortnite", "warframe", "apex", "rocket league", "slither", "subway", "moto x3m", "counter strike", "cs2", "steam", "trailer", "resena", "resenas"],
            respuesta: "Más arriba hay un catálogo de juegos gratis por plataforma (PC, Consola y Navegador) con tráilers y enlaces para jugarlos o descargarlos: [PC](#pc) · [Consola](#consola) · [Navegador](#navegador).",
            sugerencias: ["recomendar", "creador"]
        },
        {
            id: "ia",
            claves: ["eres una persona", "eres humano", "eres un robot", "eres una ia", "eres ia", "inteligencia artificial", "chatgpt", "bot", "robot", "quien eres", "que eres"],
            respuesta: "Soy un asistente automático 🤖, no una persona. Respondo con textos preparados y, si tu duda no está en ellos, uso una IA (un modelo de Google) que puede equivocarse. Para algo seguro, escríbele a Omar por sus redes.",
            sugerencias: ["contacto", "recomendar"]
        },
        {
            id: "gracias",
            claves: ["gracias", "genial", "perfecto", "excelente", "chao", "adios", "hasta luego"],
            respuesta: "¡De nada! 😄 ¡Mucha suerte en el Top 10! 🏆"
        }
    ]
});
