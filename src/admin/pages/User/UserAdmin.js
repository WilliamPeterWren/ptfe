import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import apiUser from '../../../api/apiUser';

function UserAdmin() {
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    apiUser.getAll().then(res =>{
      const usersData = res.data.map(item => {
        return {
          id: item.id,
          username: item.username,          
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          phone: item.phone,
          address: item.address,
          role: item.role.name,
          blocked: item.blocked          
        }
      })
      setUsers(usersData);      
    });
  })
  return (
    users && <div>
      <br/>
      <h1 className='ml-4'>User Admin</h1>
      <table className='mt-4 ml-4'>
        <thead>
          <tr>            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Blocked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone == undefined ? "Phone number is empty" : user.phone}</td>
              <td>{user.address == undefined ? "Address is empty" : user.address}</td>
              <td>{user.role}</td>
              <td>{user.blocked === true ? "Blocked" : "Not Blocked"}</td>
              <td>
                <Link to={`/admin/dashboard/user-admin/detail-user/${user.id}`}>
                    <button className='btn btn-white' >
                      <svg
                       fill="#000000" width="40" height="40" viewBox="0 0 64 64" id="Layer_1_1_" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                          <path d="M36,21c0-2.206-1.794-4-4-4s-4,1.794-4,4s1.794,4,4,4S36,23.206,36,21z M30,21c0-1.103,0.897-2,2-2s2,0.897,2,2   s-0.897,2-2,2S30,22.103,30,21z" />
                          <path d="M27,41v6h10v-6h-2V27h-8v6h2v8H27z M29,31v-2h4v14h2v2h-6v-2h2V31H29z" />
                          <path d="M32,1C14.907,1,1,14.907,1,32s13.907,31,31,31s31-13.907,31-31S49.093,1,32,1z M32,61C16.009,61,3,47.991,3,32   S16.009,3,32,3s29,13.009,29,29S47.991,61,32,61z" />
                          <path d="M32,7c-5.236,0-10.254,1.607-14.512,4.649l1.162,1.628C22.567,10.479,27.184,9,32,9c12.682,0,23,10.318,23,23   c0,4.816-1.479,9.433-4.277,13.35l1.628,1.162C55.393,42.254,57,37.236,57,32C57,18.215,45.785,7,32,7z" />
                          <path d="M32,55C19.318,55,9,44.682,9,32c0-4.817,1.479-9.433,4.277-13.35l-1.627-1.162C8.608,21.746,7,26.764,7,32   c0,13.785,11.215,25,25,25c5.236,0,10.254-1.607,14.512-4.649l-1.162-1.628C41.433,53.521,36.816,55,32,55z" />
                        </g>
                      </svg>
                    </button>
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserAdmin
