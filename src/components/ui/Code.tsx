import type {CanvasElement} from "@/lib/api/types.ts";
import {elToTailwind} from "@/lib/tailwind.ts";

interface Props {
    el: CanvasElement;
    indent: number;
}

const C = {
    tag: "text-[#7dd3fc]",
    attr: "text-[#86efac]",
    string: "text-[#fca5a5]",
    cls: "text-[#fde68a]",
    punct: "text-[#94a3b8]",
    comment: "text-[#64748b] italic",
};

export function Code({el, indent}: Props) {
    const pad = "  ".repeat(indent);
    const classes = elToTailwind(el);
    const hasChildren = el.children && el.children.length > 0;
    const isSelfClosing = !hasChildren && el.type !== "container";

    return (
        <div style={{fontFamily: "var(--font-mono, 'Fira Code', monospace)"}}>
            {/* opening tag line */}
            <div className="flex flex-wrap gap-x-1 whitespace-pre">
                <span className={C.punct}>{pad}&lt;</span>
                <span className={C.tag}>{el.type}</span>
                {" "}
                <span className={C.attr}>className</span>
                <span className={C.punct}>=</span>
                <span className={C.string}>"</span>
                <span className={`${C.cls} break-all`}>{classes}</span>
                <span className={C.string}>"</span>
                {el.label && (
                    <>
                        {" "}
                        <span className={C.attr}>label</span>
                        <span className={C.punct}>=</span>
                        <span className={C.string}>"{el.label}"</span>
                    </>
                )}
                <span className={C.punct}>{isSelfClosing ? " />" : ">"}</span>
            </div>

            {hasChildren && el.children!.map(child => (
                <Code key={child.id} el={child} indent={indent + 1}/>
            ))}

            {hasChildren && (
                <div>
                    <span className={C.punct}>{pad}&lt;/</span>
                    <span className={C.tag}>{el.type}</span>
                    <span className={C.punct}>&gt;</span>
                </div>
            )}
        </div>
    );
}