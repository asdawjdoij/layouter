import {useRef, useState} from "preact/hooks";
import {Toolbar, ToolbarContents} from "@/components/Toolbar.tsx";
import type {CanvasElement, ElementType, Tool} from "@/lib/api/types.ts";

export default function MainCanvas() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState(false);
    const [activeTool, setActiveTool] = useState<Tool>("select");
    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
    const [toolbarWidth, setToolbarWidth] = useState(208);
    const [mobileOpen, setMobileOpen] = useState(false);

    function addElement(type: ElementType, label: string) {
        setCanvasElements(prev => [...prev, {id: crypto.randomUUID(), type, label}]);
        setMobileOpen(false);
    }

    return (
        <div className="w-full h-screen flex flex-col">

            {settings && (
                <div className="z-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-[calc(100%-2rem)] max-w-120 h-full max-h-60 bg-(--color-surface) border border-(--color-border) rounded-xl">
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

            <nav id="topbar"
                 className="flex px-2 py-2 justify-between bg-(--color-surface) border-b border-b-(--color-border)">
                <a href="/" className="flex items-center gap-2" style={{fontFamily: "var(--font-display)"}}>
                    <img src="/favicon.svg" alt="Layouter Logo" className="h-8 w-8"/>
                    <span className="text-2xl">Layouter</span>
                </a>
                <ul className="flex flex-row gap-2 items-center">
                    <li onClick={() => setSettings(s => !s)}
                        className="my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl">
                        <i className="fa-solid fa-gear"></i>
                    </li>
                    <li onClick={() => setMobileOpen(o => !o)}
                        className="md:hidden my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl">
                        <i className={mobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                    </li>
                </ul>
            </nav>

            {mobileOpen && (
                <div className="md:hidden container z-50 bg-(--color-surface) border-b border-(--color-border) overflow-y-auto max-h-[55vh]">
                    <ToolbarContents
                        activeTool={activeTool}
                        onToolChange={(t) => { setActiveTool(t); setMobileOpen(false); }}
                        onAddElement={addElement}
                        collapsed={false}
                    />
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                <Toolbar
                    activeTool={activeTool}
                    onToolChange={setActiveTool}
                    onAddElement={addElement}
                    width={toolbarWidth}
                    onWidthChange={setToolbarWidth}
                />

                <main
                    id="canvas"
                    ref={canvasRef}
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
                        {canvasElements.map((canvasElement: CanvasElement) => (
                            <div key={canvasElement.id}>{canvasElement.label}</div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}