(function ( $ ) {
 
    $.fn.jsonTable = function( options ) {
        var settings = $.extend({
            head: [],
            json:[],
            id: ""
        }, options );
        this.data("settings",settings);
        $(this.selector + ' thead').empty();
        var thead = $(this.selector + ' thead').append("<tr></tr>\n");
        for(var i = 0; i < settings.head.length; i++){
             $(this.selector + ' thead tr').append("<th>"+settings.head[i]+"</th>\n")
        }
        return this;
    };

    $.fn.jsonTableUpdate = function( options ){
        var opt = $.extend({
            source: undefined,
            rowClass: undefined,
            callback: undefined
        }, options );
        var settings = this.data("settings");
        var sel = this.selector;
        $(this.selector + ' tbody > tr').remove();
        if(typeof opt.source == "string")
        {
            $.get(opt.source, function(data) {
                $.fn.updateFromObj(data,settings,sel, opt.rowClass, opt.callback);
            });
        }
        else if(typeof opt.source == "object")
        {
            $.fn.updateFromObj(opt.source,settings,sel, opt.rowClass, opt.callback);
        }
    }

    $.fn.updateFromObj = function(obj,settings,selector, rowClass, callback){
        $.each(obj, function(arrIndex,obj) {
            var dataRow = this;
            var tableRow = $("<tr></tr>").addClass(rowClass).attr({ "data-value": dataRow[settings.id] });
            
            $.each(settings.json, function() {
                if(this == '*') {
                    tableRow.append($("<td>"+(arrIndex+1)+"</td>"));
                }
                else {
                    tableRow.append($("<td>" + dataRow[this] + "</td>"));
                }
            });
            $(selector + '> tbody:last').append(tableRow);
        });
        
        
        if (typeof callback === "function") {
            callback();
        }
        
        $(window).trigger('resize'); // trigger the resize event to reposition dialog once all the data is loaded
    }
 
}( jQuery ));