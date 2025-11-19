import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, PhoneOff, Play } from 'lucide-react';
import { useInterviewStore } from '../store/interviewStore';
import Visualizer from '../Components/Visualizer/Visualizer';
import Logo from '../Components/Logo/Logo';
import styles from './Interview.module.css';

const InterviewPage = () => {
  const navigate = useNavigate();
  
  // Get state and actions from the Store
  const { status, startInterview, userFinishedSpeaking, endInterview } = useInterviewStore();

  // Cleanup: End interview if user leaves the page
  useEffect(() => {
    return () => endInterview();
  }, []);

  const handleEndSession = () => {
    endInterview();
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      
      {/* --- Header --- */}
      <header className={styles.header}>
        <Logo width={32} height={32} />
        
        {/* Only show session info if active */}
        {status !== 'idle' && status !== 'completed' && (
          <span className={styles.sessionInfo}>• Live Session</span>
        )}

        <button className={styles.endBtn} onClick={handleEndSession}>
          <PhoneOff size={16} />
          <span>End</span>
        </button>
      </header>

      {/* --- Main Stage --- */}
      <main className={styles.main}>
        
        {status === 'idle' ? (
          <div className={styles.startContainer}>
            <h2 className={styles.title}>Ready to begin?</h2>
            <p className={styles.desc}>
              The AI will ask you 3 behavioral questions. 
              Speak clearly and take your time.
            </p>
            <button className={styles.primaryBtn} onClick={startInterview}>
              <Play fill="currentColor" size={18} />
              Start Interview
            </button>
          </div>
        ) : status === 'completed' ? (
          <div className={styles.startContainer}>
            <h2 className={styles.title}>Session Complete!</h2>
            <p className={styles.desc}>
              Great job. Your feedback report is generating.
            </p>
            <button className={styles.primaryBtn} onClick={handleEndSession}>
              Return to Dashboard
            </button>
          </div>
        ) : (
          // THE VISUALIZER (Handles Speaking/Listening animations)
          <Visualizer />
        )}
      </main>

      {/* --- Footer Controls --- */}
      {/* Only show controls when interview is active */}
      {status !== 'idle' && status !== 'completed' && (
        <footer className={styles.footer}>
          
          {/* Mute Button (Visual Only) */}
          <button className={styles.iconBtn}>
            <MicOff size={20} />
          </button>

          {/* Main Action Button */}
          {status === 'listening' ? (
            <button className={styles.actionBtn} onClick={userFinishedSpeaking}>
              Done Speaking
            </button>
          ) : (
            <button className={styles.disabledBtn} disabled>
              <Mic size={16} className="animate-pulse" />
              AI Speaking...
            </button>
          )}

        </footer>
      )}
    </div>
  );
};

export default InterviewPage;