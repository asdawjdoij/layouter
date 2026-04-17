const STAGES = [
    { at: 0,   label: "Launching engine..." },
    { at: 18,  label: "Warming up the canvas..." },
    { at: 36,  label: "Importing your imagination..." },
    { at: 54,  label: "Aligning the pixels..." },
    { at: 72,  label: "Polishing the edges..." },
    { at: 90,  label: "Almost ready..." },
    { at: 100, label: "Let's go." },
];

export function LoadingScreen({ progress }: { progress: number }) {
    const stageIdx = [...STAGES].findLastIndex(s => progress >= s.at);
    const stage = STAGES[stageIdx];

    return (
        <div style={{ fontFamily: "var(--font-display)" }}
             class="flex flex-col items-center justify-center w-full h-screen bg-[var(--color-bg)]">

            <div class="flex flex-col items-center gap-12 w-full max-w-sm px-8">

                <div class="flex flex-row items-center gap-2.5" style={{ animation: "fade-up 0.5s ease both" }}>
                    <img src="/favicon.svg" alt="Layouter Logo" class="h-9 w-9" />
                    <span class="text-3xl font-normal tracking-tight text-[var(--color-text)]">
                        Layouter
                    </span>
                </div>

                <div class="flex flex-col gap-4 w-full" style={{ animation: "fade-up 0.5s ease 0.15s both" }}>
                    <div class="w-full h-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                        <div
                            class="h-full rounded-full bg-[var(--color-text)] transition-[width] duration-[120ms] ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div class="flex flex-row justify-between items-center">
                        <span
                            key={stageIdx}
                            class="text-[13px] text-[var(--color-muted-text)]"
                            style={{ animation: "tick 0.4s ease both" }}
                        >
                            {stage.label}
                        </span>
                        <span class="text-[13px] text-[var(--color-muted-text)] tabular-nums font-medium">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}