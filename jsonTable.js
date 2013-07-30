(function ( $ ) {
 
    $.fn.jsonTable = function( options ) {
        var settings = $.extend({
            head: [],
            json:[]
        }, options );
        this.data("settings",settings);
        var thead = $(this.selector + ' thead').append("<tr></tr>\n");
        for(var i = 0; i < settings.head.length; i++){
             $(this.selector + ' tr').append("<th>"+settings.head[i]+"</th>\n")
        }
        return this;
    };

    $.fn.jsonTableUpdate = function( url , trclass, callback){

        var settings = this.data("settings");
        var sel = this.selector;
        $(this.selector + ' tbody > tr').remove();

        if(typeof url == "string")
        {
            $.get(url, function(data) {
                $.fn.updateFromObj(data,settings,sel, trclass, callback);
            });
        }
        else if(typeof url == "object")
        {
            $.fn.updateFromObj(url,settings,sel, trclass, callback);
        }
    }

    $.fn.updateFromObj = function(obj,settings,selector, trclass, callback){
        var row = "";
        
        for(var i = 0; i < obj.length; i++){
            if (!trclass) {
                row += "<tr>";
            } else {
                row += "<tr class='" + trclass + "'>";
            }
            
            for (var j = 0; j < settings.json.length; j++) {
                row += "<td>" + obj[i][settings.json[j]] + "</td>";        
            }
            row += "</tr>";
        }
        $(selector + '> tbody:last').append(row);
        
        if (typeof callback == "function") {
            callback();
        }
        
        $(window).trigger('resize'); // trigger the resize event to reposition dialog once all the data is loaded
    }
 
}( jQuery ));
