/**
 * @fileoverview 
 * <h3>Javascript components for GPI user / profiles</h3>
 * <p>Provides the functionality for rendering the components of the 
 * GPI survey on a web page</p>
 * <b>Key functionality:</b>
 * <ul>
 *    <li>Signs up a new user (deprecated)</li>
 *    <li>Logs in an existing user</li>
 *    <li>Renders the GPI survey questionnaire</li>
 *    <li>Renders the GPI talent report</li>
 *    <li>Manages user profile details</li>
 *    <li>Manages page navigation</li>
 *    <li>Provides HTML manipulation for showing/hiding elements</li>
 * </ul>
 * @author M.P. Vaughan
 * @version 2.01 (Edease version)
 * @copyright Edease (2021)
 * 
 * ===========================================================
 *    SESSION VARIABLES
 * ===========================================================
 * The following are stored as session variables to cope with
 * page refresh or back button activity:
 * 
 *    GPIStoredProfile    -   Stringified version of JSON 
 *                            returned from login API call
 *                            
 *    GPIUserProfile      -   Stringified version of userProfile
 *                            object
 *    
 *    GPIUserDetails      -   Stringified user details stored 
 *                            by E-comms solution.
 *                            
 *    GPIStoredPWD        -   User password
 *    
 *    GPIStoredQuestions  -   Stringified list of survey 
 *                            questions
 *                            
 *    CurrentPage         -   The current page, used by 
 *                            writeElement() for page 
 *                            navigation  
*/

/**
 * ===========================================================
 *    FILE SECTIONS
 * ===========================================================
 * 
 * -----------------------------------------------------------
 *    CLASS DEFINITIONS
 * -----------------------------------------------------------
 *    class UserProfile
 *    class Question
 *    class Dimension
 *    class QuadrantModel
 *    class CareerTheme
 *    class Blue4Model (not used)
 *    class Report
 *    class Country
 *    class Region
 *    class State
 *    
 * -----------------------------------------------------------
 *    GLOBAL VARIABLES
 * -----------------------------------------------------------
 *    (See definitions)
 *    
 * -----------------------------------------------------------
 *    EVENT HANDLERS
 * -----------------------------------------------------------
 *    onpopstate
 *    
 * -----------------------------------------------------------
 *    INITIALIZATION
 * -----------------------------------------------------------
 *    init
 *    
 * -----------------------------------------------------------
 *    LOGGING OUT
 * -----------------------------------------------------------
 *    logout
 *    logoutGPI
 *    
 * -----------------------------------------------------------
 *    SIGN-UP/USER DETAILS FORM FUNCTIONALITY
 * -----------------------------------------------------------
 *    countrySelected
 *    regionSelected
 *    getCountries - deprecated
 *    getRegions
 *    getStates
 *    writeCountries
 *    writeRegions
 *    writeStates
 *    setDetailsToStored
 * 
 * -----------------------------------------------------------
 *    USER SIGN-UP / LOGIN FUNCTIONS
 * -----------------------------------------------------------
 *    submitLoginForm
 *    isValidEmail
 *    signup
 *    login
 *    processJSON
 *    
 * -----------------------------------------------------------
 *    USER SURVEY FUNCTIONS
 * -----------------------------------------------------------
 *    updateAnswers
 *    loadQuestions
 *    writeInstructions
 *    getQuestions
 *    writeQuestions
 *    getProgressBar
 *    saveExit
 *    saveContinue
 *    saveQuestions
 *    getScore
 *    surveyStarted
 *    randomQuestions
 * 
 * -----------------------------------------------------------
 *    REPORT EXTRACTION FUNCTIONS
 * -----------------------------------------------------------
 *    getReport
 *    extractQuadrantModel
 *    extractDimension
 *    extractSubDimension
 *    extractBlue4Model
 *    
 * -----------------------------------------------------------
 *    PAGE GENERATION FUNCTIONS
 * -----------------------------------------------------------
 *    writeElement
 *    writeMenu
 *    writeHome
 *    writeAccount
 *    formChanged
 *    resetDetails
 *    writeQuadrant
 *    writeCareer
 *    toggleMenu
 *    hideMenu
 *    toggleHidden
 *    
 * -----------------------------------------------------------
 *    GRAPHICS FUNCTIONS
 * -----------------------------------------------------------
 *    assignFormatting
 *    drawQuadrant
 *    drawSten
 *    drawCareerThemes
 * 
 * -----------------------------------------------------------
 */

/*
 * ===========================================================
 *                  CLASS DEFINITIONS
 * ===========================================================                 
 */

/**
 * @classdesc <p>Represents a user/profile for passing data to and from the API</p>
 */
class UserProfile {

    /**
     * Creates a UserProfile objec
     * @param {string} _Email User email
     * @param {string} _Password User password
     */
    constructor(_Email, _Password) {

        this.Email = _Email;
        this.Password = _Password;
        this.NewEmail = "";
        this.NewPassword = "";
        this.FirstName = "";
        this.LastName = "";
        this.AccessCode = "";
        this.GenderId = 1;
        this.AgeRangeId = 1;
        this.EthnicityId = 1;
        this.CountryID = 0;
        this.RegionID = 0;
        this.StateId = 0;
        this.SurveyCompleted = false;
        this.Questions = null; // Used for returning answered questions to server
    }

}

/**
 * @classdesc <p>Represents a GPI survey question</p>
 */
class Question {

    /**
     * Creates a GPI survey question
     * @param {string} _Id - Survey question identifier
     * @param {string} _Text - Survey question text
     */
    constructor(_Id, _Text) {

        this.Id = _Id;
        this.Text = _Text;
        this.ShortText = "";
        this.Score = 0;

    }

    
}

/**
 * @classdesc <p>The GPI is based on various factors or dimensions associated
 * with personality predispositions. The dimension represents a spectrum of
 * predispositions to behave in certain ways characterised by a particular
 * personality factor, denoted by the unipolar name.</p>
 * <p>The polar opposite behaviours along a particular dimension are referred
 * to by the 'left' and 'right' bipolar names.</p>
 * <p>Each individual has a sten score - an integer between 1 and 10 - associated
 * with each dimension. Scores less or equal to 5 indicate the individual lies on
 * the left-hand-side of the spectrum, whilst scores greater than 5 indicate the 
 * right-hand-side</p>
 */
class Dimension {

    /**
     * Creates a GPI Dimension
     * @param {string} UnipolarName - The unipolar name of the Dimension
     * @param {string} LeftBipolarName - The left bipolar name of the Dimension
     * @param {string} RightBipolarName - The right bipolar name of the Dimension
     * @param {boolean} isParent - Indicates if this is a parent Dimension
     * @param {number} StenScore - The sten score associated with this Dimension (integer between 1 and 10)
     * @param {string} ScoreText - The text associated with the sten score of the Dimension
     * @todo Need to provide validation for sten score
     */
    constructor(UnipolarName, LeftBipolarName, RightBipolarName, isParent = false, StenScore = 0, ScoreText = "") {

        this.UnipolarName = UnipolarName;
        this.LeftBipolarName = LeftBipolarName;
        this.RightBipolarName = RightBipolarName;
        this.isParent = isParent;
        this.StenScore = StenScore;
        this.ScoreText = ScoreText;
        this.SubDimensions = [];
    }
}

/**
 * @classdesc <p>The GPI Quadrant model is a composite model based on 
 * an individual's GPI dimensions</p>
 */
class QuadrantModel {

    /**
     * Creates a GPI Quadrant Model
     * @param {string} Name - The name of the Quadrant Model
     * @param {Dimension} xDimension - The Dimension associated with the x-axis
     * @param {Dimension} yDimension - The Dimension associated with the y-axis
     * @param {string} Q1label - Label for the 1st (upper right) quadrant
     * @param {string} Q2label - Label for the 2nd (upper left) quadrant
     * @param {string} Q3label - Label for the 3rd (lower left) quadrant
     * @param {string} Q4label - Label for the 4th (lower right) quadrant
     * @param {string} QText - The text associated with this Quadrant Model
     * @throws Throws an error if either of the first two arguments are not Dimension objects
     */
    constructor(Name, xDimension, yDimension, Q1label, Q2label, Q3label, Q4label, QText) {

        if ((xDimension instanceof Dimension) && (yDimension instanceof Dimension)) {

            this.xDimension = xDimension;
            this.yDimension = yDimension;
        }
        else {

            throw "Arguments are not Dimension objects";

        }

        this.Name = Name;
        this.Q1label = Q1label;
        this.Q2label = Q2label;
        this.Q3label = Q3label;
        this.Q4label = Q4label;
        this.QText = QText;
    }
}

/**
 * @classdesc <p>Implements a career theme - a factor derived from
 * a user's GPI scores in the Career Themes model.</p>
 */
class CareerTheme {

    /**
     * Creates a CareerTheme factor
     * @param {string} Name The name of the factor
     * @param {any} Score The factor score
     * @param {string} Description Description of the factor
     */
    constructor(Name, Score, Description) {

        this.Name = Name;
        this.Score = Score;
        this.Description = Description;
    }
}


/**
 * @classdesc <p>The GPI Blue model is a composite model based on
 * and individual's GPI dimensions</p>
 * <p>The risk area is a colour, which is mapped to a number code via</p>
 * <ul>
 *    <li> 'Undefined' = 0</li>
 *    <li> 'Red' = 1</li>
 *    <li> 'Amber' = 2</li>
 *    <li> 'Green' = 3</li>
 * </ul>
 * <p>Each risk area is given a risk level, mapped to a number code via</p>
 * <ul>
 *    <li> 'undefined' = 0</li>
 *    <li> 'very low' = 1</li>
 *    <li> 'low' = 2</li>
 *    <li> 'moderate' = 3</li>
 *    <li> 'high' = 4</li>
 *    <li> 'very high' = 5</li>
 * </ul>
 */
class Blue4Model {

    /**
     * Creates a Blue 4 model
     * @param {number} RiskArea - a number between 0 and 3
     * @param {number} RiskLevel - a number between 0 and 5
     */
    constructor(RiskArea = 0, RiskLevel = 0, ScoreText = "") {

        if (Number.isInteger(RiskArea)) {

            if (RiskArea >= 0 && RiskArea <= 3) {

                this.RiskArea = RiskArea;
            }
            else {

                throw "Risk area must be an integer 0 - 3 (not in range)";
            }

        }
        else {

            throw "Risk area must be an integer 0 - 3 (not an integer)";
        }

        if (Number.isInteger(RiskLevel)) {

            if (RiskLevel >= 0 && RiskLevel <= 5) {

                this.RiskLevel = RiskLevel;
            }
            else {

                throw "Risk level must be an integer 0 - 5 (not in range)";
            }

        }
        else { 

            throw "Risk level must be an integer 0 - 5 (not an integer)";
        }

        this.ScoreText = ScoreText;

    }

    /**
     * Gets the risk area of the model ('Red'/'Amber'/'Green')
     * @returns {string}
     */
    get RiskArea() {

        switch (this.RiskArea) {
            case 1:
                return "Red";
            case 2:
                return "Amber";
            case 3:
                return "Green";
            default:
                return "Undefined";
        }
    }

    /**
     * Gets the risk level of the model as string descriptor
     * @returns {string}
     */
    get RiskLevel() {

        switch (this.RiskLevel) {
            case 1:
                return "very low";
            case 2:
                return "low";
            case 3:
                return "moderate";
            case 4:
                return "high";
            case 5:
                return "very high";
            default:
                return "Undefined";
        }
    }

    /**
     * Sets the risk area
     * @param {number} RiskArea - an integer between 1 and 3
     */
    set RiskArea(RiskArea) {

        if (Number.isInteger(RiskArea)) {

            if (RiskArea >= 1 && RiskArea <= 3) {

                this.RiskArea = RiskArea;
            }
            else {

                throw "Risk area must be an integer 1 - 3 (not in range)";
            }

        }
        else {

            throw "Risk area must be an integer 1 - 3 (not an integer)";
        }
    }

    /**
     * Sets the risk level
     * @param {number} RiskLevel - an integer between 1 and 5
     */
    set RiskLevel(RiskLevel) {

        if (Number.isInteger(RiskLevel)) {

            if (RiskLevel >= 1 && RiskLevel <= 5) {

                this.RiskLevel = RiskLevel;
            }
            else {

                throw "Risk level must be an integer 1 - 5 (not in range)";
            }

        }
        else {

            throw "Risk level must be an integer 1 - 5 (not an integer)";
        }
    }
}

/**
 * @classdesc <p>Encapsulates the GPI Talent Report</p>
 */
class Report {

    /**
     * Creates a GPI Talent Report
     * @param {string} FirstName - First name of report subject
     * @param {string} LastName - Last name of report subject
     * @param {QuadrantModel[]} - Array of QuadrantModels
     * @param {CareerTheme[]} - Array of CareerTheme factors
     */
    constructor(FirstName, LastName, QuadrantModels=[], CareerThemes=[], LeadershipModel=null) {

        this.FirstName = FirstName;
        this.LastName = LastName;
        this.QuadrantModels = QuadrantModels;
        this.CareerThemes = CareerThemes;
        this.LeadershipModel = LeadershipModel;

    }
}

/**
 * @classdesc <p>Represents a country object for locations section of sign-up form</p>
 */
class Country {

    /**
     * Creates a Country object.
     * @param {number} _ID - Unique identifier for the Country
     * @param {string} _Name - Country name
     * @param {string} _RegionName - Country-specific name for a region (e.g. 'Zone')
     * @param {any} _StateName - Country-specific name for a state (e.g. 'State' or 'County')
     */
    constructor(_ID, _Name, _RegionName="Region", _StateName="State") {

        this.ID = _ID;
        this.Name = _Name;
        this.RegionName = _RegionName;   
        this.StateName = _StateName;    
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

/*
 ****************** END OF CLASS DEFINITIONS ******************
*/

/*
 * ============================================================
 *                     GLOBAL VARIABLES
 * ============================================================
 */


// User profile and survey

/**
 * User profile
 * @type {UserProfile}
 */
var userProfile;

/**
 * Ranomized array of survey question
 * @type {Question[]}
 */
var serverQuestionList;


/**
 * Array of survey questions for each page
 * @type {Question[]}
 */
var localQuestionList = [];

/**
 * Number of questions per page
 * @type {number}
 */
var numQuestions = 10;

// Formatting (TODO: encapsulate into object)

/**
 * Path for logo
 * @type {string}
 */
var logo_src;

/**
 * Path for burger image
 * @type {string}
 */
var burger_src;

/**
 * Quadrant back cirle colour
 * @type {string}
 */
var quad_circle_colour;

/**
 * Quadrant centre start colour for graph
 * @type {string}
 */
var quad_start_colour;

/**
 * Quadrant outer end colour for graph
 * @type {string}
 */
var quad_end_colour;

/**
 * Quadrant axis colour
 * @type {string}
 */
var quad_axis_colour;

/**
 * Quadrant grid colour
 * @type {string}
 */
var quad_grid_colour;

/**
 * Quadrant grid colour
 * @type {string}
 */
var quad_marker_colour;

/**
 * Colour of text inside quadrants
 * @type {string}
 */
var quad_text_colour;

/**
 * Size of text inside quadrants
 * @type {number}
 * @todo Make this configurable
 */
var quad_text_size;

/**
 * Font of text inside quadrants
 * @type {string}
 * @todo Make this configurable
 */
var quad_text_font;

/**
 * Colour of text on labels
 * @type {string}
 * @todo Make this configurable
 */
var quad_label_text_colour;

/**
 * Size of text on labels
 * @type {number}
 * @todo Make this configurable
 */
var quad_label_text_size;

/**
 * Font of text on labels
 * @type {string}
 * @todo Make this configurable
 */
var quad_label_text_font;

/**
 * Canvas width for Quadrant element
 * @type {number}
 */
var quad_width;

/**
 * Canvas height for Quadrant element
 * @type {number}
 */
var quad_height;

/**
 * Canvas width for sten score element
 * @type {number}
 */
var sten_width;

/**
 * Canvas height for sten score element
 * @type {number}
 */
var sten_height;

/**
 * Boolean indicating if quadrant circles should be plotted
 * @type {boolean}
 */
var plot_circle = true;

/**
 * Boolean indicating if quadrant shadows should be plotted
 * @type {boolean}
 */
var plot_shadow = true;

/**
 * Colour of arrow in careers theme model
 * @type {string}
 */
var careers_arrow_col;

/**
 * Colour of text in careers theme model
 * @type {string}
 */
var careers_text_col;

/**
 * Text size in careers theme model
 * @type {number}
 */
var careers_text_size;

/**
 * Text font in careers theme model
 * @type {string}
 */
var careers_text_font;

// Quadrant models

/**
 * Problem solving and implementation style model
 * @type {QuadrantModel}
 */
var quadModel_probSolveImpStyle;

/**
 * Communication and interpersonal style model
 * @type {QuadrantModel}
 */
var quadModel_commInterperStyle;

/**
 * Feelings and self-control model
 * @type {QuadrantModel}
 */
var quadModel_feelSelfControl;

/**
 * Creativity and Entrepreneurship model
 * @type {QuadrantModel}
 */
var quadModel_creatEntrepreneur;

/**
 * Report object
 * @type {Report}
 */
var myReport = null;

/**
 * List of countries for sign-up / user details forms
 * @type {Country[]}
 */
var countries = [];

/*
 ****************** END OF GLOBAL VARIABLES  ******************
*/

/*
 * ============================================================
 *                      EVENT HANDLERS
 * ============================================================
 */

/**
 * @function
 * @name onpopstate
 * @description <p>Handler for the popstate event. The routine gets the page from the 
 * event object and passes it to the writeElement function.</p>
 * @param {Event} event popstate event
 * @see writeElement
 */
window.onpopstate = function (event) {

    try {

        if (event.state) {

            var current_page = event.state.GPIpage;

            if (current_page !== null) {

                // Write element (do not push to stack )
                writeElement(current_page, push_state=false);
            }

        }

    }
    catch (err) {

        alert(err.message + " in onpopstate()");
    } 
}

/*
 ******************  END OF EVENT HANDLERS   ******************
*/

/*
 * ============================================================
 *                      INITIALIZATION
 * ============================================================
 */

/**
 * @function
 * @name init
 * @description
 * <p>This function is intended to be called when a page loads (after any required HTML
 * components have been loaded). It assigns the formatting for the GPI visualizations (from
 * CSS root variables) and checks whether user/profile data has been stored locally
 * in session variables (i.e. the user is 'logged in'). If the user is logged in, it loads  
 * this data via processJSON so that no further calls to the API are required.</p>
 * <p>If there is no stored profile, the routine checks to see if user details have been 
 * stored - in which case, the user is not currently logged in, so the login routine is called</p>
 * 
 * @see assignFormatting
 * @see processJSON
 * @see getCountries - deprecated
 */
function init() {

    try {

        // Set formating for elements
        assignFormatting();

        // Check if profile has have been saved
        var jsontext = sessionStorage.getItem("GPIStoredProfile");

        if (jsontext !== null) {

            processJSON(jsontext);

        }
        else {
            // Check if user details have been stored (but not currently logged in)
            var userDetailsStr = sessionStorage.getItem("GPIUserDetails");

            // Check if details have been saved
            if (userDetailsStr !== null) {

                /* Form of userDetails from E-commerce solution:
                var userDetails = {
                    UserGUID: user_guid,
                    Email: email,
                    Password: pwd,
                    FirstName: first_name,
                    LastName: last_name
                };
                */

                // If we are on the login page, make sure submit button is disabled
                if (document.getElementById("submit_button") !== null) {

                    // Disable submit button
                    document.getElementById("submit_button").disabled = true;

                }

                // Parse string as JSON object
                var userDetails = JSON.parse(userDetailsStr);

                // Store user password
                sessionStorage.setItem("GPIStoredPWD", userDetails.Password);

                // Create user profile object for logging in with
                var user_profile = new UserProfile(
                    userDetails.Email,
                    userDetails.Password
                );

                writeWaiting("Logging you in...");

                login(user_profile);

                return;

            }
            else {

                // Present login form to user
                writeLoginForm();

            }

            /*
            // Check if we are on the sign-up page
            country_element = document.getElementById("country");

            if (country_element !== null) {

                // This gets a list of countries and writes to the user input form
                getCountries();
            }
            */
            
        }
        
    }
    catch (err) {

        alert(err.message + " in init()");
    }

}

/*
 ******************* END OF INITIALIZATION  *******************
*/

/*
 * ============================================================
 *            LOGGING OUT (DELETE SESSION VARIABLES)
 * ============================================================
 */

/**
 * @function
 * @name logout
 * @description
 * <p>Logs the user out by deleting session variables and reloading page</p>
 * @returns {boolean} True if user wishes to exit the GPI
 * @see logoutGPI
 */
function logout() {

    try {
        // Logout function
        var logout = "Do you wish to exit the GPI? (Click OK if so)";

        if (confirm(logout)) {

            logoutGPI();

            return true;

        }

        return false;
    }
    catch (err) {

        alert(err.message + " in logout()");
    }
}

/**
 * @function
 * @name logoutGPI
 * @description
 * <p>Deletes session storage variables and effectively logs the user out</p>
 */
function logoutGPI() {
    try {

        // Delete session storage

        // Delete GPI profile (report / questions)
        sessionStorage.removeItem("GPIStoredProfile");

        // Delete user profile 
        sessionStorage.removeItem("GPIUserProfile");

        // Delete password
        sessionStorage.removeItem("GPIStoredPWD");

        // Delete questions
        sessionStorage.removeItem("GPIStoredQuestions");

        // Delete user details (if they exist)
        sessionStorage.removeItem("GPIUserDetails");

    }
    catch (err) {

        alert(err.message + " in logoutGPI()");
    }
}

/*
 ******************** END OF LOGGING OUT  *********************
*/

/*
 * ============================================================
 *            SIGN-UP/USER DETAILS FORM FUNCTIONALITY
 * ============================================================
 */

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

        var selected = countries.find(x => x.ID == country_id);

        var region_name = selected.RegionName;
        var state_name = selected.StateName;

        // Write strings to document
        document.getElementById("region_name").innerHTML = region_name;
        document.getElementById("state_name").innerHTML = state_name;

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
 * @name getCountries - deprecated
 * @param {boolean} set_details If true, user details are written to form (default = false)
 * @description
 * <p>Calls the API to get a list of countries, which is then written to the countries drop-down box.</p>
 * @see writeCountries
 */
function getCountries(set_details=false) {

    try {

        //var url = "/GPI/countries.json";
        //var url = "https://localhost:44369/api/countries";  // Local testing
        var url = "https://gi-api.azurewebsites.net/api/countries";  // Live

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

                        // N.B. Included for future use
                        if (json[i].RegionName !== null) {

                            countries[i].RegionName = json[i].RegionName;

                        }

                        // N.B. Included for future use
                        if (json[i].StateName !== null) {

                            countries[i].StateName = json[i].StateName;

                        }
                    }

                    // Write to page
                    writeCountries(countries);

                    // Called for the account details page
                    if (set_details) {

                        country_id = userProfile.CountryId;

                        var selected = countries.find(x => x.ID == country_id);

                        var region_name = selected.RegionName;
                        var state_name = selected.StateName;

                        // Write strings to document
                        document.getElementById("region_name").innerHTML = region_name;
                        document.getElementById("state_name").innerHTML = state_name;

                        document.getElementById("country").value = country_id;

                        getRegions(country_id, set_details);

                    }

                }
                catch (err) {

                    alert(err.message + " in getCountries():xhttp.onreadystatechange()");

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
 * @param {boolean} set_details If true, user details are written to dropdown box (default = false)
 * @description
 * <p>Calls the API to get a list of regions by country id, which is then written to the regions drop-down box.</p>
 * @see writeRegions
 */
function getRegions(country_id, set_details = false) {

    try {

        //var url = "/GPI/regions.json";
        //url += "?" + country_id;

        //var url = "https://localhost:44369/api/regions?country_id=";
        var url = "https://gi-api.azurewebsites.net/api/regions?country_id=";

        url += country_id;

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

                    // Called for the account details page
                    if (set_details) {

                        region_id = userProfile.RegionId;

                        document.getElementById("region").value = region_id;

                        getStates(region_id, set_details);
                    }

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
 * @param {boolean} set_details If true, user details are written to dropdown box (default = false)
 * @description
 * <p>Calls the API to get a list of states by region id, which is then written to the states drop-down box.</p>
 * @see writeStates
 */
function getStates(region_id, set_details=false) {

    try {

        //var url = "/GPI/states.json";
        //url += "?" + region_id;

        // var url = "https://localhost:44369/api/states?region_id="; // Local testing
        var url = "https://gi-api.azurewebsites.net/api/states?region_id=";  // Live

        url += region_id;

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

                    // Called for the account details page
                    if (set_details) {

                        document.getElementById("state").value = userProfile.StateId;

                    }

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

        var textstr = "";

        var N = countries.length;

        textstr += "<option value=\"\" selected disabled hidden>Select your country</option>"; 
        
        for (var i = 0; i < N; i++) {

            textstr += "<option value=\"" + countries[i].ID + "\">" + countries[i].Name + "</option>";
        }

        //textstr += "<option value=\"-1\">Not listed</option>";

        // Write string to document
        document.getElementById("country").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in writeCountries(countries)");
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

            regionstr += "<option value=\"-1\">Not listed</option>";

            // Erase list of states
            document.getElementById("state").innerHTML = "<option value=\"-1\">Not listed</option>";

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

            //statestr += "<option value=\"0\">Not listed</option>";
            statestr += "<option value=\"-1\">Not listed</option>";

        }

        // Write string to document
        document.getElementById("state").innerHTML = statestr;

    }
    catch (err) {

        alert(err.message + " in writeStates()");
    }
}

/**
 * @function
 * @name setDetailsToStored
 * @description <p>Sets the details on the user form to those of the current user profile 
 * (used for the account details page)</p>
 * @see userProfile
 */
function setDetailsToStored() {

    try {

        // N.B. It is assumed that we are on the account details page
        document.getElementById("email").value = userProfile.Email;
        document.getElementById("pwd").value = userProfile.Password;
        document.getElementById("confirm_pwd").value = userProfile.Password;
        document.getElementById("first_name").value = userProfile.FirstName;
        document.getElementById("last_name").value = userProfile.LastName;    
        document.getElementById("gender").value = userProfile.GenderId;
        document.getElementById("age_range").value = userProfile.AgeRangeId;

        // getCountries(set_details = true);

    }
    catch (err) {

        alert(err.message + " in setDetailsToStored()");
    }
}

/**
 * @function
 * @name checkUserDetails (not currently used)
 * @description <p>Checks user details before calling writeAccount</p>
 * @see writeAccount
 */
function checkUserDetails() {

    try {

        // TODO: Check user details

        // TEMP
        writeAccount();

    }
    catch (err) {

        alert(err.message + " in getUserDetails()");
    }
}

/*
 ************* END OF SIGN-UP FORM FUNCTIONALITY  *************
*/

/*
 * ============================================================
 *               USER LOGIN / UPDATE FUNCTIONS
 * ============================================================
 */



/**
 * @function
 * @name submitUpdateForm
 * @description
 * <p>Processes edit user details form and calls update API.</p>
 * @see isValidEmail
 * @see updateProfile
 */
function submitUpdateForm() {

    try {

        // Check for errors
        var errors = false;

        var error_msg = "There were problems with your submission:";

        var email = document.getElementById("email").value;

        var pwd = document.getElementById("pwd").value;

        var confirm_pwd = document.getElementById("confirm_pwd").value;

        var first_name = document.getElementById("first_name").value;

        var last_name = document.getElementById("last_name").value;

        if (email == null) {
            errors = true;
            error_msg += "\n - Email required.";
        }
        else {

            if (email.length == 0) {
                errors = true;
                error_msg += "\n - Email required.";
            }
            else {
                if (!isValidEmail(email)) {

                    errors = true;
                    error_msg += "\n - Invalid email format.";
                }
            }
        }

        if (pwd == null) {
            errors = true;
            error_msg += "\n - Password required.";
        }
        else {

            if (pwd.length == 0) {
                errors = true;
                error_msg += "\n - Password required.";
            }
            else {

                if (pwd !== confirm_pwd) {

                    errors = true;
                    error_msg += "\n - Passwords do not match.";

                }
            }
        }

        if (first_name == null) {
            errors = true;
            error_msg += "\n - First name required.";
        }
        else {

            if (first_name.length == 0) {
                errors = true;
                error_msg += "\n - First name required.";
            }
        }

        if (last_name == null) {
            errors = true;
            error_msg += "\n - Last name required.";
        }
        else {

            if (last_name.length == 0) {
                errors = true;
                error_msg += "\n - Last name required.";
            }
        }

        if (errors) {

            alert(error_msg);

            return;
        }

        // Create new user profile
        var user_profile = new UserProfile(email, pwd);

        // Assign additional properties
        user_profile.FirstName = first_name;
        user_profile.LastName = last_name;

        user_profile.GenderId = document.getElementById("gender").value;
        user_profile.AgeRangeId = document.getElementById("age_range").value;

        // Values not assigned in form
        user_profile.EthnicityId = userProfile.EthnicityId;
        user_profile.StateId = userProfile.StateId;

        if (userProfile.Email !== user_profile.Email) {
            // Email changed
            user_profile.NewEmail = user_profile.Email;
            user_profile.Email = userProfile.Email;
        }
        else {
            // If not, make sure NewEmail is null
            user_profile.NewEmail = null;
        }

        if (userProfile.Password !== user_profile.Password) {
            // Password changed
            user_profile.NewPassword = user_profile.Password;
            user_profile.Password = userProfile.Password;
        }
        else {
            // If not, make sure NewPassword is null
            user_profile.NewPassword = null;
        }

        writeWaiting("Updating your details ...");
        updateProfile(user_profile);

    }
    catch (err) {

        alert(err.message + " in submitUpdateForm()");
    }
}

/**
 * @function
 * @name submitLoginForm
 * @description
 * <p>Processes login form and calls login API.</p>
 * @see isValidEmail
 * @see login
 */
function submitLoginForm() {

    try {

        // Disable submit button
        document.getElementById("submit_button").disabled = true;

        var errors = false;

        var error_msg = "There were problems with your submission:";

        var email = document.getElementById("email").value;

        var pwd = document.getElementById("pwd").value;

        if (email == null) {
            errors = true;
            error_msg += "\n - Email required.";
        }
        else {

            if (email.length == 0) {
                errors = true;
                error_msg += "\n - Email required.";
            }
            else {
                if (!isValidEmail(email)) {
                    errors = true;
                    error_msg += "\n - Invalid email format.";
                }
            }
        }

        if (pwd == null) {
            errors = true;
            error_msg += "\n - Password required.";
        }
        else {

            if (pwd.length == 0) {
                errors = true;
                error_msg += "\n - Password required.";
            }
        }

        if (errors) {

            alert(error_msg);
            // Re-enable submit button
            document.getElementById("submit_button").disabled = false;
            return;
        }

        // Store user password
        sessionStorage.setItem("GPIStoredPWD", pwd);

        var user_profile = new UserProfile(
            email,
            pwd
        );

        writeWaiting("Logging you in...");

        login(user_profile);

    }
    catch (err) {

        alert(err.message + " in submitLoginForm()");
    }
}

/**
 * @function
 * @name isValidEmail
 * @description
 * <p>Validates a user email</p>
 * @param {string} email String representing a user email
 * @returns {boolean} True if the argument represents a valid email
 */
function isValidEmail(email) {
    try {

        if (email == null) return false;

        if (email.length == 0) return false;

        // Check for '@'
        at = email.indexOf('@');

        // If '@' does not exist or is first character
        if (at < 1) return false;

        // Check for '.' after '@'
        dot = email.indexOf('.', at);

        // There should be at least one character after '@' before '.'
        if (dot - at < 2) return false;

        // Get domain
        domain = email.substring(dot + 1);

        // Domain should be at least one character long
        if (domain.length == 0) return false;

        return true;

    }
    catch (err) {

        alert(err.message + " in isValidEmail()");
    }
}

/**
 * @function
 * @name signup
 * @description <p>Calls the signup API and then calls processJSON to
 * deserialize the returned JSON string</p>
 * @param {UserProfile} user_profile Object representing a user/profile
 * @see processJSON
 */
function signup(user_profile) {

    try {

        // URL changed to the live version
        //var url = "https://localhost:44369/api/user/signup/";  // Local testing
        var url = "https://gi-api.azurewebsites.net/api/user/signup/";  // Live URL

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {  

                        // The text from the API call
                        var jsontext = this.responseText;

                        processJSON(jsontext);

                    }
                    else {

                        switch (this.status) {
                            case 0:
                                alert("Could not contact server");
                                break;
                            case 401:
                                // Unauthorized
                                alert("Authorization error: " + this.responseText);
                                break;
                            case 500:
                                // InternalServerError
                                alert("A server error occurred");
                                break;
                            default:
                                msg = "Status: " + this.status;
                                msg = msg + "; Response: " + this.responseText;
                                alert(msg);
                        }

                        // Re-enable submit button
                        document.getElementById("submit_button").disabled = false;
                        
                    }

                }

            }
            catch (err) {

                alert(err.message + " in xhttp.onreadystatechange()");
            }
            
            
        };
        document.body.style.cursor = 'wait';
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in signup(user_profile)");
    }
}

function updateProfile(user_profile) {

    try {

        // URL changed to the live version
        //var url = "https://localhost:44369/api/user/updateprofile/";  // Local testing
        var url = "https://gi-api.azurewebsites.net/api/user/updateprofile/";  // Live URL

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {

                        // The text from the API call
                        var jsontext = this.responseText;

                        // Should be either true or false
                        var success = JSON.parse(jsontext);

                        if (success == false) {

                            alert('Could not update details');
                        }

                        if (success == true) {

                            alert('Successfully updated details');

                            if (user_profile.NewEmail !== null) {
                                user_profile.Email = user_profile.NewEmail;
                            }
                            if (user_profile.NewPassword !== null) {
                                user_profile.Password = user_profile.NewPassword;
                                // Store new user password
                                sessionStorage.setItem("GPIStoredPWD", user_profile.Password);
                            }

                            // Store new user profile - for safety, stringify and parse as JSON
                            user_profile_json = JSON.parse(JSON.stringify(user_profile));
                            setUserProfile(user_profile_json);

                            // Get stored profile (report / survey) and re-render app
                            var jsontext = sessionStorage.getItem("GPIStoredProfile");
                            processJSON(jsontext);
                            
                            //login(user_profile);
                        }

                    }
                    else {

                        switch (this.status) {
                            case 0:
                                alert("Could not contact server");
                                break;
                            case 401:
                                // Unauthorized
                                alert("Authorization error: " + this.responseText);
                                break;
                            case 500:
                                // InternalServerError
                                alert("A server error occurred");
                                break;
                            default:
                                msg = "Status: " + this.status;
                                msg = msg + "; Response: " + this.responseText;
                                alert(msg);
                        }

                        // Re-enable submit button
                        document.getElementById("submit_button").disabled = false;

                    }

                }

            }
            catch (err) {

                alert(err.message + " in xhttp.onreadystatechange()");
            }


        };
        document.body.style.cursor = 'wait';
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in updateProfile(user_profile)");
    }
}

/**
 * @function
 * @name login
 * @description <p>Calls the login API and then calls processJSON to
 * deserialize the returned JSON string</p>
 * @param {UserProfile} user_profile Object representing a user/profile
 * @see processJSON
 */
function login(user_profile) {

    try {

        // URL changed to the live version
        //var url = "https://localhost:44369/api/user/login/";   // Local testing
        var url = "https://gi-api.azurewebsites.net/api/user/login/";  // Live URL

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {

                        // The text from the API call
                        var jsontext = this.responseText;

                        processJSON(jsontext);
                        
                    }
                    else {

                        switch (this.status) {
                            case 0:
                                alert("Could not contact server");
                                break;
                            case 401:
                                // Unauthorized
                                alert("Authorization error: " + this.responseText);
                                break;
                            case 500:
                                // InternalServerError
                                alert("A server error occurred");
                                break;
                            default:
                                msg = "Status: " + this.status;
                                msg = msg + "; Response: " + this.responseText;
                                alert(msg);
                        }

                        if (document.getElementById("submit_button") !== null) {

                            // Re-enable submit button
                            document.getElementById("submit_button").disabled = false;

                        }

                    }

                }

            }
            catch (err) {

                alert(err.message + " in xhttp.onreadystatechange()");
            }


        };

        document.body.style.cursor = 'wait';
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in login(user_profile)");
    }
}

/**
 * @function
 * @name processJSON
 * @description <p>Processes the JSON text from the server (or stored in session)</p>
 * @param {string} jsontext
 */
function processJSON(jsontext) {

    try {

        var user_profile_json = JSON.parse(jsontext);


        // Check for correct properties
        if (!('SurveyCompleted' in user_profile_json)) throw "Property 'SurveyCompleted' not found in returned object";
        if (!('Questions' in user_profile_json)) throw "Property 'Questions' not found in returned object";

        // Store JSON string
        sessionStorage.setItem("GPIStoredProfile", jsontext);

        // Check if userProfile has been stored
        var user_profile_str = sessionStorage.getItem("GPIUserProfile");

        if (user_profile_str === null) {

            // Sets the global userProfile object and saves it as a session variable
            setUserProfile(user_profile_json);

        }
        else {

            // Re-set userProfile to stored values
            var stored_user_json = JSON.parse(user_profile_str);
            setUserProfile(stored_user_json);

        }
        
        if (user_profile_json.SurveyCompleted) {

            // Get report

            // JSON object should have a field 'Report' containing the report data
            if (!getReport(user_profile_json.Report)) throw "Could not load report";

            userProfile.SurveyCompleted = true;

            // Check for current page
            var current = sessionStorage.getItem("CurrentPage");

            if (current !== null) {

                // Go to current page
                writeElement(current);

            }
            else { 

                // Store home as current page
                sessionStorage.setItem("CurrentPage", "home");

                // Go to HOME page
                writeElement("home");

            }

        }
        else { // User has not completed survey

            // Get survey questions and creates the serverQuestionList array
            if (!loadQuestions(user_profile_json.Questions)) throw "Could not load survey questions";

            userProfile.SurveyCompleted = false;

            // Check if questions have been previously saved
            jsontext = sessionStorage.getItem("GPIStoredQuestions");

            if (jsontext !== null) {

                // Survey has been started - using stored session variable
                serverQuestionList = JSON.parse(jsontext);

                /*
                if (surveyStarted()) {

                    getQuestions();

                }
                else {

                    writeInstructions();
                }
                */
                
            }
            else {

                // Save questions locally to session variable
                sessionStorage.setItem("GPIStoredQuestions", JSON.stringify(serverQuestionList));

                // writeInstructions();

            }

            // Check if survey has been started
            if (surveyStarted()) {

                // Go straight into the survey
                writeElement("survey");

            }
            else {

                // First time user - direct to accounts page
                writeElement("account");
            }
            
        }

    }

    catch (err) {

        alert(err.message + " in processJSON()");

    }
}


function setUserProfile(user_profile_json) {

    try {
        // Set user profile

        // Get stored password (this was initially stored in submitLoginForm()
        // or in init() when passed by userDetails session variable)
        var pwd = sessionStorage.getItem("GPIStoredPWD");

        // userProfile is a global variable
        userProfile = new UserProfile(
            user_profile_json.Email,
            pwd
        );

        if ('FirstName' in user_profile_json) {
            userProfile.FirstName = user_profile_json.FirstName;
        }

        if ('LastName' in user_profile_json) {
            userProfile.LastName = user_profile_json.LastName;
        }

        if ('GenderId' in user_profile_json) {
            userProfile.GenderId = user_profile_json.GenderId;
        }

        if ('AgeRangeId' in user_profile_json) {
            userProfile.AgeRangeId = user_profile_json.AgeRangeId;
        }

        if ('EthnicityId' in user_profile_json) {
            userProfile.EthnicityId = user_profile_json.EthnicityId;
        }

        if ('CountryId' in user_profile_json) {
            userProfile.CountryId = user_profile_json.CountryId;
        }

        if ('RegionId' in user_profile_json) {
            userProfile.RegionId = user_profile_json.RegionId;
        }

        if ('StateId' in user_profile_json) {
            userProfile.StateId = user_profile_json.StateId;
        }

        // Store user profile as session variable
        user_profile_str = JSON.stringify(userProfile);
        sessionStorage.setItem("GPIUserProfile", user_profile_str);

    }
    catch (err) {

        alert(err.message + " in setUserProfile()");

    }
}

/*
 *********** END OF USER SIGN-UP / LOGIN FUNCTIONS ************
*/

/*
 * ===========================================================
 *                USER SURVEY FUNCTIONS
 * ===========================================================
 */

/**
 * @function
 * @name updateAnswers
 * @description <p>Calls the API to submit a list of answered questions</p>
 * @param {UserProfile} user_profile User/profile object
 * @param {boolean} continue_survey Signals that the survey should be continued after submitting answers
 */
function updateAnswers(user_profile, continue_survey=true) {

    try {

        //api/User/UpdateAnswers

        // Changed the url to the live version
        //var url = "https://localhost:44369/api/user/updateanswers/";
        var url = "https://gi-api.azurewebsites.net/api/user/updateanswers/";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {

                        // The text from the API call
                        var jsontext = this.responseText;

                        // jsontext should be a string representing the number of questions updated
                        var num_updated = parseInt(jsontext, 10);

                        if (num_updated <= 0) {

                            alert("No questions saved");
                        }

                        // Get next set of questions
                        if (continue_survey) {

                            getQuestions();

                        }
                        else {

                            if (logout()) {

                                location.reload();
                            }
                            else {

                                getQuestions();
                            }
                        }
                        

                    }
                    else {

                        switch (this.status) {
                            case 0:
                                alert("Could not contact server");
                                break;
                            case 401:
                                // Unauthorized
                                alert("Authorization error: " + this.responseText);
                                break;
                            case 500:
                                // InternalServerError
                                alert("A server error occurred");
                                break;
                            default:
                                msg = "Status: " + this.status;
                                msg = msg + "; Response: " + this.responseText;
                                alert(msg);
                        }

                    }

                }

            }
            catch (err) {

                alert(err.message + " in xhttp.onreadystatechange()");
            }


        };
        document.body.style.cursor = 'wait';
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user_profile));
        //alert(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in signup(user_profile)");
    }
}

/**
 * @function
 * @name loadQuestions
 * @description <p>Creates the serverQuestionList array from deserialized JSON</p>
 * @param {Question[]} qarray Array of survey questions
 * @returns {boolean} True if questions successfully loaded, false otherwise
 * @see serverQuestionList
 */
function loadQuestions(qarray) {

    try {
        // Try loading questions from question array
        if (qarray === null) return false;

        // This should be an array, so check the length
        var len = qarray.length;

        if (len < 1) return false;

        // Initialise temporary list
        qlist = [];

        for (var i = 0; i < len; i++) {

            if (!('Id' in qarray[i])) return false;
            if (!('ShortText' in qarray[i])) return false;
            if (!('Text' in qarray[i])) return false;
            if (!('Score' in qarray[i])) return false;

            // Create new question
            qlist[i] = new Question(qarray[i].Id, qarray[i].Text);

            // Assign short text
            qlist[i].ShortText = qarray[i].ShortText;

            // Assign question anwser
            qlist[i].Score = qarray[i].Score;

        }

        serverQuestionList = qlist;

        return true;
    }
    catch (err) {

        alert(err.message + " in loadQuestions(qarray)")
    }
}

/**
 * @function
 * @name getQuestions
 * @description
 * <p>Gets a list of questions for a survey page and then 
 * calls writeQuestions()</p>
 * @see writeQuestions
 */
function getQuestions() {

    try {

        localQuestionList = randomQuestions();

        if (localQuestionList.length > 0) {

            writeQuestions();

        }
        else {

            // Set question list to null to save on traffic
            userProfile.Questions = null;

            // Call API here to check that survey is complete and saved
            // (login again - returns either questions or report in userProfile)
            login(userProfile);

        }


    }
    catch (err) {

        alert(err.message + " in getQuestions()");
    }
}

/**
 * @function
 * @name writeQuestions
 * @description
 * <p>Writes a list of survey questions to the page</p>
 */
function writeQuestions() {

    try {

        var textstr = writeMenu(survey = true);

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        textstr += getProgressBar();

        textstr += "<p class=\"gpi_lead_qu\">I am the sort of person who...</p>";

        textstr += "<form id='GPI_form' action=''>";

        textstr += "<div class=\"gpi_surv_table\">";
        textstr += "<div class=\"gpi_surv_thead\">";
        textstr += "<div class=\"gpi_surv_qu\"></div>";
        textstr += "<div class=\"gpi_surv_th\">Strongly disagree</div>";
        textstr += "<div class=\"gpi_surv_th\">Disagree</div>";
        textstr += "<div class=\"gpi_surv_th\">Neither agree nor disagree</div>";
        textstr += "<div class=\"gpi_surv_th\">Agree</div>";
        textstr += "<div class=\"gpi_surv_th\">Strongly agree</div>";
        textstr += "</div>";

        for (var i = 0; i < localQuestionList.length; i++) {

            var name = localQuestionList[i].ShortText;
            var text = localQuestionList[i].Text;

            textstr += "<div class=\"gpi_surv_tr\">";
            textstr += "<div class=\"gpi_surv_qu\">" + text + "</div>";
            textstr += "<div class=\"gpi_surv_td\"><input class=\"gpi_surv_radio\" type='radio' id='strong_disagree' name='" + name + "' value='1'><span class=\"gpi_surv_label\">Strongly disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input class=\"gpi_surv_radio\" type='radio' id='disagree' name='" + name + "' value='2'><span class=\"gpi_surv_label\">Disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input class=\"gpi_surv_radio\" type='radio' id='neither' name='" + name + "' value='3'><span class=\"gpi_surv_label\">Neither agree nor disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input class=\"gpi_surv_radio\" type='radio' id='agree' name='" + name + "' value='4'><span class=\"gpi_surv_label\">Agree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input class=\"gpi_surv_radio\" type='radio' id='strong_agree' name='" + name + "' value='5'><span class=\"gpi_surv_label\">Strongly agree</span></div>";
            textstr += "</div>";
        }

        textstr += "</div>"; // End of table

        textstr += "<div class=\"gpi_surv_button_box\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Exit\"  onclick=\"saveExit()\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Continue\"  onclick=\"saveContinue()\">";
        textstr += "</div>";

        textstr += "</form>";

        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }
    catch (err) {

        alert(err.message + " in writeQuestions()");
    }
}

/**
 * @function
 * @name getProgressBar
 * @description
 * <p>Creates an HTML string for a progress bar</p>
 * @returns {string} HTML string for a progress bar
 */
function getProgressBar() {

    try {

        textstr = "<div>&nbsp;</div>";

        var N = serverQuestionList.length;
        var n = 0;

        for (var i = 0; i < N; i++) {

            if (serverQuestionList[i].Score > 0) {
                n++;
            }
        }

        var completed = Math.floor(100 * n / N);

        textstr += "<progress class=\"gpi_progress\" id=\"progress\" value=\"" + n + "\" max=\"" + N + "\"></progress>";
        textstr += "<label for=\"progress\">&nbsp;" + completed + "%</label >";

        return textstr;

    }
    catch (err) {

        alert(err.message + " in getProgressBar()");
    }
}

/**
 * @function
 * @name saveExit
 * @description
 * <p>Saves current questions and exits survey</p>
 * @see saveQuestions
 * @see writeInstructions
 */
function saveExit() {

    try {

        saveQuestions(false);

    }
    catch (err) {

        alert(err.message + " in saveExit()");
    }
}

/**
 * @function
 * @name saveContinue
 * @description
 * <p>Saves current questions and continues survey</p>
 * @see saveQuestions
 * @see writeInstructions
 */
function saveContinue() {

    try {

        saveQuestions(true);

    }
    catch (err) {

        alert(err.message + " in saveContinue()");
    }
}

/**
 * @function
 * @name saveQuestions
 * @description
 * <p>Saves the current survey page questions to server and stored session variable</p>
 */
function saveQuestions(continue_survey=true) {

    try {

        // Note that because assigment of objects is by reference,
        // updating localQuestionList also updates serverQuestionList
        // since these contain the same objects

        var myform = document.getElementById("GPI_form");

        if (myform !== null) {

            // Loop through question list to look up answers
            for (var i = 0; i < localQuestionList.length; i++) {

                var id = localQuestionList[i].ShortText;
                var score = getScore(myform, id);

                if (score > 0) {

                    localQuestionList[i].Score = score;

                }
            }

            // Save questions locally to session variable
            sessionStorage.setItem("GPIStoredQuestions", JSON.stringify(serverQuestionList));

            // Attach question list
            userProfile.Questions = localQuestionList;

            // Check if any questions have been answered before calling API
            var total_score = 0;
            for (var i = 0; i < localQuestionList.length; i++) {

                total_score = total_score + localQuestionList[i].Score;
            }

            if (total_score > 0) {

                writeWaiting("Saving your answers ...");

                // Call API to update questions
                updateAnswers(userProfile, continue_survey);

            }

        }

        if (!continue_survey) {

            if (logout()) {

                location.reload();
            }

        }
        
        
    }
    catch (err) {

        alert(err.message + " in saveQuestions()");
    }
}

/**
 * @function
 * @name getScore
 * @description
 * <p>Gets the Likert score from a survey question</p>
 * @param {HTMLElement} myform - the survey form element
 * @param {string} id - the survey question identifier
 * @returns {number} - an integer between 0 and 5 (0 means not answered)
 */
function getScore(myform, id) {

    try {

        var answer = myform.elements[id];

        var len = answer.length;

        var val = 0;

        for (var i = 0; i < len; i++) {

            if (answer[i].checked) {

                val = i + 1;
                break;

            }
        }

        return val;
    }
    catch (err) {

        alert(err.message + " in getScore(myform, id)");
    }


}

/**
 * @function
 * @name surveyStarted
 * @description 
 * <p>Tests to see if survey has been started</p>
 * @returns {boolean} True if survey has been started
 */
function surveyStarted() {

    try {

        // Test if survey started
        for (var i = 0; i < serverQuestionList.length; i++) {

            if (serverQuestionList[i].Score > 0) return true;
        }

        return false;
    }
    catch (err) {

        alert(err.message + " in surveyStarted()");
    }
}

/**
 * @function
 * @name randomQuestions
 * @description
 * <p>Gets an array of randomized questions (questions actually randomized on server)</p>
 * @returns {Question[]} - an array of questions for a survey page
 */
function randomQuestions() {

    try {

        // Note that serverQuestionList has already been randomized
        var num_qu = 0;
        var q_list = [];

        for (var i = 0; i < serverQuestionList.length; i++) {

            if (serverQuestionList[i].Score == 0) {

                q_list[num_qu] = serverQuestionList[i];
                num_qu++;
            }

            if (num_qu == numQuestions) break;

        }

        return q_list;

    }
    catch (err) {

        alert(err.message in " + randomQuestions()");
    }
}

/*
 ***********     END OF USER SURVEY FUNCTIONS     ************
*/              

/*
 * ===========================================================
 *                REPORT EXTRACTION FUNCTIONS
 * ===========================================================
 */

/**
 * @function
 * @name getReport
 * @description 
 * <p>Extracts report objects from JSON</p>
 * @param {JSON} reportObj JSON object for report
 * @returns {boolean} True if report succesfully loaded
 */
function getReport(reportObj) {

    try {

        /* 
        * Assumed structure of JSON object
        * FirstName: string
        * LastName: string
        * QuadrantModels: Array of QuadrantModel
        * CareerThemes: Array of CareerTheme factors
        * LeadershipModel: Blue4Model
        */

        myReport = new Report(reportObj.FirstName, reportObj.LastName);

        var qmarray = reportObj.QuadrantModels;
        var len = qmarray.length;

        var career_array = null;

        if (len < 1) return false;

        myReport.QuadrantModels = [];

        for (var i = 0; i < len; i++) {

            myReport.QuadrantModels[i] = extractQuadrantModel(qmarray[i]);
        }

        // myReport.LeadershipModel = extractBlue4Model(reportObj.LeadershipModel);

        quadModel_probSolveImpStyle = myReport.QuadrantModels.find(x => x.Name === "Problem Solving & Implementation Style");
        quadModel_commInterperStyle = myReport.QuadrantModels.find(x => x.Name === "Communication & Interpersonal Style");
        quadModel_feelSelfControl = myReport.QuadrantModels.find(x => x.Name === "Feelings & Self-Control");
        quadModel_creatEntrepreneur = myReport.QuadrantModels.find(x => x.Name === "Creativity & Entrepreneurship");
        
        if ('CareerThemes' in reportObj) {
            
            career_array = reportObj.CareerThemes;

            len = career_array.length;

            for (var i = 0; i < len; i++) {

                myReport.CareerThemes[i] = extractCareerTheme(career_array[i]);

            }    

        }
        else {

            // TEMP
            myReport.CareerThemes[0] = new CareerTheme("ORGANISATIONAL", 11.3, "Being organised and focussed.");
            myReport.CareerThemes[1] = new CareerTheme("INVESTIGATIVE", 11.1, "Enquiry and evaluation.");
            myReport.CareerThemes[2] = new CareerTheme("PRACTICAL", 10.8, "Working towards a practical outcome.");
            myReport.CareerThemes[3] = new CareerTheme("ANALYTICAL", 8.8, "Handling and analysing data.");
        }
        
        return true;

    }
    catch (err) {

        alert(err.message + " in getReport()");
        return false;

    }
}

/**
 * @function
 * @name extractQuadrantModel
 * @description
 * <p>Utility function for extracting and creating a QuadrantModel 
 * object from JSON data</p>
 * @param {JSON} qmjson JSON object for QuadrantModel
 * @returns {QuadrantModel} The QuadrantModel extracted from JSON data
 */
function extractQuadrantModel(qmjson) {

    try {

        /*
         * qmjson is expected to be the JSON representation of a QuadrantModel object
         * 
         * It should therefore have the fields:
         * Name : string
         * xDimension : Dimension
         * yDimension : Dimension
         * Q1label : string
         * Q2label : string
         * Q3label : string
         * Q4label : string
         * QText : string
         */

        qModel = new QuadrantModel(
            qmjson.Name,
            extractDimension(qmjson.xDimension),
            extractDimension(qmjson.yDimension),
            qmjson.Q1label,
            qmjson.Q2label,
            qmjson.Q3label,
            qmjson.Q4label,
            qmjson.QText
        );

        return qModel;

    }
    catch (err) {

        alert(err.message + " in extractQuadrantModel(qmjson)");
    }
}

/**
 * @function
 * @name extractDimension
 * @description
 * <p>Utility function for extracting and creating a Dimension
 * object from JSON data. This is used specifically for parent 
 * Dimension objects.</p>
 * @param {JSON} dimjson JSON object for dimension
 * @returns {Dimension} Dimension object
 */
function extractDimension(dimjson) {

    try {

        /*
         * dimjson is expected to be the JSON representation of a Dimension object
         *
         * It should therefore have the fields:
         * UniPolarName : string (N.B. capital P)
         * LeftBipolarName : string
         * RightBipolarName : string
         * isParent : boolean
         * StenScore : number
         * ScoreText : string
         */

        var dimension = new Dimension(
            dimjson.UniPolarName,
            dimjson.LeftBipolarName,
            dimjson.RightBipolarName,
            dimjson.isParent
        );

        if (dimension.isParent) {


            var dimarray = dimjson.SubDimensions;
            dimension.SubDimensions = [];

            var len = dimarray.length;

            for (var i = 0; i < len; i++) {

                dimension.SubDimensions[i] = extractSubDimension(dimarray[i]);
            }

            dimension.StenScore = dimjson.StenScore;

        }

        return dimension;

    }
    catch (err) {

        alert(err.message + " in extractDimension(dimjson)");
    }
}

/**
 * @function
 * @name extractSubDimension
 * @description
 * <p>Utility function for extracting and creating a Dimension
 * object from JSON data. This is used specifically for child
 * Dimension objects.</p>
 * @param {JSON} subdimjson JSON object for sub-dimension
 * @returns {Dimension} Dimension object for sub-dimension
 */
function extractSubDimension(subdimjson) {

    try {

        /*
         * subdimjson is expected to be the JSON representation of a Dimension object
         *
         * It should therefore have the fields:
         * UniPolarName : string (N.B. capital P)
         * LeftBipolarName : string
         * RightBipolarName : string
         * isParent : boolean
         * StenScore : number
         * ScoreText : string
         */

        var subdimension = new Dimension(
            subdimjson.UniPolarName,
            subdimjson.LeftBipolarName,
            subdimjson.RightBipolarName,
            false,
            subdimjson.StenScore,
            subdimjson.ScoreText
        );

        return subdimension;

    }
    catch (err) {

        alert(err.message + " in extractSubDimension(dimjson)");
    }
}

/**
 * @function
 * @name extractCareerTheme
 * @description
 * <p>Utility function for extracting and creating a CareerTheme
 * object from JSON data.</p>
 * @param {JSON} ctjson JSON object for career themes factor
 * @returns CareerTheme object
 */
function extractCareerTheme(ctjson) {

    try {

        var career_theme = new CareerTheme(
            ctjson.Name,
            ctjson.Score,
            ctjson.Description
        );

        return career_theme;

    }
    catch (err) {

        alert(err.message + " in extractCareerThemes(ctjson)");
    }
}

/**
 * @function
 * @name extractBlue4Model
 * @description
 * <p>Utility function for extracting and creating a Blue4
 * (Leadership style) object from JSON data.</p>
 * @param {JSON} b4json JSON object for Blue 4 model
 * @returns {Blue4Model} Blue4Model object
 */
function extractBlue4Model(b4json) {

    try {

        /*
         * b4json is expected to be the JSON representation of a Blue4Model object
         *
         * It should therefore have the fields:
         * RiskArea : number
         * RiskLevel : number
         * ScoreText : string
         */

        var blue4 = new Blue4Model(
            b4json.RiskArea,
            b4json.RiskLevel,
            b4json.ScoreText
        );

        return blue4;

    }
    catch (err) {

        alert(err.message + " in extractBlue4Model(b4json)");
    }
}

/*
 ***********  END OF REPORT EXTRACTION FUNCTIONS  ************
*/

/*
 * ===========================================================
 *                PAGE GENERATION FUNCTIONS
 * ===========================================================
 */

/**
 * @function
 * @name writeElement
 * @param {string} current_page String specifying the page to display
 * @description <p>Writes the GPI Model element to the web page</p>
 * <p>The possible values of 'current_page' are currently:</p>
 * <ul>
 * <li>'home'</li>
 * <li>'problem_quad'</li>
 * <li>'communication_quad'</li>
 * <li>'feelings_quad'</li>
 * <li>'feelings_quad'</li>
 * <li>'entrepreneur_quad'</li>
 * </ul>
 */
function writeElement(current_page, push_state=true) {

    try {

        // Store current_page in session variable
        sessionStorage.setItem("CurrentPage", current_page);

        if (push_state) {

            // Push state to history (do not write new URL)
            history.pushState({ GPIpage: current_page }, null);

        }
        

        switch (current_page) {

            case "instructions":

                writeInstructions();

                break;

            case "survey":

                getQuestions();

                break;

            case "home":

                writeHome();

                break;

            case "account":

                writeAccount();

                break;

            case "problem_quad":

                // writeQuadrant(quadmodel, next, prev);
                writeQuadrant(quadModel_probSolveImpStyle, "communication_quad", "career");

                break;

            case "communication_quad":

                // writeQuadrant(quadmodel, next, prev);
                writeQuadrant(quadModel_commInterperStyle, "feelings_quad", "problem_quad");

                break;

            case "feelings_quad":

                // writeQuadrant(quadmodel, next, prev);
                writeQuadrant(quadModel_feelSelfControl, "entrepreneur_quad", "communication_quad");

                break;

            case "entrepreneur_quad":

                // writeQuadrant(quadmodel, next, prev);
                writeQuadrant(quadModel_creatEntrepreneur, "career", "feelings_quad");

                break;

            case "career":
               
                // writeCareer(next, prev);
                writeCareer("problem_quad", "entrepreneur_quad");

                break;

            default:

                throw "Unknown element";

        }

        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }
    catch (err) {

        alert(err.message + " in writeElement()");

    }
}

/**
 * @function
 * @name writeMenu
 * @returns {string} HTML string 
 * @description <p>Generates the HTML string for generating the navigation menu</p>
 */
function writeMenu(survey=false) {

    try {

        var textstr = "";

        if (survey) {

            // Write survey menu
            textstr += "<div class=\"gpi_menu_bar\">";
            textstr += "<div class=\"gpi_logo_container\">";
            textstr += "<a onclick=\"writeElement('home');\"><img class=\"gpi_logo\" src=" + logo_src + "/></a>";
            textstr += "</div >";
            textstr += "<div class=\"gpi_burger_container\">";
            textstr += "<a href=\"javascript:void(0);\" onclick=\"toggleMenu('GPI_dropdown_id')\"><img class=\"gpi_burger\" src=" + burger_src + "/></a>";
            textstr += "</div>";
            textstr += "</div >";
            textstr += "<div id=\"GPI_dropdown_id\" class=\"gpi_dropdown\" style=\"display:none\">";
            textstr += "<a onclick=\"writeElement('account');\">Account Details</a><br />";
            textstr += "<a onclick=\"writeElement('instructions');\">Instructions</a><br />";
            textstr += "<a onclick=\"writeElement('survey');\">Survey</a><br />";
            textstr += "<a href=\"\" onclick=\"saveExit();\">Exit GPI</a><br />";
            textstr += "</div>";

        }
        else {

            // Write main menu component
            textstr += "<div class=\"gpi_menu_bar\">";
            textstr += "<div class=\"gpi_logo_container\">";
            textstr += "<a onclick=\"writeElement('home');\"><img class=\"gpi_logo\" src=" + logo_src + "/></a>";
            textstr += "</div >";
            textstr += "<div class=\"gpi_burger_container\">";
            textstr += "<a href=\"javascript:void(0);\" onclick=\"toggleMenu('GPI_dropdown_id')\"><img class=\"gpi_burger\" src=" + burger_src + "/></a>";
            textstr += "</div>";
            textstr += "</div >";
            textstr += "<div id=\"GPI_dropdown_id\" class=\"gpi_dropdown\" style=\"display:none\">";
            textstr += "<a onclick=\"writeElement('home');\">Home</a><br />";
            textstr += "<a onclick=\"writeElement('account');\">Account Details</a><br />";
            textstr += "<a onclick=\"writeElement('problem_quad');\">Problem Solving & Implementation Style</a><br />";
            textstr += "<a onclick=\"writeElement('communication_quad');\">Communication & Interpersonal Style</a><br />";
            textstr += "<a onclick=\"writeElement('feelings_quad');\">Feelings & Self-Control</a><br />";
            textstr += "<a onclick=\"writeElement('entrepreneur_quad');\">Creativity & Entrepreneurship</a><br />";
            textstr += "<a onclick=\"writeElement('career');\">Career Themes</a><br />";
            textstr += "<a href=\"\" onclick=\"logout();\">Exit GPI</a><br />";
            textstr += "</div>";

        }

        return textstr;

    }
    catch (err) {

        alert(err.message + " in writeMenu()");
    }
}

/**
 * @function
 * @name writeInstructions
 * @description
 * <p>Writes the survey instructions to the page</p>
 */
function writeInstructions() {

    try {


        // Create instructions string
        var textstr = writeMenu(survey = true);

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        textstr += "<h1 class=\"gpi_h1\">The GPI Survey</h1>";
        textstr += "<h2 class=\"gpi_h2\">Instructions</h2>";
        textstr += "<p>This questionnaire will provide you with information that enables you to develop a detailed understanding of yourself in terms of your preferred behaviour, or the ";
        textstr += "'real you'. These preferences or natural predispositions should not be confused with your actual behaviour, which may vary according to the situation and the ";
        textstr += "particular circumstances that you face. Hence you are answering it in the context of \"<i>I am the sort of person who...</i>\".</p>";
        textstr += "<p>To generate an accurate profile, this inventory requires that your responses reflect how you prefer to behave rather than how, on some occasions, you may ";
        textstr += "actually behave. Therefore, in responding to each of the questions, please have in mind how you prefer to think and behave in general, independent of the ";
        textstr += "demands and pressures of any particular circumstance or situation.</p>";
        textstr += "<p>It is also important to recognise that there are no right or wrong answers, and to gain the most from completing the inventory it is only necessary that you be ";
        textstr += "frank and honest in your responses. The feedback you receive will then be accurate, enabling the development of your personal effectiveness across the many ";
        textstr += "different situations that you may face.</p>";
        textstr += "<p>Ideally, try not to be interrupted when completing the questionnaire. We recommend you try to complete it in one sitting.</p>";
        textstr += "<p>Ensure that each question is answered by clicking in the circle that reflects your answer. The questionnaire is spread across several pages. ";
        textstr += "Once you move on to the next page and also once the questionnaire is complete you will not be able to revisit or amend your answers.</p>";

        if (surveyStarted()) {

            verb = "Continue";
        }
        else {

            verb = "Take Survey";
        }

        textstr += "<div class=\"gpi_surv_button_box\"><input type=\"button\" class=\"gpi_button\" value=\"" + verb + "\" onclick=\"getQuestions()\"></div>";

        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }
    catch (err) {

        alert(err.message + " in writeInstructions()");
    }

}

/**
 * @function
 * @name writeHome
 * @description <p>Generates the HTML string for generating the home page</p>
 */
function writeHome() {

    try {

        // Write menu
        textstr = writeMenu();

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        textstr += "<h1 class=\"gpi_h1\">The Global Predisposition Indicator (GPI)</h1>";

        textstr += "<div align='center'>";
        textstr += "<img id='gpi_image' src='/images/GI_Logo.png' width='200' height='200' style='max-width: 100%; height: auto;'/>";
        textstr += "</div>";

        textstr += "<div>&nbsp;</div>";

        textstr += "<h3 class=\"gpi_h3\">Profile for</h3>";

        textstr += "<h2 class=\"gpi_h2\">" + myReport.FirstName + " " + myReport.LastName + "</h2>";

        textstr += "<div>&nbsp;</div>";

        textstr += "<h3 class=\"gpi_h3\">Contents</h3>";

        textstr += "<div>&nbsp;</div>";

        textstr += "<div align='center'>";
        textstr += "<a class=\"gpi_link\" onclick=\"writeElement('problem_quad');\">Problem Solving / Implementation</a><br />";
        textstr += "<div>&nbsp;</div><div>&nbsp;</div>";
        textstr += "<a class=\"gpi_link\" onclick=\"writeElement('communication_quad');\">Communication / Interpersonal</a><br />";
        textstr += "<div>&nbsp;</div><div>&nbsp;</div>";
        textstr += "<a class=\"gpi_link\" onclick=\"writeElement('feelings_quad');\">Feelings / Self-Control</a><br />";
        textstr += "<div>&nbsp;</div><div>&nbsp;</div>";
        textstr += "<a class=\"gpi_link\" onclick=\"writeElement('entrepreneur_quad');\">Creativity / Entrepreneurship</a>";
        textstr += "<div>&nbsp;</div><div>&nbsp;</div>";
        textstr += "<a class=\"gpi_link\" onclick=\"writeElement('career');\">Career Themes</a>";
        textstr += "</div>";

        textstr += "<div>&nbsp;</div>";
        textstr += "<div>&nbsp;</div>";
        textstr += "<div>&nbsp;</div>";

        textstr += "</div>";

        textstr += "<div align='center'>";
        textstr += "<p style=\"font-size:10px;\">The 'Global Predisposition Indicator (GPI)' is traded marked by Glowinkowski International Ltd.</p>";
        textstr += "</div>";

        textstr += "<div>&nbsp;</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in writeHome()");
    }
}

/**
 * @function
 * @name writeAccount
 * @description <p>Generates the HTML string for generating the user account page</p>
 */
function writeAccount() {
    try {

        var is_survey = false;

        // Write menu
        if (myReport !== null) {

            textstr = writeMenu(survey = false);

        }
        else {

            textstr = writeMenu(survey = true);

            is_survey = true;

        }

        // TODO: Generate dropdown lists from API call

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        textstr += "<div>&nbsp;</div>";
        textstr += "<h1 class=\"gpi_h1\">Account Details</h1>";

        if (is_survey) {

            textstr += "<p><i>Please update your profile information before taking the survey.</i></p>"

        }

        textstr += "<div class=\"gpi_form_container\">";
        textstr += "<form class=\"form-horizontal\"  onchange=\"formChanged()\">";
        textstr += "<hr />";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"email\">Email</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"email\" type=\"text\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"pwd\">Password</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"pwd\" type=\"password\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"confirm_pwd\">Confirm password</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"confirm_pwd\" type=\"password\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"first_name\">First name</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"first_name\" type=\"text\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"last_name\">Last name</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"last_name\" type=\"text\" />";
        textstr += "</div>";
        textstr += "</div>";

        textstr += "<div>&nbsp;</div>";

        // Profile information
        textstr += "<h4 class=\"gpi_h4\">Profile information</h4>";
        textstr += "<hr />";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"gender\">Gender</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<select class=\"form-control\" id=\"gender\">";
        textstr += "<option value=\"1\">Prefer not to say</option>";
        textstr += "<option value=\"2\">Male</option>";
        textstr += "<option value=\"3\">Female</option>";
        textstr += "</select>";
        textstr += "</div>";
        textstr += "</div>";

        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"age_range\">Age range</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<select class=\"form-control\" id=\"age_range\">";
        textstr += "<option value=\"1\">Prefer not to say</option>";
        textstr += "<option value=\"8\">Under 21</option>";
        textstr += "<option value=\"9\">21-30</option>";
        textstr += "<option value=\"10\">31-40</option>";
        textstr += "<option value=\"11\">41-50</option>";
        textstr += "<option value=\"12\">51-60</option>";
        textstr += "<option value=\"13\">61-65</option>";
        textstr += "<option value=\"14\">Over 65</option>";
        textstr += "</select>";
        textstr += "</div>";
        textstr += "</div>";

        textstr += "<div class=\"form-group\">";
        textstr += "<div class=\"col-md-offset-2 col-md-10\">";
        textstr += "<input disabled id=\"reset_button\" type=\"button\" class=\"btn btn-default\" value=\"Reset\" onclick=\"resetDetails()\"/>";
        textstr += "</div>";
        textstr += "</div>";

        textstr += "<div class=\"form-group\">";
        textstr += "<div class=\"col-md-offset-2 col-md-10\">";

        textstr += "<input disabled id=\"update_button\" type=\"button\" class=\"btn btn-default\" value=\"Update\" onclick=\"submitUpdateForm()\"/>";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<hr />";
        textstr += "</form>";
        textstr += "</div>";

        if (is_survey) {

            textstr += "<div class=\"gpi_surv_button_box\">";
            textstr += "<input type=\"button\" class=\"gpi_button\"";
            textstr += " value =\"Go to survey\" onclick=\"writeElement('instructions')\"></div>";

        }
        
        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        // Set user details 
        setDetailsToStored();    

    }
    catch (err) {

        alert(err.message + " in writeAccount()");
    }
}

/**
 * @function
 * @name writeLoginForm
 * @description <p>Generates the HTML string for the login form</p>
 */
function writeLoginForm() {

    try {
        // Write login form
        textstr = "";

        textstr += "<div class=\"gpi_menu_bar\">";
        textstr += "<div class=\"gpi_logo_container\">";
        textstr += "<img class=\"gpi_logo\" src=" + logo_src + "/>";
        textstr += "</div>";
        textstr += "</div>";

        /*
        textstr += "<div class=\"gpi_menu_bar\">";
        textstr += "<div class=\"gpi_logo_container\">";
        textstr += "<a href=\"/Index\"><img class=\"gpi_logo\" src=" + logo_src + "/></a>";
        textstr += "</div>";
        textstr += "<div class=\"gpi_burger_container\">";
        textstr += "<a href=\"javascript:void(0);\" onclick=\"toggleMenu('GPI_dropdown_id')\"><img class=\"gpi_burger\" src=" + burger_src + "/></a>";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div id=\"GPI_dropdown_id\" class=\"gpi_dropdown\" style=\"display:none\">";
        textstr += "<a href=\"/GPI/GPI\">Login</a><br />";
        textstr += "<a href=\"/GPI/Index\">Sign up</a><br />";
        textstr += "</div>";
        */

        textstr += "<div class=\"gpi_content\">";

        textstr += "<div>&nbsp;</div>";

        textstr += "<h2 class=\"gpi_h2\">Log-in</h2>";

        textstr += "<div class=\"gpi_form_container\">";
        textstr += "<form class=\"form-horizontal\">";
        //textstr += "<span class=\"gpi_label\">Do not have an account yet?</span>&nbsp;";
        //textstr += "<a class=\"gpi_link\" href=\"/GPI/Index\"><b>Sign&nbsp;up&nbsp;here</b></a>";
        textstr += "<h4 class=\"gpi_h4\">Log in to your account</h4>";
        textstr += "<hr />";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"email\">Email</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"email\" type=\"text\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<div class=\"form-group\">";
        textstr += "<label class=\"col-md-2 control-label\" for=\"pwd\">Password</label>";
        textstr += "<div class=\"col-md-10\">";
        textstr += "<input class=\"form-control\" id=\"pwd\" type=\"password\" />";
        textstr += "</div>";
        textstr += "</div>";

        textstr += "<div class=\"form-group\">";
        textstr += "<div class=\"col-md-offset-2 col-md-10\">";
        textstr += "<input id=\"submit_button\" type=\"button\" class=\"btn btn-default\" value=\"Login\" onclick=\"submitLoginForm()\" />";
        textstr += "</div>";
        textstr += "</div>";
        textstr += "<hr />";
        textstr += "</form>";
        textstr += "</div>";

        textstr += "<div>&nbsp;</div>";
        textstr += "<div>&nbsp;</div>";
        textstr += "<div>&nbsp;</div>";
        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;
    }
    catch (err) {

        alert(err.message + " in writeLoginForm()");
    }
}


function writeWaiting(message) {

    try {
        // Write waiting message
        textstr = "<p>&nbsp;</p>";
        textstr += "<h3 class=\"gpi_h3\">" + message + "</h3>";
        textstr += "<p>&nbsp;</p>";
        textstr += "<div class=\"loader\"></div>";
        textstr += "<p>&nbsp;</p>";
        textstr += "<p>&nbsp;</p>";
        textstr += "<p>&nbsp;</p>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;
    }
    catch (err) {

        alert(err.message + " in writeWaiting(message)");
    }
}

/**
 * @function
 * @name formChanged
 * @description <p>Called when user form is changed on user account page.</p>
 */
function formChanged() {

    try {

        document.getElementById("reset_button").disabled = false;
        document.getElementById("update_button").disabled = false;

    }
    catch (err) {

        alert(err.message + " in formChanged()");
    }
    
}

/**
 * @function
 * @name resetDetails
 * @description <p>Called when user clicks reset button on user account page.</p>
 * @see setDetailsToStored
 */
function resetDetails() {

    try {

        // Set user details
        setDetailsToStored();

        document.getElementById("reset_button").disabled = true;
        document.getElementById("update_button").disabled = true;

    }
    catch (err) {

        alert(err.message + " in resetDetails()");
    }

}

/**
 * @function
 * @name writeQuadrant
 * @param {QuadrantModel} quadmodel The QuadrantModel object to render
 * @param {string} next String for next element in report
 * @param {string} prev String for previous element in report
 * @description <p>Renders the page for a Quadrant model</p>
 * @see quadModel_probSolveImpStyle
 * @see quadModel_commInterperStyle
 * @see quadModel_feelSelfControl
 * @see myReport
 * @see quad_width
 * @see quad_height
 * @see sten_width
 * @see sten_height
 * @see drawQuadrant
 * @see drawSten
 */
function writeQuadrant(quadmodel, next, prev) {

    try {

        // Write menu
        textstr = writeMenu();

        spacer = "<div>&nbsp;</div>";

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        // Write Quadrant component

        // Index for text paragraphs
        var text_id = 0;

        textstr += "<h1 class=\"gpi_h1\">" + quadmodel.Name + "</h1>";
        textstr += "<div align='center'>";
        textstr += "<canvas id='quadrant' width='" + quad_width + "' height='" + quad_height + "' style='display: none'></canvas>";
        textstr += "<img id='quadrant_image' src='' width='" + quad_width + "' height='" + quad_height + "' style='max-width: 100%; height: auto;'/>";
        textstr += "</div>";

        text_id++;  // Index for text paragraphs

        // Identifiers for text paragraphs
        more_text_id = "more_" + text_id;
        less_text_id = "less_" + text_id;

        textstr += "<div id=\"" + less_text_id + "\">";
        textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + more_text_id + "', '" + less_text_id + "')\">&#9654; Read more...</div></h4>";
        textstr += "</div>";

        textstr += "<div id=\"" + more_text_id + "\" style=\"display: none\">";
        textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9660; Read less</div></h4>";

        textstr += quadmodel.QText;

        textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9650; Read less</div></h4>";

        textstr += "</div>";

        textstr += spacer;

        textstr += "<h2 class=\"gpi_h2\">" + quadmodel.xDimension.LeftBipolarName + " and " + quadmodel.xDimension.RightBipolarName + " subdimensions</h2>";    

        for (var i = 0; i < quadmodel.xDimension.SubDimensions.length; i++) {

            text_id++;  // Index for text paragraphs

            id_str = quadmodel.xDimension.SubDimensions[i].UnipolarName;    // used to identify HTML element
            id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
            image_id = "image" + id_str;

            textstr += "<h3 class=\"gpi_h3\">" + quadmodel.xDimension.SubDimensions[i].LeftBipolarName + "/";
            textstr += quadmodel.xDimension.SubDimensions[i].RightBipolarName + "</h3>";

            textstr += "<div align='center'>";
            textstr += "<canvas id='" + id_str + "' width='" + sten_width + "' height='" + sten_height + "' style='display: none'></canvas>";
            textstr += "<img id='" + image_id + "' src='' width='" + sten_width + "' height='" + sten_height + "' style='max-width: 100%; height: auto;'/>";
            textstr += "</div>";

            // Identifiers for text paragraphs
            more_text_id = "more_" + text_id;
            less_text_id = "less_" + text_id;

            textstr += "<div id=\"" + less_text_id + "\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + more_text_id + "', '" + less_text_id + "')\">&#9654; Read more...</div></h4>";
            textstr += "</div>";

            textstr += "<div id=\"" + more_text_id + "\" style=\"display: none\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9660; Read less</div></h4>";

            textstr += quadmodel.xDimension.SubDimensions[i].ScoreText;

            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9650; Read less</div></h4>";

            textstr += "<div>&nbsp;</div>";

            textstr += "</div>";

            textstr += spacer;

        }

        textstr += "<h2 class=\"gpi_h2\">" + quadmodel.yDimension.LeftBipolarName + " and " + quadmodel.yDimension.RightBipolarName + " subdimensions</h2>";

        for (var i = 0; i < quadmodel.yDimension.SubDimensions.length; i++) {

            text_id++;  // Index for text paragraphs

            id_str = quadmodel.yDimension.SubDimensions[i].UnipolarName;    // used to identify HTML element
            id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
            image_id = "image" + id_str;

            textstr += "<h3 class=\"gpi_h3\">" + quadmodel.yDimension.SubDimensions[i].LeftBipolarName + "/";
            textstr += quadmodel.yDimension.SubDimensions[i].RightBipolarName + "</h3>";

            textstr += "<div align='center'>";
            textstr += "<canvas id='" + id_str + "' width='" + sten_width + "' height='" + sten_height + "' style='display: none'></canvas>";
            textstr += "<img id='" + image_id + "' src='' width='" + sten_width + "' height='" + sten_height + "' style='max-width: 100%; height: auto;'/>";
            textstr += "</div>";

            // Identifiers for text paragraphs
            more_text_id = "more_" + text_id;
            less_text_id = "less_" + text_id;

            textstr += "<div id=\"" + less_text_id + "\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + more_text_id + "', '" + less_text_id + "')\">&#9654; Read more...</div></h4>";
            textstr += "</div>";

            textstr += "<div id=\"" + more_text_id + "\" style=\"display: none\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9660; Read less</div></h4>";

            textstr += quadmodel.yDimension.SubDimensions[i].ScoreText;

            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9650; Read less</div></h4>";

            textstr += "<div>&nbsp;</div>";

            textstr += "</div>";

            textstr += spacer;
        }

        // Navigation
        textstr += "<div class=\"gpi_surv_button_box\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Previous\"  onclick=\"writeElement('" + prev + "')\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Next\"  onclick=\"writeElement('" + next + "')\">";
        textstr += "</div>";

        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        drawQuadrant(quadmodel);

        for (var i = 0; i < quadmodel.xDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.xDimension.SubDimensions[i]);

        }

        for (var i = 0; i < quadmodel.yDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.yDimension.SubDimensions[i]);

        }

    }
    catch (err) {

        alert(err.message + " in writeMenu()");
    }
}

/**
 * @function
 * @name writeCareer
 * @param {string} next String for next element in report
 * @param {string} prev String for previous element in report
 * @description <p>Renders the page for the Career themes model</p>
 * @see drawCareerThemes
 */
function writeCareer(next, prev) {

    try {

        // Write menu
        textstr = writeMenu();

        // Index for text paragraphs
        var text_id = 0;

        textstr += "<div class=\"gpi_content\" onclick=\"hideMenu('GPI_dropdown_id')\">";

        textstr += "<h1 class=\"gpi_h1\">Career Themes</h1>";

        textstr += "<p>A 'career theme' relates to a variety of different careers and job roles that share in common the styles of thinking, ";
        textstr += "performing, socialising and relating that most naturally suit them. ";
        textstr += "These factors are calculated from an individual's GPI profile and ranked in order of relevance.</p>";


        textstr += "<h4 class=\"gpi_h4\">" + myReport.FirstName + "'s top 4 career theme factors are:</h4>";

        // TEMP
        textstr += "<div align='center'>";
        textstr += "<canvas id=\"careers\" width=\"600\" height=\"470\" style=\"display: none\"></canvas>";
        textstr += "<img id='careers_image' src='' width=\"600\" height=\"470\" style='max-width: 100%; height: auto;'/>";
        textstr += "</div>";

        textstr += "<h2 class=\"gpi_h2\">What these themes mean</h2>";

        for (var i = 0; i < 4; i++) {

            text_id++;  // Index for text paragraphs
            textstr += "<h3 class=\"gpi_h3\">" + myReport.CareerThemes[i].Name + "</h3>";

            // Identifiers for text paragraphs
            more_text_id = "more_" + text_id;
            less_text_id = "less_" + text_id;

            textstr += "<div id=\"" + less_text_id + "\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + more_text_id + "', '" + less_text_id + "')\">&#9654; Read more...</div></h4>";
            textstr += "</div>";

            textstr += "<div id=\"" + more_text_id + "\" style=\"display: none\">";
            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9660; Read less</div></h4>";

            textstr += "<hr>";
            textstr += myReport.CareerThemes[i].Description;
            textstr += "<hr>";

            textstr += "<h4 class=\"gpi_h4\"><div class=\"plus\" onclick=\"toggleHidden('" + less_text_id + "', '" + more_text_id + "')\">&#9650; Read less</div></h4>";

            textstr += "<div>&nbsp;</div>";

            textstr += "</div>";

        }


        // Navigation
        textstr += "<div class=\"gpi_surv_button_box\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Previous\"  onclick=\"writeElement('" + prev + "')\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Next\"  onclick=\"writeElement('" + next + "')\">";
        textstr += "</div>";

        textstr += "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        // Draw visualization
        drawCareerThemes();

    }
    catch (err) {

        alert(err.message + " in writeCareer()");
    }
}


/**
 * @function
 * @name toggleMenu
 * @param {string} menu_id String specifying the element id for the menu
 * @description<p>Shows or hides the dropdown navigation menu</p>
 */
function toggleMenu(menu_id) {

    try {

        var dropdown = document.getElementById(menu_id);

        if (dropdown.style.display === "none") {

            dropdown.style.display = "block";
        }
        else {

            dropdown.style.display = "none";

        }

    }
    catch (err) {

        alert(err.message + " in toggleHidden(show, hide)");
    }

}

/**
 * @function
 * @name hideMenu
 * @param {string} menu_id String specifying the element id for the menu
 * @description <p>Hides the menu if it is visible (used to hide menu by
 * clicking on the main content).</p>
 */
function hideMenu(menu_id) {

    try {

        var dropdown = document.getElementById(menu_id);

        // Check dropdown exists
        if (dropdown !== null) {

            // If 'block' display, change to 'none'
            if (dropdown.style.display === "block") {

                dropdown.style.display = "none";
            }

        }

    }
    catch (err) {

        alert(err.message + " in hideMenu(menu_id)");
    }
}

/**
 * @function
 * @name toggleHidden
 * @param {string} show_id String specifying the id of the element to show
 * @param {string} hide_id String specifying the id of the element to hide
 * @description <p>Toggles the visibility of HTML elements. Used to show or hide extra text</p>
 */
function toggleHidden(show_id, hide_id) {

    try {

        var show = document.getElementById(show_id);
        var hide = document.getElementById(hide_id);

        show.style.display = "inline";
        hide.style.display = "none";

    }
    catch (err) {

        alert(err.message + " in toggleHidden(show, hide)");
    }

}

/*
 ***********   END OF PAGE GENERATION FUNCTIONS   ************
*/

/*
 * ===========================================================
 *                   GRAPHICS FUNCTIONS
 * ===========================================================
 */

/**
 * @function
 * @name assignFormatting
 * @description
 * <p>Assigns quadrant colours and fonts from CSS.
 * If CSS definitions are not found, default values are used.</p>
 * @see quad_circle_colour
 * @see quad_start_colour
 * @see quad_end_colour
 * @see quad_axis_colour
 * @see quad_grid_colour
 * @see quad_marker_colour
 * @see quad_text_colour
 * @see quad_text_size
 * @see quad_text_font
 * @see quad_label_text_colour
 * @see quad_label_text_size
 * @see quad_label_text_font
 * @see quad_width
 * @see quad_height
 * @see sten_width
 * @see sten_height
 * @see plot_circle
 * @see plot_shadow
 */
function assignFormatting() {

    try {

        // Get the root element
        var r = document.querySelector(':root');

        // Get the styles (properties and values) for the root
        var rs = getComputedStyle(r);

        // Paths for images
        logo_src = rs.getPropertyValue('--gpi_logo_src');

        if (logo_src.length == 0) {

            logo_src = "";
        }

        burger_src = rs.getPropertyValue('--gpi_burger_src');

        if (burger_src.length == 0) {

            burger_src = "";
        }


        // Quadrant formatting
        quad_circle_colour = rs.getPropertyValue('--gpi_quad_circle_colour');

        if (quad_circle_colour.length == 0) {

            quad_circle_colour = "#8bafc7";
        }

        quad_start_colour = rs.getPropertyValue('--gpi_quad_start_colour');

        if (quad_start_colour.length == 0) {

            quad_start_colour = "#a9d5f5";
        }

        quad_end_colour = rs.getPropertyValue('--gpi_quad_end_colour');

        if (quad_end_colour.length == 0) {

            quad_end_colour = "#3277a8";
        }

        quad_axis_colour = rs.getPropertyValue('--gpi_quad_axis_colour');

        if (quad_axis_colour.length == 0) {

            quad_axis_colour = "#253959";
        }

        quad_grid_colour = rs.getPropertyValue('--gpi_quad_grid_colour');

        if (quad_grid_colour.length == 0) {

            quad_grid_colour = "#a9d5f5";
        }

        quad_marker_colour = rs.getPropertyValue('--gpi_quad_marker_colour');

        if (quad_marker_colour.length == 0) {

            quad_marker_colour = "#a9d5f5";
        }

        // Quadrant text
        quad_text_colour = rs.getPropertyValue('--gpi_quad_text_colour');

        if (quad_text_colour.length == 0) {

            quad_text_colour = "#ffffff";
        }

       
        quad_text_size_str = rs.getPropertyValue('--gpi_quad_text_size');

        if (quad_text_size_str.length == 0) {

            quad_text_size = 28;
        }
        else {

            quad_text_size = parseInt(quad_text_size_str);

        }

        quad_text_font = rs.getPropertyValue('--gpi_quad_text_font');

        if (quad_text_font.length == 0) {

            quad_text_font = "Arial";
        }

        quad_text_font = quad_text_size + "px " + quad_text_font;

        // Quadrant axis label text
        quad_label_text_colour = rs.getPropertyValue('--gpi_quad_label_text_colour');

        if (quad_label_text_colour.length == 0) {

            quad_label_text_colour = "#ffffff";
        }

        quad_label_text_size_str = rs.getPropertyValue('--gpi_quad_label_text_size');

        if (quad_label_text_size_str.length == 0) {

            quad_label_text_size = 24;
        }
        else {

            quad_label_text_size = parseInt(quad_label_text_size_str);

        }

        quad_label_text_font = rs.getPropertyValue('--gpi_quad_label_text_font');

        if (quad_text_font.length == 0) {

            quad_label_text_font = "Arial";
        }

        quad_label_text_font = quad_label_text_size + "px " + quad_label_text_font;

        // Canvas dimensions for quadrants
        quad_width = 900; 
        quad_height = 700;

        // Canvas dimensions for sten scores
        sten_width = 900; 
        sten_height = 220;

        // Set booleans
        plot_circle_str = rs.getPropertyValue('--gpi_quad_show_circle');

        if (plot_circle_str.length == 0) {

            plot_circle = true;
        }
        else {

            if (plot_circle_str > 0) {

                plot_circle = true;

            }
            else {

                plot_circle = false;
            }
        }

        plot_shadow_str = rs.getPropertyValue('--gpi_quad_shadow_on');

        if (plot_shadow_str.length == 0) {

            plot_shadow = true;
        }
        else {

            if (plot_shadow_str > 0) {

                plot_shadow = true;

            }
            else {

                plot_shadow = false;
            }
        }

        // Career themes visualization
        
        // Colour of arrow
        careers_arrow_col = rs.getPropertyValue('--gpi_careers_arrow_colour');

        if (careers_arrow_col.length == 0) {

            careers_arrow_col = "#253959";
        }

        // Colour of text
        careers_text_col = rs.getPropertyValue('--gpi_careers_text_colour');

        if (careers_arrow_col.length == 0) {

            careers_text_col = "#ffffff";
        }

        careers_text_size_str = rs.getPropertyValue('--gpi_careers_text_size');

        if (careers_text_size_str.length == 0) {

            careers_text_size = 28;
        }
        else {

            careers_text_size = parseInt(careers_text_size_str);

        }

        careers_text_font = rs.getPropertyValue('--gpi_careers_text_font');

        if (careers_text_font.length == 0) {

            careers_text_font = "Arial";
        }

        careers_text_font = careers_text_size + "px " + careers_text_font;

    }
    catch (err) {

        alert(err.message + " in assigning Quadrant element colours and font");
    }

}

/**
 * @function
 * @name drawQuadrant
 * @param {QuadrantModel} quadrant - the QuadrantModel to display
 * @description
 * <p>Draws the Quadrant model visualisation. This is configurable from CSS by setting
 * JavaScript global variables from the CSS root variables.</p>
 * @see quad_circle_colour
 * @see quad_start_colour
 * @see quad_end_colour
 * @see quad_axis_colour
 * @see quad_grid_colour
 * @see quad_marker_colour
 * @see quad_text_colour
 * @see quad_text_size
 * @see quad_text_font
 * @see quad_label_text_colour
 * @see quad_label_text_size
 * @see quad_label_text_font
 * @see quad_width
 * @see quad_height
 */
function drawQuadrant(quadrant) {

    try {

        if (!(quadrant instanceof QuadrantModel)) {

            throw "Object is not a QuadrantModel";
        }

        // Draw quadrant
        var aw = 10;                // axis width

        var c = document.getElementById("quadrant");
        var ctx = c.getContext("2d");
        var w = c.width;            // width of canvas
        var h = c.height;           // height of canvas

        var max_span = 0.8 * h;     // Span of circle image

        var r1 = max_span / 2;      // Radius of circle
        var r2 = 0.8 * r1;          // Half width of square
        var r3 = 1.2 * r1;          // Radius of x-label centres

        var x0 = w / 2.0;           // x origin
        var y0 = h / 2.0;           // y origin

        var grid_space = 2 * r2 / 12;   // Grid spacing
        var rM = 0.5 * grid_space;        // Radius of marker

        // Quadrant text
        var Q1text = quadrant.Q1label;
        var Q2text = quadrant.Q2label;
        var Q3text = quadrant.Q3label;
        var Q4text = quadrant.Q4label;

        // Label text
        var left_text = quadrant.xDimension.LeftBipolarName;
        var right_text = quadrant.xDimension.RightBipolarName;
        var top_text = quadrant.yDimension.LeftBipolarName;
        var bottom_text = quadrant.yDimension.RightBipolarName;

        var xStenScore = quadrant.xDimension.StenScore;     // Sten score of horizontal dimension
        var yStenScore = quadrant.yDimension.StenScore;     // Sten score of vertical dimension

        var xM;                 // x-coordinate of marker
        var yM;                 // y-coordinate of marker

        if (xStenScore < 6) {

            xM = grid_space * (xStenScore - 6);
        }
        else {

            xM = grid_space * (xStenScore - 5);
        }

        if (yStenScore < 6) {

            yM = grid_space * (6 - yStenScore);
        }
        else {

            yM = grid_space * (5 - yStenScore);
        }

        ctx.font = quad_label_text_font;
        var ltw = ctx.measureText(left_text).width;   // Left text width
        var rtw = ctx.measureText(right_text).width;  // Right text width
        var ttw = ctx.measureText(top_text).width;    // Top text width
        var btw = ctx.measureText(bottom_text).width; // Bottom text width
        var pad = ctx.measureText('XX').width;

        var tw;     // text width (for use with quadrant text)

        var lw;         // Width of axis labels
        var lh = 2.0 * quad_label_text_size;     // Height of axis labels

        // Move origin to the centre of the canvas
        ctx.translate(x0, y0);

        if (plot_shadow) {

            // Shadow definition
            ctx.shadowBlur = 20;
            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;

        }  

        if (plot_circle) {

            // Circle definition
            ctx.fillStyle = quad_circle_colour;
            ctx.lineWidth = 2;

            // Draw circle
            ctx.beginPath();
            ctx.arc(0, 0, r1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

        }

        // Radial gradient fill for square
        var grad = ctx.createRadialGradient(0, 0, 1, 0, 0, r1);

        grad.addColorStop(0, quad_start_colour);
        grad.addColorStop(1, quad_end_colour);

        // Draw square
        ctx.fillStyle = grad;
        ctx.fillRect(-r2, -r2, 2 * r2, 2 * r2);

        // Draw gridlines
        ctx.strokeStyle = quad_grid_colour;

        if (plot_shadow) {
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        
        // vertical
        for (var i = 0; i < 13; i++) {

            var x = -r2 + i * grid_space;
            ctx.beginPath();
            ctx.moveTo(x, -r2);
            ctx.lineTo(x, r2);
            ctx.stroke();

        }

        // horizontal
        for (var i = 0; i < 13; i++) {

            var y = -r2 + i * grid_space;
            ctx.beginPath();
            ctx.moveTo(-r2, y);
            ctx.lineTo(r2, y);
            ctx.stroke();

        }

        // Write quadrant text

        if (plot_shadow) {

            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

        }
        
        ctx.font = quad_text_font;
        ctx.fillStyle = quad_text_colour;

        // r2 is half width of square
        tw = ctx.measureText(Q1text).width;
        ctx.fillText(Q1text, r2 / 2 - tw / 2, -r2 / 2 + quad_text_size);

        tw = ctx.measureText(Q2text).width;
        ctx.fillText(Q2text, -r2 / 2 - tw / 2, -r2 / 2 + quad_text_size);

        tw = ctx.measureText(Q3text).width;
        ctx.fillText(Q3text, -r2 / 2 - tw / 2, r2 / 2 - quad_text_size / 2);

        tw = ctx.measureText(Q4text).width;
        ctx.fillText(Q4text, r2 / 2 - tw / 2, r2 / 2 - quad_text_size / 2);


        // Draw axes and label boxes
        ctx.fillStyle = quad_axis_colour;

        if (plot_shadow) {

            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;

        }
        

        // Note order important to get shadows right

        // +y-axis 
        ctx.fillRect(-aw / 2, -r1, aw, r1 - aw / 2);

        // x-axis
        ctx.fillRect(-r1, -aw / 2, 2 * r1, aw);

        // -y-axis
        ctx.fillRect(-aw / 2, aw / 2, aw, r1 - aw / 2);

        // Top label box
        lw = ttw + pad;
        ctx.fillRect(-lw / 2, -(r1 + lh / 2), lw, lh);

        // Bottom label box
        lw = btw + pad;
        ctx.fillRect(-lw / 2, r1 - lh / 2, lw, lh);

        // left label box
        lw = ltw + pad;
        ctx.fillRect(-r3 - lw / 2, -lh / 2, lw, lh);

        // right label box
        lw = rtw + pad;
        ctx.fillRect(r3 - lw / 2, -lh / 2, lw, lh);

        ctx.font = quad_label_text_font;
        ctx.fillStyle = quad_label_text_colour;

        if (plot_shadow) {

            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

        }       

        // Top label text
        ctx.fillText(top_text, -ttw / 2, -r1 + 0.4 * quad_label_text_size);

        // Bottom label text
        ctx.fillText(bottom_text, -btw / 2, r1 + 0.4 * quad_label_text_size);

        // Left label text
        ctx.fillText(left_text, -r3 - ltw / 2, 0.4 * quad_label_text_size);

        // Right label text
        ctx.fillText(right_text, r3 - rtw / 2, 0.4 * quad_label_text_size);

        // Plot marker
        ctx.fillStyle = quad_marker_colour;

        if (plot_shadow) {

            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;

        }
        
        // Turn on transparency
        ctx.globalAlpha = 0.8;

        // Draw circle
        ctx.beginPath();
        ctx.arc(xM, -yM, rM, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Write canvas to image (c is canvas object)
        var domstr = c.toDataURL("image/png");
        document.getElementById("quadrant_image").src = domstr;

    }
    catch (err) {

        alert(err.message + " in drawQuadrant()");

    }
}

/**
 * @function
 * @name drawSten
 * @param {Dimension} dimension - the Dimesion of the score to display
 * @description <p>Draws the sten score visualisation</p>
 * @see quad_circle_colour
 * @see quad_start_colour
 * @see quad_end_colour
 * @see quad_axis_colour
 * @see quad_grid_colour
 * @see quad_marker_colour
 * @see quad_text_colour
 * @see quad_text_size
 * @see quad_text_font
 * @see quad_label_text_colour
 * @see quad_label_text_size
 * @see quad_label_text_font
 * @see sten_width
 * @see sten_height
 */
function drawSten(dimension) {

    try {

        if (!(dimension instanceof Dimension)) {

            throw "Object is not a Dimension";
        }

        // Draw STEN score
        var aw = 10;                // axis width

        var id_str = dimension.UnipolarName;    // used to identify HTML element
        id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
        var image_id = "image" + id_str;        // used to identify image to be drawn over canvas

        var c = document.getElementById(id_str);
        var ctx = c.getContext("2d");
        var w = c.width;            // width of canvas
        var h = c.height;           // height of canvas

        var max_span = 0.62 * w;    // Span of circle image 

        var r1 = max_span / 2;      // Radius of circle
        var r2 = 0.8 * r1;          // Half width of rectangle
        var r3 = 1.2 * r1;          // Radius of x-label centres

        var x0 = w / 2.0;           // x origin
        var y0 = h / 2.0;           // y origin

        var grid_space = 2 * r2 / 12;   // Grid spacing
        var rM = 0.5 * grid_space;        // Radius of marker

        var r4 = 1.5 * grid_space;    // Radius and half height of background stadium

        // Label text
        var left_text = dimension.LeftBipolarName;
        var right_text = dimension.RightBipolarName;

        var stenScore = dimension.StenScore;

        var xM;                 // x-coordinate of marker
        var yM;             // y-coordinate of marker

        if (stenScore < 6) {

            xM = grid_space * (stenScore - 6);
        }
        else {

            xM = grid_space * (stenScore - 5);
        }

        yM = 0;

        ctx.font = quad_label_text_font;
        var ltw = ctx.measureText(left_text).width;
        var rtw = ctx.measureText(right_text).width;
        var pad = ctx.measureText('XX').width;

        var lw;         // Width of axis labels
        var lh = 2.0 * quad_label_text_size;     // Height of axis labels

        var sw = 0.5 * lh;     // Width of square y-axis stops

        // Move origin to the centre of the canvas
        ctx.translate(x0, y0);

        if (plot_shadow) {

            // Shadow definition
            ctx.shadowBlur = 20;
            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;

        }       

        if (plot_circle) {

            // Circle definition
            ctx.fillStyle = quad_circle_colour;

            // Draw circles
            // Syntax: arc(x, y, r, sAngle, eAngle, counterclockwise)

            ctx.beginPath();
            ctx.arc(r4 - r1, 0, r4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(r1 - r4, 0, r4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

        }

        // Radial gradient fill for square
        var grad = ctx.createRadialGradient(0, 0, 1, 0, 0, r1);

        grad.addColorStop(0, quad_start_colour);
        grad.addColorStop(1, quad_end_colour);

        // Draw rectamgle
        ctx.fillStyle = grad;
        ctx.fillRect(-r2, -grid_space, 2 * r2, 2 * grid_space);

        // Draw gridlines
        ctx.lineWidth = 2;
        ctx.strokeStyle = quad_grid_colour;

        if (plot_shadow) {

            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

        }
        
        // vertical
        for (var i = 0; i < 13; i++) {

            var x = -r2 + i * grid_space;
            ctx.beginPath();
            ctx.moveTo(x, -grid_space);
            ctx.lineTo(x, grid_space);
            ctx.stroke();

        }

        // horizontal
        for (var i = 0; i < 3; i++) {

            var y = -grid_space + i * grid_space;
            ctx.beginPath();
            ctx.moveTo(-r2, y);
            ctx.lineTo(r2, y);
            ctx.stroke();

        }

        // Draw axes and label boxes
        ctx.fillStyle = quad_axis_colour;

        if (plot_shadow) {
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
        }
        

        // Note order important to get shadows right
        // Syntax: fillRect(x, y, width, height)

        // +y-axis 
        ctx.fillRect(-aw / 2, -2 * grid_space, aw, 2 * grid_space - aw / 2);

        // x-axis
        ctx.fillRect(-r1, -aw / 2, 2 * r1, aw);

        // -y-axis
        ctx.fillRect(-aw / 2, aw / 2, aw, 2 * grid_space - aw / 2);

        // y-axis square stops - top
        ctx.fillRect(-sw / 2, -2 * grid_space - sw / 2, sw, sw);

        // y-axis square stops - bottom
        ctx.fillRect(-sw / 2, 2 * grid_space - sw / 2, sw, sw);

        // left label box
        lw = ltw + pad;
        ctx.fillRect(-r3 - lw / 2, -lh / 2, lw, lh);

        // right label box
        lw = rtw + pad;
        ctx.fillRect(r3 - lw / 2, -lh / 2, lw, lh);

        ctx.font = quad_label_text_font;
        ctx.fillStyle = quad_label_text_colour;

        if (plot_shadow) {

            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

        }       

        // Left label text
        ctx.fillText(left_text, -r3 - ltw / 2, 0.4 * quad_label_text_size);

        // Right label text
        ctx.fillText(right_text, r3 - rtw / 2, 0.4 * quad_label_text_size);

        // Plot marker
        ctx.fillStyle = quad_marker_colour;

        if (plot_shadow) {
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
        }
        
        // Turn on transparency
        ctx.globalAlpha = 0.8;

        // Draw circle
        ctx.beginPath();
        ctx.arc(xM, -yM, rM, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Write canvas to image (c is canvas object)
        var domstr = c.toDataURL("image/png");
        document.getElementById(image_id).src = domstr;

    }
    catch (err) {

        alert(err.message + " in drawQuadrant()");

    }
}


function drawCareerThemes() {

    try {

        // Get canvas
        var c = document.getElementById("careers");
        var ctx = c.getContext("2d");
        var w = c.width;            // width of canvas
        //var h = c.height;           // height of canvas

        var pad = 10;               // padding around drawing area
        var text_pad = 20;          // padding before text

        var ahl = 50;               // arrow head length
        var ahw = 100;              // arrow head width

        var arl = w - 2 * pad - ahl;   // arrow rod length
        var arw = 50;                   // arrow rod width

        var dec = 50;               // decrement

        var yoff = ahw / 2 + 2 * pad;             // y-offset

        /*
        var careers_arrow_col = '#253959';
        var careers_text_col = '#ffffff';

        careers_text_size = 28;
        careers_text_font = "Arial";
        careers_text_font = careers_text_size + "px " + careers_text_font;
        */

        ctx.font = careers_text_font;

        for (var i = 0; i < 4; i++) {

            var text = myReport.CareerThemes[i].Name;

            var y0 = yoff + i * (ahw + pad);
            var x0 = arl - i * dec;
            var xoff = pad;

            ctx.fillStyle = careers_arrow_col;

            ctx.beginPath();
            ctx.moveTo(xoff, y0 - arw / 2);
            ctx.lineTo(xoff + x0, y0 - arw / 2);
            ctx.lineTo(xoff + x0, y0 - arw / 2 - (ahw - arw) / 2);
            ctx.lineTo(xoff + x0 + ahl, y0);
            ctx.lineTo(xoff + x0, y0 + arw / 2 + (ahw - arw) / 2);
            ctx.lineTo(xoff + x0, y0 + arw / 2);
            ctx.lineTo(xoff, y0 + arw / 2);
            ctx.lineTo(xoff, y0 - arw / 2);
            ctx.fill();

            ctx.fillStyle = careers_text_col;
            ctx.fillText(text, xoff + text_pad, y0 + 0.4 * careers_text_size);

        }

        // Write canvas to image (c is canvas object)
        var domstr = c.toDataURL("image/png");
        document.getElementById("careers_image").src = domstr;
    }
    catch (err) {

        alert(err.message + " in drawCareerThemes(career_themes)");
    }
}

/*
 ***********       END OF GRAPHICS FUNCTIONS      ************
*/