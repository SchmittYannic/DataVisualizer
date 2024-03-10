import { PropsWithChildren } from "react"
import { Link, LinkProps } from "react-router-dom"
import ClipLoader from "./ClipLoader"

type AsyncLinkType = PropsWithChildren<{
    isLoading: boolean,
    size: number,
    color: string,
} & LinkProps>

const AsyncLink = ({
    isLoading,
    children,
    size=20,
    color="rgb(209,213,219)",
    ...props
}: AsyncLinkType) => {
    return (
        <>
            {isLoading ? (
                <span 
                    {...props}
                >
                    <p className="hidden">
                        {children}
                    </p>
                    <div className="cliploader-centered">
                        <ClipLoader
                            color={color}
                            loading={isLoading}
                            size={size}
                        />
                    </div>       
                </span>
            ) : (
                <Link
                    {...props}
                >
                    <p className="visible">
                        {children}
                    </p>
                </Link>
            )}
        </>
    )
}

export default AsyncLink