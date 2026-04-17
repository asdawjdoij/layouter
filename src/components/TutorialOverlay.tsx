const steps = [
    {
        title: "Welcome",
        description: "This quick tour will show you how to build and arrange elements on your canvas.",
        targetId: "canvas",
    },
    {
        title: "Toolbar",
        description: "Use the toolbar to add elements like text, shapes, and images to your canvas.",
        targetId: "toolbar",
    },
    {
        title: "Drag & Drop",
        description: "Click and drag elements from the toolbar onto the canvas to start building.",
        targetId: "canvas",
    },
    {
        title: "Edit Elements",
        description: "Select any element on the canvas to move, resize, or edit its properties.",
        targetId: "canvas",
    },
    {
        title: "Layers / Structure",
        description: "Manage overlapping elements and structure your design for better organization.",
        targetId: "layers",
    },
    {
        title: "Canvas",
        description: "This is your workspace where you freely arrange and design your layout.",
        targetId: "canvas",
    },
    {
        title: "Finish",
        description: "You're ready to start building! Explore and experiment with your canvas.",
        targetId: "canvas",
    },
];

export function TutorialOverlay({ step, onNext, onBack, onClose }) {
    const current = steps[step];

    const isFirst = step === 0;
    const isLast = step === steps.length - 1;

    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
        >
            <div
                className="bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 animate-[fade-up_0.25s_ease-out]"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--color-muted-text)]">
                            Step {step + 1} of {steps.length}
                        </p>

                        <h2 className="text-xl font-semibold mt-1">
                            {current.title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-sm text-[var(--color-muted-text)] hover:text-[var(--color-text)] transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-4 w-full h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-primary)] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="mt-4 text-[var(--color-muted-text)] leading-relaxed">
                    {current.description}
                </p>

                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-md text-sm text-[var(--color-muted-text)] hover:bg-[var(--color-hover)] transition"
                    >
                        Skip Tutorial
                    </button>

                    <div className="flex gap-2">
                        {!isFirst && (
                            <button
                                onClick={onBack}
                                className="px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] hover:bg-[var(--color-hover)] transition"
                            >
                                Back
                            </button>
                        )}

                        <button
                            onClick={isLast ? onClose : onNext}
                            className="px-4 py-1.5 rounded-md text-sm font-medium text-[#0F111A] bg-[var(--color-primary)] hover:bg-[var(--color-accent)] transition"
                        >
                            {isLast ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}