export const tutorialSteps = [
    {
        title: "Welcome",
        description: "This quick tour will show you how to build and arrange elements on your canvas.",
        targetId: "canvas",
    },
    {
        title: "Topbar",
        description: "Use the topbar to edit settings for your canvas.",
        targetId: "topbar",
    },
    {
        title: "Toolbar",
        description: "Use the toolbar to add elements like text, shapes, and images to your canvas.",
        targetId: "toolbar",
    },
    {
        title: "Canvas",
        description: "This is your workspace where you freely arrange and design your layout.",
        targetId: "canvas",
    },
    {
        title: "Finish",
        description: "You're ready to start building! Explore and experiment with your canvas.",
        targetId: "none",
    },
];

export function TutorialOverlay({ step, onNext, onBack, onClose }: {
    step: number;
    onNext: () => void;
    onBack: () => void;
    onClose: () => void;
}) {
    const current = tutorialSteps[step];

    const isFirst = step === 0;
    const isLast = step === tutorialSteps.length - 1;

    const progress = ((step + 1) / tutorialSteps.length) * 100;

    return (
        <div
            className="fixed z-100 px-4 sm:px-0 bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
        >
            <div
                className="bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 animate-[fade-up_0.25s_ease-out]"
            >

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--color-muted-text)]">
                            Step {step + 1} of {tutorialSteps.length}
                        </p>

                        <h2 className="text-xl font-semibold mt-1">
                            {current.title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-sm text-[var(--color-muted-text)] hover:text-[var(--color-text)] transition cursor-pointer"
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

                <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between mt-6">
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