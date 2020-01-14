import React from "react";
import LangModel from './LangModel';
import FormPanel from '../validation/components/FormPanel';
import submit from '../validation/callback';

function Lang(props) {
  const submitCallback = e => {
    const result = submit(LangModel)
    console.log('submit', result)
}
  return (
    <>
     <FormPanel submitCallback={submitCallback} model={LangModel}/>
    </>
  );
}

export default Lang;