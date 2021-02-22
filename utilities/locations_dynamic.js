
/**
 * @classdesc <p>Represents a country object for locations section of sign-up form</p>
 */
class Country {

    constructor(_ID, _Name) {

        this.ID = _ID;
        this.Name = _Name;
    }

}

/**
 * @classdesc <p>Represents a region object for locations section of sign-up form</p>
 */
class Region {

    constructor(_ID, _CountryID, _Name) {

        this.ID = _ID;
        this.CountryID = _CountryID;
        this.Name = _Name;
    }

}

/**
 * @classdesc <p>Represents a state object for locations section of sign-up form</p>
 */
class State {

    constructor(_ID, _CountryID, _RegionID, _Name) {

        this.ID = _ID;
        this.CountryID = _CountryID;
        this.RegionID = _RegionID;
        this.Name = _Name;
    }

}

// This gets a list of countries and writes to the user input form
getCountries();

/**
 * @function
 * @name countrySelected
 * @description 
 * <p>Called when a user selects a country from the location section of the sign-up form.</p> 
 * <p>The routine then calls getRegions to populate the regions drop-down list</p>
 * @see getRegions
 */
function countrySelected() {

    try {

        var country_id = document.getElementById("country").value;

        getRegions(country_id);

    }
    catch (err) {

        alert(err.message + " in countrySelected()");
    }
}

/**
 * @function
 * @name regionSelected
 * @description
 * <p>Called when a user selects a region from the location section of the sign-up form.</p>
 * <p>The routine then calls getStates to populate the states drop-down list</p>
 * @see getStates
 */
function regionSelected() {

    try {

        var region_id = document.getElementById("region").value;

        getStates(region_id);

    }
    catch (err) {

        alert(err.message + " in regionSelected()");
    }
}

/**
 * @function
 * @name getCountries
 * @description
 * <p>Calls the API to get a list of countries, which is then written to the countries drop-down box.</p>
 * @see writeCountries
 */
function getCountries() {

    try {

        var url = "countries.json";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                try {

                    // The text from the API call
                    var jsontext = this.responseText;
                    var json = JSON.parse(jsontext);

                    // Load countries

                    // Set countries to zero array
                    countries = [];

                    var N = json.length;

                    for (var i = 0; i < N; i++) {

                        countries[i] = new Country(json[i].ID, json[i].Name);
                    }

                    // Write to page
                    writeCountries(countries);

                }
                catch (err) {

                    alert(err.message + " in xhttp.onreadystatechange()");

                }
           
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        

    }
    catch (err) {

        alert(err.message + " in getCountries()");
    }
}

/**
 * @function
 * @name getRegions
 * @param {number} country_id Unique identifier for the country
 * @description
 * <p>Calls the API to get a list of regions by country id, which is then written to the regions drop-down box.</p>
 * @see writeRegions
 */
function getRegions(country_id) {

    try {

        var url = "regions.json";

        url += "?" + country_id;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                try {

                    // The text from the API call
                    var jsontext = this.responseText;
                    var json = JSON.parse(jsontext);

                    // Load regions

                    // Set regions to zero array
                    var regions = [];

                    var N = json.length;
                    var k = 0;

                    for (var i = 0; i < N; i++) {

                        // Keep this, even though it may become redundant when data are returned from server
                        // as it means that we do not need to change the code when loading local JSON files.
                        if (json[i].CountryID == country_id) {

                            regions[k] = new Region(json[i].ID, json[i].CountryID, json[i].Name);
                            k++;

                        }  
                    }

                    // Write to page
                    writeRegions(regions);

                }
                catch (err) {

                    alert(err.message + " in xhttp.onreadystatechange()");

                }

            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    catch (err) {

        alert(err.message + " in getRegions(country_id)");
    }
}

/**
 * @function
 * @name getStates
 * @param {number} region_id Unique identifier for the region
 * @description
 * <p>Calls the API to get a list of states by region id, which is then written to the states drop-down box.</p>
 * @see writeStates
 */
function getStates(region_id) {

    try {

        var url = "states.json";

        url += "?" + region_id;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                try {

                    // The text from the API call
                    var jsontext = this.responseText;
                    var json = JSON.parse(jsontext);

                    // Load states

                    // Set states to zero array
                    var states = [];

                    var N = json.length;
                    var k = 0;

                    for (var i = 0; i < N; i++) {

                        // Keep this, even though it may become redundant when data are returned from server
                        // as it means that we do not need to change the code when loading local JSON files.
                        if (json[i].RegionID == region_id) {

                            states[k] = new State(json[i].ID, json[i].CountryID, json[i].RegionID, json[i].Name);
                            k++;

                        }
                    }

                    // Write to page
                    writeStates(states);

                }
                catch (err) {

                    alert(err.message + " in xhttp.onreadystatechange()");

                }

            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    catch (err) {

        alert(err.message + " in getStates(region_id)");
    }

}

/**
 * @function
 * @name writeCountries
 * @param {Country[]} countries Array of Country objects
 * @description
 * <p>Writes a list of countries to the countries drop-down list in the user sign-up form.</p>
 */
function writeCountries(countries) {

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

/**
 * @function
 * @name writeRegions
 * @param {Region[]} regions Array of Region objects
 * @description
 * <p>Writes a list of regions to the regions drop-down list in the user sign-up form.</p>
 */
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

/**
 * @function
 * @name writeStates
 * @param {State[]} states Array of State objects
 * @description
 * <p>Writes a list of states to the states drop-down list in the user sign-up form.</p>
 */
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
