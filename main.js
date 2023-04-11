import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC2_ktZGsJbUyXRO39pHqOdcmSo2FHwkp0",
    authDomain: "cemclb-bank.firebaseapp.com",
    databaseURL: "https://cemclb-bank-default-rtdb.firebaseio.com",
    projectId: "cemclb-bank",
    storageBucket: "cemclb-bank.appspot.com",
    messagingSenderId: "434447633632",
    appId: "1:434447633632:web:ee4cecd99e0a3c6d671485"
};

window.onload = function () {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbref = ref(db);

    document.getElementById("swithToReg").onclick = switchToReg;
    document.getElementById("swithToLogin").onclick = switchToLogin;
    document.getElementById("login-btn").onclick = loginValidation;
    document.getElementById("register-btn").onclick = registerValidation;

    function switchToReg() {
        document.getElementById("register-portal").style = "display:inline-block";
        document.getElementById("login-portal").style = "display:none";
    }
    function switchToLogin() {
        document.getElementById("register-portal").style = "display:none";
        document.getElementById("login-portal").style = "display:inline-block";
    }

    var accNoPat = "^[0-9]{6}$";
    var accPinPat = "^[0-9]{4}$";

    function loginValidation() {
        var lAccNo = document.getElementById("lAccNo").value;
        var lAccPin = document.getElementById("lAccPin").value;
        if (lAccNo.match(accNoPat) && lAccPin.match(accPinPat)) {
            alert("Bienvenido");
            portal(lAccNo, lAccPin)
        } else {
            alert("Por favor ingresa datos validos");
        }
    }

    function registerValidation() {
        var rAccName = document.getElementById("rAccName").value;
        var rAccNo = document.getElementById("rAccNo").value;
        var rAccPin = document.getElementById("rAccPin").value;
        var rConAccPin = document.getElementById("rConAccPin").value;
        if (rAccName !== null && rAccNo.match(accNoPat) && rAccPin.match(accPinPat) && rAccPin == rConAccPin) {

            set(ref(db, "accNo" + rAccNo + "/accPin" + rAccPin + "/accDetails"), {
                name: rAccName,
                avalBal: 0
            }).then(() => {
                alert("Registrado");
            }).catch((error) => {
                alert("Registro incorrecto" + error);
            });

            set(ref(db, "accNo" + rAccNo + "/received"), {
                receivedAmt: 0
            }).then(() => {
                console.log("Actualizacion Cantidad Recibida");
            }).catch((error) => {
                alert("Error de actualizacion de cantidad recibida" + error);
            });
        } else {
            alert("Por favor ingresa datos validos");
        }
    }

   function portal (accNo, accPin){
         document.getElementById ("login-portal").style = "display:none"; 
         document.getElementById("register-portal").style = "display:none"; 
         document.getElementById ("portal").style = "display:inline-block"; 
     }

     depositbtn.addEventListener('click', () => {
        const value = depositInput.value;
        const depositValue = Number(deposit.innerText) + Number(value);
        const balanceValue = Number(balance.innerText) + Number(value);
        deposit.innerText = depositValue;
        balance.innerText = balanceValue;
        depositInput.value = '';
    })
}

document.getElementById('salir').onclick = function(){
    alert('Hasta luego!');
}

document.getElementById("depositbtn").addEventListener("click", function(){

const depositInput = document.getElementById("number")

const depositAmount = parseFloat(depositInput.value)

const depositTotal = document.getElementById("depositado")

const currentDepositAmount = parseFloat (depositTotal.innerText)
const updateDepositTotal = parseFloat (currentDepositAmount + depositAmount)

depositTotal.innerText = updateDepositTotal

const depositadoTotal = document.getElementById("depositadoTotal")
const currentDepositadoTotal = parseFloat (depositadoTotal.innerHTML)
const updateDepositadoTotal = currentDepositadoTotal + depositAmount
depositadoTotal.innerHTML = updateDepositadoTotal

depositInput.value = ""

})
