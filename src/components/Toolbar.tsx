import {useEffect, useRef} from "preact/hooks";
import {Divider} from "@/components/ui/Divider.tsx";
import type {ElementType, Tool} from "@/lib/api/types.ts";

const elements: { label: string; items: { type: ElementType; icon: string; label: string }[] }[] = [
    {
        label: "Layout",
        items: [
            {type: "div", icon: "fa-regular fa-square", label: "Div"},
            {type: "flex-row", icon: "fa-solid fa-grip-lines", label: "Flex Row"},
            {type: "flex-col", icon: "fa-solid fa-grip-lines-vertical", label: "Flex Col"},
            {type: "grid", icon: "fa-solid fa-border-all", label: "Grid"},
        ],
    },
    {
        label: "Content",
        items: [
            {type: "text", icon: "fa-solid fa-t", label: "Text"},
            {type: "image", icon: "fa-regular fa-image", label: "Image"},
            {type: "button", icon: "fa-regular fa-hand-pointer", label: "Button"},
        ],
    },
];

export function Toolbar({activeTool, onToolChange, onAddElement, width, onWidthChange}: {
    activeTool: Tool;
    onToolChange: (t: Tool) => void;
    onAddElement: (type: ElementType, label: string) => void;
    width: number;
    onWidthChange: (w: number) => void;
}) {

    const dragging = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(width);
    const collapsed = width < 120;

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!dragging.current) return;
            onWidthChange(Math.min(400, Math.max(72, startWidth.current + (e.clientX - startX.current))));
        }
        function onMouseUp() {
            if (!dragging.current) return;
            dragging.current = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        }
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [onWidthChange]);

    return (
        <div className="hidden md:flex relative h-full flex-shrink-0" style={{width}}>
            <aside
                id="toolbar"
                className="h-full w-full border-r border-(--color-border) flex flex-col overflow-y-auto overflow-x-hidden bg-(--color-surface)"
            >
                <ToolbarContents
                    activeTool={activeTool}
                    onToolChange={onToolChange}
                    onAddElement={onAddElement}
                    collapsed={collapsed}
                />
            </aside>
            <div
                onMouseDown={(e) => {
                    dragging.current = true;
                    startX.current = e.clientX;
                    startWidth.current = width;
                    document.body.style.cursor = "col-resize";
                    document.body.style.userSelect = "none";
                    e.preventDefault();
                }}
                className="absolute right-0 top-0 h-full w-3 cursor-col-resize z-10 group flex items-center justify-center"
                style={{transform: "translateX(50%)"}}
            >
                <div className="w-0.5 h-full bg-(--color-border) opacity-0 group-hover:opacity-100 transition-opacity duration-150"/>
            </div>
        </div>
    );
}

export function ToolbarContents({activeTool, onToolChange, onAddElement, collapsed}: {
    activeTool: Tool;
    onToolChange: (t: Tool) => void;
    onAddElement: (type: ElementType, label: string) => void;
    collapsed: boolean;
}) {
    return (
        <>
            <div className="pt-2 pb-4 flex flex-col gap-4">
                {elements.map((group) => (
                    <>
                        {elements.indexOf(group) !== 0 ? <Divider/> : null}
                        <div className="px-2" key={group.label}>
                            {!collapsed && (
                                <p className="text-[10px] uppercase tracking-widest font-semibold text-(--color-muted-text) px-1 mb-2"
                                   style={{fontFamily: "var(--font-display)"}}>
                                    {group.label}
                                </p>
                            )}
                            <div className="flex flex-col gap-1">
                                {group.items.map((el) => (
                                    <button
                                        key={el.type}
                                        title={el.label}
                                        onClick={() => onAddElement(el.type, el.label)}
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer?.setData("elementType", el.type);
                                            e.dataTransfer?.setData("elementLabel", el.label);
                                        }}
                                        className={`
                                            flex items-center w-full rounded-lg text-sm
                                            hover:bg-(--color-hover) transition-colors duration-150 cursor-pointer
                                            text-(--color-text) text-left
                                            ${collapsed ? "justify-center px-2 py-2" : "gap-2.5 px-3 py-2"}
                                        `}
                                        style={{fontFamily: "var(--font-display)"}}
                                    >
                                        <i className={`${el.icon} w-4 text-center text-(--color-muted-text) text-xs flex-shrink-0`}></i>
                                        {!collapsed && <span className="truncate">{el.label}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}