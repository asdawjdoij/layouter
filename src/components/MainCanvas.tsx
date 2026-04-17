import { useRef } from "preact/hooks";

export default function MainCanvas() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Top Bar / Logo */}
            <header
                id="topbar"
                className="flex items-center justify-between px-6 py-4 border-b"
            >
                <a
                    href="/"
                    className="flex items-center gap-2"
                    style={{
                        fontFamily: "var(--font-display)",
                    }}
                >
                    <img src="/favicon.svg" alt="Layouter Logo" className="h-10 w-10" />
                    <span className="text-2xl">Layouter</span>
                </a>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside
                    id="toolbar"
                    className="w-16 border-r flex flex-col items-center py-4 gap-4"
                >
                    <button className="p-2 rounded-lg hover:bg-gray-200">
                        A
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200">
                        B
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200">
                        C
                    </button>
                </aside>

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
                    </div>
                </main>
            </div>
        </div>
    );
}