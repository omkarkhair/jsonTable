(function ( $ ) {
 
    $.fn.jsonTable = function( options ) {
        var settings = $.extend({
            head: [],
            json:[]
        }, options, { table: this } );
        
        table = this;
        
        table.data("settings",settings);
        
        if (table.find("thead").length == 0) {
            table.append($("<thead></thead>").append("<tr></tr>"));
        }
        
        if (table.find("thead").find("tr").length == 0) {
            table.find("thead").append("<tr></tr>");
        }
            
        if (table.find("tbody").length == 0) {
            table.append($("<tbody></tbody>"));
        }
        
        $.each(settings.head, function(i, header) {
            table.find("thead").find("tr").append("<th>"+header+"</th>");
        });
        
        return table;
    };

    $.fn.jsonTableUpdate = function( options ){
        var opt = $.extend({
            source: undefined,
            rowClass: undefined,
            callback: undefined
        }, options );
        var settings = this.data("settings");

        if(typeof opt.source == "string")
        {
            $.get(opt.source, function(data) {
                $.fn.updateFromObj(data,settings,opt.rowClass, opt.callback);
            });
        }
        else if(typeof opt.source == "object")
        {
            $.fn.updateFromObj(opt.source,settings, opt.rowClass, opt.callback);
        }
    }

    $.fn.updateFromObj = function(obj,settings,rowClass, callback){
        settings.table.find("tbody").empty();
        $.each(obj, function(i,line) {
            var tableRow = $("<tr></tr>").addClass(rowClass);
            
            $.each(settings.json, function(j, identity) {
                if(identity == '*') {
                    tableRow.append($("<td>"+(i+1)+"</td>"));
                }
                else {
                    tableRow.append($("<td>" + line[this] + "</td>"));
                }
            });
            settings.table.append(tableRow);
        });
        
        
        if (typeof callback === "function") {
            callback();
        }
        
        $(window).trigger('resize');
    }
 
}( jQuery ));
 
