import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import ClipLoader from "./ClipLoader"

type AsyncButtonPropsType = PropsWithChildren<{
    isLoading: boolean,
    size?: number,
    color?: string,
} & ButtonHTMLAttributes<HTMLButtonElement>>

const AsyncButton = ({
    isLoading,
    children,
    size=20,
    color="rgb(209,213,219)",
    ...props
}: AsyncButtonPropsType) => {
    return (
        <button
            {...props}
            disabled={isLoading}
        >
            <p className={isLoading ? "hidden" : "visible"}>
                {children}
            </p>
            {(isLoading && 
                <div className="cliploader-centered">
                    <ClipLoader
                        color={color}
                        loading={isLoading}
                        size={size}
                    />
                </div>
            )}
        </button>
    )
}

export default AsyncButton