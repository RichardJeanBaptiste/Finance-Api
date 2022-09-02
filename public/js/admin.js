let listNum = 0;

window.onload = init;

function init () {
    //console.log("hello abcdsxfxdgxd"); 

    document.getElementById("addBtn").addEventListener('click', function(){

        let textAreaId = "textArea" + listNum.toString();
        let remove = "remove" + listNum.toString();
        let div =  document.createElement('div');
        div.id = textAreaId;
        div.className = 'input-container';
        div.innerHTML = '<input class="form-control add-form-style" type="text" name= '+ remove + '><button class="btn btn-secondary btn-sm add-form-button-style" id='+ remove +' type="button">x</button>';
        document.getElementById("formContainer").appendChild(div);
    
        document.getElementById(remove).addEventListener('click', function(){
            document.getElementById(textAreaId).remove();
        });
    
        listNum = listNum + 1;
    });
    
    document.getElementById("clearButton").addEventListener('click', function(){
        document.getElementById('formContainer').innerHTML = "";
    });

}
