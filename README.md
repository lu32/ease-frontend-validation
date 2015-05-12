README
======
This is a front end validation javascrip class that make it ease and no-pain the process of validate a 
form

## Usage

```javascript
    $("#form_id").on("submit", function(e){
        var inputs = {
            tipo:$("#field_1"),
            area:$("#area")        
            
        };
        var rules = {
            field_1:'required:true',
            area:'required:true|numeric:true'            
        }
        validar = new validation(inputs, rules);

        if ( !validar.validate() ) {
            e.preventDefault();
        }

    });
```

## Methods

* validate: returns true if all the fields in the form validate, otherwise false
* fails: return true if somefield fails to validate, otherwise returns true
* getErrors:  return an array with the errors of the form

## Args
 The class has three arguments, the inputs, the rules, and an optional third arg to setUp the mode in which the errors are displayed, 'dialogo' and 'nube'.
