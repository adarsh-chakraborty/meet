import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Users = () => {
  const [users, SetUsers] = useState();

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axios.get('/users', {
          signal: controller.signal
        });

        console.log(res.data);

        isMounted && SetUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          users.map((user,i) => <li key={i}>{user?.username}</li>)
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
    </article>
  );
};

export default Users;
