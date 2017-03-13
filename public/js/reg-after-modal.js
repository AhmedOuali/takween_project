
	//------------------------------------------------
	//affichage du modal lors de chargement de la page
	//------------------------------------------------
	$('.fade').modal({
		show: true,
		keyboard: false,
		backdrop: 'static'
	})
	//       ---------------------------------
	
	
	// -----------------------------------------
	// Chargement des données du select (Country)
	// -----------------------------------------
	$('#countries1').bfhcountries({country: 'TN'})
	//       --------------------------------