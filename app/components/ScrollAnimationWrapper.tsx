'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';


interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function ScrollAnimationWrapper({ children, delay = 0 }: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}