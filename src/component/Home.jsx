import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApi from "../AuthApi";
import { useState, useEffect } from "react";
const Home = () => {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    (async () => await GetList())();
  }, []);

  const DeleteEmp = async (e) => {
    const resp = await AuthApi.get("/api/Employee/DeleteEmployee?id=" + e).then(
      (result) => {},
      (error) => {}
    );
    console.log(e);
    (async () => await GetList())();
  };
  const GetList = async () => {
    const resp = await AuthApi.get("/api/Employee/GetAll").then(
      (result) => {
        setRequest(result.data);
      },
      (error) => {}
    );
  };
  return (
    <div className='card'>
      <div className='card-header'>
        <h5>Employee List </h5>
        <div className='text-right'>
          <Link to={`/add`}>Add</Link>
        </div>
      </div>
      <div className='card-body'>
        <div className='container'>
          <table className='table align-items-center table-flush'>
            <thead className='thead-light'>
              <tr>
                <th>Name</th>
                <th>Department </th>
                <th>Manager</th>
                <th>Designation</th>
                <th>Hobbies</th>

                <th></th>
              </tr>
            </thead>
            <tbody className='list'>
              {request.map((x) => (
                <tr key={x.employeeId}>
                  {/* <td>{GlbDisplayMonthDay(x.Date)}</td> */}
                  <td>{x.empName}</td>
                  <td>{x.department}</td>
                  <td>{x.manName}</td>
                  <td>{x.designation}</td>
                  <td>{x.hobbies}</td>

                  <td>
                    {/* <Link to={`/myrequest/view/${x.RequestId}`}>
                      <FiEye color='green' />
                    </Link> */}
                    <button onClick={() => DeleteEmp(x.employeeId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
