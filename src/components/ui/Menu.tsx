import { useEffect, useRef, useState } from "preact/hooks";
import type { CanvasElement } from "@/lib/api/types.ts";

interface Props {
    el: CanvasElement;
    x: number;
    y: number;
    onUpdate: (id: string, props: Partial<CanvasElement["props"]>) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

export function Menu({ el, x, y, onUpdate, onDelete, onClose }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const p = el.props;

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        }
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    const [pos, setPos] = useState({ x, y });

    useEffect(() => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        setPos({
            x: Math.min(x, window.innerWidth - width - 8),
            y: Math.min(y, window.innerHeight - height - 8),
        });
    }, [x, y]);

    function field(label: string, node: preact.JSX.Element) {
        return (
            <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-(--color-muted-text)"
                      style={{ fontFamily: "var(--font-display)" }}>
                    {label}
                </span>
                {node}
            </label>
        );
    }

    const inputCls = "w-full px-2 py-1.5 rounded-md bg-(--color-hover) border border-(--color-border) text-sm text-(--color-text) outline-none focus:ring-1 focus:ring-(--color-primary)";

    return (
        <div
            ref={ref}
            className="fixed z-[200] w-64 bg-(--color-surface) border border-(--color-border) rounded-xl shadow-2xl p-3 flex flex-col gap-3"
            style={{ left: pos.x, top: pos.y, fontFamily: "var(--font-display)" }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="flex items-center justify-between">
                <span className="px-4 py-2" style={{ fontFamily: "var(--font-display)" }}>
                    {el.label}
                </span>
                <button
                    className="px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl"
                    onClick={onClose}>
                    <i className="fa-solid fa-circle-minus"></i>
                </button>
            </div>

            {(el.type === "text" || el.type === "button") && field("Text",
                <input
                    className={inputCls}
                    value={p.text ?? (el.type === "button" ? "Button" : "Text")}
                    onInput={(e) => onUpdate(el.id, { text: (e.target as HTMLInputElement).value })}
                />
            )}

            {el.type === "image" && (
                <>
                    {field("Image URL",
                        <input
                            className={inputCls}
                            placeholder="https://..."
                            value={p.src ?? ""}
                            onInput={(e) => onUpdate(el.id, { src: (e.target as HTMLInputElement).value })}
                        />
                    )}
                    {field("Alt text",
                        <input
                            className={inputCls}
                            value={p.alt ?? ""}
                            onInput={(e) => onUpdate(el.id, { alt: (e.target as HTMLInputElement).value })}
                        />
                    )}
                </>
            )}

            {(el.type === "div" || el.type === "flex-row" || el.type === "flex-col" || el.type === "grid" || el.type === "image") && (
                <div className="grid grid-cols-2 gap-2">
                    {field("Width",
                        <input type="number" className={inputCls} value={p.width ?? 120}
                               onInput={(e) => onUpdate(el.id, { width: Number((e.target as HTMLInputElement).value) })} />
                    )}
                    {field("Height",
                        <input type="number" className={inputCls} value={p.height ?? 80}
                               onInput={(e) => onUpdate(el.id, { height: Number((e.target as HTMLInputElement).value) })} />
                    )}
                </div>
            )}

            {(el.type === "text" || el.type === "button") && field("Font size",
                <input type="number" className={inputCls} value={p.fontSize ?? 14}
                       onInput={(e) => onUpdate(el.id, { fontSize: Number((e.target as HTMLInputElement).value) })} />
            )}

            <div className="grid grid-cols-2 gap-2">
                {(el.type === "div" || el.type === "flex-row" || el.type === "flex-col" || el.type === "grid" || el.type === "button") &&
                    field("Background",
                        <input type="color" className="w-full h-8 rounded cursor-pointer border border-(--color-border)"
                               value={p.bgColor ?? "#f3f4f6"}
                               onInput={(e) => onUpdate(el.id, { bgColor: (e.target as HTMLInputElement).value })} />
                    )
                }
                {(el.type === "text" || el.type === "button") &&
                    field("Text color",
                        <input type="color" className="w-full h-8 rounded cursor-pointer border border-(--color-border)"
                               value={p.textColor ?? "#000000"}
                               onInput={(e) => onUpdate(el.id, { textColor: (e.target as HTMLInputElement).value })} />
                    )
                }
            </div>

            {field("Border radius",
                <input type="number" className={inputCls} value={p.borderRadius ?? 4}
                       onInput={(e) => onUpdate(el.id, { borderRadius: Number((e.target as HTMLInputElement).value) })} />
            )}

            <div className="border-t border-(--color-border) pt-2 mt-1">
                <button
                    onClick={() => { onDelete(el.id); onClose(); }}
                    className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition"
                >
                    <i className="fa-solid fa-trash mr-2 text-xs" /> Delete element
                </button>
            </div>
        </div>
    );
}