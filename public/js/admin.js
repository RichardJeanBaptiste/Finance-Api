let listNum = 0;

window.onload = init;

function init () {
    console.log("hello world");  
}

document.getElementById("addBtn").addEventListener('click', function(){

    let textAreaId = "textArea" + listNum.toString();
    let remove = "remove" + listNum.toString();
    let div =  document.createElement('div');
    div.id = textAreaId;
    div.className = 'input-container';
    div.innerHTML = '<input type="text" name= '+ remove + '><button id='+ remove +' type="button">x</button>';
    document.getElementById("formContainer").appendChild(div);

    document.getElementById(remove).addEventListener('click', function(){
        document.getElementById(textAreaId).remove();
    });

    listNum = listNum + 1;
});