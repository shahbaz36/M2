import React from 'react';
import styles from './UserPopup.module.css';

const UserPopup = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.popup}>
                <div className={styles.header}>
                    <img
                        src={user.photoURL || user.profilePictureUrl || 'https://via.placeholder.com/150'}
                        alt={user.displayName || user.name}
                        className={styles.avatar}
                    />
                    <div className={styles.info}>
                        <h3 className={styles.name}>{user.displayName || user.name}</h3>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPopup;
