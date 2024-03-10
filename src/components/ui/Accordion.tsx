import {
    useEffect,
    useId,
    useRef,
    forwardRef,
    PropsWithChildren,
    ButtonHTMLAttributes,
    HTMLAttributes,
    DetailedHTMLProps
} from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import "./Accordion.css";

type AccordionTriggerProps = PropsWithChildren<{
    "aria-expanded"?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}>;

const AccordionTrigger = ({ children, ...props }: AccordionTriggerProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props}>
            {children}
            <MdKeyboardArrowDown
                className={`accordion-trigger-svg ${props["aria-expanded"] ? "open" : ""}`}
                aria-hidden="true"
            />
        </button>
    )
}

type AccordionContentType = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentType>((props, ref) => {
    return (
        <div {...props} ref={ref}>
            <div
                className="accordion-content" 
            >
                {props.children}
            </div>
        </div>
    )
})

type AccordionType = {
    head: string,
    isExpanded: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Accordion = ({ head, isExpanded, onClick, children }: PropsWithChildren<AccordionType>) => {

    const triggerId = useId();
    const contentId = useId();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentEl = contentRef.current;
        if(!contentEl) return
        if (!isExpanded) {
            contentEl.style.maxHeight = "0px";
            contentEl.style.visibility = "hidden";
            contentEl.style.opacity = "0";
            contentEl.style.borderBottomWidth = "0";
            contentEl.style.overflow = "hidden";
        } else {
            contentEl.style.maxHeight = contentEl.scrollHeight + "px";
            contentEl.style.visibility = "visible";
            contentEl.style.opacity = "1";
            contentEl.style.borderBottomWidth = "1px";
            contentEl.style.overflow = "visible";
        }
    }, [children, isExpanded])

    return (
        <div className="accordion">
            <AccordionTrigger
                id={triggerId}
                className={`accordion-trigger ${isExpanded ? "expanded" : ""}`}
                type="button"
                onClick={onClick}
                aria-expanded={isExpanded}
                aria-controls={contentId}
            >
                {head}
            </AccordionTrigger>
            <AccordionContent
                id={contentId}
                className="accordion-content-wrapper"
                ref={contentRef}
                aria-labelledby={triggerId}
            >
                {children}
            </AccordionContent>
        </div>
    )
}

export default Accordion;