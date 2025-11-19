import React from 'react';
import { useInterviewStore } from '../../store/interviewStore';
import styles from './Visualizer.module.css';

const Visualizer = ({ mode = 'interview', customStatus = null }) => {
  // If customStatus is passed (from Dashboard), use it.
  // Otherwise, grab it from the Interview Store.
  const storeStatus = useInterviewStore((state) => state.status);
  const status = customStatus || storeStatus;

  const getStatusClass = () => {
    if (status === 'speaking') return styles.speaking;
    if (status === 'listening') return styles.listening;
    if (status === 'processing') return styles.processing;
    return '';
  };

  const getStatusText = () => {
    if (mode === 'dashboard') {
      if (status === 'idle') return "Tap to Create Interview";
      if (status === 'listening') return "Listening... (e.g., 'React Senior Dev')";
      if (status === 'processing') return "Generating Session...";
      if (status === 'speaking') return "AI Confirmation";
      if (status === 'completed') return "Ready";
    }
    // Default Interview Mode text
    if (status === 'idle') return "Ready to Start";
    if (status === 'processing') return "Thinking...";
    if (status === 'speaking') return "AI Speaking";
    if (status === 'listening') return "Listening...";
    return "";
  };

  return (
    <div className={styles.container} style={mode === 'dashboard' ? { height: '200px' } : {}}>
      <div className={`${styles.orb} ${getStatusClass()}`}>
        <span>
           {status === 'speaking' ? 'AI' : status === 'listening' ? 'YOU' : '+'}
        </span>
        <div className={styles.ring} />
      </div>
      <p className={styles.statusText}>
        {getStatusText()}
      </p>
    </div>
  );
};

export default Visualizer;