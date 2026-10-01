// ==========================================================
//  🎵 LISTA DE OPENINGS para "Adivina el Opening"
// ==========================================================
//  La música se busca sola en Apple Music (vista previa de 30 s).
//  Para agregar un opening, copia UNA línea y cambia:
//    anime:   el nombre que sale en los botones
//    cancion: el nombre de la canción
//    artista: quien la canta
//    clave:   una parte del nombre del artista, en minúsculas y
//             sin espacios (sirve para encontrar la canción correcta)
//  Si una canción no se encuentra, el juego la salta solo.
// ==========================================================

const OPENINGS = [
    { anime: "Naruto", cancion: "Blue Bird", artista: "Ikimonogakari", clave: "ikimono" },
    { anime: "Naruto", cancion: "Silhouette", artista: "KANA-BOON", clave: "kanaboon" },
    { anime: "Naruto", cancion: "Haruka Kanata", artista: "ASIAN KUNG-FU GENERATION", clave: "asiankung" },
    { anime: "Demon Slayer", cancion: "Gurenge", artista: "LiSA", clave: "lisa" },
    { anime: "Tokyo Ghoul", cancion: "unravel", artista: "TK from Ling tosite sigure", clave: "tkfrom" },
    { anime: "Attack on Titan", cancion: "Guren no Yumiya", artista: "Linked Horizon", clave: "linkedhorizon" },
    { anime: "Attack on Titan", cancion: "Shinzou wo Sasageyo", artista: "Linked Horizon", clave: "linkedhorizon" },
    { anime: "Jujutsu Kaisen", cancion: "Kaikai Kitan", artista: "Eve", clave: "eve" },
    { anime: "Jujutsu Kaisen", cancion: "SPECIALZ", artista: "King Gnu", clave: "kinggnu" },
    { anime: "One Piece", cancion: "We Are!", artista: "Hiroshi Kitadani", clave: "kitadani" },
    { anime: "Dragon Ball Z", cancion: "Cha-La Head-Cha-La", artista: "Hironobu Kageyama", clave: "kageyama" },
    { anime: "My Hero Academia", cancion: "Peace Sign", artista: "Kenshi Yonezu", clave: "yonezu" },
    { anime: "My Hero Academia", cancion: "The Day", artista: "Porno Graffitti", clave: "porno" },
    { anime: "Chainsaw Man", cancion: "KICK BACK", artista: "Kenshi Yonezu", clave: "yonezu" },
    { anime: "Spy x Family", cancion: "Mixed Nuts", artista: "Official HIGE DANdism", clave: "hige" },
    { anime: "Oshi no Ko", cancion: "Idol", artista: "YOASOBI", clave: "yoasobi" },
    { anime: "Frieren", cancion: "Yuusha", artista: "YOASOBI", clave: "yoasobi" },
    { anime: "Dan Da Dan", cancion: "Otonoke", artista: "Creepy Nuts", clave: "creepynuts" },
    { anime: "Mashle", cancion: "Bling-Bang-Bang-Born", artista: "Creepy Nuts", clave: "creepynuts" },
    { anime: "Fullmetal Alchemist", cancion: "again", artista: "YUI", clave: "yui" },
    { anime: "Evangelion", cancion: "A Cruel Angel's Thesis", artista: "Yoko Takahashi", clave: "takahashi" },
    { anime: "Cowboy Bebop", cancion: "Tank!", artista: "The Seatbelts", clave: "seatbelts" },
    { anime: "Your Lie in April", cancion: "Hikaru Nara", artista: "Goose house", clave: "goosehouse" },
    { anime: "Death Note", cancion: "the WORLD", artista: "Nightmare", clave: "nightmare" },
    { anime: "Fire Force", cancion: "Inferno", artista: "Mrs. GREEN APPLE", clave: "greenapple" },
    { anime: "Bleach", cancion: "Asterisk", artista: "ORANGE RANGE", clave: "orangerange" },
    { anime: "Sword Art Online", cancion: "crossing field", artista: "LiSA", clave: "lisa" },
    { anime: "Haikyuu!!", cancion: "Imagination", artista: "SPYAIR", clave: "spyair" },
    { anime: "Solo Leveling", cancion: "LEveL", artista: "SawanoHiroyuki[nZk]", clave: "sawano" },
    { anime: "Erased", cancion: "Re:Re:", artista: "ASIAN KUNG-FU GENERATION", clave: "asiankung" },
];
