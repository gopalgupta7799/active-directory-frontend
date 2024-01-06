import './Users.css'
import React, {useEffect, useState} from 'react'
import Constants from "../../Util/Constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Users() {
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  let {groupId} = useParams();

  useEffect(() => {
    let endpoint = "";
    if (groupId !== undefined) {
      endpoint += "/groups/" + groupId;
    }
    endpoint += "/users";
    console.log(endpoint)
    axios.get(Constants.BACKEND_URL + endpoint, {
      headers: {
        "pageNumber": pageNumber
      }
    })
      .then((response) => response.data)
      .then((data) => {
        let temp = [];
        for (let i = 0; i < data.totalPages; i++) {
          temp.push(i + 1);
        }
        setPages([...temp])
        setUsers(data.content)
      });
  }, [groupId, pageNumber]);

  return (
    <div id={"users"}>
      <div className={"pageHeading"}>
        {groupId !== undefined
          ? <Link to={`/groups/${groupId}`}>{groupId} </Link> : ""}
        Users
      </div>
      <table>
        <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Email</td>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`} style={{color: "var(--link-color)"}}>{user.id}</Link></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className={"pagination"}>
        {
          pages.map((page, i) =>
            <span key={i}
                  className={"pageNumber"}
                  style={pageNumber === page - 1 ? {"border": "2px solid var(--theme-color)"} : {}}
                  onClick={(e) =>
                    setPageNumber(parseInt(e.currentTarget.innerText) - 1)
                  }
            >{page}</span>)
        }
      </div>
    </div>

  );
}