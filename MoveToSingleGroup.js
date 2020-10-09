var token = "RestTokenHere";
var moveToGroup = "SetAssignmentGroupToMoveItemsTo"
var courseID = document.URL.substring(document.URL.indexOf('/courses/'));
var instance = window.location.hostname;
var response1;
var response2;


run();

async function run() {
    response1 = await runAssignmentGroupCall();
    console.log(response1);
    for (let elm of response1) {
        //let noAssignments = elm.id;
                
        if (elm.id != moveToGroup){
            console.log("removing " + elm.id);
            response2 = await removeGroupCall(elm.id);

        }
        else{
            continue;
        }
             
    }
}



function runAssignmentGroupCall() {
    return new Promise(function (resolve, reject) {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                if (this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    resolve(response);
                }
                if (this.status != 200) {
                    reject("something went wrong with the call");
                }
            }
        });

        xhr.open("GET", "https://" + instance + "/api/v1" + courseID + "/assignment_groups?include[]=assignments&per_page=100");
        xhr.setRequestHeader("Authorization", "Bearer " + token);

        xhr.send(data);

    })

}

function removeGroupCall(groupID) {
    return new Promise(function(resolve,reject){
        var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //console.log(this.responseText);
        if(this.status == 200){
            let response = JSON.parse(this.responseText);
            resolve(response);
            console.log("put gave 200");
            
        }
        if(this.status != 200){
            reject("the call did not process correctly");
        }
      }
    });
    
    xhr.open("DELETE", "https://" + instance + "/api/v1" + courseID + "/assignment_groups/" + groupID + "?move_assignments_to=1788596");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
   
    
    xhr.send(data);
    

    })
    

}

