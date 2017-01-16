$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, e, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, e) {
						e.preventDefault();
            var firstName = $("input#name").val();
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

						$.ajax({
							url: $form.attr('action'),
							method: 'POST',
							data: $form.serialize(),
							dataType: 'json',
							beforeSend: function() {
								$('#success').html("<div class='alert alert-info'>");
								$('#success > .alert-info')
										.append("<strong>Sender beskjed…</strong>");
								$('#success > .alert-info')
										.append('</div>');
							},
							success: function(data) {
								$('#success').html("<div class='alert alert-success'>");
								$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
										.append("</button>");
								$('#success > .alert-success')
										.append("<strong>Beskjeden er sendt!</strong>");
								$('#success > .alert-success')
										.append('</div>');

								//clear all fields
								$('#contactForm').trigger("reset");
							},
							error: function(err) {
								$('#success').html("<div class='alert alert-danger'>");
								$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
										.append("</button>");
								$('#success > .alert-danger').append("<strong>Beklager, " + firstName + ", men det ser ut til at mailen ikke kom frem. Prøv igjen senere, eller ring på 99999999.");
								$('#success > .alert-danger').append('</div>');
							}
						});
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
