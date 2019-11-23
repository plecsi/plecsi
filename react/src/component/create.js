import React, { useState} from 'react';
import axios from 'axios';
import { useHistory }from 'react-router-dom';

const useForm = (callback) => {
  const [values, setValues] = useState({
    public: true,
    description: "Create github",
    content:'',
    files: []

  });

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event) => {
    event.persist();
  
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};


const Form = () => {
  const { values, handleChange, handleSubmit } = useForm(createGist);
  let history = useHistory();

  async function createGist() {

      const datas  = {
            description: values.description,
            public: values.public,
            files: {
              [values.files] : {
                content: values.content
              }
            }
          }

    try {
	      const header = {
	       'Authorization': `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	     const res = await axios({
	              url: 'https://api.github.com/gists', 
	              method: 'post',
                headers: header,
                data: datas
	            });      
        history.push("/");
	      } catch (e) {
	      console.log('Failure!', e);
	      }
  }

  return (
 <div className="file-edit">
 <form onSubmit={handleSubmit}>
      <div className="file-edit">
        <h2 className="file-edit__name">
        	<input type="text" name="files" onChange={handleChange} value={values.files} placeholder="filename.ext"/>
    	</h2>
        <textarea name="content" onChange={handleChange} value={values.content}></textarea>
        <div className="file-edit__buttons">
          <button className="btn btn--positive">Save</button>
        </div>
      </div>
    
</form>
  </div>

  );
};


const Create = () => {
  return (
    <Form />
  );
};

export default Create;