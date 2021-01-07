/**
 * @fileoverview 
 * <h3>Javascript components for GPI user / profiles</h3>
 * <p>Provides the functionality for rendering the components of the 
 * GPI survey on a web page</p>
 * <b>Key functionality:</b>
 * <ul>
 *    <li>Signs up a new user</li>
 * </ul>
 * @author M.P. Vaughan
 * @version 1.01
 * @copyright Glowinkowski International Limited (2020)
*/

/*
 * ===========================================================
 *                  CLASS DEFINITIONS
 * ===========================================================                 
 */


class UserProfile {

    constructor(_Email, _Password, _FirstName="", _LastName="", _AccessCode="", _GenderId = 1, _AgeRangeId = 1, _EthnicityId = 1) {

        this.Email = _Email;
        this.Password = _Password;
        this.FirstName = _FirstName;
        this.LastName = _LastName;
        this.AccessCode = _AccessCode;
        this.GenderId = _GenderId;
        this.AgeRangeId = _AgeRangeId;
        this.EthnicityId = _EthnicityId;
        this.Questions = null;
    }

    isValid() {

        return true;
    }
}

/**
 * Class representing a GPI survey question
 * @class
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
        //this.Sort = Math.random();

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
     */
    constructor(FirstName, LastName, QuadrantModels=[], LeadershipModel=null) {

        this.FirstName = FirstName;
        this.LastName = LastName;
        this.QuadrantModels = QuadrantModels;
        this.LeadershipModel = LeadershipModel;

    }
}

/*
 * ===========================================================
 *                  GLOBAL VARIABLES
 * ===========================================================
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
var localQuestionList;

/**
 * Number of questions per page
 * @type {number}
 */
var numQuestions = 10;

// Formatting and report

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
 * Array of Dimensions (with scores)
 * @type {Dimension[]}
 * @deprecated
 */
var dimensionList;

/**
 * Report object
 * @type {Report}
 */
var myReport;

/*
 * ===========================================================
 *          USER SIGN-UP / LOGIN FUNCTIONS
 * ===========================================================
 */

/**
 * Processes sign-up form and calls signup API
 */
function submitSignUpForm() {

    try {

        var user_profile = new UserProfile(
            document.getElementById("email").value,
            document.getElementById("pwd").value,
            document.getElementById("first_name").value,
            document.getElementById("last_name").value,
            document.getElementById("access_code").value,
            document.getElementById("gender").value,
            document.getElementById("age_range").value,
            document.getElementById("ethnicity").value
        )

        signup(user_profile);

    }
    catch (err) {

        alert(err.message + " in submitSignUpForm()");
    }
}

function submitLoginForm() {

    try {

        var user_profile = new UserProfile(
            document.getElementById("email").value,
            document.getElementById("pwd").value
        )

        login(user_profile);

    }
    catch (err) {

        alert(err.message + " in submitLoginForm()");
    }
}


function signup(user_profile) {

    try {

        // TODO: Change the url in the live version
        var url = "https://localhost:44369/api/user/signup/";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {  

                        // TODO load survey

                        // The text from the API call
                        var responseText = this.responseText;
                        var textstr = responseText;

                        // Write string to document
                        document.getElementById("GPI_content").innerHTML = textstr;

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

    }
    catch (err) {

        alert(err.message + " in signup(user_profile)");
    }
}

function login(user_profile) {

    try {

        // TODO: Change the url in the live version
        var url = "https://localhost:44369/api/user/login/";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    document.body.style.cursor = 'default';

                    if (this.status == 200) {

                        // The text from the API call
                        var jsontext = this.responseText;

                        var user_profile_json = JSON.parse(jsontext);

                        // Check for correct properties
                        if (!('SurveyCompleted' in user_profile_json)) throw "Property 'SurveyCompleted' not found in returned object";
                        if (!('Questions' in user_profile_json)) throw "Property 'Questions' not found in returned object";

                        if (user_profile_json.SurveyCompleted) {

                            // Get report
                            // TEMP
                            var json_str = JSON.stringify(user_profile_json, null, 4);
                            document.getElementById("GPI_content").innerHTML = json_str;

                            // JSON object should have a field 'Report' containing the report data
                            getReport(user_profile_json.Report);

                        }
                        else {

                            // Get survey questions
                            if (!loadQuestions(user_profile_json.Questions)) throw "Could not load survey questions";

                            // If all OK
                            userProfile = new UserProfile(
                                user_profile_json.Email,
                                user_profile_json.Password
                            );

                            writeInstructions();
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

    }
    catch (err) {

        alert(err.message + " in login(user_profile)");
    }
}

function updateAnswers(user_profile, continue_survey=true) {

    try {

        //api/User/UpdateAnswers

        // TODO: Change the url in the live version
        var url = "https://localhost:44369/api/user/updateanswers/";

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

                            alert("Could not save questions - possible server error");
                        }

                        // Get next set of questions
                        if (continue_survey) {

                            getQuestions();

                        }
                        else {

                            writeInstructions();
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

/*
 * ===========================================================
 *                USER SURVEY FUNCTIONS
 * ===========================================================
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

        // Randomize the question order and assign to global variable serverQuestionList
        //serverQuestionList = qlist.sort(function (a, b) { return a._Sort - b._Sort });

        serverQuestionList = qlist;

        return true;
    }
    catch (err) {

        alert(err.message + " in loadQuestions(qarray)")
    }
}


/**
 * Writes the survey instructions to the page
 */
function writeInstructions() {

    try {

        // Create instructions string
        textstr = "";
        textstr += "<h1>The GPI Survey</h1>";
        textstr += "<p>This questionnaire will provide you with information that enables you to develop a detailed understanding of yourself in terms of your preferred behaviour, or the ";
        textstr += "'real you'.These preferences or natural predispositions should not be confused with your actual behaviour, which may vary according to the situation and the ";
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

        textstr += "<div class=\"gpi_surv_button_box\"><input type=\"button\" class=\"gpi_button\" value=\"Take Survey\" onclick=\"getQuestions()\"></div>";

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
 * Gets a list of questions for a survey page and then 
 * calls either writeQuestions() or writeEndOfSurvey()
 * @see writeQuestions
 * @see writeEndOfSurvey
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
 * Writes a list of survey questions to the page
 */
function writeQuestions() {

    try {

        textstr = "";

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
            textstr += "<div class=\"gpi_surv_td\"><input type='radio' id='strong_disagree' name='" + name + "' value='1'><span class=\"gpi_surv_label\">Strongly disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input type='radio' id='disagree' name='" + name + "' value='2'><span class=\"gpi_surv_label\">Disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input type='radio' id='neither' name='" + name + "' value='3'><span class=\"gpi_surv_label\">Neither agree nor disagree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input type='radio' id='agree' name='" + name + "' value='4'><span class=\"gpi_surv_label\">Agree</span></div>";
            textstr += "<div class=\"gpi_surv_td\"><input type='radio' id='strong_agree' name='" + name + "' value='5'><span class=\"gpi_surv_label\">Strongly agree</span></div>";
            textstr += "</div>";
        }

        textstr += "</div>"; // End of table

        textstr += "<div class=\"gpi_surv_button_box\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Save and Exit\"  onclick=\"saveExit()\">";
        textstr += "<input type=\"button\" class=\"gpi_button\" value=\"Save and Continue\"  onclick=\"saveContinue()\">";
        textstr += "</div>";

        textstr += "</form>";

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
 * Creates an HTML string for a progress bar
 * @returns {string} - HTML string for a progress bar
 */
function getProgressBar() {

    try {

        textstr = "";

        var N = serverQuestionList.length;
        var n = 0;

        for (var i = 0; i < N; i++) {

            if (serverQuestionList[i].Score > 0) {
                n++;
            }
        }

        var completed = Math.floor(100 * n / N);

        textstr += "<progress id=\"progress\" value=\"" + n + "\" max=\"" + N + "\"></progress>";
        textstr += "<label for=\"progress\"> " + completed + "%</label >";

        return textstr;

    }
    catch (err) {

        alert(err.message + " in getProgressBar()");
    }
}

/**
 * Saves current questions and exits survey
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
 * Saves current questions and continues survey
 * @see saveQuestions
 * @see getQuestions
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
 * Saves current questions
 */
function saveQuestions(continue_survey=true) {

    try {

        // Note that because assigment of objects is by reference,
        // updating localQuestionList also updates serverQuestionList
        // since these contain the same objects

        var myform = document.getElementById("GPI_form");

        // Loop through question list to look up answers
        for (var i = 0; i < localQuestionList.length; i++) {

            var id = localQuestionList[i].ShortText;
            var score = getScore(myform, id);

            if (score > 0) {

                localQuestionList[i].Score = score;

            }
        }

        // Attach question list
        userProfile.Questions = localQuestionList;

        // Call API to update questions
        updateAnswers(userProfile, continue_survey);
        
    }
    catch (err) {

        alert(err.message + " in saveQuestions()");
    }
}

/**
 * Gets the Likert score from a survey question
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
 * Gets an array of randomized questions
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
 * ===========================================================
 *                REPORT EXTRACTION FUNCTIONS
 * ===========================================================
 */

/**
 */
function getReport(reportObj) {

    try {

        /* 
        * Assumed structure of JSON object
        * FirstName: string
        * LastName: string
        * QuadrantModels: Array of QuadrantModel
        * LeadershipModel: Blue4Model
        */

        myReport = new Report(reportObj.FirstName, reportObj.LastName);

        var qmarray = reportObj.QuadrantModels;
        var len = qmarray.length;

        if (len < 1) throw "Error: Expected an array of QuadrantModels in JSON object";

        myReport.QuadrantModels = [];

        for (var i = 0; i < len; i++) {

            myReport.QuadrantModels[i] = extractQuadrantModel(qmarray[i]);
        }

        // myReport.LeadershipModel = extractBlue4Model(reportObj.LeadershipModel);

        quadModel_probSolveImpStyle = myReport.QuadrantModels.find(x => x.Name === "Problem Solving & Implementation Style");
        quadModel_commInterperStyle = myReport.QuadrantModels.find(x => x.Name === "Communication & Interpersonal Style");
        quadModel_feelSelfControl = myReport.QuadrantModels.find(x => x.Name === "Feelings & Self-Control");

        //alert(quadModel_feelSelfControl.Name);

        // Set formating for quadrant element
        assignQuadFormating();

        writeElement("problem_quad");

    }
    catch (err) {

        alert(err.message + " in getReport()");
    }
}

/**
 * Utility function for extracting and creating a QuadrantModel 
 * object from JSON data
 * @param {JSON} qmjson
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
 * Utility function for extracting and creating a Dimension
 * object from JSON data. This is used specifically for parent 
 * Dimension objects.
 * @param {JSON} dimjson
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
 * Utility function for extracting and creating a Dimension
 * object from JSON data. This is used specifically for child
 * Dimension objects.
 * @param {JSON} subdimjson
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
 * Utility function for extracting and creating a Blue4
 * (Leadership style) object from JSON data.
 * @param {JSON} b4json
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
 * ===========================================================
 *                USER REPORT FUNCTIONS
 * ===========================================================
 */

/**
 * @function
 * @name writeElement
 * @param {string} mystr String specifying the QuadrantModel to display
 * @description <p>Writes the QuadrantModel element to the web page</p>
 * <p>The possible values of 'mystr' are currently:</p>
 * <ul>
 * <li>'problem_quad'</li>
 * <li>'communication_quad'</li>
 * <li>'feelings_quad'</li>
 * </ul>
 * <p>Global variables accessed:</p>
 * @see quadModel_probSolveImpStyle
 * @see quadModel_commInterperStyle
 * @see quadModel_feelSelfControl
 * @see myReport
 * @see quad_width
 * @see quad_height
 * @see sten_width
 * @see sten_height
 */
function writeElement(mystr) {

    try {

        var quadmodel;
        var prev;
        var next;

        switch (mystr) {

            case "problem_quad":

                quadmodel = quadModel_probSolveImpStyle;

                prev = "feelings_quad";
                next = "communication_quad";

                break;

            case "communication_quad":

                quadmodel = quadModel_commInterperStyle;

                prev = "problem_quad";
                next = "feelings_quad";

                break;

            case "feelings_quad":

                quadmodel = quadModel_feelSelfControl;

                prev = "communication_quad";
                next = "problem_quad";

                break;

            case "leadership":

                writeLeadership();
                return;

            default:

                throw "Unknown element";

        }

        // Write contents
        textstr = "";
        textstr += "<h1>" + myReport.FirstName + " " + myReport.LastName + " Talent Report</h1>";

        // Navigation
        textstr += "<div class=\"page_nav\">"
            + "<div class=\"link_box\">"
            + "<a onclick=\"writeElement('" + prev + "')\"><img src=\"images/prev.png\" class=\"nav_arrow\"/></a>"
            + "</div>"
            + "<div class=\"link_box\">"
            + "<a onclick=\"writeElement('" + next + "')\"><img src=\"images/next.png\" class=\"nav_arrow\"/></a>"
            + "</div>"
            + "</div>";


        textstr += "<h2>" + quadmodel.Name + "</h2>";
        textstr += "<div align='center'>";
        textstr += "<canvas id='quadrant' width='" + quad_width + "' height='" + quad_height + "' style='display: none'></canvas>";
        textstr += "<img id='quadrant_image' src='' width='" + quad_width + "' height='" + quad_height + "' style='max-width: 100%; height: auto;'/>";
        textstr += "</div>";

        textstr += quadmodel.QText;

        textstr += "<h2>" + quadmodel.xDimension.LeftBipolarName + " and " + quadmodel.xDimension.RightBipolarName + " subdimensions</h2>";

        for (var i = 0; i < quadmodel.xDimension.SubDimensions.length; i++) {

            id_str = quadmodel.xDimension.SubDimensions[i].UnipolarName;    // used to identify HTML element
            id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
            image_id = "image" + id_str;

            textstr += "<h3>" + quadmodel.xDimension.SubDimensions[i].LeftBipolarName + "/";
            textstr += quadmodel.xDimension.SubDimensions[i].RightBipolarName + "</h3>";

            textstr += "<div align='center'>";
            textstr += "<canvas id='" + id_str + "' width='" + sten_width + "' height='" + sten_height + "' style='display: none'></canvas>";
            textstr += "<img id='" + image_id + "' src='' width='" + sten_width + "' height='" + sten_height + "' style='max-width: 100%; height: auto;'/>";
            textstr += "</div>";

            textstr += quadmodel.xDimension.SubDimensions[i].ScoreText;
        }

        textstr += "<h2>" + quadmodel.yDimension.LeftBipolarName + " and " + quadmodel.yDimension.RightBipolarName + " subdimensions</h2>";

        for (var i = 0; i < quadmodel.yDimension.SubDimensions.length; i++) {

            id_str = quadmodel.yDimension.SubDimensions[i].UnipolarName;    // used to identify HTML element
            id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
            image_id = "image" + id_str;

            textstr += "<h3>" + quadmodel.yDimension.SubDimensions[i].LeftBipolarName + "/";
            textstr += quadmodel.yDimension.SubDimensions[i].RightBipolarName + "</h3>";

            textstr += "<div align='center'>";
            textstr += "<canvas id='" + id_str + "' width='" + sten_width + "' height='" + sten_height + "' style='display: none'></canvas>";
            textstr += "<img id='" + image_id + "' src='' width='" + sten_width + "' height='" + sten_height + "' style='max-width: 100%; height: auto;'/>";
            textstr += "</div>";

            textstr += quadmodel.yDimension.SubDimensions[i].ScoreText;
        }

        // Navigation
        textstr += "<div class=\"page_nav\">"
            + "<div class=\"link_box\">"
            + "<a onclick=\"writeElement('" + prev + "')\"><img src=\"images/prev.png\" class=\"nav_arrow\"/></a>"
            + "</div>"
            + "<div class=\"link_box\">"
            + "<a onclick=\"writeElement('" + next + "')\"><img src=\"images/next.png\" class=\"nav_arrow\"/></a>"
            + "</div>"
            + "</div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        drawQuadrant(quadmodel);

        for (var i = 0; i < quadmodel.xDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.xDimension.SubDimensions[i]);

        }

        for (var i = 0; i < quadmodel.yDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.yDimension.SubDimensions[i]);

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
 * @name writeLeadership
 * @description <p>Writes the leadership model element</p>
 * @see myReport
 * @todo Still needs to be implemented
 */
function writeLeadership() {

    try {

        // Write contents
        textstr = "";
        textstr += "<h2>Leadership Style</h2>";
        textstr += myReport.LeadershipModel.ScoreText;
        textstr += "<p>Specimen has bad-day behaviour '" + myReport.LeadershipModel.RiskArea + "' with a " + myReport.LeadershipModel.RiskLevel + " risk level</p>";

        // Write string to document
        document.getElementById("main").innerHTML = textstr;

    }
    catch (err) {

        alert(err.message + " in writeLeadership()")
    }
}

/**
 * @function
 * @name assignQuadFormating
 * @description
 * <p>Assigns quadrant colours and fonts from CSS.
 * If CSS definitions are not found, default values are used.</p>
 * <p>Global variables accessed:</p>
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
 */
function assignQuadFormating() {

    try {

        // Get the root element
        var r = document.querySelector(':root');

        // Get the styles (properties and values) for the root
        var rs = getComputedStyle(r);

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

        quad_text_colour = rs.getPropertyValue('--gpi_quad_text_colour');

        if (quad_marker_colour.length == 0) {

            quad_text_colour = "#ffffff";
        }

        quad_text_size = 26;
        quad_text_font = quad_text_size + "px Arial";

        quad_label_text_colour = "#ffffff";
        quad_label_text_size = 24;
        quad_label_text_font = quad_label_text_size + "px Arial";

        // Canvas dimensions for quadrants
        quad_width = 900; //1000;
        quad_height = 700;

        // Canvas dimensions for sten scores
        sten_width = 900; //1000;
        sten_height = 220;

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
 * <p>Draws the Quadrant model visualisation</p>
 * <p>Global variables accessed:</p>
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
        var ltw = ctx.measureText(left_text).width;
        var rtw = ctx.measureText(right_text).width;
        var ttw = ctx.measureText(top_text).width;
        var btw = ctx.measureText(bottom_text).width;
        var pad = ctx.measureText('XXX').width;

        var tw;     // text width (for use with quadrant text)

        var lw;         // Width of axis labels
        var lh = 2.0 * quad_label_text_size;     // Height of axis labels

        // Move origin to the centre of the canvas
        ctx.translate(x0, y0);

        // Shadow definition
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

        // Circle definition
        ctx.fillStyle = quad_circle_colour;
        ctx.lineWidth = 2;

        // Draw circle
        ctx.beginPath();
        ctx.arc(0, 0, r1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Radial gradient fill for square
        var grad = ctx.createRadialGradient(0, 0, 1, 0, 0, r1);

        grad.addColorStop(0, quad_start_colour);
        grad.addColorStop(1, quad_end_colour);

        // Draw square
        ctx.fillStyle = grad;
        ctx.fillRect(-r2, -r2, 2 * r2, 2 * r2);

        // Draw gridlines
        ctx.strokeStyle = quad_grid_colour;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

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
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        ctx.font = quad_text_font;
        ctx.fillStyle = quad_text_colour;

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
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

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
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

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
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

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
 * <p>Global variables accessed:</p>
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

        // Draw quadrant
        var aw = 10;                // axis width

        var id_str = dimension.UnipolarName;    // used to identify HTML element
        id_str = id_str.replace(/ /g, "_");     // replace spaces with underscore
        var image_id = "image" + id_str;

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
        var pad = ctx.measureText('XXX').width;

        var lw;         // Width of axis labels
        var lh = 2.0 * quad_label_text_size;     // Height of axis labels

        var sw = 0.5 * lh;     // Width of square y-axis stops

        // Move origin to the centre of the canvas
        ctx.translate(x0, y0);

        // Shadow definition
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

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
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

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
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

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
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Left label text
        ctx.fillText(left_text, -r3 - ltw / 2, 0.4 * quad_label_text_size);

        // Right label text
        ctx.fillText(right_text, r3 - rtw / 2, 0.4 * quad_label_text_size);

        // Plot marker
        ctx.fillStyle = quad_marker_colour;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

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