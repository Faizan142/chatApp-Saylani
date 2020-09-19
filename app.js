
var personName = prompt("Enter Your Name");
if (personName != null && personName != "") {

    document.getElementById('mainDiv').innerHTML = `
    <div class="container p-2">
        <div class="text-center">
       
    
    <form onsubmit="return sendMessages();">
    <input id="messaage" placeholder="Enter Message" autocomplete="off">
    <input type="submit" class= "btn btn-success">
</form>

            <ul id ="messages"></ul>`

}

let sendMessages =() => {
    // get message
    var message = document.getElementById("messaage").value;
   

    //save in database
    firebase.database().ref("messages").push().set({
        "sender": personName ,
        "message": message
    });

    // prevent form from submitting
    return false;
}
firebase.database().ref("messages").on("child_added",function(snapshot){
    var html = "";
    var btn= "btn btn-danger";
    html += "<li id='message-" + snapshot.key + "'>";
    if(snapshot.val().sender == personName){
        html += "<button data-id='"+ snapshot.key + "'onclick='deleteMessage(this)'>";
        html += "Delete";
        html += "</button>"
    } 
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;

});


let deleteMessage = (self) => {
    var msgId = self.getAttribute("data-id");
    firebase.database().ref("messages").child(msgId).remove();
}
firebase.database().ref("messages").on("child_removed",function(snapshot){
    document.getElementById("message-" +  snapshot.key).innerHTML = "This message has been removed";
})
