$(document).ready(function(){
    sessionStorage.setItem("carro-moto",false);
    $("#slide-4 .respuestas").click(function(){
        
        if($("input:radio[name=acompañantes]:checked").val()=="no"){
            $("#n-acompañantes").attr('disabled','disabled');
            $("#n-acompañantes").val(0);
        }
        if($("input:radio[name=acompañantes]:checked").val()=="si"){
            $("#n-acompañantes").removeAttr('disabled');
        }
            
        
    }),
    //quitar la intro e iniciar el cuestionario
    $("#comienza-test").click(function(){

        gtag('event', 'Slide inicial', { 'event_category': 'click', 'event_label': 'btn comienza test', 'value': '0'});

        $("#title-logo").removeClass("animacion");
        $("#slide-1").css("display","none");
        $("#sliders").css("display","block");

    }),
    //mostrar seccion contacto
    $("#siguiente-paso").click(function(){

        gtag('event', 'Slide resultados', { 'event_category': 'click', 'event_label': 'btn siguiente paso', 'value': '0'});

        var posicion = $("#contacto").offset().top;
        $("html, body").animate({
        scrollTop: posicion
    }, 1000); 
    }),

    //funcion boton avanzar diapositiva
    $(".next").click(function(){
        var next_step = $(this).attr("data-next"), current_step = $(this).attr("data-current"),what_question=$(this).attr("data-question");
        
        //preguntas hogar
        if(current_step==2){
            if(0 == $("[name='estrato']:checked").length||0==$("#personas-hogar").val()){
                alert("Debe marcar o selecionar una opción");
                
            }
            else{
                sessionStorage.setItem("total-hogar",calcular(what_question));
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
            }
        }
        //pregunta movilidad-A
        if(current_step==3){
            if(0 == $("[name='medio-transporte']:checked").length){
                alert("Debe selecionar una opción");
            }
            else{
                var medio_t=$("[name='medio-transporte']:checked").val()
                if("otro"==medio_t||"electrico"==medio_t){
                    sessionStorage.setItem("total-movilidad",0)
                    sessionStorage.setItem("carro-moto",false);
                }
                else if("publico"==medio_t){
                    sessionStorage.setItem("total-movilidad",23.86*12);
                    sessionStorage.setItem("carro-moto",false);
                }
                else if("moto"==medio_t){
                    sessionStorage.setItem("carro-moto",true);
                }
                else if("carro"==medio_t){
                    sessionStorage.setItem("carro-moto",true);
                }

                if(sessionStorage.getItem("carro-moto")=="true"){
                    $("#slide-" + current_step).toggleClass("active-slide"), 
                    $("#slide-" + next_step).toggleClass("active-slide"); 
                }
                else{
                    $("#slide-" + current_step).toggleClass("active-slide"), 
                    $("#slide-" + (parseInt(next_step)+2)).toggleClass("active-slide"); 
                }
            }
        }
        //pregunta comparte carro
        if(current_step==4){
            if("si" == $("[name='acompañantes']:checked").val()){
                if($("#n-acompañantes").val()==0){
                    alert("Debe seleccionar el numero de acompañantes");
                }
                else{
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
                }
            }
            else{
                
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
            }
            
        }
        //pregunta gasolina
        if(current_step==5){
            if(0 == $("[name='combustible']:checked").length||0>=$("#dinero-gasolina").val()){
                alert("Debe selecionar una opción o ingresar un valor correcto");
            }
            else{
                sessionStorage.setItem("total-movilidad",calcular(what_question));
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
            }

        }
        //pregunta avion internacional
        if(current_step==6){
            if(0 == $("[name='avion-internacional']:checked").length){
                alert("Debe selecionar una opción");
            }
            else{
                sessionStorage.setItem("total-internacional",calcular(what_question));
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
            }

        }
         //pregunta avion nacional
        if(current_step==7){
            if(0 == $("[name='avion-nacional']:checked").length){
                alert("Debe selecionar una opción");
            }
            else{
                sessionStorage.setItem("total-nacional",calcular(what_question));
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
            }
        }
        //pregunta proteina
        if(current_step==8){
            if(0 == $("[name='res']:checked").length||0 == $("[name='pollo']:checked").length||0 == $("[name='cerdo']:checked").length||0 == $("[name='pescado']:checked").length){
                alert("Debe selecionar una opción en cada grupo");
            }
            else{
                sessionStorage.setItem("total-proteina",calcular(what_question));
                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 

            }
        }
        //pregunta residuos
        if(current_step==9){
            //validacion ultima diapositiva
            if(0==$("[name='residuos']:checked").length){
                alert("Debe selecionar una opción");
            }
            else{
                sessionStorage.setItem("total-residuos",calcular(what_question));

                //Calculo de resultado final
                var totalCo2=parseFloat(sessionStorage.getItem("total-hogar"))+parseFloat(sessionStorage.getItem("total-movilidad"))+parseFloat(sessionStorage.getItem("total-internacional"))+parseFloat(sessionStorage.getItem("total-nacional"))+parseFloat(sessionStorage.getItem("total-proteina"))+parseFloat(sessionStorage.getItem("total-residuos"));
                //paso a toneladas
                totalCo2=(totalCo2/1000);
                $("#cantidad-co2").text(totalCo2.toFixed(2));
                $("#cantidad-arboles").text((totalCo2*5.98).toFixed(0));
                /*MENSAJE*/
                if(totalCo2<=5){
                    $("#mensaje").text("Tus hábitos son sanos para el medio ambiente y aunque tu huella es baja, puedes ser multiplicador en tu entorno para que más personas cambien su forma de vivir.");
                }
                if(totalCo2>5&&totalCo2<=10){
                    $("#mensaje").text("Aunque tienes buenos hábitos, aún puedes mejorar para contribuir positivamente en la mitigación de la huella de carbono global, eres parte de la solución.");
                }
                if(totalCo2>10){
                    $("#mensaje").text("Tus hábitos contribuyen representativamente a la contaminación, es importante que los mejores y recuerdes que tus acciones tienen un impacto en el medio ambiente.");
                }


                /*Envia informacion a formulario*/

                $("#resultado_huella").val(totalCo2.toFixed(2));
                $("#resultado_arboles").val((totalCo2*5.98).toFixed(0));

                var min=0, max=15, p_termo=0;
                p_termo=((totalCo2-min)/(max-min))*100;
                if(p_termo<8){
                    p_termo=8;
                }
                else if(p_termo>95){
                    p_termo=95;
                }
                $(".img-line").css("bottom",p_termo+"%");
                


                //mostrar la seccion de video y contacto
                $("#cont-principal").addClass("recortep");
                $("#slide-10").addClass("recortes");
                $("#contacto").css("display","block");




                $("#slide-" + current_step).toggleClass("active-slide"), 
                $("#slide-" + next_step).toggleClass("active-slide"); 
                
            }

            

        }
        
    }),

    //funcion retroceder diapositiva
    $(".back").click(function(){
        var back_step= $(this).attr("data-previous"), current_step = $(this).attr("data-current");
        if(back_step==1){
            jQuery("#title-logo").addClass("animacion");
            $("#slide-" + current_step).toggleClass("active-slide"),
            $("#slide-" + back_step).toggleClass("active-slide");
        }
        else if(current_step==6){
            if(sessionStorage.getItem("carro-moto")=="true"){
                $("#slide-" + current_step).toggleClass("active-slide"),
                $("#slide-" + back_step).toggleClass("active-slide");
            }
            else{
                $("#slide-" + current_step).toggleClass("active-slide"),
                $("#slide-" + (parseInt(back_step)-2)).toggleClass("active-slide");
            }
        }
        else{
            $("#slide-" + current_step).toggleClass("active-slide"),
        $("#slide-" + back_step).toggleClass("active-slide");
        }
        
       
    })
});

function calcular(question){
var consumo=0;
   //calculo y validacion para pregunta 1 y 2
   
if("question-1-2"===question){
        var C=parseFloat($("[name='estrato']:checked").val());
        var P=parseInt($("#personas-hogar").val());
        consumo=(C*12*0.166)/P;
}
   //calculo de pregunta de proteina animal
if("question-proteina"===question){
    var res=$("[name='res']:checked").val(),pescado=$("[name='pescado']:checked").val(),cerdo=$("[name='cerdo']:checked").val(),pollo=$("[name='pollo']:checked").val();
    consumo=(parseFloat(res)+parseFloat(pescado)+parseFloat(cerdo)+parseFloat(pollo))*52;
}
 //calculo pregunta proteina
if("question-residuos"===question){
    consumo=parseFloat($("[name='residuos']:checked").val());
}
// calculo si es carro o moto
if("question-movilidad"===question){
    var combustibles=[
        {"nombre":"diesel","costo":8756.57,"factor":9.1341},
        {"nombre":"gas","costo":1761.18,"factor":1.9801},
        {"nombre":"gasolina","costo":8833.92,"factor":8.807,"f_moto":56.112}]
    
    var index=parseInt($("[name='combustible']:checked").val());
    var dinero=parseInt($("#dinero-gasolina").val());
    var n_acompañantes=parseInt($("#n-acompañantes").val())
    var moto_o_carro=$("[name='medio-transporte']:checked").val();
console.log(n_acompañantes);
    if(moto_o_carro=="moto"){
        consumo=((dinero/combustibles[2].costo)*combustibles[2].f_moto*12)/(n_acompañantes+1);
    }
    else{
        consumo=((dinero/combustibles[index].costo)*combustibles[index].factor*12)/(n_acompañantes+1);
    }

    
    
}
// calculo vuelos internacionales
if("vuelos-internacional"==question){
    var trayecto=parseInt($("[name='avion-internacional']:checked").val())
    consumo=trayecto*0.09490878;
}
// calculo vuelos nacionales
if("vuelos-nacionales"==question){
    var trayecto=parseInt($("[name='avion-nacional']:checked").val())
    consumo=trayecto*0.13378726;
}
//calculo 
return consumo;
}

function enviar(){


    gtag('event', 'Formulario', { 'event_category': 'click', 'event_label': 'enviar formulario', 'value': '0'});

    var form = jQuery('#form-contacto');

            jQuery.ajax({
                type: "POST",
                url: './../crud/almacenamiento.php',
                data: form.serialize(), // serializes the form's elements.
                success: function(data){
                    
                    msj= JSON.parse(data);
                        console.log(msj);

                    $("#form-contacto").hide();
                    $("#btn-enviar").hide();
                    $(".mensaje").css("display","flex");

            },
                error: function (data) {                    
                        msj= JSON.parse(data);
                        console.log(msj);
                },
            });


    
}

$(document).ready(function(){
    $("#modalS").click(function(){
        $("#modal").css("display","flex");
    })
    $("#modal").click(function(){
        $(this).css("display","none");
    })
})