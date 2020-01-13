import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Nav = ()=> {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.github.com/users/plecsi',
      );
      setDatas(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
  	<header className="main-header">
      <Link to="/">
      	<h1 className="main-header__title">Github notes</h1>
      </Link>
      <figure className="user-info">
        <picture className="user-info__avatar"><img src={datas.avatar_url} alt={datas.toString()}/>
        <figcaption className="user-info__name"> {datas.login}</figcaption>
      </figure>
    </header> 
    </>
  );
}
export default Nav;