import { PropsWithChildren, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import "./SpeechBubble.css"

type SpeechBubblePropsType = PropsWithChildren<{
    delay?: number,
    timer?: number,
}>

const SpeechBubble = ({ children, delay=0, timer=3000 }: SpeechBubblePropsType) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, timer+delay);

        return () => clearTimeout(timeout);
    }, [timer, delay]);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div 
                        className="speech-bubble"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SpeechBubble