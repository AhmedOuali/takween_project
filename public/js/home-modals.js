
//------------------------------------------------
//affichage du modal lors de chargement de la page
//------------------------------------------------
$('#regmodal').modal({
	show: true,
	keyboard: false,
	backdrop: 'static'
})
//       ---------------------------------


// -----------------------------------------
// Chargement des données du select (Country)
// -----------------------------------------
$('#countries1').bfhcountries({country: 'TN'})
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------



//------------------------------------------------
// Modal de read-more in home page ---------------
//------------------------------------------------

$(document).on('click','#cread1',function(){												
$('#modalread1').modal();								//Lancer le modal (read-more 1)
});

$(document).on('click','#cread2',function(){												
$('#modalread2').modal();								//Lancer le modal (read-more 2)
});

$(document).on('click','#cread3',function(){												
$('#modalread3').modal();								//Lancer le modal (read-more 3)
});

$(document).on('click','#cread4',function(){												
$('#modalread4').modal();								//Lancer le modal (read-more 3)
});

//-------------------------------------------
//-------------------------------------------
//-------------------------------------------
