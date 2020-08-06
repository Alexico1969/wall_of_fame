document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();
    
    const db = firebase.firestore();

    const contestant = db.collection('contestants').doc('JH4dw6KLdOZRJRYpDLPM');

    contestant.get().then(doc => {

        const data = doc.data();
        console.log(data);
        document.write( data.Name_ + '<br>');
        document.write( data.Time + '<br>');
        document.write( data.Timestamp  + '<br>');
    });

    document.write("test");
    
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result =>{
            const user = result.user;
            document.write('Hello, ');
            document.write(user.displayName)
            console.log(user);


        })
        .catch(console.log)

}