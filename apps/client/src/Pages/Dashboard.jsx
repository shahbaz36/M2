import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Play, User } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore'; // New store
import Visualizer from '../Components/Visualizer/Visualizer';
import Logo from '../Components/Logo/Logo';
import styles from './Dashboard.module.css';
import UserPopup from '../Components/UserPopup/UserPopup';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showUserPopup, setShowUserPopup] = React.useState(false);

  const {
    creationStatus,
    generatedInterviews,
    startVoiceCommand,
    processVoiceCommand
  } = useDashboardStore();

  return (
    <div className={styles.container}>

      {/* --- Header --- */}
      <header className={styles.header}>
        <Logo width={28} height={28} />
        <div className={styles.userInfo}>
          <span>{user?.displayName || user?.name || 'Student'}</span>
          <div style={{ position: 'relative' }}>
            <button
              className={styles.profileIcon}
              onClick={() => setShowUserPopup(!showUserPopup)}
              aria-label="View Profile"
            >
              <User size={20} />
            </button>
            {showUserPopup && (
              <UserPopup
                user={user}
                onClose={() => setShowUserPopup(false)}
              />
            )}
          </div>
          <button onClick={onLogout} style={{ color: 'var(--danger)', background: 'none' }}>
            Sign Out
          </button>
        </div>
      </header>

      {/* --- Hero: Voice Generation Agent --- */}
      <section className={styles.heroSection}>
        <h2 className={styles.heroTitle}>
          What interview would you like to create?
        </h2>

        {/* Reusing Visualizer with Dashboard Mode */}
        <div onClick={creationStatus === 'idle' ? startVoiceCommand : undefined} style={{ cursor: 'pointer' }}>
          <Visualizer mode="dashboard" customStatus={creationStatus} />
        </div>

        {/* Voice Controls */}
        {creationStatus === 'idle' && (
          <button className={styles.voiceBtn} onClick={startVoiceCommand}>
            <Mic size={18} />
            Tap to Speak
          </button>
        )}

        {creationStatus === 'listening' && (
          <button className={`${styles.voiceBtn} ${styles.active}`} onClick={processVoiceCommand}>
            Done Speaking
          </button>
        )}
      </section>

      {/* --- Generated Interviews List --- */}
      <section>
        <h3 className={styles.sectionTitle}>Your Generated Sessions</h3>

        <div className={styles.grid}>
          {generatedInterviews.map((interview, index) => (
            <div
              key={interview.id}
              className={`${styles.card} ${index === 0 ? styles.new : ''}`}
              onClick={() => navigate('/interview')}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h4 className={styles.cardTitle}>{interview.title}</h4>
                  <span className={styles.date}>{interview.date}</span>
                </div>
              </div>

              <span className={`
                ${styles.statusBadge} 
                ${interview.status === 'Completed' ? styles.completed : ''}
              `}>
                {interview.status === 'Completed' ? `Score: ${interview.score}` : 'Ready to Start'}
              </span>

              <div className={styles.startLink}>
                {interview.status === 'Completed' ? 'View Report' : 'Start Session'}
                <Play size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;