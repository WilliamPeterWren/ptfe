import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import apiUser from '../../../api/apiUser';
function DetailUserAdmin() {

  const {id} = useParams();

  const [user,setUser] = useState([]);

  useEffect(() => {

    apiUser.getOne(id).then(res =>{
      console.log("data: ",res.data);
      const userData = res.data;
        const form = [{       
            id: userData.id,     
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            role: userData.role.name,
            blocked: userData.blocked
        }]

      setUser(form);      
    });
  },[id,])

  return (
    <div>    
      <h1>Detail User Admin</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {
            user[0] && <tr key={user[0].id}>
              <td>{user[0].id}</td>
              <td>{user[0].username}</td>
              <td>{user[0].first_name}</td>
              <td>{user[0].last_name}</td>
              <td>{user[0].email}</td>
              <td>{user[0].phone == undefined ? "Phone number is empty" : user[0].phone}</td>
              <td>{user[0].address == undefined ? "Address is empty" : user[0].address}</td>
              <td>{user[0].role}</td>
              <td>{user[0].blocked === true ? "Blocked" : "Not Blocked"}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default DetailUserAdmin
