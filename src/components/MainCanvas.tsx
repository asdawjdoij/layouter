import {useRef, useState} from "preact/hooks";
import {Toolbar, ToolbarContents} from "@/components/Toolbar.tsx";
import type {CanvasElement, ElementType} from "@/lib/api/types.ts";
import {Code} from "@/components/ui/Code.tsx";
import {renderElToString} from "@/lib/tailwind.ts";
import {Divider} from "@/components/ui/Divider.tsx";

export default function MainCanvas() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState(false);
    const [code, setCode] = useState(false);
    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
    const [toolbarWidth, setToolbarWidth] = useState(208);
    const [mobileOpen, setMobileOpen] = useState(false);

    const draggingEl = useRef<{
        id: string;
        startMouseX: number;
        startMouseY: number;
        startElX: number;
        startElY: number
    } | null>(null);

    function addElement(type: ElementType, label: string, x = 80, y = 80) {
        setCanvasElements(prev => [...prev, {
            id: crypto.randomUUID(),
            type,
            label,
            x,
            y,
            props: {},
        }]);
        setMobileOpen(false);
    }

    async function copyCode() {
        const lines = canvasElements.map(el => renderElToString(el, 0)).join("\n");
        await navigator.clipboard.writeText(lines);
    }

    function onCanvasDrop(e: DragEvent) {
        e.preventDefault();
        const type = e.dataTransfer?.getData("elementType") as ElementType;
        const label = e.dataTransfer?.getData("elementLabel");
        if (!type || !label) return;
        const bounds = canvasRef.current!.getBoundingClientRect();
        addElement(type, label, e.clientX - bounds.left, e.clientY - bounds.top);
    }

    function onElMouseDown(e: MouseEvent, id: string) {
        if (e.button !== 0) return;
        e.stopPropagation();
        const el = canvasElements.find(c => c.id === id)!;
        draggingEl.current = {
            id,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startElX: el.x,
            startElY: el.y,
        };
        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    }

    function onCanvasMouseMove(e: MouseEvent) {
        if (!draggingEl.current) return;
        const dx = e.clientX - draggingEl.current.startMouseX;
        const dy = e.clientY - draggingEl.current.startMouseY;
        const newX = draggingEl.current.startElX + dx;
        const newY = draggingEl.current.startElY + dy;
        setCanvasElements(prev =>
            prev.map(el => el.id === draggingEl.current!.id ? {...el, x: newX, y: newY} : el)
        );
    }

    function onCanvasMouseUp() {
        draggingEl.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <div id="none" className="w-full h-full absolute z-0"/>
            {settings && (
                <div
                    className="z-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-[calc(100%-2rem)] max-w-120 h-full max-h-60 bg-(--color-surface) border border-(--color-border) rounded-xl">
                    <div className="flex justify-between items-center py-2 px-4">
                        <h1 className="px-4 py-2" style={{fontFamily: "var(--font-display)"}}>Settings</h1>
                        <button
                            className="px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl"
                            onClick={() => setSettings(!settings)}>
                            <i className="fa-solid fa-circle-minus"></i>
                        </button>
                    </div>
                    <p className="flex-1 flex items-center gap-2 justify-center select-none text-(--color-muted-text)"
                       style={{fontFamily: "var(--font-display)"}}>
                        <i className="fa-solid fa-circle-question"></i>
                        Nothing here for now.
                    </p>
                </div>
            )}

            {code && (
                <div
                    className="z-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-[calc(100%-2rem)] max-w-120 h-full max-h-60 bg-(--color-surface) border border-(--color-border) rounded-xl">
                    <div className="flex justify-between items-center py-2 px-4">
                        <h1 className="px-4 py-2" style={{fontFamily: "var(--font-display)"}}>Code</h1>
                        <div className="flex gap-2">
                            {canvasElements.length !== 0 && (
                                <button
                                    className="px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl"
                                    onClick={() => copyCode()}>
                                    <i className="fa-solid fa-copy"></i>
                                </button>
                            )}
                            <button
                                className="px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl"
                                onClick={() => setCode(!code)}>
                                <i className="fa-solid fa-circle-minus"></i>
                            </button>
                        </div>
                    </div>
                    {canvasElements.length === 0 && (
                        <p className="flex-1 flex items-center gap-2 justify-center select-none text-(--color-muted-text)"
                           style={{fontFamily: "var(--font-display)"}}>
                            <i className="fa-solid fa-circle-question"></i>
                            You have no elements yet.
                        </p>
                    )}
                    {canvasElements.length > 0 && (
                        <div
                            className="flex-1 overflow-auto px-4 py-3 rounded-b-xl"
                            style={{
                                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                                fontSize: "11px",
                                lineHeight: "1.7"
                            }}
                        >
                            <div className="text-slate-500 italic mb-2 text-[10px]">// resolved tailwind classes</div>
                            {canvasElements.map(el => (
                                <div key={el.id} className="mb-1">
                                    <Code el={el} indent={0}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <nav id="topbar"
                 className="flex z-1 px-2 py-2 justify-between bg-(--color-surface) border-b border-b-(--color-border)">
                <a href="/" className="flex items-center gap-2" style={{fontFamily: "var(--font-display)"}}>
                    <img src="/favicon.svg" alt="Layouter Logo" className="h-8 w-8"/>
                    <span className="text-2xl">Layouter</span>
                </a>
                <ul className="flex flex-row gap-2 items-center">
                    <li onClick={() => setSettings(s => !s)}
                        className="hidden md:flex my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl">
                        <i className="fa-solid fa-gear"></i>
                    </li>
                    <li onClick={() => setCode(s => !s)}
                        className="hidden md:flex my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl">
                        <i className="fa-solid fa-code"></i>
                    </li>
                    <li onClick={() => setMobileOpen(o => !o)}
                        className="md:hidden my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl">
                        <i className={mobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                    </li>
                </ul>
            </nav>

            {mobileOpen && (
                <div
                    className="md:hidden container z-50 bg-(--color-surface) border-b border-(--color-border) overflow-y-auto max-h-[55vh]">
                    <li onClick={() => setSettings(s => !s)}
                        style={{fontFamily: "var(--font-display)"}}
                        className="text-(--color-text) mt-2 list-none my-auto px-4 mx-2 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-lg text-sm">
                        <i className="text-(--color-muted-text) fa-solid fa-gear mr-2.5"/>
                        Settings
                    </li>
                    <li onClick={() => setCode(s => !s)}
                        style={{fontFamily: "var(--font-display)"}}
                        className="text-(--color-text) mb-2 list-none my-auto px-4 mx-2 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-lg text-sm">
                        <i className="text-(--color-muted-text) fa-solid fa-code mr-2.5"/>
                        Code
                    </li>
                    <Divider/>
                    <ToolbarContents
                        onAddElement={addElement}
                        collapsed={false}
                    />
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                <Toolbar
                    onAddElement={addElement}
                    width={toolbarWidth}
                    onWidthChange={setToolbarWidth}
                />

                <main
                    id="canvas"
                    ref={canvasRef}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onCanvasDrop}
                    onMouseMove={onCanvasMouseMove}
                    onMouseUp={onCanvasMouseUp}
                    onMouseLeave={onCanvasMouseUp}
                    className="flex-1 relative bg-gray-50 overflow-hidden"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="relative w-full h-full">
                        {canvasElements.map((el) => (
                            <div
                                key={el.id}
                                onMouseDown={(e) => onElMouseDown(e, el.id)}
                                style={{
                                    position: "absolute",
                                    left: el.x,
                                    top: el.y,
                                    transform: "translate(-50%, -50%)",
                                    cursor: "grab",
                                }}
                            >
                            </div>
                        ))}
                    </div>
                </main>
            </div>

        </div>
    );
}