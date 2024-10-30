import React, { useState } from 'react';
import styles from './Sidebar.module.css';

function Sidebar({ users, onUserSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.sidebar}>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.userList}>
        {filteredUsers.map((user, index) => (
          <li key={index} onClick={() => onUserSelect(user)} className={styles.userItem}>
           <span className={styles.userName}>{user[0]?.toUpperCase()}</span>{user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
