import { useEffect, useState } from "react"
import { useScrollPositionType } from "../utils/types";

const useScrollPosition = ()=> {
    const [currentScrollPosition, setCurrentScrollPosition] = useState<useScrollPositionType>({
        scrollY: undefined,
        scrollX: undefined,
    });

    useEffect(() => {
        const handleScroll = () => {
            setCurrentScrollPosition({
                scrollY: window.scrollY,
                scrollX: window.scrollX,
            })
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return currentScrollPosition
}

export default useScrollPosition