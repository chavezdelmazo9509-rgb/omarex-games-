// ==========================================================
//  📤 Botón "Compartir mi puntaje"
//  Crea una imagen vertical (formato TikTok / historias) con el
//  logo de OMAREX y el resultado, y la comparte o la descarga.
//
//  Uso desde cualquier juego:
//    compartirPuntaje({
//        juego: "Adivina el Anime",
//        grande: "9/10",
//        detalle: "en 42.3 segundos",
//        fondo: "portada-anime.jpg",
//        boton: elBotonQueSeTocó
//    });
// ==========================================================
(function () {
    const ANCHO = 1080;
    const ALTO = 1920;
    const URL_PAGINA = "chavezdelmazo9509-rgb.github.io/omarex-games-";

    function cargarImagen(src) {
        return new Promise(resolve => {
            if (!src) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null); // si falla, se dibuja sin ella
            img.src = src;
        });
    }

    // Dibuja una imagen cubriendo todo el espacio (como background-size: cover)
    function dibujarCubriendo(ctx, img, x, y, w, h) {
        const escala = Math.max(w / img.width, h / img.height);
        const iw = img.width * escala;
        const ih = img.height * escala;
        ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
    }

    // Escribe texto que no quepa en una línea, partiéndolo en varias
    function textoEnLineas(ctx, texto, x, y, anchoMax, altoLinea) {
        const palabras = String(texto).split(" ");
        let linea = "";
        for (const palabra of palabras) {
            const prueba = linea ? linea + " " + palabra : palabra;
            if (ctx.measureText(prueba).width > anchoMax && linea) {
                ctx.fillText(linea, x, y);
                linea = palabra;
                y += altoLinea;
            } else {
                linea = prueba;
            }
        }
        ctx.fillText(linea, x, y);
        return y + altoLinea;
    }

    // Elige el tamaño de letra más grande que quepa en una línea
    function fuenteQueQuepa(ctx, texto, peso, tamMax, familia, anchoMax) {
        let tam = tamMax;
        do {
            ctx.font = `${peso} ${tam}px ${familia}`;
            if (ctx.measureText(texto).width <= anchoMax) break;
            tam -= 4;
        } while (tam > 20);
        return tam;
    }

    async function crearImagen(datos) {
        // Esperar a que las letras de la página estén listas
        try {
            await Promise.all([
                document.fonts.load("700 80px Orbitron"),
                document.fonts.load("700 40px Rajdhani")
            ]);
        } catch (e) {}

        const [fondo, logo] = await Promise.all([cargarImagen(datos.fondo), cargarImagen("omarex-logo.png")]);

        const lienzo = document.createElement("canvas");
        lienzo.width = ANCHO;
        lienzo.height = ALTO;
        const ctx = lienzo.getContext("2d");

        // Fondo oscuro + imagen del juego
        ctx.fillStyle = "#0d0d1a";
        ctx.fillRect(0, 0, ANCHO, ALTO);
        if (fondo) {
            dibujarCubriendo(ctx, fondo, 0, 0, ANCHO, ALTO);
        }
        const sombra = ctx.createLinearGradient(0, 0, 0, ALTO);
        sombra.addColorStop(0, "rgba(5, 5, 10, 0.55)");
        sombra.addColorStop(0.5, "rgba(5, 5, 10, 0.82)");
        sombra.addColorStop(1, "rgba(5, 5, 10, 0.95)");
        ctx.fillStyle = sombra;
        ctx.fillRect(0, 0, ANCHO, ALTO);

        // Marco neón
        ctx.strokeStyle = "#39ff14";
        ctx.lineWidth = 10;
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 30;
        ctx.strokeRect(40, 40, ANCHO - 80, ALTO - 80);
        ctx.shadowBlur = 0;

        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";

        // Logo
        if (logo) {
            ctx.drawImage(logo, ANCHO / 2 - 220, 110, 440, 440);
        }

        // Nombre del juego
        ctx.font = "700 64px Orbitron, sans-serif";
        ctx.fillStyle = "#ff2ec4";
        ctx.shadowColor = "#ff2ec4";
        ctx.shadowBlur = 25;
        let y = textoEnLineas(ctx, datos.juego, ANCHO / 2, 680, ANCHO - 160, 78);
        ctx.shadowBlur = 0;

        // Emoji grande (opcional, para el test de personaje)
        if (datos.emoji) {
            ctx.font = "180px sans-serif";
            ctx.fillText(datos.emoji, ANCHO / 2, y + 190);
            y += 220;
        }

        // Texto pequeño arriba del resultado
        ctx.font = "700 46px Rajdhani, sans-serif";
        ctx.fillStyle = "#e0e0ff";
        ctx.fillText(datos.antes || "Mi resultado", ANCHO / 2, y + 60);

        // Resultado grande (se achica solo para caber en una línea)
        const tamGrande = fuenteQueQuepa(ctx, datos.grande, 700, 170, "Orbitron, sans-serif", ANCHO - 180);
        ctx.fillStyle = "#39ff14";
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 35;
        y = y + 60 + tamGrande + 20;
        ctx.fillText(datos.grande, ANCHO / 2, y);
        ctx.shadowBlur = 0;

        // Detalle
        if (datos.detalle) {
            ctx.font = "700 50px Rajdhani, sans-serif";
            ctx.fillStyle = "#ffffff";
            textoEnLineas(ctx, datos.detalle, ANCHO / 2, y + 90, ANCHO - 200, 62);
        }

        // Reto + dirección de la página (abajo, siempre en el mismo lugar)
        fuenteQueQuepa(ctx, datos.reto || "¿ME GANAS? 🎮", 700, 72, "Orbitron, sans-serif", ANCHO - 180);
        ctx.fillStyle = "#ffd23f";
        ctx.shadowColor = "#ffd23f";
        ctx.shadowBlur = 20;
        ctx.fillText(datos.reto || "¿ME GANAS? 🎮", ANCHO / 2, ALTO - 330);
        ctx.shadowBlur = 0;

        ctx.font = "700 40px Rajdhani, sans-serif";
        ctx.fillStyle = "#e0e0ff";
        ctx.fillText("Juega gratis en:", ANCHO / 2, ALTO - 230);
        ctx.fillStyle = "#39ff14";
        fuenteQueQuepa(ctx, URL_PAGINA, 700, 44, "Rajdhani, sans-serif", ANCHO - 180);
        ctx.fillText(URL_PAGINA, ANCHO / 2, ALTO - 170);
        ctx.fillStyle = "#ff2ec4";
        ctx.font = "700 44px Rajdhani, sans-serif";
        ctx.fillText("#OMAREXGames", ANCHO / 2, ALTO - 105);

        return new Promise(resolve => lienzo.toBlob(resolve, "image/png"));
    }

    function descargar(blob, nombre) {
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = nombre;
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();
        setTimeout(() => URL.revokeObjectURL(enlace.href), 5000);
    }

    window.compartirPuntaje = async function (datos) {
        const boton = datos.boton;
        const textoOriginal = boton ? boton.textContent : "";
        if (boton) { boton.disabled = true; boton.textContent = "⏳ Creando imagen..."; }

        try {
            const blob = await crearImagen(datos);
            const nombre = "omarex-" + datos.juego.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".png";
            const archivo = new File([blob], nombre, { type: "image/png" });
            const texto = `${datos.juego}: ${datos.grande} ${datos.detalle || ""} ¿Me ganas? 🎮 https://${URL_PAGINA}/ #OMAREXGames`;

            // En celular se abre el menú para compartir (TikTok, WhatsApp...)
            if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                try {
                    await navigator.share({ files: [archivo], text: texto });
                } catch (e) {
                    if (e.name !== "AbortError") descargar(blob, nombre);
                }
            } else {
                // En la computadora se descarga la imagen
                descargar(blob, nombre);
                if (boton) boton.textContent = "✅ Imagen descargada";
                setTimeout(() => { if (boton) boton.textContent = textoOriginal; }, 2500);
                return;
            }
        } catch (e) {
            console.log("No se pudo crear la imagen:", e);
            alert("No se pudo crear la imagen. Intenta otra vez.");
        } finally {
            if (boton) boton.disabled = false;
        }
        if (boton) boton.textContent = textoOriginal;
    };
})();
