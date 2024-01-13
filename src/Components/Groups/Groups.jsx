import './Groups.css'
import React, {useEffect, useState} from 'react'
import Constants from "../../Util/Constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

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
          ? <><Link to={`/users/${userId}`}>{userId}</Link> | </> : ""}
        Groups
      </div>
      <Table
        columns={{"Id": "id", "Name": "name"}}
        rows={groups}
        type={"groups"}
      />
      <Pagination
        pages={pages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>

  );
}