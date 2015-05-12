README
======
This is a front end validation javascriop class that make it ease and no-pain the process of validate a 
form
Bueno unas actualizaciones despues del crash de mi sistema

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
