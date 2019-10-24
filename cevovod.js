var vozlisca3d = [];
var povezave3d = [];
var razdaljaKamere = 50000;
var platno = document.getElementById("platno")
var context = platno.getContext("2d");
var sredinskaTocka = [];

//branje datoteke uploadane na stran
function naloziDatoteko(){

    var file = document.getElementById("datoteka").files[0];
    var reader = new FileReader();

    reader.onload = function(){
        var text =  reader.result.split("\n");      
        console.log("lenght text : "+text.length);
        var stVozl = 0;
        var stPove = 0;
        for(var i = 0; i < text.length; i++){
            var vrstica = text[i].split(" ");
          
            if(vrstica[0] == 'v'){
                vozlisca3d[stVozl] = [];
                vozlisca3d[stVozl][0] = parseFloat(vrstica[1]);
                vozlisca3d[stVozl][1] = parseFloat(vrstica[2]);
                vozlisca3d[stVozl][2] = parseFloat(vrstica[3]);
                stVozl++;
            }else if(vrstica[0] == 'f'){
                povezave3d[stPove] = [];
                povezave3d[stPove][0] = parseFloat(vrstica[1]);
                povezave3d[stPove][1] = parseFloat(vrstica[2]);
                povezave3d[stPove][2] = parseFloat(vrstica[3]);
                stPove++;
            }        
        }
    }
    reader.readAsText(file);
}

/*
function izracunajSredinskoTocko(){
    var vsotaX = 0.0;
    var vsotaY = 0.0;
    var vsotaZ = 0.0;
    var stTock= vozlisca3d.length;
    for(var i = 0; i < stTock; i++){
        vsotaX+= vozlisca3d[i][0];
        vsotaY+= vozlisca3d[i][1];
        vsotaZ+= vozlisca3d[i][2];
    }

    sredinskaTocka[0] = vsotaX / stTock;
    sredinskaTocka[1] = vsotaY / stTock;
    sredinskaTocka[2] = vsotaZ / stTock;
}
*/






var refreshId = setInterval(function(){
    rotateZ(0.01);
    rotateX(0.01);
    //rotateY(0.01);
    izris();

}, 15);




function rotateX(kot){
    //izracunajSredinskoTocko();
    for(var i = 0; i < vozlisca3d.length; i++){
        var x = vozlisca3d[i][0];
        var y = vozlisca3d[i][1];
        var z = vozlisca3d[i][2];
        vozlisca3d[i][1] = y*Math.cos(kot) - z*Math.sin(kot);
        vozlisca3d[i][2] = y*Math.sin(kot) + z*Math.cos(kot);

    }
}
function rotateY(kot){
    for(var i = 0; i < vozlisca3d.length; i++){
        var x = vozlisca3d[i][0];
        var y = vozlisca3d[i][1];
        var z = vozlisca3d[i][2];
        vozlisca3d[i][2] = z*Math.cos(kot) - x*Math.sin(kot);
        vozlisca3d[i][0] = z*Math.sin(kot) + x*Math.cos(kot);
    }
}
function rotateZ(kot){
    for(var i = 0; i < vozlisca3d.length; i++){
        var x = vozlisca3d[i][0];
        var y = vozlisca3d[i][1];
        var z = vozlisca3d[i][2];
        vozlisca3d[i][0] = x*Math.cos(kot) - y*Math.sin(kot);
        vozlisca3d[i][1] = x*Math.sin(kot) + y*Math.cos(kot);
    }
}

function izris(){
    context.clearRect(0, 0, 1280, 720);//pobrise prejsno sliko
    var odmikX = platno.width/2;
    var odmikY = platno.height/2; 

    var vozlisca2d = [];
    var stVozlisc = 0;
    //preslikava v 2d prostor
    for(var i = 0; i < vozlisca3d.length; i++){
        vozlisca2d[stVozlisc] = [];
        var x = vozlisca3d[stVozlisc][0];
        var y = vozlisca3d[stVozlisc][1];
        var z = vozlisca3d[stVozlisc][2];
        var scale = razdaljaKamere / (razdaljaKamere + z);
        /*
        if(z == 0){
            vozlisca2d[stVozlisc][0] = x * razdaljaKamere;
            vozlisca2d[stVozlisc][1] = y * razdaljaKamere;
            //console.log("2d x= " +vozlisca2d[stVozlisc][0]);
            //console.log("2d y= " +vozlisca2d[stVozlisc][1]);
        }else{
            vozlisca2d[stVozlisc][0] = x * (razdaljaKamere/z);
            //console.log("2d x= " +vozlisca2d[stVozlisc][0]);
            vozlisca2d[stVozlisc][1] = y * (razdaljaKamere/z);  
            //console.log("2d y= " +vozlisca2d[stVozlisc][1]); 
        }
        */

        vozlisca2d[stVozlisc][0] = x * scale;
        vozlisca2d[stVozlisc][1] = y * scale;
        stVozlisc++;
    }

    //risanje
    context.beginPath();
    for(var i = 0; i < povezave3d.length; i++){
        context.moveTo(vozlisca2d[povezave3d[i][0]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][0]-1][1]*100+odmikY );
        context.lineTo(vozlisca2d[povezave3d[i][1]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][1]-1][1]*100+odmikY );
       
        context.moveTo(vozlisca2d[povezave3d[i][1]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][1]-1][1]*100+odmikY );
        context.lineTo(vozlisca2d[povezave3d[i][2]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][2]-1][1]*100+odmikY );
        
        context.moveTo(vozlisca2d[povezave3d[i][2]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][2]-1][1]*100+odmikY );
        context.lineTo(vozlisca2d[povezave3d[i][0]-1][0]*100 +odmikX , -vozlisca2d[povezave3d[i][0]-1][1]*100+odmikY );
        
       
    }
    context.closePath();
    context.stroke();
    //rotateX(0.2);
    
    
    


}

