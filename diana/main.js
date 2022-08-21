const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
correctLetter=document.querySelector(".guess-left span")
wrongLetter = document.querySelector(".wrong-letter span");
typingInput = document.querySelector(".typing-input")
let word, maxGuesses, corrects = [], incorrects = [];
function randomWord() { 
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)]
        word = ranObj.word; 
        maxGuesses = 6; corrects =[]; incorrects = [];
        console.log(word)

     correctLetter.innerHTML = maxGuesses; 
    hint.innerHTML = ranObj.hint;
    wrongLetter.innerHTML = incorrects;
    let html = "";
      for(let i=0; i<word.length;i++){
        html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/)&& !incorrects.includes(` ${key}`)&&!corrects.includes(key)){
        console.log(key)
        if(word.includes(key)){
           for(let i=0; i<word.length; i++){
             if(word[i]===key){
                  corrects.push(key);
                  inputs.querySelectorAll("input")[i].value = key;
            }
           }
        }else{
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        correctLetter.innerHTML = maxGuesses; 
        wrongLetter.innerHTML = incorrects;
    }
    typingInput.value= "";
    
    setTimeout(()=>{
        if(corrects.length === word.length){
            alert(`Congratulations you solved ${word.toUpperCase()}`);
                randomWord();
        }else if(maxGuesses<1){
            alert("You can't solve");
            for(let i=0; i<word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
               }
        }
    });
    
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame)
document.addEventListener("keydown", ()=> typingInput.focus())