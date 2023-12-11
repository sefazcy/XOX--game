//first access the html elements
let playerText = document.getElementById("playerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))

//create variables for players
const X_TEXT = "X"
const O_TEXT = "O"
//x starts the game, so create a variable that keeps track of the current player
let currentPlayer = X_TEXT

//create an array to keep track of which boxes are marked
let spaces = Array(9).fill(null)

//create a function which starts the game
function startGame(){
    //html divleri için her bir elemente onclick özelliği ekle
    for(box of boxes){
        box.addEventListener("click", boxClicked)
    }
}
//start game her bir boxa tıklanabilme özelliği sağlıyor, buradaki e hangi boxun tıklandığı
function boxClicked(e){
    //tıklanılan boxun idsini bir değişkene ata
    const id = e.target.id

    //kutuya tıklandığında önce kutunun boş olup olmadığını kontrol etmemiz lazım, bunun için 
    //spaces arrayini oluşturmuştuk
    //eğer spaces[id] elementi null değilse demek ki x ya da o tarafından doldurulmuştur, 
    //bizim x veya o koyabilmemiz için null olması lazım
    if(spaces[id]==null){
        //null ise bu ife girdi, tıklanılan kutuyu sırası olan oyuncunun işaretine çevirmemiz lazım
        spaces[id]= currentPlayer
        //spaces arrayi bizim takip etmemizi sağlayan arrraydi,
        //htmlde kullanıcıya göstermemiz için boxes arrayini kullanmalıyız
        boxes[id].innerText = currentPlayer
        //işareti yerleştirdikten sonra oyuncu oyunu kazandı mı onu kontrol etmeliyiz
        console.log(playerWon())
        if(playerWon() !== false){
            //eğer false dönmediyse demek ki oyun bitmiştir ve 
            //playerWon kazanan bir abc winning combo dönmüştür
            //kazanan oyuncunun yazısını htmlde değiştir
            playerText.innerText = `${currentPlayer} has won`
            let winningBlocks = playerWon()
            //kazandıran kutuları daha belirgin yapmak için css özelliğini değiştir
            //arka plan rengini daha koyu yap
            for(block of winningBlocks){
                //block burada indexleri gösteriyor, 
                //çünkü playerWon fonksiyonundan [0,1,2] gib ideğerler geldi
                boxes[block].style.backgroundColor = "#2d414b"
            }
            return
        }
        //oyun bitmediyse oyuncuyu değiştir
        if(currentPlayer == X_TEXT){
            currentPlayer = O_TEXT
        }
        else{
            currentPlayer = X_TEXT
        }
    }
}
//kazanma kombinasyonları
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerWon(){
    //eğer winning kombinasyonlarındaki 3lü kutuların hepsinde aynı işaret varsa o oyuncu kazanmıştır
    for(combo of winningCombos){
        //her bir döngü için a,b,c kazandıran kutuların indexi olacak
        //ilk döngüde 0,1,2 ikinci döngüde 3,4,5 ...
        let [a,b,c] = combo
        //kutunun null olmaması ve a indexinde olan elementin b ve c deki işaretle aynı olması lazım
        if(spaces[a]!==null && spaces[a]==spaces[b] && spaces[a]==spaces[c]){
            return [a,b,c]
        }
    }
    //eğer for döngüsünün içinde hiçbir zaman ife girmezse demek ki 
    //henüz kazanan bir oyuncu yok o zaman false döndür
    return false
}
restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}
startGame()