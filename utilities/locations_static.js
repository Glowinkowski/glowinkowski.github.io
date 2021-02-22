

class Country {

    constructor(_ID, _Name) {

        this.ID = _ID;
        this.Name = _Name;
    }

}

class Region {

    constructor(_ID, _CountryID, _Name) {

        this.ID = _ID;
        this.CountryID = _CountryID;
        this.Name = _Name;
    }

}

class State {

    constructor(_ID, _CountryID, _RegionID, _Name) {

        this.ID = _ID;
        this.CountryID = _CountryID;
        this.RegionID = _RegionID;
        this.Name = _Name;
    }

}


var countries = [];
var regionsList = [];
var statesList = [];

// This statically populates the arrays of countries / regions and states
createLists();

// This gets a list of countries and writes to the user input form
getCountries();

function countrySelected() {

    try {

        var country_id = document.getElementById("country").value;

        getRegions(country_id);

    }
    catch (err) {

        alert(err.message + " in countrySelected()");
    }
}

function regionSelected() {

    try {

        var region_id = document.getElementById("region").value;

        getStates(region_id);

    }
    catch (err) {

        alert(err.message + " in regionSelected()");
    }
}

function getCountries() {

    try {

        writeCountries();

    }
    catch (err) {

        alert(err.message + " in getCountries()");
    }
}

function getRegions(country_id) {

    try {

        var regions = [];
        var N = regionsList.length;
        var k = 0;

        for (var i = 0; i < N; i++) {

            if (regionsList[i].CountryID == country_id) {
                regions[k] = regionsList[i];
                k++;
            }
        }

        writeRegions(regions);

    }
    catch (err) {

        alert(err.message + " in getRegions(country_id)");
    }
}

function getStates(region_id) {

    try {

        var states = [];
        var N = statesList.length;
        var k = 0;

        for (var i = 0; i < N; i++) {

            if (statesList[i].RegionID == region_id) {
                states[k] = statesList[i];
                k++;
            }
        }

        writeStates(states);

    }
    catch (err) {

        alert(err.message + " in getStates(region_id)");
    }

}

function writeCountries() {

    try {

        var textstr = "<option value=\"\" selected disabled hidden>Select your country</option>";

        var N = countries.length;

        for (var i = 0; i < N; i++) {

            textstr += "<option value=\"" + countries[i].ID + "\">" + countries[i].Name + "</option>";
        }

        textstr += "<option value=\"0\">Not listed</option>";

        // Write string to document
        document.getElementById("country").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in printCountries()");
    }

}

function writeRegions(regions) {

    try {

        var regionstr = "";

        var N = regions.length;

        if (N > 0) {

            regionstr = "<option value=\"\" selected disabled hidden>Select your region/province</option>";

            for (var i = 0; i < N; i++) {

                regionstr += "<option value=\"" + regions[i].ID + "\">" + regions[i].Name + "</option>";
            }

            // Erase list of states
            document.getElementById("state").innerHTML = "<option value=\"0\"></option>";

        }
        else {

            regionstr += "<option value=\"0\">Not listed</option>";

            // Erase list of states
            document.getElementById("state").innerHTML = "<option value=\"0\">Not listed</option>";

        }
        

        // Write string to document
        document.getElementById("region").innerHTML = regionstr;

    }
    catch (err) {

        alert(err.message + " in writeRegions()");
    }
}

function writeStates(states) {

    try {

        var statestr = "<option value=\"\" selected disabled hidden>Select your state/county</option>";

        var N = states.length;

        for (var i = 0; i < N; i++) {

            statestr += "<option value=\"" + states[i].ID + "\">" + states[i].Name + "</option>";
        }

        if (N == 0) {

            regionstr += "<option value=\"0\">Not listed</option>";

        }

        // Write string to document
        document.getElementById("state").innerHTML = statestr;

    }
    catch (err) {

        alert(err.message + " in writeRegions()");
    }
}

function createLists() {

    try {

        countries[0] = new Country(102, 'Ireland');
        countries[1] = new Country(153, 'Nigeria');
        countries[2] = new Country(229, 'United Kingdom');

        regionsList[0] = new Region(1, 229, 'England');
        regionsList[1] = new Region(2, 229, 'Scotland');
        regionsList[2] = new Region(3, 229, 'Northern Ireland');
        regionsList[3] = new Region(4, 229, 'Wales');
        regionsList[4] = new Region(5, 153, 'North Central');
        regionsList[5] = new Region(6, 153, 'North East');
        regionsList[6] = new Region(7, 153, 'North West');
        regionsList[7] = new Region(8, 153, 'South East');
        regionsList[8] = new Region(9, 153, 'South South');
        regionsList[9] = new Region(10, 153, 'South West');
        regionsList[10] = new Region(11, 102, 'Connacht');
        regionsList[11] = new Region(12, 102, 'Leinster');
        regionsList[12] = new Region(13, 102, 'Munster');
        regionsList[13] = new Region(14, 102, 'Ulster');

        statesList[0] = new State(88, 229, 1, 'Bedfordshire');
        statesList[1] = new State(89, 229, 1, 'Berkshire');
        statesList[2] = new State(90, 229, 1, 'Bristol');
        statesList[3] = new State(91, 229, 1, 'Buckinghamshire');
        statesList[4] = new State(92, 229, 1, 'Cambridgeshire');
        statesList[5] = new State(93, 229, 1, 'Cheshire');
        statesList[6] = new State(94, 229, 1, 'City of London');
        statesList[7] = new State(95, 229, 1, 'Cornwall');
        statesList[8] = new State(96, 229, 1, 'County Durham');
        statesList[9] = new State(97, 229, 1, 'Cumbria');
        statesList[10] = new State(98, 229, 1, 'Derbyshire');
        statesList[11] = new State(99, 229, 1, 'Devon');
        statesList[12] = new State(100, 229, 1, 'Dorset');
        statesList[13] = new State(101, 229, 1, 'East Riding of Yorkshire');
        statesList[14] = new State(102, 229, 1, 'East Sussex');
        statesList[15] = new State(103, 229, 1, 'Essex');
        statesList[16] = new State(104, 229, 1, 'Gloucestershire');
        statesList[17] = new State(105, 229, 1, 'Greater London');
        statesList[18] = new State(106, 229, 1, 'Greater Manchester');
        statesList[19] = new State(107, 229, 1, 'Hampshire');
        statesList[20] = new State(108, 229, 1, 'Herefordshire');
        statesList[21] = new State(109, 229, 1, 'Hertfordshire');
        statesList[22] = new State(110, 229, 1, 'Isle of Wight');
        statesList[23] = new State(111, 229, 1, 'Kent');
        statesList[24] = new State(112, 229, 1, 'Lancashire');
        statesList[25] = new State(113, 229, 1, 'Leicestershire');
        statesList[26] = new State(114, 229, 1, 'Lincolnshire');
        statesList[27] = new State(115, 229, 1, 'Merseyside');
        statesList[28] = new State(116, 229, 1, 'Norfolk');
        statesList[29] = new State(117, 229, 1, 'North Yorkshire');
        statesList[30] = new State(118, 229, 1, 'Northamptonshire');
        statesList[31] = new State(119, 229, 1, 'Northumberland');
        statesList[32] = new State(120, 229, 1, 'Nottinghamshire');
        statesList[33] = new State(121, 229, 1, 'Oxfordshire');
        statesList[34] = new State(122, 229, 1, 'Rutland');
        statesList[35] = new State(123, 229, 1, 'Shropshire');
        statesList[36] = new State(124, 229, 1, 'Somerset');
        statesList[37] = new State(125, 229, 1, 'South Yorkshire');
        statesList[38] = new State(126, 229, 1, 'Staffordshire');
        statesList[39] = new State(127, 229, 1, 'Suffolk');
        statesList[40] = new State(128, 229, 1, 'Surrey');
        statesList[41] = new State(129, 229, 1, 'Tyne and Wear');
        statesList[42] = new State(130, 229, 1, 'Warwickshire');
        statesList[43] = new State(131, 229, 1, 'West Midlands');
        statesList[44] = new State(132, 229, 1, 'West Sussex');
        statesList[45] = new State(133, 229, 1, 'West Yorkshire');
        statesList[46] = new State(134, 229, 1, 'Wiltshire');
        statesList[47] = new State(135, 229, 1, 'Worcestershire');
        statesList[48] = new State(136, 229, 3, 'Antrim');
        statesList[49] = new State(137, 229, 3, 'Armagh');
        statesList[50] = new State(138, 229, 3, 'City of Belfast');
        statesList[51] = new State(139, 229, 3, 'City of Derry');
        statesList[52] = new State(140, 229, 3, 'Down');
        statesList[53] = new State(141, 229, 3, 'Fermanagh');
        statesList[54] = new State(142, 229, 3, 'Londonderry');
        statesList[55] = new State(143, 229, 3, 'Tyrone');
        statesList[56] = new State(144, 229, 2, 'Aberdeenshire');
        statesList[57] = new State(145, 229, 2, 'Angus');
        statesList[58] = new State(146, 229, 2, 'Argyll');
        statesList[59] = new State(147, 229, 2, 'Ayrshire');
        statesList[60] = new State(148, 229, 2, 'Banffshire');
        statesList[61] = new State(149, 229, 2, 'Berwickshire');
        statesList[62] = new State(150, 229, 2, 'Bute');
        statesList[63] = new State(151, 229, 2, 'Caithness');
        statesList[64] = new State(152, 229, 2, 'City of Aberdeen');
        statesList[65] = new State(153, 229, 2, 'City of Dundee');
        statesList[66] = new State(154, 229, 2, 'City of Edinburgh');
        statesList[67] = new State(155, 229, 2, 'City of Glasgow');
        statesList[68] = new State(156, 229, 2, 'Clackmannanshire');
        statesList[69] = new State(157, 229, 2, 'Cromartyshire');
        statesList[70] = new State(158, 229, 2, 'Dumfriesshire');
        statesList[71] = new State(159, 229, 2, 'Dunbartonshire');
        statesList[72] = new State(160, 229, 2, 'East Lothian');
        statesList[73] = new State(161, 229, 2, 'Fife');
        statesList[74] = new State(162, 229, 2, 'Inverness-shire');
        statesList[75] = new State(163, 229, 2, 'Kincardineshire');
        statesList[76] = new State(164, 229, 2, 'Kinross-shire');
        statesList[77] = new State(165, 229, 2, 'Kirkcudbrightshire');
        statesList[78] = new State(166, 229, 2, 'Lanarkshire');
        statesList[79] = new State(167, 229, 2, 'Midlothian');
        statesList[80] = new State(168, 229, 2, 'Moray');
        statesList[81] = new State(169, 229, 2, 'Nairnshire');
        statesList[82] = new State(170, 229, 2, 'Orkney');
        statesList[83] = new State(171, 229, 2, 'Peeblesshire');
        statesList[84] = new State(172, 229, 2, 'Perthshire');
        statesList[85] = new State(173, 229, 2, 'Renfrewshire');
        statesList[86] = new State(174, 229, 2, 'Ross and Cromarty');
        statesList[87] = new State(175, 229, 2, 'Ross-shire');
        statesList[88] = new State(176, 229, 2, 'Roxburghshire');
        statesList[89] = new State(177, 229, 2, 'Selkirkshire');
        statesList[90] = new State(178, 229, 2, 'Shetland');
        statesList[91] = new State(179, 229, 2, 'Stirlingshire');
        statesList[92] = new State(180, 229, 2, 'Sutherland');
        statesList[93] = new State(181, 229, 2, 'West Lothian');
        statesList[94] = new State(182, 229, 2, 'Wigtownshire');
        statesList[95] = new State(183, 229, 4, 'Anglesey');
        statesList[96] = new State(184, 229, 4, 'Brecknockshire');
        statesList[97] = new State(185, 229, 4, 'Caernarfonshire');
        statesList[98] = new State(186, 229, 4, 'Cardiganshire');
        statesList[99] = new State(187, 229, 4, 'Carmarthenshire');
        statesList[100] = new State(188, 229, 4, 'Clwyd');
        statesList[101] = new State(189, 229, 4, 'Denbighshire');
        statesList[102] = new State(190, 229, 4, 'Dyfed');
        statesList[103] = new State(191, 229, 4, 'Flintshire');
        statesList[104] = new State(192, 229, 4, 'Glamorgan');
        statesList[105] = new State(193, 229, 4, 'Gwent');
        statesList[106] = new State(194, 229, 4, 'Gwynedd');
        statesList[107] = new State(195, 229, 4, 'Merionethshire');
        statesList[108] = new State(196, 229, 4, 'Mid Glamorgan');
        statesList[109] = new State(197, 229, 4, 'Monmouthshire');
        statesList[110] = new State(198, 229, 4, 'Montgomeryshire');
        statesList[111] = new State(199, 229, 4, 'Pembrokeshire');
        statesList[112] = new State(200, 229, 4, 'Powys');
        statesList[113] = new State(201, 229, 4, 'Radnorshire');
        statesList[114] = new State(202, 229, 4, 'South Glamorgan');
        statesList[115] = new State(203, 229, 4, 'West Glamorgan');
        statesList[116] = new State(204, 229, 4, 'Wrexham');
        statesList[117] = new State(205, 153, 5, 'Benue');
        statesList[118] = new State(206, 153, 5, 'Kogi');
        statesList[119] = new State(207, 153, 5, 'Kwara');
        statesList[120] = new State(208, 153, 5, 'Nasarawa');
        statesList[121] = new State(209, 153, 5, 'Niger');
        statesList[122] = new State(210, 153, 5, 'Plateau');
        statesList[123] = new State(211, 153, 5, 'Federal Capital Territory');
        statesList[124] = new State(212, 153, 6, 'Adamawa');
        statesList[125] = new State(213, 153, 6, 'Bauchi');
        statesList[126] = new State(214, 153, 6, 'Borno');
        statesList[127] = new State(215, 153, 6, 'Gombe');
        statesList[128] = new State(216, 153, 6, 'Taraba');
        statesList[129] = new State(217, 153, 6, 'Yobe');
        statesList[130] = new State(218, 153, 7, 'Jigawa');
        statesList[131] = new State(219, 153, 7, 'Kaduna');
        statesList[132] = new State(220, 153, 7, 'Kano');
        statesList[133] = new State(221, 153, 7, 'Katsina');
        statesList[134] = new State(222, 153, 7, 'Kebbi');
        statesList[135] = new State(223, 153, 7, 'Sokoto');
        statesList[136] = new State(224, 153, 7, 'Zamfara');
        statesList[137] = new State(225, 153, 8, 'Abia');
        statesList[138] = new State(226, 153, 8, 'Anambra');
        statesList[139] = new State(227, 153, 8, 'Ebonyi');
        statesList[140] = new State(228, 153, 8, 'Enugu');
        statesList[141] = new State(229, 153, 8, 'Imo');
        statesList[142] = new State(230, 153, 9, 'Akwa Ibom');
        statesList[143] = new State(231, 153, 9, 'Bayelsa');
        statesList[144] = new State(232, 153, 9, 'Cross River');
        statesList[145] = new State(233, 153, 9, 'Rivers');
        statesList[146] = new State(234, 153, 9, 'Delta');
        statesList[147] = new State(235, 153, 9, 'Edo');
        statesList[148] = new State(236, 153, 10, 'Ekiti');
        statesList[149] = new State(237, 153, 10, 'Lagos');
        statesList[150] = new State(238, 153, 10, 'Ogun');
        statesList[151] = new State(239, 153, 10, 'Ondo');
        statesList[152] = new State(240, 153, 10, 'Osun');
        statesList[153] = new State(241, 153, 10, 'Oyo');
        statesList[154] = new State(246, 102, 11, 'Leitrim');
        statesList[155] = new State(247, 102, 11, 'Mayo');
        statesList[156] = new State(248, 102, 11, 'Roscommon');
        statesList[157] = new State(249, 102, 11, 'Sligo');
        statesList[158] = new State(250, 102, 11, 'Galway');
        statesList[159] = new State(251, 102, 12, 'Carlow');
        statesList[160] = new State(252, 102, 12, 'Dublin');
        statesList[161] = new State(253, 102, 12, 'Kildare');
        statesList[162] = new State(254, 102, 12, 'Kilkenny');
        statesList[163] = new State(255, 102, 12, 'Laois');
        statesList[164] = new State(256, 102, 12, 'Longford');
        statesList[165] = new State(257, 102, 12, 'Louth');
        statesList[166] = new State(258, 102, 12, 'Meath');
        statesList[167] = new State(259, 102, 12, 'Offaly');
        statesList[168] = new State(260, 102, 12, 'Westmeath');
        statesList[169] = new State(261, 102, 12, 'Wexford');
        statesList[170] = new State(262, 102, 12, 'Wicklow');
        statesList[171] = new State(263, 102, 13, 'Clare');
        statesList[172] = new State(264, 102, 13, 'Cork');
        statesList[173] = new State(265, 102, 13, 'Kerry');
        statesList[174] = new State(266, 102, 13, 'Limerick');
        statesList[175] = new State(267, 102, 13, 'Tipperary');
        statesList[176] = new State(268, 102, 13, 'Waterford');
        statesList[177] = new State(269, 102, 14, 'Cavan');
        statesList[178] = new State(270, 102, 14, 'Donegal');
        statesList[179] = new State(271, 102, 14, 'Monaghan');

    }

    catch (err) {

        alert(err.message + " in createLists()");
    }
}

function printCountries() {

    try {

        var countries = locations.Countries;

        var textstr = "<pre>";
        var json_str = JSON.stringify(countries, null, 3);

        textstr += json_str + "</pre>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in printCountries()");
    }
}

function printRegions(country_id) {

    try {

        var regions = locations.getRegions(country_id);

        var textstr = "<pre>";
        var json_str = JSON.stringify(regions, null, 3);

        textstr += json_str + "</pre>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in printRegions(country_id)");
    }

}

function printStates(region_id) {

    try {

        var states = locations.getStates(region_id);

        var textstr = "<pre>";
        var json_str = JSON.stringify(states, null, 3);

        textstr += json_str + "</pre>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in printRegions(country_id)");
    }

}