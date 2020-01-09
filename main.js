// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw6810iK0KtbMYZG0rDYRP5cHuJrTqvMk",
    authDomain: "todo-database-7aa86.firebaseapp.com",
    databaseURL: "https://todo-database-7aa86.firebaseio.com",
    projectId: "todo-database-7aa86",
    storageBucket: "todo-database-7aa86.appspot.com",
    messagingSenderId: "605547808103",
    appId: "1:605547808103:web:5cc31b84babb014466dbc2"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// reference todo's collection
var todoRef = firebase.database().ref('todolists');

// get data from firebase database
todoRef.on('value', gotData, errData)

// when there is data
function gotData(data){
    var todos = data.val();
    var keys = Object.keys(todos)
    console.log(keys);
    var list = document.getElementById('todolist');
    list.innerHTML = "";
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var todo = todos[k].item;
        var done = todos[k].done;
        var li = document.createElement('li');
        li.innerHTML = '<button id="' + k + '" class="btn" onmousedown="update(event,this.id)">' + todo + '</button>';
        if (done == 'true'){
            li.classList.add('strike');
            li.innerHTML = todo;
        }
        list.appendChild(li);
    }
}   

//when there is an error
function errData(err){
    console.log('error');
    console.log(err)
}

//Listen for form submit
document.getElementById('todo_form').addEventListener('submit', submitform);
//Listen for delete pressed
document.getElementById('delete').addEventListener('submit', deldone);


//submit form
function submitform(e){
    e.preventDefault();
    
    //get values
    var todo = getInputVal('newtodo');
   
    //save todo
    saveTodo(todo);

    //clear input field
    document.getElementById('newtodo').value = "";
}

//function to get form values

function getInputVal(id){
    return document.getElementById(id).value;
}

//save the new todo

function saveTodo(item){
    var newTodoRef = todoRef.push();
    newTodoRef.set({
        item: item,
        done: 'false'
    })
}

//delete data

function update(event,id){
    let userRef = firebase.database().ref('todolists/' + id);
    userRef.update({'done':'true'});
    
}

function deldone(){
    let userRef = firebase.database().ref('todolists');
    userRef.orderByChild("done").equalTo("true").on("child_added",
    function(snapshot){
        userRef.child(snapshot.key).remove();
    })


}