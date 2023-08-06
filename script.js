
var tls = 
["ஃ", "அ", "ஆ",    "இ",   "ஈ",     "உ",    "ஊ",    "எ",     "ஏ",     "ஐ",     "ஒ",       "ஓ",     "ஔ",
 "க்", "க", "கா",    "கி",    "கீ",    "கு",    "கூ",    "கெ",    "கே",    "கை",    "கொ",     "கோ",   "கௌ", 	
 "ங்", "ங", "ஙா",    "ஙி",   "ஙீ",    "ஙு",    "ஙூ",     "ஙெ",   "ஙே",    "ஙை",    "ஙொ",     "ஙோ",   "ஙௌ", 	
 "ச்", "ச", "சா",    "சி",    "சீ",    "சு",    "சூ",     "செ",    "சே",     "சை",    "சொ",     "சோ",   "சௌ", 	
 "ஞ்", "ஞ", "ஞா",   "ஞி",   "ஞீ",    "ஞு",    "ஞூ",    "ஞெ",   "ஞே",    "ஞை",    "ஞொ",    "ஞோ",   "ஞௌ", 	
 "ட்", "ட",  "டா",   "டி",    "டீ",    "டு",    "டூ",     "டெ",    "டே",    "டை",     "டொ",    "டோ",    "டௌ", 	
 "ண்", "ண", "ணா",  "ணி",   "ணீ",   "ணு",   "ணூ",   "ணெ",    "ணே",   "ணை",    "ணொ",   "ணோ",   "ணௌ", 	
 "த்", "த",  "தா",   "தி",    "தீ",    "து",    "தூ",    "தெ",    "தே",    "தை",     "தொ",    "தோ",    "தௌ", 	
 "ந்", "ந",  "நா",   "நி",    "நீ",    "நு",    "நூ",    "நெ",    "நே",    "நை",     "நொ",    "நோ",    "நௌ", 	
 "ப்", "ப",  "பா",   "பி",    "பீ",    "பு",    "பூ",     "பெ",    "பே",    "பை",     "பொ",    "போ",    "பௌ", 	
 "ம்", "ம",  "மா",   "மி",    "மீ",    "மு",    "மூ",    "மெ",    "மே",   "மை",      "மொ",    "மோ",    "மௌ", 	
 "ய்", "ய",  "யா",    "யி",   "யீ",    "யு",    "யூ",    "யெ",    "யே",   "யை",      "யொ",    "யோ",    "யௌ", 	
 "ர்", "ர",  "ரா",    "ரி",    "ரீ",    "ரு",    "ரூ",    "ரெ",    "ரே",    "ரை",      "ரொ",    "ரோ",    "ரௌ", 	
 "ல்", "ல",  "லா",   "லி",    "லீ",   "லு",    "லூ",   "லெ",    "லே",   "லை",      "லொ",   "லோ",    "லௌ", 	
 "வ்", "வ",  "வா",   "வி",    "வீ",   "வு",     "வூ",    "வெ",    "வே",   "வை",      "வொ",   "வோ",    "வௌ", 	
 "ழ்", "ழ",  "ழா",   "ழி",     "ழீ",   "ழு",    "ழூ",    "ழெ",    "ழே",    "ழை",     "ழொ",    "ழோ",    "ழௌ", 	
 "ள்", "ள",  "ளா",   "ளி",    "ளீ",   "ளு",   "ளூ",    "ளெ",    "ளே",   "ளை",     "ளொ",    "ளோ",   "ளௌ", 	
 "ற்", "ற",  "றா",   "றி",     "றீ",   "று",    "றூ",    "றெ",    "றே",    "றை",     "றொ",    "றோ",    "றௌ", 	
 "ன்", "ன", "னா",   "னி",     "னீ",  "னு",    "னூ",   "னெ",    "னே",   "னை",     "னொ",   "னோ",    "னௌ",
 "","",  "","", "","", "", "⌫", "Enter"]; 

var height = 5; //number of guesses

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt
var gameOver = false;
var gameWon  = false;

var tword = ['வ','ண','க்','க','ம்'];

var word  = [];
var width = 0;
var desc = "வரவேற்றல், நன்றி உரைத்தல் ...";
var wtype = "வரவேற்றல்";
var lb = "💡";

const word_api_url = new URL('http://127.0.0.1:8080/newword/');

async function fetchText(gmode=0) {
    try {
      const response = await fetch(word_api_url+gmode);
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } 
      //let result = await response.text();
      let result = await response.json();
      const reso = JSON.parse(result);
      const reso1 = JSON.parse(reso);
      tword = reso1.word.match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi);
      desc = reso1.Desc;
      wtype = "உணவு";

    } catch (err) {
      console.log(err);
    }
    tword.forEach(element => word.push(tls.indexOf(element)));
    width = word.length; //length of the word
}


function filter_kboardkeys(kboard, j0, j1, nk){

    for (var ak = [], i = 1; i < 18; i++) {
        for (j = j0; j < j1; j++) {
            ak.push(i*13 + j);
        }
    }
    let intersection = kboard.filter(x => ak.includes(x));

    ak.sort((a, b) => 0.5 - Math.random()); // randomise the numbers
    var kboard12 = intersection.concat(ak); // add must have letters 
    kboard12 = kboard12.filter((v, i, a) => a.indexOf(v) === i); // uniqufy
    kboard12 = kboard12.slice(0, nk); // take first n numbers
    kboard12.sort((a, b) => a - b); // sort in order
    return kboard12
}

var MaxKB = 25
function do_keyboard(){

    var kboard = word.slice(1);
    kboard1 = filter_kboardkeys(kboard, 0,7,19);
    kboard2 = filter_kboardkeys(kboard, 7,13,MaxKB -19);
    kboard = kboard1.concat(kboard2 );

    const keyboardRowMax = 10;
    var keyboard_i = [];
    for (let i = 0; i < kboard.length; i += keyboardRowMax) {
         keyboard_i.push(kboard.slice(i, i + keyboardRowMax));
    }

    keyboard_i[2] = [255, ...keyboard_i[2]];
    keyboard_i[2].push(254);

    for (let i = 0; i < keyboard_i.length; i++) {
        let currRow = keyboard_i[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");
            let key = currRow[j];

            keyTile.innerText = tls[key];
            keyTile.id = "Key" + key; 

            keyTile.addEventListener("click", processKey);
            if (key == 255) {
                keyTile.classList.add("enter-key-tile");
                keyTile.classList.add("enter-key-tile-inactive");

            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.getElementById("kboard").appendChild(keyboardRow);
    }
}

function create_atile(r, c , csty, itxt="", baseid="board"){
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            if(csty) tile.classList.add(csty);
            tile.innerText = itxt;
            document.getElementById(baseid).appendChild(tile);
}


function intialize() {

    // Create the game board
    for (let r = 0; r <= height; r++) {
        for (let c = 0; c < width; c++) {
            
            if(r == height) create_atile(r, c, "tilehide", "", "board");
            else            create_atile(r, c, "tile", "", "board");
        }
    }
    document.getElementById("board").style.width = (70*width);
    document.getElementById("board").style.height = (70*(height+1));

    do_first_letter();
}

function do_first_letter(){
    let firstTile = document.getElementById(row.toString() + '-0');
    firstTile.innerText = tls[word[0]];
    firstTile.classList.add("correct");
    col = 1;
}

function processKey() {
    e = { "code" : parseInt( this.id.substring(3)) };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 
 
    if (e.code == 254) {
        if (col > 1 && col <= width) {
            col -= 1;
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

    } else if (e.code == 255) {
        if(col == width) { 
            update();
        }
    } else {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                let last_innertest= "";
                if(col > 0) {
                    let colm1 = col-1;
                    last_innertest = document.getElementById(row.toString() + '-' + colm1.toString()).innerText;
                }
                if(last_innertest !== tls[e.code]){
                    currTile.innerText = tls[e.code];
                    col += 1;
                }
            }
        }
    }

    if(col == width) {
        document.getElementById("Key255").classList.remove("enter-key-tile-inactive");
        document.getElementById("Key255").classList.add("enter-key-tile-active");
    } else {
        document.getElementById("Key255").classList.remove("enter-key-tile-active");
        document.getElementById("Key255").classList.add("enter-key-tile-inactive");
    }

    if (row == height && !gameWon) {
        gameOver = true;
            for (let c = 0; c < width; c++) {
                let currTile = document.getElementById(height.toString() + '-' + c.toString());
                currTile.classList.remove("tilehide");
                currTile.classList.add("showanstile");
                currTile.innerText = tword[c];
            }    
    }
}

function update() {
    let guess = "";

    if(row == (height-3) && !gameOver) {
       // document.getElementById("answer").innerText = desc;
        create_atile(330, 330, "lb", lb, "answer");
        create_atile(331, 331, "", desc, "answer");
    }

    //string up the guesses into the word
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }


    //start processing guess
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }


    //first iteration, check all the correct ones first
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = tls.indexOf(currTile.innerText);
        

        //Is it in the correct position?

        if (word[c] == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            if(keyTile != null) {
                keyTile.classList.remove("present");
                keyTile.classList.add("correct");
            }
            correct += 1;
            letterCount[letter] -= 1; //deduct the letter count
        }
        if (correct == width) {
            gameOver = true;
            gameWon = true;
        }
        update_stat();
    }
    
    //go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = tls.indexOf(currTile.innerText);

        // skip the letter if it has been marked correct
        if (!currTile.classList.contains("correct")) {
            //Is it in the word?         //make sure we don't double count
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Not in the word or (was in word but letters all used up to avoid overcount)
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct") && !keyTile.classList.contains("present")) {
                    keyTile.classList.add("absent")
                }
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
    if (row == height) {
        gameOver = true;
    }

    if(!gameOver) do_first_letter();
}

function display_desc(){
     create_atile(220, 220, "lb", lb, "wtype");
     create_atile(221, 221, "", wtype, "wtype");
}


function do_rewards(){
    var star0 = "☆";
    for (let i = 0; i < 5; i++) { 
        create_atile(5, 500+i, "", star0, "rewards");
    }
    update_stat();
}

function reward_start(bid, en) {
    var star1 = "★";
    if(en) {
        document.getElementById(bid).innerHTML =star1;
        document.getElementById(bid).classList.add("star-rating-gold");
    }
}

function update_stat(){
    var j = 200;
    if(localStorage.reward_score){
        j = Number(localStorage.reward_score);
    }
    if(gameWon) {
        var k = 5;
        if(j < 100) {k = 50;}
        else if(j < 200) {k = 20;}
        else if(j < 300) {k = 10;}
        j =  j + k;
        localStorage.reward_score = j;
    }

    k = 100;
    for (let i = 0; i < 5; i++) { 
        reward_start("5-50"+String(i), j > k );
        k = k + 100;
    }
}

window.onload = async function(){
    await fetchText(0);
    do_keyboard()
    intialize();
    display_desc();
    do_rewards();
}
