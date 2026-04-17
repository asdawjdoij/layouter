import {useEffect, useState} from "preact/hooks";
import {LoadingScreen} from "@/components/LoadingScreen.tsx";
import MainCanvas from "@/components/MainCanvas.tsx";
import {TutorialOverlay} from "@/components/TutorialOverlay.tsx";

export default function Canvas() {
    const [loaded, setLoaded] = useState<number>(0.0);
    const [showTutorial, setShowTutorial] = useState(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setLoaded(p => {
                if (p >= 100) {
                    clearInterval(id);
                    return 100;
                }
                return Math.min(100, p + Math.random() * 3.5 + 0.5);
            });
        }, 20);
        return () => clearInterval(id);
    }, []);

    if (loaded < 100) return <LoadingScreen progress={loaded}/>;

    return (
        <>
            <MainCanvas />

            {showTutorial && (
                <TutorialOverlay
                    step={step}
                    onNext={() => setStep(s => s + 1)}
                    onBack={() => setStep(s => s - 1)}
                    onClose={() => setShowTutorial(false)}
                />
            )}
        </>
    );
}