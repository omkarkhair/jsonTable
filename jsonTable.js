(function ( $ ) {
 
    $.fn.jsonTable = function( options ) {
        var settings = $.extend({
            head: [],
            json:[]
        }, options );
        this.data("settings",settings);
        var thead = $(this.selector + ' thead').append("<tr></tr>\n");
        for(var i = 0; i < settings.head.length; i++){
             thead.append("<th>"+settings.head[i]+"</th>\n")
        }
        return this;
    };

    $.fn.jsonTableUpdate = function( url ){

        var settings = this.data("settings");
        var sel = this.selector;
        $(this.selector + ' tbody > tr').remove();

        $.get(url, function(data) {
            console.log(data);
            var row = "";
            for(var i = 0; i < data.length; i++){
                row += "<tr>";
                for (var j = 0; j < settings.json.length; j++) {
                    row += "<td>" + data[i][settings.json[j]] + "</td>";
                }
                row += "</tr>";
            }
            $(sel + '> tbody:last').append(row);
        });
    }
 
}( jQuery ));