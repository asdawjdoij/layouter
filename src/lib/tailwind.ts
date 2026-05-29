import type {CanvasElement} from "@/lib/api/types.ts";

export function elToTailwind(el: CanvasElement): string {
    const base: Record<string, string> = {
        button:    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        input:     "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2",
        container: "flex flex-col gap-4 p-4",
        text:      "text-base leading-relaxed",
        image:     "block rounded-lg object-cover",
        card:      "rounded-xl border bg-white p-6 shadow-sm",
        badge:     "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        divider:   "border-t border-gray-200 my-4",
        navbar:    "flex items-center justify-between px-6 py-4 border-b",
        grid:      "grid gap-4",
    };

    const propClasses: string[] = [];
    const p = el.props ?? {};
    if (p.color)   propClasses.push(`text-${p.color}-600`);
    if (p.bg)      propClasses.push(`bg-${p.bg}-100`);
    if (p.rounded) propClasses.push("rounded-full");
    if (p.shadow)  propClasses.push("shadow-md");
    if (p.bold)    propClasses.push("font-bold");
    if (p.hidden)  propClasses.push("hidden");
    if (p.fullWidth) propClasses.push("w-full");
    if (p.cols)    propClasses.push(`grid-cols-${p.cols}`);

    const base_ = base[el.type] ?? "block";
    return [base_, ...propClasses].join(" ");
}

export function renderElToString(el: CanvasElement, indent: number): string {
    const pad = "  ".repeat(indent);
    const classes = elToTailwind(el);
    const hasChildren = el.children && el.children.length > 0;
    const labelAttr = el.label ? ` label="${el.label}"` : "";

    if (!hasChildren) {
        return `${pad}<${el.type}${labelAttr} className="${classes}" />`;
    }

    const childLines = el.children!.map(c => renderElToString(c, indent + 1)).join("\n");
    return `${pad}<${el.type}${labelAttr} className="${classes}">\n${childLines}\n${pad}</${el.type}>`;
}