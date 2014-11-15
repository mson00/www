/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

window.onload = onDeviceReady;


//document.addEventListener('deviceready', onDeviceReady, false);


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
  //  onDeviceReady: function() {
    //    app.receivedEvent('deviceready');
  //  alert("foi");
  //      var db = window.openDatabase("dbmycheckin", "1.0", "my checkin", 200000);
  //      db.transaction(populateDB, errorCB, successCB);




    //},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



function onDeviceReady() {

      var db = window.openDatabase("dbmycheckin", "1.0", "my checkin", 200000);
      db.transaction(populateDB, errorDB, successDB);

    }



//populando DB


function populateDB(tx) {

//    tx.executeSql('DROP TABLE ALBUM');
//    tx.executeSql('DROP TABLE COORDENADA');
//    tx.executeSql('DROP TABLE FOTO');


    tx.executeSql('CREATE TABLE IF NOT EXISTS CAPTURA (id_captura integer PRIMARY KEY AUTOINCREMENT NOT NULL, titulo text, latitude real, longitude real, data text)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS COORDENADA (id_coordenada unique, latitude, longitude )');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS FOTO (id_foto unique, id_album, path, data)');




}

// Transaction error callback
function errorDB(tx, err) {
    alert("Houve erro ao criar banco de dados!" + err);
}

// Transaction success callback
function successDB() {
  console.log("Banco criado com sucesso!!");
}







// click para habitar camera
function capturePhoto(){
  //  navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
    navigator.camera.getPicture(uploadPhoto, onFail, {

      quality: 50, destinationType: Camera.DestinationType.FILE_URI
    //,destinationType: Camera.DestinationType.FILE_URI

    });

}

function onFail(message) {

    //alert('Failed because: ' + message);

}

function onSuccess(message){
//  alert(' because: ' + message);
}




function uploadPhoto(imageData){
// this is where you would send the image file to server

//output image to screen
    //cameraPic.src = "data:image/jpeg;base64," + data;
	// Successful upload to the server

//var photo = getElement("cameraPic");

    //cameraPic.style.display = "block";

    //cameraPic.src = "data:image/jpeg;base64,"+data;

alert("data:image/jpeg;base64," + imageData);
//var image = document.getElementById ('cameraPic');

  //          image.src = "data:image/jpeg;base64," + message;





var image = document.getElementById('cameraPic');
image.style.display = "block";
    image.src = imageData;





}







// salvar o  check in
function salvar (){


 navigator.geolocation.getCurrentPosition(
  function (position){
    latitude =   position.coords.latitude;
    longitude =   position.coords.longitude;

  },
  function (error){

  });

var titulo = $("#titulo").val();

$("#latitudeHidden").val(latitude);
$("#longitudeHidden").val(longitude) ;
alert("outr:"+latitude);

var db = window.openDatabase("dbmycheckin", "1.0", "my checkin", 200000);
db.transaction(cadastrarDB, null, null);



//db.transaction(populateDB, errorCB, successCB);

}


function cadastrarDB(tx){


alert("chegou!!");
var titulo = $("#titulo").val();
var lat = $("#latitudeHidden").val();
var lon = $("#longitudeHidden").val();



var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}







var dataAtual =  dd+'/'+mm+'/'+yyyy;

var insertCapture = "insert into CAPTURA(titulo,latitude,longitude,data)";
insertCapture+= "values ('"+titulo+"','"+lat+"','"+lon+"','"+dataAtual+"' )  ";

tx.executeSql(insertCapture);


alert("Cadastro realizado com sucesso!");
//tx.executeSql('SELECT * FROM CAPTURA', [], querySuccess, null);

}



function querySuccess(tx, results) {
        var len = results.rows.length;
        console.log("DEMO table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " titulo = " + results.rows.item(i).titulo + " Data =  " + results.rows.item(i).data+ " id_captura = " + results.rows.item(i).id_captura  );
        }
    }







//document.addEventListener("adicionar", onBackKeyDown, false);
