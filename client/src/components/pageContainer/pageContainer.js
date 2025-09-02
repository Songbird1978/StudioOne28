import React from "react";
import "./pageContainer.css";
import { motion } from "framer-motion";

function PageContainer({ children }) {
    const containerVariants = {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "200%", opacity: 0 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            transition={{ duration: 0.5, ease: "easeIn" }}
            animate="animate"
            exit="exit"
            layout
        >
            <div className="pageContainer">{children}</div>
        </motion.div>
    );
}

export default PageContainer;
