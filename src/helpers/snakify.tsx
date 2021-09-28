function snakifyKeys(fields: any) {
    let jsonFields = JSON.parse(JSON.stringify(fields));
    
    for (let key in jsonFields) {
      if (jsonFields[key] instanceof Object) {
        jsonFields[key] = snakifyKeys(jsonFields[key]);
      }
  
      let snakeKey = key.replace(/\.?([A-Z]+)/g, function(x, y) {return '_' + y.toLowerCase();}).replace(/^_/, '');
      jsonFields[snakeKey] = jsonFields[key];
      if (snakeKey !== key) {
        delete jsonFields[key];
      }
    }
    return jsonFields;
  }


export default snakifyKeys