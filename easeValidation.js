// Ease Validation class for javascript
// this class depends on jQuery for function properly

function validation(inputs, rules, display){
    display = typeof display !== 'undefined' ?  display : 'nube';
    this.submit = true;
    this.errorsArray = [];
    this.getErrors =  function(){
        return this.errorsArray;
    }
    this.fails = function(){
            return ( this.validate() )? false : true;
    };

    this.dialogo = function(titulo, content, timeout){
            if (typeof timeout == "undefined") {
                timeout = 5000;
            };
            $( " <div title='" + titulo + "'> " ).html(content)
            .dialog()
            .delay(timeout).show(1,function(){$(this).dialog( "close" );});
    }
    this.nube = function(o, mensaje){
            o.prop("title", mensaje)
                .tooltip({
                  position: {
                    my: "left top",
                    at: "right+5 top-5"
                  },
                  close: function( event, ui ) {$(this).tooltip( "destroy" );}
                }).tooltip("open");
    }

    this.validate = function(){
        for(var k in inputs){
            var value = inputs[k].val().trim(),
            input = inputs[k],
            valueRules = rules[k].split("|"),
            inputErrors = [];

            // go throught all the rules of one input

            for( var r in valueRules ){
                var pair = valueRules[r].split(":");
                
                // check if the pair of rule and value of rule are present
                if ( pair.length === 2 ) { 

                    var ruleValue = pair[1],
                    rule = pair[0];
                    
                    if (rule === "required" && value == "") 
                    {
                        inputErrors.push("El campo " + k + " es requerido");
                    } else if(value == "") 
                    {
                        switch(rule){
                            case 'atLeastOne':
                                var fields = ruleValue.split(",");
                                var atLeast = 0;
                                for (var i = 0; i < fields.length; i++) 
                                {
                                    if ( inputs[fields[i]].val() != "" ) 
                                    {
                                        atLeast++;
                                    }
                                }
                                if ( atLeast < 1 ) {
                                    inputErrors.push("Al menos uno de estos campos: " + ruleValue + " debe ser llenado." );
                                };
                            break;
                            default:
                            // do nothing
                        }
                    } else if ( value != "" ) 
                    {
                        switch(rule){
                            case 'minL':
                                if ( value.length < ruleValue ) {
                                    inputErrors.push(k + " debe tener al menos " +  ruleValue + " caracteres");
                                };
                            break;
                            case 'maxL':
                                if ( value.length > ruleValue ) {
                                    inputErrors.push(k + " debe tener maximo " +  ruleValue + " caracteres");
                                };
                            break;
                            case 'minN':
                                if ( parseFloat(value) < ruleValue ) {
                                    inputErrors.push(k + " debe ser minimo de " +  ruleValue);
                                };
                            break;
                            case 'maxN':
                                if ( parseFloat(value) > ruleValue ) {
                                    inputErrors.push(k + " debe ser maximo " +  ruleValue);
                                };
                            break;
                            case 'matches':
                                if ( value != inputs[ruleValue].val().trim() ) {
                                    inputErrors.push(k + " debe coincidir con " +  ruleValue);
                                };
                            break;
                            case  'regex':
                                if ( !ruleValue.test( value ) ) {
                                    inputErrors.push(k + " no tiene el formato adecuado");
                                };
                            break;
                            case  'email':
                                var emailPatt = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                                if ( !emailPatt.test( value ) ) {
                                    inputErrors.push(k + " el email no tiene el formato adecuado");
                                };
                            break;
                            case 'numeric':
                                if ( !$.isNumeric( value ) ) {
                                    inputErrors.push(k + " debe ser un valor numerico.");
                                };
                            break;
                            case 'fileSize':
                                var size = inputs[k][0].files[0].size/1048576;
                                if ( size > ruleValue ) {
                                    inputErrors.push(k + " debe tener un tamaño maximo de " + ruleValue + " megabites");
                                };
                            break;

                            default:
                            // do nothing
                        }
                    } //  end if value != ""
                    
                }  // end of checking rule=>value pair

            }  // end of going throught all rules of one input

            // what to do if there is any errors
            if ( inputErrors.length > 0  ) {
                this.errorsArray.push(inputErrors);
                switch(display){
                    case 'nube':
                        this.nube(input, inputErrors.join("<br>"));
                    break;
                    case 'dialogo':
                        this.dialogo("Validación", inputErrors.join("<br>"), 10000);
                    break;
                    default:

                }
                
                this.submit = false;
            } // end if errors 
            
        }
        return this.submit;
    },

    this.getValues = function(){
        var values = {};
        for( k in inputs ) {
            values[k] = inputs[k].val().trim();
        }
        return values;
    }
}