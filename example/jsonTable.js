<style type="text/css">
    .visual-filter div a .btn{
        min-width: 200px;
    }
</style>
<script type="text/javascript" src="<?php echo base_url(); ?>js/jsonTable.js"></script>
<h2>Visualize</h2>
<div class="well">
    <div class="btn-group">
      <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
        <span id="eventName">Select an Event</span>
      </a>
      <ul id="eventSelect" class="dropdown-menu scroller-menu">
        <li>
            <a>No Events Found</a>
        </li>
      </ul>
    </div>
    <div id="filter-container">
    </div>
    <div style="padding-top:20px">
        <input type="button" class="btn" value="+" onclick="addFilterArea()">
    </div>
    <div style="padding-top:20px">
        <button class="btn btn-accent" id="showBtn">Show Results</button>
    </div>
</div>
<div>
    <table id="resultTable" class="table">
        <thead></thead>
        <tbody></tbody>
    </table>
</div>
<script>

    var eventName = "";
    var parameters = [];
    var filterCount = 0;
    var filter = [];

    function initFilters()
    {
        $.get('<?=base_url();?>async/getEvents', function(data) {
            if(data.length > 0){
                $("#eventSelect").empty();
            }

            for (var i = data.length - 1; i >= 0; i--) {
                $("#eventSelect").append('<li><a onclick="setEvent(\''+data[i].Event+'\')" href="#">'+data[i].Event+'</a><li>');
            };
        });
    }

    function getParams(str,filter)
    {
        $.get('<?=base_url();?>async/getParams/'+str, function(data) {
            parameters = data;
        });
    }

    function setEvent(str)
    {
        $("#eventName").html(str);
        $("#filter-container").empty();
        filter = [];
        eventName = str;
        console.log("Event selected: ",str);
        getParams(str,0);
    }

    function setParams(id,name,filter)
    {
        $("#paramName_" + filter).html(name);
        console.log("Parameter selected: ",str);
    }

    function addFilterArea()
    {
        $("#filter-container").append(' <div class="visual-filter" id="filterArea_'+filter.length+'"> <div class="span3 filterType"> <div class="btn-group"> <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"> <span id="filterMode_'+filter.length+'">COUNT</span> </a> <ul class="dropdown-menu scroller-menu" data-type="filterMode" data-filter="'+filter.length+'" id=""> <li> <a data-value="COUNT" href="#">COUNT</a> </li> <li> <a data-value="BY" href="#">BY</a> </li> <li> <a data-value="SUM" href="#">SUM</a> </li> <li> <a data-value="AVG" href="#">AVG</a> </li> <li> <a data-value="MAX" href="#">MAX</a> </li> <li> <a data-value="MIN" href="#">MIN</a> </li></ul> </div> </div> <div class="span3 filterParam"></div> <div class="span3 filterOperate"> </div> <div class="span3 filterQuery"></div> </div>');
        
        dropdownsInit();

        filter.push({
            mode:0,
            parameter:0,
            operator:null,
            query:null
        });
    }

    function addFilter(count)
    {
        addFilterArea();
    }

    function dropdownsInit()
    {
            $(".dropdown-menu li a").click(function(e){
            console.log($(this).text(),$(this).parent().parent().attr('data-filter'));
            $("#"+$(this).parent().parent().attr('data-type')+"_"+$(this).parent().parent().attr('data-filter')).html($(this).text());

            switch($(this).parent().parent().attr('data-type'))
            {
                case "filterMode":
                    filter[$(this).parent().parent().attr('data-filter')].mode = $(this).attr('data-value');
                    setFilter($(this).parent().parent().attr('data-filter'));
                break;
                case "filterParam":
                    filter[$(this).parent().parent().attr('data-filter')].parameter = $(this).attr('data-value');
                break;
                case "filterOperate":
                    filter[$(this).parent().parent().attr('data-filter')].operator = $(this).attr('data-value');
                break;
            }
        });
    }

    function setFilter(filterID)
    {   
        $("#filterArea_"+filterID+" .filterParam").empty();
        $("#filterArea_"+filterID+" .filterOperate").empty();
        $("#filterArea_"+filterID+" .filterQuery").empty();
        filter[filterID].parameter = null;
        filter[filterID].operator = null;
        filter[filterID].query = null;
        switch(filter[filterID].mode)
        {
            case "COUNT":
                console.log("Removed Filter params");
            break;

            case "BY":
                $("#filterArea_"+filterID+" .filterParam").append('<div class="btn-group"> <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"> <span id="filterParam_'+filterID+'">Select a Parameter</span> </a> <ul class="dropdown-menu scroller-menu" data-type="filterParam" data-filter="'+filterID+'" id="paramMenu_'+filterID+'"><li><a href="#">No parameters loaded</a></li></ul> </div>');

                $("#filterArea_"+filterID+" .filterOperate").append('<div class="btn-group"> <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"> <span id="filterOperate_'+filterID+'">Select a operator</span> </a> <ul class="dropdown-menu scroller-menu" data-type="filterOperate" data-filter="'+filterID+'" id="operatorMenu_'+filterID+'"><li><a data-value="eq" href="#">Equale</a></li><li><a data-value="ne" href="#">Not Equale</a></li><li><a data-value="gt" href="#">Greater than</a></li><li><a data-value="lt" href="#">Less than</a></li></ul> </div>');

                $("#filterArea_"+filterID+" .filterQuery").append('<input type="text" data-type="filterQuery"   onchange="addQuery('+filterID+')" id="query_'+filterID+'">');
                loadParameters(filterID);
            break;

            case "SUM":
            console.log("Created filter on",filterID);
                $("#filterArea_"+filterID+" .filterParam").append('<div class="btn-group"> <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"> <span id="filterParam_'+filterID+'">Select a Parameter</span> </a> <ul class="dropdown-menu scroller-menu" data-type="filterParam" data-filter="'+filterID+'" id="paramMenu_'+filterID+'"><li><a href="#">No parameters loaded</a></li></ul> </div>');
                loadParameters(filterID);
            break;

            default:
                console.log(filter[filterID].mode);
            break;
        }
    }

    function addQuery(filterID)
    {
        filter[filterID].query = $("#query_"+filterID).val();
    }

    function loadParameters(filterID)
    {
        $("#paramMenu_"+filterID).empty();
        for (var i = 0; i < parameters.length; i++) {
            var name = (parameters[i].name === null) ? "Unknown" : parameters[i].name;
            $("#paramMenu_"+filterID).append('<li><a data-value="'+parameters[i].id+'" href="#">'+name+' ('+parameters[i].id+')</a></li>');
        };
        dropdownsInit();
    }

    initFilters();

    $("#showBtn").click(function(){
        // send query to some endpoint
        $("#resultTable").jsonTable({
            head : ['#','Event','Date/Time'],
            json : ['RowKey','name','epoch'],
            id : 'RowKey'
        });
        
        console.log("Sending filter", filter);
        $.post("http://localhost:7575/", {event:eventName,data:JSON.stringify(filter)})
        .done(function(data) {
            console.log(data);
          var options = {
                source : data,
                callback : function() {
                    console.log("Data received");
                }
            }

            $("#resultTable").jsonTableUpdate(options);
        });
    });
</script>