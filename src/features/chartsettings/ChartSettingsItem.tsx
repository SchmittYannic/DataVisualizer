import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

type ChartSettingsItemPropsType = PropsWithChildren<{
    idx?: number,
}>

const ChartSettingsItem = ({ children, idx = 0 }: ChartSettingsItemPropsType) => {

    const initialOpacity = { opacity: 0, };
    const animateOpacity = { opacity: 1, };
    const exitOpacity = { opacity: 0, };

    return (
        <motion.div
            className="chart-settings-item"
            initial={initialOpacity}
            animate={animateOpacity}
            transition={{
                delay: 0.05 * idx,
                stiffness: 100
            }}
            exit={exitOpacity}
        >
            {children}
        </motion.div>
    )
}

export default ChartSettingsItem