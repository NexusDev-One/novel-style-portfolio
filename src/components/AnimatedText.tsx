import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedText({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'fade';
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-5% 0px -5% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 28 : 0,
        x: direction === 'left' ? -28 : 0,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0 }
          : {
              opacity: 0,
              y: direction === 'up' ? 28 : 0,
              x: direction === 'left' ? -28 : 0,
            }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word animated heading
export function AnimatedHeading({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const words = text.split(' ');

  return (
    <h2
      ref={ref}
      className={className}
      aria-label={text}
      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#1a1714' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.07,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

// Paragraph that fades in on scroll
export function AnimatedParagraph({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-3% 0px' });

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{ fontFamily: "'EB Garamond', serif", color: '#3d3830' }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.9,
        delay,
        ease: 'easeOut',
      }}
    >
      {text}
    </motion.p>
  );
}
