import { IEmployee } from "./IEmployee";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../AuthApi";
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

const Add = () => {
  const [dept, setDept] = useState([]);
  const [sedi, setDesi] = useState([]);
  const [emp, setEmp] = useState([]);
  const [hob, setHob] = useState([]);
  const [rol, setRol] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => await GetInfo())();
  }, []);

  const GetInfo = async () => {
    const resp = await AuthApi.get("/api/Employee/GetInfo").then(
      (result) => {
        if (result.data.status) {
          console.log(result.data.data);
          setDept(result.data.data.department);
          setDesi(result.data.data.designation);
          setEmp(result.data.data.employee);
          setHob(result.data.data.hobbies);
          setRol(result.data.data.roles);
        }
      },
      (error) => {}
    );
  };

  const [FormValues, setFormValues] = useState<IEmployee>({
    userName: "",
    password: "",
    employeeId: 0,
    name: "",
    managerId: 0,
    departmentId: 0,
    designationId: 0,
    hobbies: "",
    doj: new Date(),
    roleId: 0,
    //status": 0,
  });

  const selectHobbies = (e: any) => {
    console.log(e);

    let newA = e.reduce((a: any, o: any) => (a.push(o.hobbiesId), a), []);
    //console.log(newA);array.toString()
    setFormValues({ ...FormValues, ["hobbies"]: newA.toString() });
  };

  const SubmitLogIn = async (e: any) => {
    e.preventDefault();
    const resp = await AuthApi.post("/api/Employee/Add", FormValues).then(
      (result) => {
        if (result.data.status) {
          navigate("/home");
          //console.log(result.data.data);
        }
      },
      (error) => {}
    );
    console.log(FormValues);
  };
  const HandleFormChange = (e: any) => {
    setFormValues({ ...FormValues, [e.target.name]: e.target.value });
  };
  return (
    <div id='login'>
      <h3 className='text-center text-white pt-5'>Employee </h3>
      <div className='container'>
        <div id='login-column' className='col-md-6'>
          <div id='login-box' className='col-md-12'>
            <form
              id='login-form'
              className='form'
              onSubmit={SubmitLogIn}
              action=''
            >
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Name:
                </label>
                <input
                  type='text'
                  name='name'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Role:
                </label>

                <select
                  name='roleId'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                >
                  <option value='0'>Select</option>
                  {rol.map((x: any) => (
                    <option key={x.roleId} value={x.roleId}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Manager:
                </label>

                <select
                  name='managerId'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                >
                  <option value='0'>Select</option>
                  {emp.map((x: any) => (
                    <option key={x.employeeId} value={x.employeeId}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Department:
                </label>

                <select
                  name='departmentId'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                >
                  <option value='0'>Select</option>
                  {dept.map((x: any) => (
                    <option key={x.departmentId} value={x.departmentId}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Designation:
                </label>

                <select
                  name='designationId'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                >
                  <option value='0'>Select</option>
                  {sedi.map((x: any) => (
                    <option key={x.designationId} value={x.designationId}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Hobbies:
                </label>

                <Multiselect
                  options={hob}
                  onSelect={(e) => selectHobbies(e)}
                  displayValue='name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  DOJ:
                </label>
                <input
                  type='date'
                  name='doj'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='UserName' className='text-info'>
                  Username:
                </label>
                <input
                  type='text'
                  name='userName'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='Password' className='text-info'>
                  Password:
                </label>
                <input
                  name='password'
                  type='password'
                  onChange={(e) => HandleFormChange(e)}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <input
                  type='submit'
                  name='submit'
                  className='btn btn-info btn-md'
                  value='submit'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
