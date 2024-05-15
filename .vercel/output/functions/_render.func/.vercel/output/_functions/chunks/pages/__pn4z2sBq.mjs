/* empty css                          */
import { c as createAstro, b as createComponent, r as renderTemplate, d as addAttribute, m as maybeRenderHead, e as renderComponent, f as renderHead, g as renderSlot, A as AstroError, h as UnknownContentCollectionError, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, u as unescapeHTML } from '../astro_ButUZgUa.mjs';
import { AsyncResource } from 'async_hooks';
import { p as prependForwardSlash } from '../astro/assets-service_Dl115rOK.mjs';
/* empty css                          */

const $$Astro$3 = createAstro("https://example.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "C:/CodeWork/EONS/eons-front/src/components/BaseHead.astro", void 0);

const SITE_TITLE = "EONS";
const SITE_DESCRIPTION = "Welcome to my website!";

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="social-links logo" data-astro-cid-tvrurpns> <img src="../../public/logo.webp" alt="logo-header" height="48" width="128" data-astro-cid-tvrurpns> <h2 data-astro-cid-tvrurpns><a class="text-3xl" href="/" data-astro-cid-tvrurpns>${SITE_TITLE}</a></h2> </div> `;
}, "C:/CodeWork/EONS/eons-front/src/components/Logo.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <!-- <div class="social-links logo">
			<img 
			src='../../public/logo.webp' alt="logo-header"
			height="48" width="128"
			>
			<h2><a c
				lass="text-3xl" href="/">{SITE_TITLE}</a></h2>
		</div> --> ${renderComponent($$result, "Logo", $$Logo, { "data-astro-cid-3ef6ksr2": true })} <div class="social-links" data-astro-cid-3ef6ksr2> <div class="px-2" data-astro-cid-3ef6ksr2> <svg fill="#6b6b6b" width="32" height="32" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.42 46.42" xml:space="preserve" stroke="#6b6b6b" data-astro-cid-3ef6ksr2> <g id="SVGRepo_bgCarrier" stroke-width="0" data-astro-cid-3ef6ksr2></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2></g> <g id="SVGRepo_iconCarrier" data-astro-cid-3ef6ksr2> <g data-astro-cid-3ef6ksr2> <path d="M46.09,41.291c-0.428-0.611-1.046-0.775-1.414-0.874l-0.097-0.026c-0.496-0.137-0.995-0.264-1.494-0.39 c-0.364-0.094-0.729-0.186-1.093-0.282c-3.782-1.008-7.029-2.397-9.932-4.254c-2.471-1.58-4.903-3.521-7.621-6.082l1.08-1.75 c1-1.615,1.998-3.229,2.979-4.855c0.374-0.62,0.728-1.256,1.067-1.871c0.296-0.534,0.592-1.068,0.902-1.594 c0.342-0.576,0.797-1.089,1.278-1.632c0.513-0.576,1.041-1.171,1.47-1.886c0.33-0.548,0.424-1.148,0.275-1.735 c-0.338-1.339-1.82-2.221-2.904-2.865c-0.18-0.107-0.343-0.203-0.478-0.29c-0.597-0.384-1.228-0.579-1.877-0.579 c-0.625,0-1.247,0.181-1.853,0.537c-0.891,0.526-1.897,0.828-2.678,1.032c-1.504,0.395-3.058,0.655-4.74,0.795 c0.856-1.804,1.683-3.51,2.809-5.069c0.075-0.104,0.145-0.213,0.208-0.325c0.571-1.017,0.457-2.083-0.313-2.922 c-0.864-0.943-1.986-1.673-3.334-2.17c-0.271-0.1-0.512-0.148-0.736-0.148c-0.376,0-0.719,0.141-0.966,0.396 c-0.395,0.407-0.425,0.953-0.413,1.328c0.067,2.119-0.761,4.322-1.562,6.453l-0.072,0.199c-2.332,6.21-5.929,12.013-10.128,16.341 c-0.293,0.303-0.54,0.617-0.778,0.926l-0.125,0.16c-0.161,0.205-0.224,0.409-0.261,0.532l-0.226,0.585l0.418,0.491l0.043,0.046 l0.035,0.038l0.497,0.533l0.659-0.312c0.074-0.035,0.148-0.068,0.223-0.101c0.188-0.083,0.401-0.179,0.613-0.3 c2.317-1.34,4.411-3.137,6.553-5.631c0.602,0.638,1.292,1.182,1.96,1.709c0.54,0.427,1.05,0.83,1.501,1.266 c0.87,0.843,1.768,1.802,2.676,2.857c-0.025,0.03-0.051,0.062-0.076,0.092c-0.407,0.488-0.827,0.994-1.257,1.468 c-1.64,1.81-3.616,3.524-6.04,5.245c-2.53,1.796-5.301,3.643-8.426,4.992c-0.344,0.146-0.635,0.332-0.952,0.539 c-0.243,0.16-0.37,0.363-0.455,0.498c-0.019,0.031-0.041,0.066-0.069,0.104L0,43.864l1.648,0.223 c0.074,0.005,0.139,0.018,0.198,0.027C1.99,44.14,2.152,44.17,2.338,44.17c0.041,0,0.081-0.001,0.122-0.004 c0.565-0.04,1.133-0.08,1.705-0.169c5.873-0.907,11.47-4.405,17.607-11.004c0.763,0.735,1.531,1.471,2.299,2.203 c1.435,1.369,2.917,2.785,4.341,4.203c0.196,0.195,0.393,0.396,0.589,0.594c1.13,1.146,2.298,2.33,3.761,3.164 c1.422,0.812,3.106,1.207,5.15,1.207c0.583,0,1.188-0.032,1.846-0.098c0.291-0.027,1.744-0.307,3.025-0.591 c2.833-0.628,3.167-0.858,3.396-1.358l0.24-0.521L46.09,41.291z M23.674,21.274c-0.893,1.721-1.887,3.401-2.958,5.004 c-0.9-0.834-2.428-2.388-2.851-2.842c-0.174-0.187-0.341-0.381-0.506-0.571c-0.781-0.902-1.662-1.92-3.029-1.998 c1.144-1.65,2.102-3.291,2.874-4.673c0.533,0.158,1.091,0.235,1.694,0.235c0.972,0,1.905-0.202,2.807-0.397 c0.399-0.086,0.798-0.173,1.2-0.24l0.215-0.037c0.455-0.08,1.143-0.2,1.755-0.2c0.037,0,0.896,0.003,0.922,0.237 c0.146,1.336-0.84,3.13-1.632,4.571C23.989,20.684,23.822,20.989,23.674,21.274z" data-astro-cid-3ef6ksr2></path> </g> </g> </svg> </div> <div class="px-2" data-astro-cid-3ef6ksr2> <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#6b6b6b" data-astro-cid-3ef6ksr2> <g id="SVGRepo_bgCarrier" stroke-width="0" data-astro-cid-3ef6ksr2></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2></g> <g id="SVGRepo_iconCarrier" data-astro-cid-3ef6ksr2> <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2></path> <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2></path> </g> </svg> </div> </div> </nav> </header> `;
}, "C:/CodeWork/EONS/eons-front/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <!-- &copy; {today.getFullYear()} Your name here. All rights reserved. --> ${renderComponent($$result, "Logo", $$Logo, { "data-astro-cid-sz7xmlte": true })} <div class="flex flex-col md:flex-row justify-space-around social-links" data-astro-cid-sz7xmlte> <a href="https://m.webtoo.ls/@astro" target="_blank" data-astro-cid-sz7xmlte> <span class="text-base p-4" data-astro-cid-sz7xmlte>Acerca de Nosotros</span> </a> <a href="https://twitter.com/astrodotbuild" target="_blank" data-astro-cid-sz7xmlte> <span class="text-base p-4" data-astro-cid-sz7xmlte>Términos y Condiciones</span> </a> <a href="https://github.com/withastro/astro" target="_blank" data-astro-cid-sz7xmlte> <span class="text-base p-4" data-astro-cid-sz7xmlte>Política de Privacidad</span> </a> </div> </footer> `;
}, "C:/CodeWork/EONS/eons-front/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro("https://example.com");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "C:/CodeWork/EONS/eons-front/src/components/FormattedDate.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-bvzihdzo> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-bvzihdzo": true })}${renderHead()}</head> <body data-astro-cid-bvzihdzo> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-bvzihdzo": true })} <main data-astro-cid-bvzihdzo> <article data-astro-cid-bvzihdzo> <div class="hero-image" data-astro-cid-bvzihdzo> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-bvzihdzo>`} </div> <div class="prose" data-astro-cid-bvzihdzo> <div class="title" data-astro-cid-bvzihdzo> <div class="date" data-astro-cid-bvzihdzo> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDate, "data-astro-cid-bvzihdzo": true })} ${updatedDate && renderTemplate`<div class="last-updated-on" data-astro-cid-bvzihdzo>
Last updated on ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": updatedDate, "data-astro-cid-bvzihdzo": true })} </div>`} </div> <h1 data-astro-cid-bvzihdzo>${title}</h1> <hr data-astro-cid-bvzihdzo> </div> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-bvzihdzo": true })} </body></html>`;
}, "C:/CodeWork/EONS/eons-front/src/layouts/BlogPost.astro", void 0);

/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}

function pLimit(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = new Queue();
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.size > 0) {
			queue.dequeue()();
		}
	};

	const run = async (function_, resolve, arguments_) => {
		activeCount++;

		const result = (async () => function_(...arguments_))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (function_, resolve, arguments_) => {
		queue.enqueue(
			AsyncResource.bind(run.bind(undefined, function_, resolve, arguments_)),
		);

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// when the run function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency && queue.size > 0) {
				queue.dequeue()();
			}
		})();
	};

	const generator = (function_, ...arguments_) => new Promise(resolve => {
		enqueue(function_, resolve, arguments_);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value() {
				queue.clear();
			},
		},
	});

	return generator;
}

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://example.com", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post_1b_hWBq-.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide_CVBGF7ya.mjs'),"/src/content/blog/second-post.md": () => import('../second-post_DKuAnAGz.mjs'),"/src/content/blog/third-post.md": () => import('../third-post_zi9hZ6-r.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx_Cwjrm-Gv.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"markdown-style-guide":"/src/content/blog/markdown-style-guide.md","second-post":"/src/content/blog/second-post.md","first-post":"/src/content/blog/first-post.md","third-post":"/src/content/blog/third-post.md","using-mdx":"/src/content/blog/using-mdx.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post_BMYpaWIm.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide_DOMFblyV.mjs'),"/src/content/blog/second-post.md": () => import('../second-post_Bk9k2J_3.mjs'),"/src/content/blog/third-post.md": () => import('../third-post_1S1hJg83.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx_CyoY4L42.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "C:/CodeWork/EONS/eons-front/src/pages/blog/[...slug].astro", void 0);

const $$file = "C:/CodeWork/EONS/eons-front/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BlogPost as $, SITE_TITLE as S, ____slug_ as _, $$FormattedDate as a, $$BaseHead as b, $$Header as c, $$Footer as d, SITE_DESCRIPTION as e, getCollection as g };
