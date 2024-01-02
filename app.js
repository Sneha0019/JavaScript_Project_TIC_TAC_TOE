let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let count = 0;
let turnO = true; //playerX, playerY

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const resetGame = ()=>{
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
    count = 0;

}


boxes.forEach((box)=>{
    
    box.addEventListener("click", ()=>{
        count = count+1;
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner(count);
    });
});

const disabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner)=>{
    if(winner==="Draw"){
        msg.innerText = `Oops!, the Game is ${winner}`;
    }else{
    msg.innerText= `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disabledBoxes();
    
};

const checkWinner = ()=>{
    for(let pattern of winPatterns){
         
            let pos1Val = boxes[pattern[0]].innerText; 
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText


            if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    showWinner(pos1Val);
                } 
                  
                //draw
                if(count===9 && (pos1Val!=pos2Val || pos1Val!=pos3Val || pos1!=pos3Val)){
                    console.log("draw happend")
                    showWinner("Draw");
                }
            }


    }

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
};