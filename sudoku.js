function initiate() {
    var startingBoard = [[]];
    var j = 0;
    for (var i = 1; i <= 81; i++){
        const val = document.getElementById(String(i)).value;
        if (val == ""){
            startingBoard[j].push(null);
        }
        else { 
            startingBoard[j].push(Number(val));
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([]);
            j++;
        }
    }
    const inputValid = validBoard(startingBoard);
    if (!inputValid){
        inputIsInvalid();
    }
    else{
        const answer = solve(startingBoard);
        if(answer[0] == true){
            updateBoard(answer[1]);
        }
        else{
            unsolvable();
        }
    }
}
function validBoard(board) {
    //To Check the starting board does not contain duplicate in row, columns and in each of the 3X3 boxes
    var st = new Set();
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(board[i][j] == null) 
                continue;
            if(st.has("row"+String(i)+String(board[i][j])) || st.has("col"+String(j)+String(board[i][j])) || st.has("box"+String((i/3)*3+j/3)+String(board[i][j]))) {
                return false;
            }
            else {
                st.add("row"+String(i)+String(board[i][j])); 
                st.add("col"+String(j)+String(board[i][j]));
                st.add("box"+String((i/3)*3+j/3)+String(board[i][j]));
            }    
        }
    }
    return true;
}

function solve(board) {
    //The board is valid, now we will solve the board
    //Iterate through the board, on the first empty place, put the first letter that is not in that row, col and box
    //then recursively call the function again to solve for the next empty indicies.
    //return false if no letter is valid at that empty place
    //if recursively called function returns false, then try with the next letter that is not in that row, col, box
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(board[i][j] != null) 
                continue;
            
            for(var c = 1; c <= 9; c++){
                if(isValid(board, i, j, c)){
                    board[i][j] = c;
                    ans = solve(board);
                    if(ans[0] == true)
                        return [true, ans[1]];
                    else
                        board[i][j] = null;
                }
            }
            return [false, board];
        }
    }
    return [true, board];
}
function isValid(board, row, col, c) {
    //check the given letter c can be placed on the (row, col) place by checking for duplicate of c in row, col and that box containing (row, col)
    for(var i = 0; i <9; i++){
        if(board[i][col] == c)
            return false;
        
        if(board[row][i] == c)
            return false;
        
        if(board[3*Math.floor(row/3)+Math.floor(i/3)][3*Math.floor(col/3)+i%3] == c)
            return false;
    }
    return true;
}

function updateBoard(board) {
    //we have the answer, now update it in the document
    for (var i = 1; i <= 9; i++){
        var row = ""
        for (var j = 0; j < 9; j++){
            if (row == ""){
                row = row + String(board[i - 1][j])
            }
            else {
                row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
            }
        }
        document.getElementById("row " + String(i)).innerHTML = row
    }
}

function inputIsInvalid(){
    //The starting board is valid i.e. sattisfy the properties of sudoku puzzle
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = ""
    }
    document.getElementById("row " + String(1)).innerHTML = "THE GIVEN BOARD IS INVALID"
}
function unsolvable(){
    //The board is Valid but cannot be solved
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = ""
    }
    document.getElementById("row " + String(1)).innerHTML = "THE GIVEN BOARD IS UNSOLVALBE"
}