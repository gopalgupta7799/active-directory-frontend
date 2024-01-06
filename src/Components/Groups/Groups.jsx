import './Groups.css'
import React, {useEffect, useState} from 'react'
import Constants from "../../Util/Constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Groups() {
  const [pageNumber, setPageNumber] = useState(0);
  const [groups, setGroups] = useState([]);
  const [pages, setPages] = useState([]);
  let {userId} = useParams();

  useEffect(() => {
    let endpoint = "";
    if (userId !== undefined) {
      endpoint += "/users/" + userId;
    }
    endpoint += "/groups";
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
        setGroups(data.content)
      });
  }, [userId, pageNumber]);

  return (
    <div id={"groups"}>
      <div className={"pageHeading"}>
        {userId !== undefined
          ? <Link to={`/users/${userId}`}>{userId} </Link> : ""}
        Groups
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
        {groups.map(group => (
          <tr key={group.id}>
            <td><Link to={`/groups/${group.id}`} style={{color: "var(--link-color)"}}>{group.id}</Link></td>
            <td>{group.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className={"pagination"}>
        {
          pages.map((page, i) =>
            <span key={i} className={"pageNumber"}
                  style={pageNumber === page - 1 ? {"border": "2px solid var(--theme-color)"} : {}}
                  onClick={(e) =>
                    setPageNumber(parseInt(e.currentTarget.innerText) - 1)
                  }
            >
              {page}
            </span>)
        }
      </div>
    </div>

  );
}