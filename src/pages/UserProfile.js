import React from "react";

function UserProfile({ userInformation }) {
  return (
    <div className="PageWrapper">
      <h2>User Profile</h2>
      <p>EMAIL: {userInformation.email}</p>
      <p>NAME: {userInformation.displayName}</p>
      <p>UID: {userInformation.uid}</p>
    </div>
  );
}

export default UserProfile;
