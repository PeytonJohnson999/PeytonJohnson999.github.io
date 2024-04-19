// flag to prevent running simultaneous sorts by clicking 
// "start" multiple times
let STARTED = false;

$(document).ready(function(){
    $("#goButton").on("click", function(){
        AudCon = new AudioContext();


        if (!STARTED){
            STARTED = true;

            if (bubbleSort){
                bubbleSort(bubbleList);
            }
            if (quickSort){
                quickSort(quickList, 0, quickList.length-1);
                console.log("quicksorted")
                console.log(quickList)
            }
        }
    })
})
