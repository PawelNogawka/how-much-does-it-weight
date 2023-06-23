import React from "react";

import "./UsersLikes.scss";

const UsersLikes = ({ favoritesList }) => {
  const usersToImage = favoritesList.slice(0, 5);
  const othersUsers = favoritesList.slice(7).length;

  return (
    <div className="users-likes">
      <ul className="users-likes__list">
        {usersToImage.map((user, i) => (
          <li key={i} className="users-likes__user">
            <img width={40} height={40} src={user.image} alt={user.username} />
          </li>
        ))}
      </ul>
      {othersUsers > 0 && (
        <span className="users-likes__others">{`+ ${othersUsers} others users like it`}</span>
      )}
      {othersUsers <= 0 && (
        <span className="users-likes__others">likes it</span>
      )}
    </div>
  );
};

export default UsersLikes;
