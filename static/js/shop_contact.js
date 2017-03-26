$(function() {
    simpleCart({
      checkout: {
        type: "Custom"
      },
      cartColumns: [
          { attr: "name" , label: "Tittel" } ,
          { attr: "price" , label: "Pris", view: 'currency' } ,
          { view: "decrement" , label: false , text: "<span class='fa fa-fw fa-minus'></span>" } ,
          { attr: "quantity" , label: "Antall" } ,
          { view: "increment" , label: false , text: "<span class='fa fa-fw fa-plus'></span>" } ,
          { attr: "total" , label: "Subtotal", view: 'currency' } ,
          { view: "remove" , text: "<span class='fa fa-fw fa-close text-danger'></span>" , label: false }
      ],
      currency: "NOK",
      cartStyle: "table",
      cartClass: "table table-responsive table-condensed table-inverse",
      shippingQuantityRate: 40,
    });

          console.log("submit")
    $("#orderForm").jqBootstrapValidation({
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
            
            var bookOrder = $(".simpleCart_items .table tr").map(function(i, val) {
                return $(val).children("td, th").map(function() {
                    return $(this).text().trim();
                }).get().join("\t");
            }).get().join("\n");

            $form.find(".bokbestilling").val(bookOrder);

						$.ajax({
							url: $form.attr('action'),
							method: 'POST',
							data: $form.serialize(),
							dataType: 'json',
							beforeSend: function() {
								$('#success').html("<div class='alert alert-info'>");
								$('#success > .alert-info')
										.append("<strong>Sender bestilling…</strong>");
								$('#success > .alert-info')
										.append('</div>');
							},
							success: function(data) {
								$('#success').html("<div class='alert alert-success'>");
								$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
										.append("</button>");
								$('#success > .alert-success')
										.append("<strong>Bestillingen er sendt!</strong>");
								$('#success > .alert-success')
										.append('</div>');

								//clear all fields
								$('#orderForm').trigger("reset");
                simpleCart.empty();

							},
							error: function(err) {
								$('#success').html("<div class='alert alert-danger'>");
								$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
										.append("</button>");
								$('#success > .alert-danger').append("<strong>Beklager, " + firstName + ", men det ser ut til at bestilling ikke kom helt frem. Prøv igjen senere, eller ring Svein på +47 901 69160.");
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


/*When clicking on full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
