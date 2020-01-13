import React from 'react'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    
    <tr >
            <td>{props.users.nickname}</td>
            <td>{props.users.firstname}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(props.users)
                }}
                className="btn waves-effect waves-teal"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(props.users.user_id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
    </tbody>
  </table>
)

export default UserTable
