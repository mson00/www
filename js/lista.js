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
      db.transaction(listagemDB, null, null);
      //db.transaction(populateDB, errorDB, successDB);




    }


function listagemDB(tx){

    tx.executeSql('SELECT * FROM CAPTURA', [], listagemQuery, null);


   }



function listagemQuery(tx, results) {
        var len = results.rows.length;
        //console.log("DEMO table: " + len + " rows found.");
        var htmlResult = "";
        for (var i=0; i<len; i++){

          htmlResult += "<li class='item'>"+ results.rows.item(i).titulo + "</li>" ;


          //  console.log("Row = " + i + " titulo = " + results.rows.item(i).titulo + " Data =  " + results.rows.item(i).data+ " id_captura = " + results.rows.item(i).id_captura  );
        }
        $("#listResult").html(htmlResult);

    }
