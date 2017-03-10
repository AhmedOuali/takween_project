$(function() {

    $('#register-individual').click(function(e) {
		$("#register-individual").delay(100).fadeIn(100);
 		$("#register-company").fadeOut(100);
		$('#register-company-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-company-link').click(function(e) {
		$("#register-company").delay(100).fadeIn(100);
 		$("#register-individual").fadeOut(100);
		$('#register-individual-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
$(function() {

    $('#register-individual-link').click(function(e) {
		$("#register-individual").delay(100).fadeIn(100);
 		$("#register-company").fadeOut(100);
		$('#register-company-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-company-link').click(function(e) {
		$("#register-company").delay(100).fadeIn(100);
 		$("#register-individual").fadeOut(100);
		$('#register-individual-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
