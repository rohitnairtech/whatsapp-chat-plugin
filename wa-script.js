"use strict";

const createWhatsappChat = (number, message='hi') => {

    const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

    const setHTML = (o, html, clear) => {
        if (clear) o.innerHTML = "";

        const dv = document.createElement("div");
        dv.innerHTML = html;

        if (dv.children.length===0){ o.innerHTML = html; return; }

        for (let i = 0; i < dv.children.length; i++) {
            const c = dv.children[i];
            const n = document.createElement(c.nodeName);

            for (let j = 0; j < c.attributes.length; j++)
                n.setAttribute(c.attributes[j].nodeName, c.attributes[j].nodeValue);

            if (c.children.length == 0)
            {
                switch (c.nodeName)
                {
                    case "SCRIPT":
                        if (c.text) n.text = c.text;
                        break;
                    default:
                        if (c.innerHTML) n.innerHTML = c.innerHTML;
                        break;
                }
            }
            else setHTML(n, c.innerHTML, false);
            o.appendChild(n);
        }
    };    

    const waFloatingElem = document.createElement('wa-floating-chat');

    const floatHTML = `<a href="${url}" id="wa-float"><img src="https://raw.githubusercontent.com/rohitnairtech/whatsapp-chat-plugin/main/iconmonstr-whatsapp-1.svg" id="my-wa-float"/></a>`;

    const floatCSS = '#wa-float{position:fixed;width:60px;height:60px;bottom:40px;right:40px;background-color:#0C9;color:#FFF;border-radius:50px;text-align:center;box-shadow:2px 2px 3px #999}#my-wa-float{margin-top:22px}',
        head = document.head || document.getElementsByTagName('head')[0],
        styleElem = document.createElement('style');
    
    head.appendChild(styleElem);

    styleElem.type = 'text/css';

    (styleElem.styleSheet) ? styleElem.styleSheet.cssText = floatCSS : styleElem.appendChild(document.createTextNode(floatCSS));

    setHTML(waFloatingElem, floatHTML, true);
}