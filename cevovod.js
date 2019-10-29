var vozlisca4d = [];
var povezave3d = [];
var razdaljaKamere = 8;
var kamera = [0,0,8];
var platno = document.getElementById("platno")
var context = platno.getContext("2d");
var rotirajX = false;
var rotirajY = false;
var rotirajZ = false;


//branje datoteke uploadane na stran
function naloziDatoteko(){

    var file = document.getElementById("datoteka").files[0];
    var reader = new FileReader();

    reader.onload = function(){
        var text =  reader.result.split("\n");      
        var stVozl = 0;
        var stPove = 0;
        for(var i = 0; i < text.length; i++){
            var vrstica = text[i].split(" ");
          
            if(vrstica[0] == 'v'){
                vozlisca4d[stVozl] = [];
                vozlisca4d[stVozl][0] = parseFloat(vrstica[1]);
                vozlisca4d[stVozl][1] = parseFloat(vrstica[2]);
                vozlisca4d[stVozl][2] = parseFloat(vrstica[3]);
                vozlisca4d[stVozl][3] = 1;
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
    izris();
}


function toggleRotate(x,y,z){
    if(x == true)rotirajX == true? rotirajX = false : rotirajX = true;
    if(y == true)rotirajY == true? rotirajY = false : rotirajY = true;
    if(z == true)rotirajZ == true? rotirajZ = false : rotirajZ = true;

}

var refreshId = setInterval(function(){
    if(rotirajX == true) rotateX(0.01);
    if(rotirajY == true) rotateY(0.01);
    if(rotirajZ == true) rotateZ(0.01);
    izris();
    
    
}, 16);


function rotateX(kot){
    for(var i = 0; i < vozlisca4d.length; i++){
        var x = vozlisca4d[i][0];
        var y = vozlisca4d[i][1];
        var z = vozlisca4d[i][2];
        vozlisca4d[i][1] = y*Math.cos(kot) - z*Math.sin(kot);
        vozlisca4d[i][2] = y*Math.sin(kot) + z*Math.cos(kot);

    }
}
function rotateY(kot){
    for(var i = 0; i < vozlisca4d.length; i++){
        var x = vozlisca4d[i][0];
        var y = vozlisca4d[i][1];
        var z = vozlisca4d[i][2];
        vozlisca4d[i][2] = z*Math.cos(kot) - x*Math.sin(kot);
        vozlisca4d[i][0] = z*Math.sin(kot) + x*Math.cos(kot);
    }
}
function rotateZ(kot){
    for(var i = 0; i < vozlisca4d.length; i++){
        var x = vozlisca4d[i][0];
        var y = vozlisca4d[i][1];
        var z = vozlisca4d[i][2];
        vozlisca4d[i][0] = x*Math.cos(kot) - y*Math.sin(kot);
        vozlisca4d[i][1] = x*Math.sin(kot) + y*Math.cos(kot);
    }
}

function translate1(dy,dx,dz){
    for(var i = 0; i < vozlisca4d.length; i++){
        vozlisca4d[i][0] += dx;
        vozlisca4d[i][1] += dy;
        vozlisca4d[i][2] += dz;
    }
}

function scale(sx,sy,sz){
    for(var i = 0; i < vozlisca4d.length; i++){
        vozlisca4d[i][0] *= sx;
        vozlisca4d[i][1] *= sy;
        vozlisca4d[i][2] *= sz;
    }
}

function perspective(val){
    razdaljaKamere += val;
}

function izris(){
    context.clearRect(0, 0, platno.width, platno.height);//pobrise prejsno sliko
    var odmikX = platno.width/2;
    var odmikY = platno.height/2; 

    var vozlisca2d = [];
    var stVozlisc = 0;
    //preslikava v 2d prostor
    for(var i = 0; i < vozlisca4d.length; i++){
        vozlisca2d[stVozlisc] = [];
        var x = vozlisca4d[stVozlisc][0];
        var y = vozlisca4d[stVozlisc][1];
        var z = vozlisca4d[stVozlisc][2];
        var scale = razdaljaKamere / (razdaljaKamere - z);
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

