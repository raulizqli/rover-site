var boundX = 200;
var boundY = 200;
var validInstructions = ["F","L","R"];
var roverLog = [];
window.onload = function (){
  let planet = document.getElementById("planet");
  for (let i = 0; i < boundX; i++)
  {
    let tr = document.createElement("tr");
    for (let j = 0; j < boundY; j++) {
      let div = document.createElement("td");
      div.id = "coord_"+i+"-"+j;
      div.setAttribute("coord-x", i );
      div.setAttribute("coord-y", j );
      tr.appendChild(div);
    }
    planet.appendChild(tr);
  }
}

function sendRover(){
  window.scrollTo(0, document.querySelector(".planet").scrollHeight);
  let roverButton = document.getElementById("send_rover");
  roverButton.setAttribute("disabled", "disabled");
  roverLog = [];
  let coordX = parseInt(document.getElementById("coordinatex").value);
  let coordY = parseInt(document.getElementById("coordinatey").value);
  if ( validateCoords(coordX, coordY) ){
    let rover = document.getElementById( "coord_"+coordX+"-"+coordY );
    rover.classList.add("rover");
    let movements = document.getElementById("instructions").value.toUpperCase();
    let movementsArray = movements.split("").reverse();
    roverLog.push("El rover aterrizó correctamente en ("+coordX+","+coordY+")");
    moveRover(rover, movementsArray);
  } else {
    alert( "Las coordenadas no corresponden al planeta ( 0 , 0 ) a ( "+(boundX-1)+" , "+(boundY-1)+" ),, coordenadas ingresadas: ("+coordX+","+coordY+")" );
    enableSendRoverButton();
  }
}

function moveRover( rover,  moveArray){
  let rovers = document.getElementsByClassName("rover");
  for (let i = 0; i < rovers.length; i++) {
    rovers[i].classList.remove("rover");
  }
  if ( moveArray.length > 0 ) {
    let nextInstruction  = moveArray.pop();
    if ( validInstructions.indexOf( nextInstruction ) > -1 ){
      let coordX = parseInt(rover.getAttribute("coord-x"));
      let coordY = parseInt(rover.getAttribute("coord-y"));
      switch (nextInstruction) {
        case "F":
          coordX += 1;
          break;
        case "L":
          coordY -= 1;
          break;
        case "R":
          coordY += 1;
          break;
        default:
          coordY = -1;
          coordX = -1;
          roverLog.push("Instrucción no valida ("+nextInstruction+") solo se pueden procesar estas: ("+validInstructions.join(",")+")")
          break;
      }
      if ( validateCoords(coordX, coordY) ) {
        rover = document.getElementById("coord_"+coordX+"-"+coordY );
        rover.classList.add("rover");
        setTimeout(function(){
          moveRover(rover, moveArray);
        }, 1500)
        roverLog.push("El rover se movió a: ( "+coordX+" , "+coordY+" ) Instruccion: "+nextInstruction)
      } else {
        roverLog.push("No existe planeta a donde quieres mover el rover, instrucciones faltantes ( "+moveArray.join(",")+" )");
        alert(roverLog.join(",\n"));
        enableSendRoverButton();
      }
    }else{
      roverLog.push("Instrucción no valida ("+nextInstruction+") solo se pueden procesar estas: ("+validInstructions.join(",")+")")
      alert(roverLog.join(",\n"));
      enableSendRoverButton();
    }
  } else {
    roverLog.push("El rover terminó la excursión");
    alert(roverLog.join(",\n"));
    enableSendRoverButton();
  }
}

function validateCoords ( coordX, coordY){
  return coordX <= boundX-1 && coordX >= 0 && coordY >= 0 && coordY <= boundY-1;
}

function enableSendRoverButton(){
  let roverButton = document.getElementById("send_rover");
  roverButton.removeAttribute("disabled");
}
