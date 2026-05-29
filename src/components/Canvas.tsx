import {useEffect, useState} from "preact/hooks";
import {LoadingScreen} from "@/components/ui/LoadingScreen.tsx";
import MainCanvas from "@/components/MainCanvas.tsx";
import {TutorialOverlay, tutorialSteps} from "@/components/TutorialOverlay.tsx";
import {Spotlight} from "@/components/ui/Spotlight.tsx";
import {Curtain} from "@/components/ui/Curtain.tsx";

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

    return (
        <>

            <MainCanvas/>

            {showTutorial && (
                <>
                    <Spotlight targetId={tutorialSteps[step].targetId}/>
                    <TutorialOverlay
                        step={step}
                        onNext={() => setStep(s => s + 1)}
                        onBack={() => setStep(s => s - 1)}
                        onClose={() => setShowTutorial(false)}
                    />
                </>
            )}

            <Curtain reveal={loaded >= 100}>
                <LoadingScreen progress={loaded}/>
            </Curtain>

        </>
    );
}