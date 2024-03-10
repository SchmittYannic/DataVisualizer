import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

type ChartSettingsItemPropsType = PropsWithChildren<{
    idx?: number,
}>

const ChartSettingsItem = ({ children, idx=0 }: ChartSettingsItemPropsType) => {
    return (
        <motion.div 
            className="chart-settings-item"
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ 
                delay: 0.1 * idx, 
                stiffness: 100 
            }}
            exit={{ x: -500 }}
        >
            {children}
        </motion.div>
    )
}

export default ChartSettingsItem