import React from 'react'

const EditUserForm = data => {
  console.log('props', data)

  const model = [
    {
      name: 'firstname',
      label: 'firstname',
      type: 'text',
      value: data ? data.firstname : '',
    }, 
    {
      name: 'nickname',
      label: 'nickname',
      type: 'text',
      value: data ? data.nickname : '',
    }
  ]

  return model
}

export default EditUserForm
