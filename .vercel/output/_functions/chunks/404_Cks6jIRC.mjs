import { c as createComponent } from './astro-component_z8sE6YCk.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_Dbo7TX6Z.mjs';
import { $ as $$Layout } from './Layout_VoJM4qyM.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col w-full h-screen justify-center items-center"> <a href="/" class="flex flex-row items-center gap-2 fade-up"${addAttribute({
    fontFamily: "var(--font-display)",
    animation: "fade-up 0.4s ease"
  }, "style")}> <img src="/favicon.svg" alt="Layouter Logo"${addAttribute("w-8 h-8 md:h-16 md:w-16", "class")}> <span${addAttribute("text-3xl md:text-7xl", "class")}>Layouter</span> </a> <p class="flex flex-row text-center gap-4 mt-12 text-lg md:text-3xl px-8 md:px-0"${addAttribute({
    animation: "fade-up 0.6s ease"
  }, "style")}>
Page not found
</p> </div> ` })}`;
}, "C:/Users/benlun/Desktop/layouter/src/pages/404.astro", void 0);

const $$file = "C:/Users/benlun/Desktop/layouter/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
