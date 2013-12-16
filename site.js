﻿$(function () {

    $("#selectedPartyBtns").hide();
    $("#wardProvinceBtns").hide();

    // variable for storing the created mapper.js object
    var mapper,
        shapeType = "provinces",
        wardProvince = "",
        indicatorType = "Winning party",
        selectedParty = "AFRICAN NATIONAL CONGRESS",
        resultCount = 5;

    // common styles
    var fillOpacity = 0.5,
        strokeWeight = 2,
        strokeOpacity = 1;

    // winning parties - need ability to add others
    var parties = [
         { name: "AFRICAN NATIONAL CONGRESS", fillColor: "#008442", fillOpacity: fillOpacity, strokeColor: "#000000", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight },
         { name: "DEMOCRATIC ALLIANCE/DEMOKRATIESE ALLIANSIE", fillColor: "#004887", fillOpacity: fillOpacity, strokeColor: "#ffffff", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight },
         { name: "INDEPENDENT DEMOCRATS", fillColor: "#ed8429", fillOpacity: fillOpacity, strokeColor: "#ffffff", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight },
         { name: "CONGRESS  OF THE PEOPLE", fillColor: "#fed404", fillOpacity: fillOpacity, strokeColor: "#000000", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight },
         { name: "UNITED DEMOCRATIC MOVEMENT", fillColor: "#0b6b3d", fillOpacity: fillOpacity, strokeColor: "#ff0000", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight },
         { name: "INKATHA FREEDOM PARTY", fillColor: "#f1452d", fillOpacity: fillOpacity, strokeColor: "#ffe215", strokeOpacity: strokeOpacity, strokeWeight: strokeWeight }
    ];

    // lookup arrays: get numeric id for code4sa rest service
    var provinces = []; provinces[1] = "Eastern Cape"; provinces[2] = "Free State"; provinces[3] = "Gauteng"; provinces[4] = "KwaZulu-Natal"; provinces[5] = "Limpopo"; provinces[6] = "Mpumalanga"; provinces[7] = "North West"; provinces[8] = "Northern Cape"; provinces[9] = "Western Cape";
    var municipalities = [];
    municipalities[2] = "EC101"; municipalities[3] = "EC102"; municipalities[4] = "EC103"; municipalities[5] = "EC104"; municipalities[6] = "EC105"; municipalities[7] = "EC106"; municipalities[8] = "EC107"; municipalities[9] = "EC108"; municipalities[10] = "EC109"; municipalities[11] = "EC121";
    municipalities[12] = "EC122"; municipalities[13] = "EC123"; municipalities[14] = "EC124"; municipalities[15] = "EC125"; municipalities[16] = "EC126"; municipalities[17] = "EC127"; municipalities[18] = "EC128"; municipalities[19] = "EC131"; municipalities[20] = "EC132"; municipalities[21] = "EC133";
    municipalities[22] = "EC134"; municipalities[23] = "EC135"; municipalities[24] = "EC136"; municipalities[25] = "EC137"; municipalities[26] = "EC138"; municipalities[27] = "EC141"; municipalities[28] = "EC142"; municipalities[29] = "EC143"; municipalities[30] = "EC144"; municipalities[31] = "EC151";
    municipalities[32] = "EC152"; municipalities[33] = "EC153"; municipalities[34] = "EC154"; municipalities[35] = "EC155"; municipalities[36] = "EC156"; municipalities[37] = "EC157"; municipalities[38] = "EC441"; municipalities[39] = "EC442"; municipalities[42] = "NMA"; municipalities[44] = "FS161";
    municipalities[45] = "FS162"; municipalities[46] = "FS163"; municipalities[47] = "FS171"; municipalities[48] = "FS172"; municipalities[49] = "FS173"; municipalities[50] = "FS181"; municipalities[51] = "FS182"; municipalities[52] = "FS183"; municipalities[53] = "FS184"; municipalities[54] = "FS185";
    municipalities[55] = "FS191"; municipalities[56] = "FS192"; municipalities[57] = "FS193"; municipalities[58] = "FS194"; municipalities[59] = "FS195"; municipalities[60] = "FS201"; municipalities[61] = "FS203"; municipalities[62] = "FS204"; municipalities[63] = "FS205"; municipalities[66] = "EKU";
    municipalities[67] = "GT421"; municipalities[68] = "GT422"; municipalities[69] = "GT423"; municipalities[70] = "GT461"; municipalities[71] = "GT462"; municipalities[72] = "GT481"; municipalities[73] = "GT482"; municipalities[74] = "GT483"; municipalities[75] = "GT484"; municipalities[77] = "JHB";
    municipalities[78] = "TSH"; municipalities[80] = "ETH"; municipalities[81] = "KZN211"; municipalities[82] = "KZN212"; municipalities[83] = "KZN213"; municipalities[84] = "KZN214"; municipalities[85] = "KZN215"; municipalities[86] = "KZN216"; municipalities[87] = "KZN221"; municipalities[88] = "KZN222";
    municipalities[89] = "KZN223"; municipalities[90] = "KZN224"; municipalities[91] = "KZN225"; municipalities[92] = "KZN226"; municipalities[93] = "KZN227"; municipalities[94] = "KZN232"; municipalities[95] = "KZN233"; municipalities[96] = "KZN234"; municipalities[97] = "KZN235"; municipalities[98] = "KZN236";
    municipalities[99] = "KZN241"; municipalities[100] = "KZN242"; municipalities[101] = "KZN244"; municipalities[102] = "KZN245"; municipalities[103] = "KZN252"; municipalities[104] = "KZN253"; municipalities[105] = "KZN254"; municipalities[106] = "KZN261"; municipalities[107] = "KZN262"; municipalities[108] = "KZN263";
    municipalities[109] = "KZN265"; municipalities[110] = "KZN266"; municipalities[111] = "KZN271"; municipalities[112] = "KZN272"; municipalities[113] = "KZN273"; municipalities[114] = "KZN274"; municipalities[115] = "KZN275"; municipalities[116] = "KZN281"; municipalities[117] = "KZN282"; municipalities[118] = "KZN283";
    municipalities[119] = "KZN284"; municipalities[120] = "KZN285"; municipalities[121] = "KZN286"; municipalities[122] = "KZN291"; municipalities[123] = "KZN292"; municipalities[124] = "KZN293"; municipalities[125] = "KZN294"; municipalities[126] = "KZN431"; municipalities[127] = "KZN432"; municipalities[128] = "KZN433";
    municipalities[129] = "KZN434"; municipalities[130] = "KZN435"; municipalities[136] = "LIM331"; municipalities[137] = "LIM332"; municipalities[138] = "LIM333"; municipalities[139] = "LIM334"; municipalities[140] = "LIM335"; municipalities[141] = "LIM341"; municipalities[142] = "LIM342"; municipalities[143] = "LIM343";
    municipalities[144] = "LIM344"; municipalities[145] = "LIM351"; municipalities[146] = "LIM352"; municipalities[147] = "LIM353"; municipalities[148] = "LIM354"; municipalities[149] = "LIM355"; municipalities[150] = "LIM361"; municipalities[151] = "LIM362"; municipalities[152] = "LIM364"; municipalities[153] = "LIM365";
    municipalities[154] = "LIM366"; municipalities[155] = "LIM367"; municipalities[156] = "LIM471"; municipalities[157] = "LIM472"; municipalities[158] = "LIM473"; municipalities[159] = "LIM474"; municipalities[160] = "LIM475"; municipalities[163] = "MP301"; municipalities[164] = "MP302"; municipalities[165] = "MP303";
    municipalities[166] = "MP304"; municipalities[167] = "MP305"; municipalities[168] = "MP306"; municipalities[169] = "MP307"; municipalities[170] = "MP311"; municipalities[171] = "MP312"; municipalities[172] = "MP313"; municipalities[173] = "MP314"; municipalities[174] = "MP315"; municipalities[175] = "MP316";
    municipalities[176] = "MP321"; municipalities[177] = "MP322"; municipalities[178] = "MP323"; municipalities[179] = "MP324"; municipalities[180] = "MP325"; municipalities[183] = "NW371"; municipalities[184] = "NW372"; municipalities[185] = "NW373"; municipalities[186] = "NW374"; municipalities[187] = "NW375";
    municipalities[188] = "NW381"; municipalities[189] = "NW382"; municipalities[190] = "NW383"; municipalities[191] = "NW384"; municipalities[192] = "NW385"; municipalities[193] = "NW391"; municipalities[194] = "NW392"; municipalities[195] = "NW393"; municipalities[196] = "NW394"; municipalities[197] = "NW395";
    municipalities[198] = "NW396"; municipalities[199] = "NW401"; municipalities[200] = "NW402"; municipalities[201] = "NW403"; municipalities[202] = "NW404"; municipalities[204] = "NC061"; municipalities[205] = "NC062"; municipalities[206] = "NC064"; municipalities[207] = "NC065"; municipalities[208] = "NC066";
    municipalities[209] = "NC067"; municipalities[210] = "NC071"; municipalities[211] = "NC072"; municipalities[212] = "NC073"; municipalities[213] = "NC074"; municipalities[214] = "NC075"; municipalities[215] = "NC076"; municipalities[216] = "NC077"; municipalities[217] = "NC078"; municipalities[218] = "NC081";
    municipalities[219] = "NC082"; municipalities[220] = "NC083"; municipalities[221] = "NC084"; municipalities[222] = "NC085"; municipalities[223] = "NC086"; municipalities[224] = "NC091"; municipalities[225] = "NC092"; municipalities[226] = "NC093"; municipalities[227] = "NC094"; municipalities[228] = "NC451";
    municipalities[229] = "NC452"; municipalities[230] = "NC453"; municipalities[237] = "CPT"; municipalities[238] = "WC011"; municipalities[239] = "WC012"; municipalities[240] = "WC013"; municipalities[241] = "WC014"; municipalities[242] = "WC015"; municipalities[243] = "WC022"; municipalities[244] = "WC023";
    municipalities[245] = "WC024"; municipalities[246] = "WC025"; municipalities[247] = "WC026"; municipalities[248] = "WC031"; municipalities[249] = "WC032"; municipalities[250] = "WC033"; municipalities[251] = "WC034"; municipalities[252] = "WC041"; municipalities[253] = "WC042"; municipalities[254] = "WC043";
    municipalities[255] = "WC044"; municipalities[256] = "WC045"; municipalities[257] = "WC047"; municipalities[258] = "WC048"; municipalities[259] = "WC051"; municipalities[260] = "WC052"; municipalities[261] = "WC053";

    var numShapes = []; numShapes["provinces"] = 9; numShapes["municipalities"] = 234; numShapes["wards"] = 4278;

    $("#btnInfo").click(function () {
        $('#infoWindow').modal(options);
    });

    // changing the shapetype dropdown
    $("#shapetypeDropdown li a").click(function () {
        $("#shapeType").text($(this).text());
        shapeType = $(this).text().toLowerCase();
        if (shapeType == "wards") $("#wardProvinceBtns").show();
        // don't show map if wards & no province selection yet
        if (shapeType != "wards" || wardProvince != "")
            startMap();
    });

    // changing the shapetype dropdown
    $("#wardProvinceDropdown li a").click(function () {
        if ($(this).text() == "All provinces") {
            if (!confirm("Are you sure you want to download all ward data?\n\nThe combined file size is ~ 10MB"))
                return;
        }
        $("#wardProvince").text($(this).text());
        wardProvince = $(this).text();
        if (wardProvince)
            startMap();
    });

    // changing the indicator type dropdown
    $("#indicatorTypeDropdown li a").click(function () {
        $("#indicatorType").text($(this).text());
        indicatorType = $(this).text();
        // show result count for winning party
        if (indicatorType == "Winning party") $("#resultCountBtns").show();
        else $("#resultCountBtns").hide();
        // show party list for party base
        if (indicatorType == "Party base" || indicatorType == "Party strength") $("#selectedPartyBtns").show().removeClass("hide");
        else $("#selectedPartyBtns").hide();
        startMap();
    });

    // changing the selected party dropdown
    $("#selectedPartyDropdown li a").click(function () {
        $("#selectedParty").text($(this).text());
        selectedParty = $(this).text();
        startMap();
    });

    // changing the result count dropdown
    $("#resultCountDropdown li a").click(function () {
        $("#resultCount").text($(this).text());
        resultCount = ($(this).text() == "Hide results" ? 0 : parseInt($(this).text()));
        $("#results").hide();
    });

    // setup results panel
    $("#results").draggable({ start: function () { $(this).css("right", "inherit"); } });
    $("#results #heading button").click(function () {
        $("#results").hide();
    });

    function getStyle(data) {
        var styles = {};
        if (indicatorType == "Winning party") {

            // get party style
            styles = $.grep(parties, function (p) { return p.name == data.votes[0].party; })[0];

        } else if (indicatorType == "Winning margin") {

            // get party style
            styles = $.grep(parties, function (p) { return p.name == data.votes[0].party; })[0];

            // calculate the winning margin
            var winningPartyPercent = (data.votes[0].votes / data.totalVotes * 100).toFixed(2),
                secondPartyPercent = (data.votes[1].votes / data.totalVotes * 100).toFixed(2),
                winningMargin = winningPartyPercent - secondPartyPercent;

            // override the party style with margin-based opacity
            if (winningMargin >= 20) {
                styles.fillOpacity = 0.88;
            } else if (winningMargin >= 15) {
                styles.fillOpacity = 0.73;
            } else if (winningMargin >= 10) {
                styles.fillOpacity = 0.58;
            } else if (winningMargin >= 5) {
                styles.fillOpacity = 0.43;
            } else {
                styles.fillOpacity = 0.28;
            }

        } else if (indicatorType == "Party base") {

            // get party style
            styles = $.grep(parties, function (p) { return p.name == selectedParty; })[0];

            var ps = getPartyBaseValues(data);

            // calculate the winning margin
            var percentOfTotalVotes = (ps.partyVotes / ps.totalPartyVotes * 100).toFixed(2);

            // override the party style with margin-based opacity

            if (percentOfTotalVotes >= (100 / numShapes[shapeType] * 1.5)) { // province (9) = 16.67
                styles.fillOpacity = 0.88;
            } else if (percentOfTotalVotes >= (100 / numShapes[shapeType] * 1.0)) {
                styles.fillOpacity = 0.73;
            } else if (percentOfTotalVotes >= (100 / numShapes[shapeType] * 0.75)) {
                styles.fillOpacity = 0.58;
            } else if (percentOfTotalVotes >= (100 / numShapes[shapeType] * 0.5)) {
                styles.fillOpacity = 0.43;
            } else {
                styles.fillOpacity = 0.28;
            }

        } else if (indicatorType == "Party strength") {

            // get party style
            styles = $.grep(parties, function (p) { return p.name == selectedParty; })[0];

            // get party votes in this area
            var partyVotes = $.grep(data.votes, function (v) { return v.party == selectedParty; })[0].votes;

            var percentWon = (partyVotes / data.totalVotes * 100).toFixed(2);

            // override the party style with margin-based opacity
            if (percentWon >= 20) {
                styles.fillOpacity = 0.88;
            } else if (percentWon >= 10) {
                styles.fillOpacity = 0.73;
            } else if (percentWon >= 5) {
                styles.fillOpacity = 0.58;
            } else if (percentWon >= 2.5) {
                styles.fillOpacity = 0.43;
            } else {
                styles.fillOpacity = 0.28;
            }

        }

        return styles;
    }

    function getPartyBaseValues(data) {

        var partyVotes = $.grep(data.votes, function (v) { return v.party == selectedParty; })[0].votes;

        var totalPartyVotes = 0;
        for (var provinceCounter = 1; provinceCounter <= 9; provinceCounter++) {
            var provData = getDataWithDataType(provinces[provinceCounter], "provinces");
            var provVotes = $.grep(provData.votes, function (v) { return v.party == selectedParty; })[0];
            totalPartyVotes += provVotes.votes;
        }

        return { partyVotes: partyVotes, totalPartyVotes: totalPartyVotes };
    }

    var shapeClicked = function () {

        // hide the results table
        $("#results").hide();

        // get the data (converting munic code into id)
        var data = getData(this.dataType == "municipalities" ? $.inArray(this.id, municipalities) : this.id);

        var resultsHtml = "";

        if (!data.votes || data.votes.length == 0) {
            resultsHtml += "<tr><td class=\"text-danger\" colspan=\"3\">No results were found</td></tr>";
        } else {

            if (indicatorType == "Winning party") {
                // build the results table
                var numberOfVotesToShow = (resultCount ? data.votes.slice(0, resultCount) : data.votes);
                for (idx in numberOfVotesToShow) {
                    var vote = data.votes[idx];
                    resultsHtml += "<tr><td>" + toTitleCase(vote.party) + "</td>" +
                        "<td class=\"text-right\">" + separateThousands(vote.votes, ",") + "</td>" +
                        "<td class=\"text-right\">" + (vote.votes / data.totalVotes * 100).toFixed(2) + "%</td></tr>";
                }

            } else if (indicatorType == "Winning margin") {

                // calculate the winning margin
                var winningPartyPercent = (data.votes[0].votes / data.totalVotes * 100).toFixed(2),
                    secondPartyPercent = (data.votes[1].votes / data.totalVotes * 100).toFixed(2),
                    winningMargin = winningPartyPercent - secondPartyPercent;

                resultsHtml += "<tr><td>" + toTitleCase(data.votes[0].party) + "</td>" +
                    "<td class=\"text-right\">" + separateThousands(data.votes[0].votes, ",") + "</td>" +
                    "<td class=\"text-right\">" + (data.votes[0].votes / data.totalVotes * 100).toFixed(2) + "%</td></tr>";

                resultsHtml += "<tr><td>" + toTitleCase(data.votes[1].party) + "</td>" +
                    "<td class=\"text-right\">" + separateThousands(data.votes[1].votes, ",") + "</td>" +
                    "<td class=\"text-right\">" + (data.votes[1].votes / data.totalVotes * 100).toFixed(2) + "%</td></tr>";

                resultsHtml += "<tr><th>Winning margin:</td>" +
                    "<th class=\"text-right\">" + separateThousands(data.votes[0].votes - data.votes[1].votes, ",") + "</th>" +
                    "<th class=\"text-right\">" + (winningMargin).toFixed(2) + "%</th></tr>";

            } else if (indicatorType == "Party base") {

                var ps = getPartyBaseValues(data);

                resultsHtml += "<tr><td>" + selectedParty + "</td>" +
                    "<td class=\"text-right\">" + separateThousands(ps.partyVotes, ",") + "</td>" +
                    "<td class=\"text-right\">" + (ps.partyVotes / ps.totalPartyVotes * 100).toFixed(2) + "%</td></tr>";

                resultsHtml += "<tr><th>Party votes (national):</td>" +
                    "<th class=\"text-right\">" + separateThousands(ps.totalPartyVotes, ",") + "</th>" +
                    "<th class=\"text-right\">100.00%</th></tr>";

            } else if (indicatorType == "Party strength") {

                // get party votes in this area
                var partyVotes = $.grep(data.votes, function (v) { return v.party == selectedParty; })[0].votes;

                resultsHtml += "<tr><td>" + selectedParty + "</td>" +
                    "<td class=\"text-right\">" + separateThousands(partyVotes, ",") + "</td>" +
                    "<td class=\"text-right\">" + (partyVotes / data.totalVotes * 100).toFixed(2) + "%</td></tr>";

                resultsHtml += "<tr><th>Total votes (" + this.id + "):</td>" +
                    "<th class=\"text-right\">" + separateThousands(data.totalVotes, ",") + "</th>" +
                    "<th class=\"text-right\">100.00%</th></tr>";

            }

            // get the styles
            var styles = $.extend({}, getStyle(data));

            // set the styles to the clicked shape (polygon)
            this.setOptions(styles);
        }

        // show the results table
        $("#results table tbody").html(resultsHtml);
        if (shapeType == "municipalities") {
            var munic = getData($.inArray(this.id, municipalities));
            $("#results #heading #headingText").text(munic.name);
        } else
            $("#results #heading #headingText").text(this.id);
        if (resultCount !== 0) $("#results").show();

    };

    // start the map
    function startMap() {

        $("body").addClass("loading");
        window.setTimeout(function () {

            // hide results
            $("#results").hide();

            // destroy existing mapper
            if (mapper)
                mapper.mapper("destroy");

            // load all clicked shapes from localstorage
            var loadedData = [];
            if (typeof (window.Storage) !== "undefined") {
                // get the list of ids for the selected shape type
                var ids = JSON.parse(localStorage.getItem(shapeType));
                for (var i in ids) {
                    var id = ids[i];
                    // get the data for this id
                    var data = getData(id);
                    // add to array of data (ids + styles) for mapper.js to load
                    if (data.votes.length > 0) {
                        // get the styles
                        var item = $.extend({}, getStyle(data));
                        // add the id
                        item.id = (shapeType === "municipalities" ? municipalities[id] : id);
                        // push to array
                        loadedData.push(item);
                    }
                }
            }

            var allowAllWards = false;
            if (shapeType == "wards" && wardProvince == "All provinces") allowAllWards = true;

            // create new mapper
            try {
                mapper = $("#map").mapper({
                    allowAllWards: allowAllWards,
                    dataType: shapeType,
                    drawAll: true,
                    data: loadedData,
                    click: shapeClicked,
                    province: (shapeType == "wards" ? (wardProvince == "All provinces" ? "" : wardProvince) : "")
                });
            }
            finally {
                $("body").removeClass("loading");
            }
        }, 150);

    }

    function getDataWithDataType(id, dataType) {

        var url;
        if (dataType == "municipalities")
            url = "http://iec.code4sa.org/votes/by_municipality/" + id + "/?format=json";
        else if (dataType == "wards")
            url = "http://iec.code4sa.org/votes/by_ward/?format=json&ward=" + id; // wards doesn't have an id format
        else if (dataType == "provinces")
            url = "http://iec.code4sa.org/votes/by_province/" + $.inArray(id, provinces) + "/?format=json";
        else
            throw new Error("Invalid dataType in getDataWithDataType: " + dataType);

        var data = null;

        // if browser supports local storage, try get results
        if (typeof (window.Storage) !== "undefined") {
            data = JSON.parse(localStorage.getItem(url));
        }

        // not retrieved from localstorage
        if (!data) {

            // get from ajax
            $.ajax({
                'async': false,
                'global': false,
                'url': url,
                'dataType': "json",
                'success': function (d) {
                    data = d;

                    // shift the votes from the results to the data object (for uniformity)
                    if (!data.votes && data.results[0] && data.results[0].votes) {
                        data.votes = data.results[0].votes;
                        delete data.results[0].votes;
                    }

                    // get votes object
                    if (!data.votes || data.votes.length == 0)
                        data.votes = []; //throw new Error("No votes were found"); // boundary changes?

                    // remove invalid votes (nulls) // TODO: investigate where these are from
                    var voteIndex = data.votes.length;
                    while (voteIndex--) {
                        if (data.votes[voteIndex].party == null || data.votes[voteIndex].votes == null) {
                            data.votes.splice(voteIndex, 1);
                        }
                    }

                    // get the total number of votes
                    var totalVotes = 0;
                    for (var idx in data.votes) {
                        var vote = data.votes[idx];
                        totalVotes += vote.votes;
                    }

                    // store the total number of votes
                    if (totalVotes) data.totalVotes = totalVotes;

                    // sort by vote count desc
                    data.votes.sort(function (a, b) {
                        var aVotes = a.votes;
                        var bVotes = b.votes;
                        return ((bVotes < aVotes) ? -1 : ((bVotes > aVotes) ? 1 : 0));
                    });

                    // if browser supports local storage, store results
                    if (typeof (window.Storage) !== "undefined") {
                        // store the json data
                        localStorage.setItem(url, JSON.stringify(data));
                        // add id to the list of ids
                        var ids = JSON.parse(localStorage.getItem(dataType)) || [];
                        if (ids.indexOf(id) < 0) ids.push(id);
                        localStorage.setItem(dataType, JSON.stringify(ids));
                    }
                }
                , 'error': function () {
                    data = {};
                    data.votes = []; //throw new Error("Error retrieving data from " + url);
                }
            });
        }

        return data;
    }

    function getData(id) {
        return getDataWithDataType(id, shapeType);
    }

    function separateThousands(value, separator) {
        if (!value) return value;
        value = value.toString().replace(/,/g, '');
        var rx = new RegExp('(-?[0-9]+)([0-9]{3})');
        while (rx.test(value)) {
            value = value.replace(rx, '$1' + separator + '$2');
        }
        return value;
    }

    function toTitleCase(str) {
        if (!str) return str;
        return str.replace(/\w[a-zA-Z0-9']*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    // start the map
    startMap();

    //localStorage.setItem("visited", "0");
    if (localStorage.getItem("visited") !== "1") {
        localStorage.setItem("visited", "1");
        $('#infoWindow').modal(options);
    }

});
