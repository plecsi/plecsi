const submit = data => {
    const a = []
    const b = []
    for(const i of data){
      a.push(i.name)
      b.push(i.value)
    }
    const columns = a;
    const rows = b;
    const result =  rows.reduce(function(result, field, index) {
        result[columns[index]] = field;
        return result;
    }, {})
    return result
  }

  export default submit;