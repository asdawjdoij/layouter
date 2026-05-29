import { c as createComponent } from './astro-component_z8sE6YCk.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_Dbo7TX6Z.mjs';
import { $ as $$Layout } from './Layout_VoJM4qyM.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  let items = [
    {
      id: "legacy",
      title: "Legacy",
      description: "Access the legacy canvas not optimized for mobile devices."
    },
    {
      id: "modern",
      title: "Modern",
      description: "Access the modern canvas that is optimized for performance and mobile devices."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col w-full h-screen justify-center items-center"> <a href="/" class="flex flex-row items-center gap-2"${addAttribute({
    fontFamily: "var(--font-display)",
    animation: "fade-up 0.4s ease"
  }, "style")}> <img src="/favicon.svg" alt="Layouter Logo"${addAttribute("<w></w>-8 h-8 md:h-16 md:w-16", "class")}> <span${addAttribute("text-3xl md:text-7xl", "class")}>Layouter</span> </a> <div class="flex flex-col sm:flex-row w-full p-4 sm:p-0 sm:w-auto gap-4 mt-12"> ${items.map((item, i) => renderTemplate`<a${addAttribute(`${item.id}`, "href")}${addAttribute({
    fontFamily: "var(--font-display)",
    animation: `fade-up ${i * 0.2 + 0.6}s ease`
  }, "style")} class="border border-[var(--color-border)] text-center text-[var(--color-muted-text)] hover:text-[var(--color-text)] hover:bg-(--color-hover) text-xs bg-transparent py-4 px-12 rounded-xl cursor-pointer duration-300 hover:translate-y-[5px]">${item.title}</a>`)} </div> </div> ` })}`;
}, "C:/Users/benlun/Desktop/layouter/src/pages/index.astro", void 0);

const $$file = "C:/Users/benlun/Desktop/layouter/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
