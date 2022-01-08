export function PostData(type, userData){

    let BaseUrl = 'http://localhost/cooptationAPI/public/api/'; 

    return new Promise((resolve, reject) => {

        fetch(BaseUrl + type, {
            methode: 'POST',
            body: JSON.stringify(userData)
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