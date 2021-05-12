//head of document
function head(title,page) {
    document.write(`<div class="wrap">
						<div class="header">
							<img src="img/logo.png">
							<h2>Datortehnikas uzskaites sistēma</h2>
							<hr>
				</div>
				<div class="content">`);
    if (title != "") {
        document.write(`<a href="${page}">
							<img class="back_btn" src="img/back.png">
							Atpakaļ
						</a>
						<h2 id="h2b">${title}</h2>`);
    }
}

function foot() {
    document.write(`<div class="footer">
						<hr>
						(c) 2020 Sia "Kafijas automāts"
					</div>
				</div><!--beidzas wrap-->`);
}

function rad(obj,simb) {
	//slepj /rada blokus
	if (obj.value == "+") {
		document.getElementById(simb + obj.id).style.display = "block";
		obj.value = "-";
	} else {
		document.getElementById(simb + obj.id).style.display = "none";
		obj.value = "+";
	}
}

function meklet(lauks,myId) {
  //meklesana tabula  
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById(myId);  
	filter = input.value.toUpperCase();
	console.log(filter);
	table = document.getElementById("rinda");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[lauks]; // noradam pec kura lauka mekleet
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = "";
		} else {
		  tr[i].style.display = "none";
		}
	  }       
	}
}

function findGetParameter(parameterName) { 
	//nolasa GET parametrus
    let items = location.search.substr(1).split("&");
	let result ="";
    for (let i = 0; i<items.length; i++){
        let tmp = items[i].split("=");
        if (tmp[0] === parameterName){
			//result = decodeURIComponent(tmp[1]);
			result = tmp[1];
		}
    }
    return result;
} 

async function getList(jsonFile, objectId, selectItem){
	//parada datus tabula saraksta 
	let dati = await fetch(`https://majas-darbs-1-db.uldisgrunde.repl.co/dati/${jsonFile}`);
	let json = await dati.json();
	dati = json;
	let rindas = "";
	for (let i in dati) {
		rindas += `<option value="${dati[i].name}" ${(dati[i].name==selectItem?" Selected":"")}>${dati[i].name}</option>\n`;
	}
	document.getElementById(objectId).innerHTML+= rindas;
}

async function getData(jsonFile,objectId,list,next){ 
	//parada datus tabula faila 
	let dati = await fetch(`https://majas-darbs-1-db.uldisgrunde.repl.co/dati/${jsonFile}`);
//	let dati = await fetch(`https://majas-darbs-1-db.uldisgrunde.repl.co/api/${jsonFile}`);
	let json = await dati.json();
	dati = json;
	let rindas = "";
	for (i = 0; i < dati.length; i++){
		rindas += "<tr>";
		for (j = 0; j < list.length; j++){
			rindas += `<td>${dati[i][list[j]]}</td>`;
		 }
		rindas += "</tr>";
	}
	document.getElementById(objectId).innerHTML=rindas;
	eval(next);
}

function statuss(tableID){
	//statusa pielioksana tabula
	let table=document.getElementById(tableID);
	for (i = 0; i < table.rows.length;i++){
		switch(table.rows[i].cells[table.rows[i].cells.length-1].innerHTML){
			case "Izpildīts":
				table.rows[i].cells[table.rows[i].cells.length-1].innerHTML=table.rows[i].cells[table.rows[i].cells.length-1].innerHTML+`<br><input type="button" value="Atkārtoti pieteikt" onclick="">`;
			break
			default:
				let txt=table.rows[i].cells[table.rows[i].cells.length-1].innerHTML;
				table.rows[i].cells[table.rows[i].cells.length-1].innerHTML=`<select id="l${i}"></select>`;
				getList("status", `l${i}`, txt);
		}
	}
}

function state(tableID){
	//stavokla pieliksana tabula
	let table=document.getElementById(tableID);
	for (let i=0; i<table.rows.length;i++){
		if(table.rows[i].cells[0].innerHTML.trim().toUpperCase()!="DATORI"){
			table.rows[i].cells[1].innerHTML=(table.rows[i].cells[1].innerHTML=="0"?"&#8855":"&#x2713");
		}
	}
}


async function validateForms(form){

	let u = document.getElementById("user").value;
	let p = document.getElementById("password").value;
	let rez=false;
	let fails = await fetch(`https://majas-darbs-1-db.uldisgrunde.repl.co/admin/`, {
			method:"POST",
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	let json = await fails.json();
	dati = json;
	//dati = json.admin;
	alert(dati);
}

async function klasesTehnikaf() {
    let kabinetaNr;
    let datoruSkaits, projektoruSkaits, skanduSkaits; 
    let telpa, tips;
    let irProjektors, irSkandas,vajagSkandas, vajagDatoru,vajagProjektoru;
    //let datoruDB =fetch('https://armandspucs.github.io/majas-darbs-1/data/datoruDB.json')
    //let datoruDB =fetch('https://armandspucs.github.io/majas-darbs-1/data/datoruDB.json')
    let roomDB = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/room')
    let roomJson = await roomDB.json();
    let datoruDB = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/room')

	
//	let roomDB = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/room')
//    let roomJson = await roomDB.json();
//    let datoruDB = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/visas_tehnikas_db')
    let pcJson = await datoruDB.json();
    let kabinetuSkaits=roomJson.length;   
    let garums=pcJson.length;
    vajagSkandas=document.getElementById("skandas").checked;
    vajagDatoru=document.getElementById("dators").checked;
    vajagProjektoru=document.getElementById("projektors").checked;
    //nodzēst tabulas rindas
    let tabRindas=document.getElementById('rinda');
    let rskaits = document.getElementById('rinda').rows.length;
    let tr = tabRindas.getElementsByTagName("tr");
    for (let r = 0; r < rskaits; r++) {
        tr[r].style.display = "none";
    }
    //aizpildīt tabulas rindas
    let atlasesNr=document.getElementById('kabinets').value;
    //console.log(atlasesNr);
    for(let j=0;j<kabinetuSkaits;j++){
        irProjektors='-';
        irSkandas='-';
        kabinetaNr=roomJson[j]['name'];
        datoruSkaits=0;
        projektoruSkaits=0;
        skanduSkaits=0;
        
	for(let i=0;i<garums;i++){
	   telpa=pcJson[i]['name'];
		tips=pcJson[i]['tips'];
		if(telpa==kabinetaNr && tips=="dators "){
			datoruSkaits++;
		}
		if(telpa==kabinetaNr && tips=="projektors "){
			projektoruSkaits++;
		}
		if(telpa==kabinetaNr && tips=="skandas "){
			skanduSkaits++;
		}
	}
	if (projektoruSkaits>0){
		irProjektors='&#x2713';
	}
	if (skanduSkaits>0){
		irSkandas='&#x2713';
	}
	let rinda = document.getElementById('rinda');
    switch (true){
        case atlasesNr == kabinetaNr  :
            rinda.innerHTML += `
            <tr>
				<td>${kabinetaNr}</td>
				<td>${irProjektors}</td>
				<td>${datoruSkaits}</td>
				<td>${irSkandas}</td>
				<td><a href="klase.html?k=${kabinetaNr}">Informācija</a> </td>
            </tr>`;
        break;
        case vajagSkandas && skanduSkaits>0  :
            rinda.innerHTML += `
            <tr>
				<td>${kabinetaNr}</td>
				<td>${irProjektors}</td>
				<td>${datoruSkaits}</td>
				<td>${irSkandas}</td>
				<td><a href="klase.html?k=${kabinetaNr}">Informācija</a></td>
            </tr>`;
        break;
    
        case vajagDatoru && datoruSkaits>0  :
           rinda.innerHTML += `
            <tr>
				<td>${kabinetaNr}</td>
				<td>${irProjektors}</td>
				<td>${datoruSkaits}</td>
				<td>${irSkandas}</td>
				<td><a href="klase.html?k=${kabinetaNr}">Informācija</a></td>
            </tr>`;
        break;
        case vajagProjektoru && projektoruSkaits>0  :
            rinda.innerHTML += `
            <tr>
				<td>${kabinetaNr}</td>
				<td>${irProjektors}</td>
				<td>${datoruSkaits}</td>
				<td>${irSkandas}</td>
            <td><a href="klase.html?k=${kabinetaNr}">Informācija</a></td>
            </tr>`;
        break;
        
		}
	}

}

async function nomainiLaukus(x) {
	let datiNoServera = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/unit');
	let datiJson = await datiNoServera.json();
	document.getElementById("bnos9").value =datiJson[0]["info1"] ;
	document.getElementById("bnos10").value =datiJson[0]["info2"] ;
	document.getElementById("bnos11").value =datiJson[0]["info3"] ;
	document.getElementById("bnos12").value =datiJson[0]["info4"] ;
}



async function sikaakPeecNumura(a){
	//parāda datus tabula failā fetch_test.html
	let datiNoServera = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/datoruDB');
	let datiJson = await datiNoServera.json();
	let ierakstu_skaits = datiJson.length;
//ievērojiet ka visa info ir apakšobjektā 'dati' (tāda struktūra no excel nāk)
	tabulasRindas = document.getElementById('rinda');
	for (i = 0; i < ierakstu_skaits; i++) {
		if (datiJson[i]['inventaraNr']==a){
			tabulasRindas.innerHTML += `
			<br>
			<br> ` + datiJson[i]['inventaraNr'] + ` 
			<br> ` + datiJson[i]['iegadesGads'] + ` 
			<br> ` + datiJson[i]['piegadatajs'] + ` 
			<br>`;
			}
		} 
	}

//---------------------------------------------------------------------
async function raditVisasTehnikasDB(){ 
	let datiNoServera = await fetch('https://majas-darbs-1-db.uldisgrunde.repl.co/dati/datorudb');
	let datiJson = await datiNoServera.json();
	//let ierakstu_skaits = datiJson.length;
	let ierakstu_skaits = datiJson.length;
	//ievērojiet ka visa info ir apakšobjektā 'dati' (tāda struktūra no excel nāk)
	tabulasRindas = document.getElementById('rinda');
	for (i = 0; i < ierakstu_skaits; i++) {
		tabulasRindas.innerHTML += `
		<tr>
			<td>${datiJson[i]['tips']}</td>
			<td>${datiJson[i]['inventaraNr']}</td>
			<td>${datiJson[i]['kabinetaNr']}</td>
			<td><a class="button" id="${datiJson[i]['id']}" href="#?id=${datiJson[i]['id']}">sīkāka informācija</a> </td>
		</tr>`;
	} //loop beigas
}

async function pievieno_tehniku(){
	let tehnikasIzvele=document.getElementById('#tehnika').value;
	let requestBodyJson = {
		"tips": document.getElementById('tehnika').value, 
		"inventaraNr": document.getElementById('inos2').value,
		"nosaukums": document.getElementById('inos3').value,
		"iegadesGads": document.getElementById('inos4').value,
		"piegadatajs": document.getElementById('inos5').value,
		"razotajs" : document.getElementById('inos6').value,
		"kabinetaNr" : document.getElementById('inos7').value,
		"atbildigais" : document.getElementById('inos8').value,
		"info1": document.getElementById('inos9').value,
		"info2": document.getElementById('inos10').value,
		"info3": document.getElementById('inos11').value,
		"info4": document.getElementById('inos12').value
	}
	let requestBodyString = JSON.stringify(requestBodyJson);
	let request = await fetch('https://andrejstehnika.amikis.repl.co/api/pievienot',
		{
		method:"POST",
			headers:
			{
			'Content-Type': 'application/json'
			},
			body:requestBodyString
		}
	)
	.then(response => response.json())
	.then(data => {
			if(data.status == 0) {
				alert("Kļūda")
			}
			if(data.status == 1) {
				alert("ieraksts pievienots")
			}
		}
	)
	location.reload();
}






