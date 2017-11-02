import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements AfterViewInit { 
	ngAfterViewInit() {
		(<any>$(".tab-wizard")).steps({
		    headerTag: "h6"
		    , bodyTag: "section"
		    , transitionEffect: "fade"
		    , titleTemplate: '<span class="step">#index#</span> #title#'
		    , labels: {
		        finish: "Submit"
		    }
		    , onFinished: function (event, currentIndex) {
		       console.log("submitted");
		            
		    }
		});


		var form = $(".validation-wizard").show();

		(<any>$(".validation-wizard")).steps({
		    headerTag: "h6"
		    , bodyTag: "section"
		    , transitionEffect: "fade"
		    , titleTemplate: '<span class="step">#index#</span> #title#'
		    , labels: {
		        finish: "Submit"
		    }
		    , onStepChanging: function (event, currentIndex, newIndex) {
		        return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), (<any>form).validate().settings.ignore = ":disabled,:hidden", (<any>form).valid())
		    }
		    , onFinishing: function (event, currentIndex) {
		        return (<any>form).validate().settings.ignore = ":disabled", (<any>form).valid()
		    }
		    , onFinished: function (event, currentIndex) {
		         console.log("submitted");
		    }
		}), (<any>$(".validation-wizard")).validate({
		    ignore: "input[type=hidden]"
		    , errorClass: "text-danger"
		    , successClass: "text-success"
		    , highlight: function (element, errorClass) {
		        $(element).removeClass(errorClass)
		    }
		    , unhighlight: function (element, errorClass) {
		        $(element).removeClass(errorClass)
		    }
		    , errorPlacement: function (error, element) {
		        error.insertAfter(element)
		    }
		    , rules: {
		        email: {
		            email: !0
		        }
		    }
		})
	}
}
