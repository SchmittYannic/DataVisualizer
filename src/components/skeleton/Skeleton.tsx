import { ReactElement } from "react";
import "./Skeleton.css";

type SkeletonPropsType = {
    width: string,
    height: string,
    variant?: string,
}

const Skeleton = ({ width, height, variant }: SkeletonPropsType): ReactElement => {

    const style = {
        width,
        height,
    }

    return (
        <span className={`skeleton ${variant ? variant : ""}`} style={style}></span>
    )
}

export default Skeleton