// ==========================================================
//  ⚔️ Datos del test "¿Qué personaje de anime eres?"
// ==========================================================
//  PERSONAJES: los resultados posibles.
//  PREGUNTAS: cada respuesta suma 1 punto a los personajes
//  que tiene en "da". El que junta más puntos es el resultado.
//
//  Para que el test sea justo, cada personaje aparece 6 veces
//  en total entre todas las respuestas.
// ==========================================================

const PERSONAJES = {
    goku: {
        nombre: "Goku",
        anime: "Dragon Ball",
        emoji: "🐉",
        color: "#ff9f1c",
        descripcion: "Vives para entrenar y superarte. Siempre buscas a alguien más fuerte para retarlo, pero con una sonrisa.",
        rasgos: ["💪 Imparable", "😄 Alegre", "🍖 Come por 10"],
        frase: "¡Hola, soy Goku!"
    },
    naruto: {
        nombre: "Naruto Uzumaki",
        anime: "Naruto",
        emoji: "🍥",
        color: "#ff7b00",
        descripcion: "Nunca te rindes. Aunque todos duden de ti, tú sigues adelante hasta que te reconozcan.",
        rasgos: ["🔥 No se rinde", "🍜 Fan del ramen", "🤝 Hace amigos de enemigos"],
        frase: "¡De veras!"
    },
    luffy: {
        nombre: "Monkey D. Luffy",
        anime: "One Piece",
        emoji: "👒",
        color: "#e63946",
        descripcion: "Libre, divertido y un poco caótico. Tus amigos son tu tesoro y harías cualquier cosa por ellos.",
        rasgos: ["🏴‍☠️ Aventurero", "😂 Caótico", "❤️ Leal a sus nakamas"],
        frase: "¡Seré el Rey de los Piratas!"
    },
    levi: {
        nombre: "Levi Ackerman",
        anime: "Attack on Titan",
        emoji: "⚔️",
        color: "#5fa8d3",
        descripcion: "Serio, disciplinado y letal. Hablas poco, pero cuando actúas, nadie te detiene.",
        rasgos: ["🧹 Ordenado", "🗡️ El más hábil", "🛡️ Protector"],
        frase: "Elige lo que no lamentarás."
    },
    tanjiro: {
        nombre: "Tanjiro Kamado",
        anime: "Demon Slayer",
        emoji: "🌊",
        color: "#2ec4b6",
        descripcion: "Tienes un corazón enorme. Eres amable con todos, pero darías todo por proteger a tu familia.",
        rasgos: ["💚 Bondadoso", "👃 Muy intuitivo", "🏠 Familia primero"],
        frase: "¡Pon tu corazón en llamas!"
    },
    gojo: {
        nombre: "Satoru Gojo",
        anime: "Jujutsu Kaisen",
        emoji: "🕶️",
        color: "#7b9cff",
        descripcion: "Confiado, relajado y absurdamente fuerte. Todo te sale fácil y lo sabes.",
        rasgos: ["😎 Confiado", "🍰 Ama los dulces", "♾️ Intocable"],
        frase: "Tranquilo, soy el más fuerte."
    },
    light: {
        nombre: "Light Yagami",
        anime: "Death Note",
        emoji: "📓",
        color: "#c1121f",
        descripcion: "Brillante y calculador. Siempre vas tres pasos adelante y tienes un plan para todo.",
        rasgos: ["🧠 Genio", "🎭 Misterioso", "♟️ Estratega"],
        frase: "Todo es parte de mi plan."
    },
    anya: {
        nombre: "Anya Forger",
        anime: "Spy x Family",
        emoji: "🥜",
        color: "#ff8fab",
        descripcion: "Tierna, curiosa y más lista de lo que parece. Siempre sabes lo que los demás piensan.",
        rasgos: ["🔮 Lee mentes", "🥜 Ama el maní", "😏 Waku waku"],
        frase: "Anya quiere maní."
    }
};

const PREGUNTAS = [
    {
        texto: "Es sábado. ¿Qué haces?",
        respuestas: [
            { texto: "Entrenar hasta caer rendido 💪", da: ["goku", "levi"] },
            { texto: "Salir de aventura con mis amigos 🗺️", da: ["luffy", "naruto"] },
            { texto: "Ayudar en casa a mi familia 🏠", da: ["tanjiro", "anya"] },
            { texto: "Planear algo grande... en secreto 🤫", da: ["light", "gojo"] }
        ]
    },
    {
        texto: "¿Cuál es tu comida favorita?",
        respuestas: [
            { texto: "Ramen 🍜", da: ["naruto", "tanjiro"] },
            { texto: "Carne, ¡mucha carne! 🍖", da: ["luffy", "goku"] },
            { texto: "Dulces y postres 🍰", da: ["gojo", "anya"] },
            { texto: "Té y comida bien ordenada ☕", da: ["levi", "light"] }
        ]
    },
    {
        texto: "En una pelea, tú...",
        respuestas: [
            { texto: "Ataco de frente con todo 🔥", da: ["goku", "luffy"] },
            { texto: "Nunca me rindo aunque vaya perdiendo 💥", da: ["naruto", "tanjiro"] },
            { texto: "Gano sin despeinarme 😎", da: ["gojo", "levi"] },
            { texto: "Engaño al enemigo con un plan 🧩", da: ["light", "anya"] }
        ]
    },
    {
        texto: "Tus amigos dicen que eres...",
        respuestas: [
            { texto: "Leal y protector 🛡️", da: ["tanjiro", "levi"] },
            { texto: "Divertido y caótico 🤪", da: ["luffy", "anya"] },
            { texto: "Inteligente y misterioso 🕵️", da: ["light", "gojo"] },
            { texto: "Positivo y con mucha energía ⚡", da: ["naruto", "goku"] }
        ]
    },
    {
        texto: "¿Cuál es tu mayor sueño?",
        respuestas: [
            { texto: "Ser el más fuerte del universo 🌌", da: ["goku", "gojo"] },
            { texto: "Que todos me reconozcan 🏆", da: ["naruto", "light"] },
            { texto: "Ser libre y vivir aventuras 🕊️", da: ["luffy", "levi"] },
            { texto: "Que mi familia esté bien ❤️", da: ["tanjiro", "anya"] }
        ]
    },
    {
        texto: "Elige un superpoder:",
        respuestas: [
            { texto: "Leer mentes 🔮", da: ["anya", "light"] },
            { texto: "Que nada pueda tocarme ✨", da: ["gojo", "levi"] },
            { texto: "Clones o cuerpo de goma, ¡algo loco! 🤸", da: ["luffy", "naruto"] },
            { texto: "Transformarme y brillar con poder 🌟", da: ["goku", "tanjiro"] }
        ]
    }
];
