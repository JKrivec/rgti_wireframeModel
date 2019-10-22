var vozlisca = [];
var povezave = [];




//branje datoteke uploadane na stran
function naloziDatoteko(){

    var file = document.getElementById("datoteka").files[0];
    var reader = new FileReader();

    reader.onload = function(){
        var text =  reader.result.split("\n");      

        for(var i = 0; i < text.length; i++){
            var stVozl = 0;
            var stPove = 0;
            var vrstica = text[i].split(" ");
          
                if(vrstica[0] == 'v'){
                    vozlisca[stVozl] = [];
                    vozlisca[stVozl][0] = vrstica[1];
                    vozlisca[stVozl][1] = vrstica[2];
                    vozlisca[stVozl][2] = vrstica[3]; 
                    stVozl++;
                }else if(vrstica[0] == 'f'){
                    povezave[stPove] = [];
                    povezave[stPove][0] = vrstica[1];
                    povezave[stPove][1] = vrstica[2];
                    povezave[stPove][2] = vrstica[3]; 
                    stPove++;
                }

            
            

            
            

            
            
        }
        console.log(vozlisca);
        document.getElementById("text").innerHTML = vozlisca[0];
        document.getElementById("text2").innerHTML = vozlisca[1];

    }
    reader.readAsText(file);
      
    
}