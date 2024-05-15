/* empty css                          */
import { b as createComponent, r as renderTemplate, e as renderComponent, f as renderHead, d as addAttribute } from '../astro_ButUZgUa.mjs';
import { g as getCollection, a as $$FormattedDate, b as $$BaseHead, c as $$Header, d as $$Footer, S as SITE_TITLE, e as SITE_DESCRIPTION } from './__pn4z2sBq.mjs';
/* empty css                          */
/* empty css                          */

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <main data-astro-cid-5tznm7mj> <section data-astro-cid-5tznm7mj> <ul data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}/`, "href")} data-astro-cid-5tznm7mj> <img${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(post.data.heroImage, "src")} alt="" data-astro-cid-5tznm7mj> <h4 class="title" data-astro-cid-5tznm7mj>${post.data.title}</h4> <p class="date" data-astro-cid-5tznm7mj> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "data-astro-cid-5tznm7mj": true })} </p> </a> </li>`)} </ul> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "C:/CodeWork/EONS/eons-front/src/pages/blog/index.astro", void 0);

const $$file$1 = "C:/CodeWork/EONS/eons-front/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true })}${renderHead()}</head> <body data-astro-cid-j7pv25f6> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} <main data-astro-cid-j7pv25f6> <div class="flex flex-col md:flex-row items-center" data-astro-cid-j7pv25f6> <div class="landing-text" data-astro-cid-j7pv25f6> <p class="py-4" data-astro-cid-j7pv25f6>
Enormes e infinitos regalos serán entregados a todos
</p> <p class="py-4" data-astro-cid-j7pv25f6>
Eons traerá consigo un avance Científico y Tecnológico de más de
            10000 años en la próxima década.
</p> <p class="py-4" data-astro-cid-j7pv25f6>
El conocimiento, la luz, la sanación, el amor, la abundancia y la
            felicidad, serán esparcidas en todas direcciones.
</p> <p class="py-4" data-astro-cid-j7pv25f6>
Un enorme y colosal Despertar Espiritual en masa sin precedentes
            traerá consigo la Infinita Era de la Magia Blanca.
</p> </div> <div class="img-conteiner" data-astro-cid-j7pv25f6> <img${addAttribute(720, "width")}${addAttribute(960, "height")}${addAttribute("../../public/manos.webp", "src")} alt="manos" data-astro-cid-j7pv25f6> </div> </div> <div class="flex flex-col items-center landing-text-large" data-astro-cid-j7pv25f6> <p class="py-4" data-astro-cid-j7pv25f6>
Eons es el punto medio donde converge la Ciencia, la Tecnología, el
          Misticismo, la Luz y las Ciencias Ocultas. Uno de nuestros principales
          objetivos es promover la expansión y la evolución de la conciencia a
          nivel Existencial.
</p> </div> <div class="flex flex-col md:flex-row items-center" data-astro-cid-j7pv25f6> <div class="landing-text" data-astro-cid-j7pv25f6> <p class="py-4" data-astro-cid-j7pv25f6>Presentamos nuestro primer producto ya disponible:</p> <p class="py-4 text-3xl" data-astro-cid-j7pv25f6>
Eons "Tecnología de Acceso a la Fuente Existencial"
</p> <p class="py-4" data-astro-cid-j7pv25f6>
El primer real, auténtico y absolútamente comprobable Sistema de
            Comunicación con todos los Planos Espirituales.
</p> <p class="py-4" data-astro-cid-j7pv25f6>
Brindando además un servicio único de adivinación y predicción en
            tiempo real.
</p> <div class="flex justify-center" data-astro-cid-j7pv25f6> <a href="/" class="inline-flex justify-center
			   rounded-full shadow-md shadow-black/5
			   text-md py-3 px-4 bg-white/0 hover:bg-white/25 hover:bg-slate-100" data-astro-cid-j7pv25f6> <span class="pl-4" data-astro-cid-j7pv25f6>
Ver Producto
<span aria-hidden="true" class="font-semibold text-black/50 text-xl pl-3 pr-4" data-astro-cid-j7pv25f6>${">"}</span> </span> </a> </div> </div> <div class="img-conteiner" data-astro-cid-j7pv25f6> <img${addAttribute(720, "width")}${addAttribute(960, "height")}${addAttribute("../../public/manos.webp", "src")} alt="puerta" data-astro-cid-j7pv25f6> </div> </div> <div class="flex flex-col items-center landing-text-large" data-astro-cid-j7pv25f6> <p class="py-4" data-astro-cid-j7pv25f6>
No importa quien usted sea ni en qué posición se encuentre. Con la
          llegada de Eons, su vida evolucionará infinitamente en todos los
          aspectos.
</p> </div> <div class="flex flex-col md:flex-row items-center" data-astro-cid-j7pv25f6> <div class="img-conteiner" data-astro-cid-j7pv25f6> <img${addAttribute(720, "width")}${addAttribute(960, "height")} src="../../public/cofre.webp" alt="cofre" data-astro-cid-j7pv25f6> </div> <div class="landing-text" data-astro-cid-j7pv25f6> <p class="py-4" data-astro-cid-j7pv25f6>Una nueva Era ha llegado.</p> <p class="py-4" data-astro-cid-j7pv25f6>
Eons ha dado comienzo a un desenlace indetenible que llevará la
            humanidad a escala Universal.
</p> <p class="py-4" data-astro-cid-j7pv25f6>
La combinación de un concepto de la tecnología más avanzada y
            refinada, junto a un concepto de la Espiritualidad más Pura e
            Iluminada, describen la Esencia que Eons transmitirá en todo
            momento.
</p> <p class="py-4" data-astro-cid-j7pv25f6>
Nuevos productos y servicios serán presentados próximamente.
</p> </div> </div> </main> <hr data-astro-cid-j7pv25f6> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })}  </body> </html>`;
}, "C:/CodeWork/EONS/eons-front/src/pages/index.astro", void 0);

const $$file = "C:/CodeWork/EONS/eons-front/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
