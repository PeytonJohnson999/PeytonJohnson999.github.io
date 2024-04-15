/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////


// TODO 2: Implement bubbleSort
async function bubbleSort(array){
    for (let i = 0; i < array.length; i++){
        for (let j = array.length - 1; j > i; j--){
            if (array[j].value < array[j - 1].value){
                swap(array, j, j-1)
                updateCounter(bubbleCounter);
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort
// function quickSort(array, left, right){
//     if (right.value > left.value){
//         index = partition(array, left, right);
//         if (arry[left].value < index.value - 1){
//             quickSort(array, left, index - 1)
//         }
//         if (array[index].value < array[right].value){
//             quickSort(array, index, right)
//         }
//     }
// }

// TODOs 4 & 5: Implement partition
// function partition(array, left, right){
//     let pivot = Math.floor(array.length / 2);
//     while ( left < right ){
//         while (array[left].value < pivot){left++}
//         while (array[right].value > pivot){right--}
//         if (array[left].value < array[right].value){
//             swap(array, left, right)
//         }
//     }

//     return array[left + 1]
// }

// TODO 1: Implement swap
function swap(array, i, j){
    [array[i], array[j]] = [array[j], array[i]];
    drawSwap(array, i, j)
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}