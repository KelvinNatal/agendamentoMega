export function PostData(type, userData){

    let BaseURL = 'http://localhost/final/index.php/';
    return new Promise  ((resolve, reject) => {
       fetch(BaseURL+type,{
        mode: 'no-cors',
        method: 'POST', 
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {   
           resolve(responseJson);           
      })
      .catch((error) => {
        reject(error);
      });
      
    });
}