import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";
import moment from "moment";

import styles from "./profile.module.css";
import { getPrice } from "../../utils/general";

const Profile = () => {
  const { accessToken } = useContext(AuthManagerContext);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(false);
    setLoading(true);
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        setProfile(response.data.profile);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>There has been an error</div>;
  }

  console.log("orders", profile);

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <div>{profile.CardName}</div>
          <div>{profile.Phone1}</div>
          <div>{profile.Phone2}</div>
          <h4>Address</h4>
          <div>{profile.Address}</div>
          <div>{profile.ZipCode}</div>
          <h4>Mail Address</h4>
          <div>{profile.MailAddres}</div>
          <div>{profile.MailZipCod}</div>
          <h4>Contact Person</h4>
          <div>{profile.CntctPrsn}</div>
          <div>{profile.E_mail}</div>
          <div>
            {profile.CreateDate
              ? moment(profile.CreateDate).format("Mo MMMM YYYY")
              : null}
          </div>
          <div>{getPrice(profile.Balance)}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
