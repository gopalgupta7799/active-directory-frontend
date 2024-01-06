import "./User.css"
import React, {useEffect, useState} from 'react'
import Constants from "../../Util/Constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function User() {
  const [user, setUser] = useState({});
  let {userId} = useParams();

  useEffect(() => {
    let endpoint = "/users/" + userId;
    axios.get(Constants.BACKEND_URL + endpoint)
      .then((response) => response.data)
      .then((data) => {
        setUser(data)
      });
  }, [userId]);

  return (
    <div id={"user"}>
      <Link to={`/users/${user.id}/groups`}>Groups</Link>
      <div className={"entityId"}>Id: {user.id}</div>
      <div className={"entityName"}>Name: {user.name}</div>
      <div className={"entityEmail"}>Email: {user.email}</div>
    </div>

  );
}