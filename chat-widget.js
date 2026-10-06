// ==========================================================
//  💬 Chat de OMAREX (respuestas preparadas + IA opcional)
//
//  Este archivo es el "motor" y no se toca. Lo que dice el chat
//  está en el otro archivo (chat-portafolio.js o chat-juegos.js),
//  en la lista "intenciones".
//
//  Cada intención tiene:
//    claves:     palabras que, si el visitante las escribe, activan la respuesta
//    respuesta:  lo que contesta el chat. [texto](enlace) crea un enlace
//    sugerencias: botones que aparecen después de la respuesta
// ==========================================================
(function () {
    "use strict";

    // Quita tildes y signos para comparar palabras ("¿Cuánto cobras?" -> "cuanto cobras")
    function normalizar(texto) {
        return String(texto || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function crear(etiqueta, clase, texto) {
        const e = document.createElement(etiqueta);
        if (clase) e.className = clase;
        if (texto !== undefined) e.textContent = texto;
        return e;
    }

    // Convierte [texto](enlace) en enlaces. Todo lo demás se muestra como texto,
    // así que nada de lo que escriba un visitante puede meter código en la página.
    function escribirConEnlaces(contenedor, texto, alAbrirEnlaceInterno) {
        const patron = /\[([^\]]+)\]\(([^)\s]+)\)/g;
        let ultimo = 0;
        let m;
        while ((m = patron.exec(texto)) !== null) {
            if (m.index > ultimo) contenedor.appendChild(document.createTextNode(texto.slice(ultimo, m.index)));
            const url = m[2];
            if (/^(https?:\/\/|mailto:|#)/.test(url) || (/^[\w\-.\/]+$/.test(url) && !/^\/\//.test(url))) {
                const a = crear("a", "", m[1]);
                a.href = url;
                if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
                if (url.charAt(0) === "#") a.addEventListener("click", alAbrirEnlaceInterno);
                contenedor.appendChild(a);
            } else {
                contenedor.appendChild(document.createTextNode(m[0]));
            }
            ultimo = patron.lastIndex;
        }
        if (ultimo < texto.length) contenedor.appendChild(document.createTextNode(texto.slice(ultimo)));
    }

    // Elige la intención que mejor coincide con lo que escribió el visitante
    function buscarIntencion(intenciones, mensaje) {
        const texto = " " + normalizar(mensaje) + " ";
        let mejor = null;
        let mejorPuntos = 0;
        intenciones.forEach(function (intencion) {
            let puntos = 0;
            intencion.claves.forEach(function (clave) {
                const k = normalizar(clave);
                if (!k) return;
                // Las palabras cortas (ej. "ig", "cv") deben ser palabras completas
                const coincide = k.length <= 3 ? texto.indexOf(" " + k + " ") !== -1 : texto.indexOf(k) !== -1;
                if (coincide) puntos += k.split(" ").length + 1;
            });
            if (puntos > mejorPuntos) { mejorPuntos = puntos; mejor = intencion; }
        });
        return mejor;
    }

    function crearEstilos(c) {
        const t = c.tema;
        const lado = c.lado === "izquierda" ? "left" : "right";
        const claro = c.temaClaro
            ? "body.claro .omx-chat{--omx-fondo:" + c.temaClaro.fondo + ";--omx-texto:" + c.temaClaro.texto +
              ";--omx-burbuja:" + c.temaClaro.burbuja + ";--omx-acento:" + c.temaClaro.acento +
              ";--omx-sobre-acento:" + c.temaClaro.sobreAcento + ";--omx-linea:" + c.temaClaro.linea + ";}"
            : "";
        return (
            ".omx-chat{--omx-fondo:" + t.fondo + ";--omx-texto:" + t.texto + ";--omx-burbuja:" + t.burbuja +
            ";--omx-acento:" + t.acento + ";--omx-sobre-acento:" + t.sobreAcento + ";--omx-linea:" + t.linea +
            ";--omx-enlace:" + (t.enlace || t.acento) + ";font-family:inherit;font-size:16px;line-height:1.4;}" +
            claro +
            ".omx-chat *{box-sizing:border-box;}" +
            ".omx-chat .omx-boton{position:fixed;" + lado + ":20px;bottom:20px;width:58px;height:58px;border-radius:50%;" +
            "border:2px solid var(--omx-sobre-acento);background:var(--omx-acento);color:var(--omx-sobre-acento);font-size:28px;line-height:1;" +
            "cursor:pointer;box-shadow:0 0 14px var(--omx-acento);z-index:2147483000;padding:0;display:flex;align-items:center;justify-content:center;}" +
            ".omx-chat .omx-boton:hover{transform:scale(1.07);}" +
            ".omx-chat .omx-boton.omx-pulso{animation:omxPulso 2s ease-in-out infinite;}" +
            "@keyframes omxPulso{50%{box-shadow:0 0 0 10px transparent,0 0 22px var(--omx-acento);}}" +
            "@media (prefers-reduced-motion:reduce){.omx-chat .omx-boton.omx-pulso{animation:none;}}" +
            ".omx-chat .omx-panel{position:fixed;" + lado + ":20px;bottom:90px;width:min(370px,calc(100vw - 24px));" +
            "height:min(540px,calc(100vh - 110px));display:none;flex-direction:column;background:var(--omx-fondo);color:var(--omx-texto);" +
            "border:2px solid var(--omx-acento);border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.5);z-index:2147483000;overflow:hidden;text-align:left;}" +
            ".omx-chat .omx-panel.omx-abierto{display:flex;}" +
            ".omx-chat .omx-cabecera{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;" +
            "background:var(--omx-acento);color:var(--omx-sobre-acento);font-weight:700;}" +
            ".omx-chat .omx-cerrar{background:transparent;border:none;color:inherit;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;}" +
            ".omx-chat .omx-mensajes{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;}" +
            ".omx-chat .omx-msg{max-width:88%;padding:8px 12px;border-radius:12px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;}" +
            ".omx-chat .omx-bot{align-self:flex-start;background:var(--omx-burbuja);border-bottom-left-radius:4px;}" +
            ".omx-chat .omx-usuario{align-self:flex-end;background:var(--omx-acento);color:var(--omx-sobre-acento);border-bottom-right-radius:4px;}" +
            ".omx-chat .omx-msg a{color:var(--omx-enlace);text-decoration:underline;font-weight:700;}" +
            ".omx-chat .omx-escribiendo{opacity:.7;}" +
            ".omx-chat .omx-etiqueta{display:block;font-size:11px;opacity:.7;margin-top:4px;}" +
            ".omx-chat .omx-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px;}" +
            ".omx-chat .omx-chip{background:transparent;color:var(--omx-texto);border:1px solid var(--omx-acento);border-radius:99px;" +
            "padding:5px 11px;font-size:14px;font-family:inherit;cursor:pointer;}" +
            ".omx-chat .omx-chip:hover{background:var(--omx-acento);color:var(--omx-sobre-acento);}" +
            ".omx-chat .omx-formulario{display:flex;gap:6px;padding:8px 12px;border-top:1px solid var(--omx-linea);}" +
            ".omx-chat .omx-entrada{flex:1;min-width:0;background:var(--omx-burbuja);color:var(--omx-texto);border:1px solid var(--omx-linea);" +
            "border-radius:8px;padding:9px 10px;font-size:16px;font-family:inherit;margin:0;width:auto;}" +
            ".omx-chat .omx-entrada:focus{outline:2px solid var(--omx-acento);}" +
            ".omx-chat .omx-enviar{background:var(--omx-acento);color:var(--omx-sobre-acento);border:none;border-radius:8px;" +
            "padding:0 14px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;margin:0;}" +
            ".omx-chat .omx-aviso{font-size:12px;opacity:.75;padding:0 12px 8px;margin:0;}" +
            "@media (max-width:480px){.omx-chat .omx-panel{" + lado + ":12px;bottom:84px;height:min(520px,calc(100vh - 100px));}}" +
            "@media print{.omx-chat{display:none;}}"
        );
    }

    function iniciar(config) {
        if (document.querySelector(".omx-chat")) return;

        const estilo = document.createElement("style");
        estilo.textContent = crearEstilos(config);
        document.head.appendChild(estilo);

        const raiz = crear("div", "omx-chat");
        const boton = crear("button", "omx-boton omx-pulso", "💬");
        boton.type = "button";
        boton.setAttribute("aria-label", config.etiquetaBoton || "Abrir chat de ayuda");
        boton.setAttribute("aria-expanded", "false");

        const panel = crear("div", "omx-panel");
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", config.titulo);

        const cabecera = crear("div", "omx-cabecera");
        cabecera.appendChild(crear("span", "", config.titulo));
        const cerrarBtn = crear("button", "omx-cerrar", "✕");
        cerrarBtn.type = "button";
        cerrarBtn.setAttribute("aria-label", "Cerrar chat");
        cabecera.appendChild(cerrarBtn);

        const mensajes = crear("div", "omx-mensajes");
        mensajes.setAttribute("aria-live", "polite");
        const chips = crear("div", "omx-chips");

        const formulario = crear("form", "omx-formulario");
        const entrada = crear("input", "omx-entrada");
        entrada.type = "text";
        entrada.maxLength = 200;
        entrada.placeholder = "Escribe tu pregunta...";
        entrada.setAttribute("aria-label", "Escribe tu pregunta");
        entrada.autocomplete = "off";
        const enviar = crear("button", "omx-enviar", "➤");
        enviar.type = "submit";
        enviar.setAttribute("aria-label", "Enviar");
        formulario.append(entrada, enviar);

        const aviso = crear("p", "omx-aviso", config.aviso);

        panel.append(cabecera, mensajes, chips, formulario, aviso);
        raiz.append(panel, boton);
        document.body.appendChild(raiz);

        let saludoMostrado = false;
        let pendiente = null;
        let ocupado = false;
        const historial = []; // [{rol:"user"|"ia", texto}] para dar contexto a la IA
        const ia = config.ia || null;
        if (ia && ia.aviso) aviso.textContent = ia.aviso;

        function recordar(rol, texto) {
            historial.push({ rol: rol, texto: String(texto).slice(0, 300) });
            if (historial.length > 8) historial.shift();
        }

        // Deja turnos alternados (usuario, ia, usuario...) que terminen en usuario
        function mensajesParaIA() {
            const lista = [];
            historial.forEach(function (m) {
                if (lista.length && lista[lista.length - 1].rol === m.rol) lista[lista.length - 1] = m;
                else lista.push(m);
            });
            while (lista.length && lista[0].rol !== "user") lista.shift();
            return lista.slice(-5);
        }

        // La respuesta de la IA se muestra SOLO como texto (sin enlaces), quitando el formato markdown
        function limpiarRespuestaIA(t) {
            return String(t || "").replace(/\*\*|__|`/g, "").replace(/^\s*[*-]\s+/gm, "• ").replace(/^#+\s*/gm, "").trim();
        }

        function bajar() { mensajes.scrollTop = mensajes.scrollHeight; }

        function agregarMensaje(texto, quien) {
            const m = crear("div", "omx-msg " + (quien === "usuario" ? "omx-usuario" : "omx-bot"));
            if (quien === "usuario") m.textContent = texto;
            else escribirConEnlaces(m, texto, cerrar);
            mensajes.appendChild(m);
            bajar();
            return m;
        }

        function mostrarChips(ids) {
            chips.innerHTML = "";
            ids.slice(0, 4).forEach(function (id) {
                const intencion = config.intenciones.find(function (i) { return i.id === id; });
                if (!intencion || !intencion.chip) return;
                const b = crear("button", "omx-chip", intencion.chip);
                b.type = "button";
                b.addEventListener("click", function () { preguntar(intencion.chip, intencion); });
                chips.appendChild(b);
            });
            bajar(); // los botones pueden cambiar la altura: se vuelve al último mensaje
        }

        function responder(intencion) {
            const escribiendo = agregarMensaje("...", "bot");
            escribiendo.classList.add("omx-escribiendo");
            clearTimeout(pendiente);
            pendiente = setTimeout(function () {
                escribiendo.remove();
                if (intencion) {
                    agregarMensaje(intencion.respuesta, "bot");
                    mostrarChips((intencion.sugerencias || config.inicio).filter(function (id) { return id !== intencion.id; }));
                } else {
                    agregarMensaje(config.noEntendi, "bot");
                    mostrarChips(config.inicio);
                }
            }, 350);
        }

        function mostrarFalloIA(mensaje) {
            agregarMensaje(mensaje || config.noEntendi, "bot");
            mostrarChips(config.inicio);
        }

        function preguntarALaIA() {
            ocupado = true;
            const escribiendo = agregarMensaje("...", "bot");
            escribiendo.classList.add("omx-escribiendo");
            const aviso1 = setTimeout(function () {
                escribiendo.textContent = "Despertando al asistente 😴 puede tardar hasta 1 minuto la primera vez...";
            }, 7000);
            const control = new AbortController();
            const limite = setTimeout(function () { control.abort(); }, 110000);

            function terminar() {
                clearTimeout(aviso1);
                clearTimeout(limite);
                escribiendo.remove();
                ocupado = false;
            }

            fetch(ia.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sitio: ia.sitio, mensajes: mensajesParaIA() }),
                signal: control.signal
            }).then(function (r) {
                return r.json().catch(function () { return {}; }).then(function (datos) { return { ok: r.ok, estado: r.status, datos: datos }; });
            }).then(function (r) {
                terminar();
                if (r.ok && r.datos.respuesta) {
                    const texto = limpiarRespuestaIA(r.datos.respuesta);
                    const m = crear("div", "omx-msg omx-bot");
                    m.textContent = texto;
                    m.appendChild(crear("span", "omx-etiqueta", "🤖 Respuesta generada por IA, puede tener errores"));
                    mensajes.appendChild(m);
                    bajar();
                    recordar("ia", texto);
                    mostrarChips(config.inicio);
                } else if (r.estado === 429 && r.datos.error) {
                    mostrarFalloIA(r.datos.error + " Mientras tanto, usa los botones.");
                } else {
                    mostrarFalloIA(config.noEntendi);
                }
            }).catch(function () {
                terminar();
                mostrarFalloIA(config.noEntendi);
            });
        }

        function preguntar(texto, intencionDirecta) {
            const limpio = texto.trim();
            if (!limpio || ocupado) return;
            agregarMensaje(limpio, "usuario");
            recordar("user", limpio);
            const intencion = intencionDirecta || buscarIntencion(config.intenciones, limpio);
            // Primero las respuestas preparadas; la IA solo contesta lo que no está en la lista
            if (!intencion && ia && ia.url) {
                preguntarALaIA();
                return;
            }
            if (intencion) recordar("ia", intencion.respuesta);
            responder(intencion);
        }

        function abrir() {
            panel.classList.add("omx-abierto");
            boton.setAttribute("aria-expanded", "true");
            boton.classList.remove("omx-pulso");
            if (!saludoMostrado) {
                saludoMostrado = true;
                agregarMensaje(config.saludo, "bot");
                mostrarChips(config.inicio);
            }
            // En computadora se enfoca la caja; en celular no, para que no salte el teclado
            if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) entrada.focus();
        }

        function cerrar() {
            panel.classList.remove("omx-abierto");
            boton.setAttribute("aria-expanded", "false");
        }

        boton.addEventListener("click", function () {
            if (panel.classList.contains("omx-abierto")) cerrar(); else abrir();
        });
        cerrarBtn.addEventListener("click", function () { cerrar(); boton.focus(); });
        raiz.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && panel.classList.contains("omx-abierto")) { cerrar(); boton.focus(); }
        });
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();
            const texto = entrada.value;
            entrada.value = "";
            preguntar(texto);
        });
    }

    window.OmarexChat = { iniciar: iniciar, _normalizar: normalizar, _buscar: buscarIntencion };
})();
