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

        this._Id = _Id;
        this._Text = _Text;
        this._ShortText = "";
        this._Score = 0;
        this._Sort = Math.random();

    }

    /**
     * Get the survey question identifier
     * @returns {string} The survey question identifier
     */
    get Id() {

        return this._Id;
    }

    /**
     * Get the survey question text
     * @returns {string} The survey question text
     */
    get Text() {

        return this._Text;
    }

    /**
     * Get the short text question identifier
     * @returns {string} The survey question text
     */
    get ShortText() {

        return this._ShortText;
    }

    /**
     * Get the survey question answer
     * @returns {number} An integer between 1 and 5
     */
    get Score() {

        return this._Score;
    }

    /**
     * Set the short text question identifier
     * @param {short_text} The short text question identifier
     */
    set ShortText(short_text) {

        this._ShortText = short_text;
    }

    /**
     * Set the survey question answer
     * @param {number}  An integer between 1 and 5
     * @throws Score must be an integer 1 - 5 or 0 (not in range) 
     * @throws Score must be an integer 1 - 5 or 0 (not an integer)
     */
    set Score(score) {

        if (Number.isInteger(score)) {

            if (score >= 0 && score <= 5) {

                this._Score = score;
            }
            else {

                throw "Score must be an integer 1 - 5 or 0 (not in range)";
            }

        }
        else {

            throw "Score must be an integer 1 - 5 or 0 (not an integer)";
        }

    }
}

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

/*
 * -----------------------------------------------------------
 *          USER SIGN-UP / LOGIN FUNCTIONS
 * -----------------------------------------------------------
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
                            document.getElementById("GPI_content").innerHTML = "REPORT";
                        }
                        else {

                            // Get survey questions
                            if (!loadQuestions(user_profile_json.Questions)) throw "Could not load survey questions";

                            // If all OK
                            userProfile = new UserProfile(
                                user_profile_json.Email,
                                user_profile_json.Password
                            );

                            alert(userProfile.Email + ", " + userProfile.Password);

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

function updateAnswers(user_profile) {

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

                        // TEST
                        alert(jsontext);

                        // Get next set of questions
                        getQuestions();

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
        //document.body.style.cursor = 'wait';
        //xhttp.open("POST", url, true);
        //xhttp.setRequestHeader('Content-Type', 'application/json');
        //xhttp.send(JSON.stringify(user_profile));
        alert(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in signup(user_profile)");
    }
}

/*
 * -----------------------------------------------------------
 *          USER SURVEY FUNCTIONS
 * -----------------------------------------------------------
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
        serverQuestionList = qlist.sort(function (a, b) { return a._Sort - b._Sort });

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

            // Call API here to check that survey is complete and saved
            writeEndOfSurvey();
        }


    }
    catch (err) {

        alert(err.message + " in getQuestions()");
    }
}

/**
 * Writes the end of survey message to the page
 */
function writeEndOfSurvey() {

    try {

        // Create instructions string
        textstr = "";
        textstr += "<h1>Congratulations!</h1>";
        textstr += "<h2>You have reached the end of the survey!</h2>";

        textstr += "<div class=\"gpi_surv_button_box\"><input type=\"button\" class=\"gpi_button\" value=\"View Report\"></div>";

        // Write string to document
        document.getElementById("GPI_content").innerHTML = textstr;

        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }
    catch (err) {

        alert(err.message + " in writeEndOfSurvey()");
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

        if (continue_survey) {

            userProfile.Questions = localQuestionList;

            updateAnswers(userProfile);

        }
        else {

            writeInstructions();

        }
        
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
