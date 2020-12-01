/* 
    Components for the GPI Survey

    Author:    M.P. Vaughan
    Created:   30/11/2020
    Modified:  30/11/2020

    Key functionality:

    (1) Gets lists of questions and creates survey pages

    (2) Submits answered questions

*/


class Question {

    constructor(_Id, _Text) {

        this._Id = _Id;
        this._Text = _Text;
        this._Answer = 0;
        this._Sort = Math.random();

    }

    // Getters
    get Id() {

        return this._Id;
    }

    get Text() {

        return this._Text;
    }

    get Answer() {

        return this._Answer;
    }

    // Setters
    set Answer(score) {

        if (Number.isInteger(score)) {

            if (score >= 1 && score <= 5) {

                this._Answer = score;
            }
            else {

                throw "Answer must be an integer 1 - 5 (not in range)";
            }

        }
        else {

            throw "Answer must be an integer 1 - 5 (not an integer)";
        }

    }
}

// Used for simulation purposes
var orderedList = [

    new Question("Q1", "Tends to be 'laid back'"),
    new Question("Q2", "Rarely feels tense"),
    new Question("Q3", "Rarely feels anxiety when things go wrong"),
    new Question("Q4", "Does not worry unduly"),
    new Question("Q5", "Often feels tense"),
    new Question("Q6", "Is obsessive about meeting deadlines"),
    new Question("Q7", "Worries about all of the things that may go wrong"),
    new Question("Q8", "Always feels a sense of urgency"),
    new Question("Q9", "Is easy going"),
    new Question("Q10", "Is tolerant of others"),
    new Question("Q11", "Does not get angry in situations of conflict"),
    new Question("Q12", "Is not provoked by unwarranted criticism"),
    new Question("Q13", "Is easily irritated by interference from others"),
    new Question("Q14", "Often feels angry"),
    new Question("Q15", "Is seen by colleagues as temperamental"),
    new Question("Q16", "Often feels discontented"),
    new Question("Q17", "Always looks on the bright side"),
    new Question("Q18", "Is an optimist"),
    new Question("Q19", "Thinks the future is full of hope"),
    new Question("Q20", "Sees the positive side of most situations"),
    new Question("Q21", "Tends to see negatives of a situation"),
    new Question("Q22", "Tends to be pessimistic"),
    new Question("Q23", "Sometimes feels negative about the future"),
    new Question("Q24", "Views the future as lacking in opportunity"),
    new Question("Q25", "Is not troubled by self-doubt"),
    new Question("Q26", "Is not bothered by criticism"),
    new Question("Q27", "Feels comfortable with who I am"),
    new Question("Q28", "Feels comfortable with life"),
    new Question("Q29", "Feels hurt when criticised"),
    new Question("Q30", "Tends to underestimate my capability"),
    new Question("Q31", "Tends to be self-critical"),
    new Question("Q32", "Feels self-doubt"),
    new Question("Q33", "Deliberates before giving an opinion"),
    new Question("Q34", "Listens carefully before reacting"),
    new Question("Q35", "Tends to look carefully at things before reacting"),
    new Question("Q36", "Considers all aspects before reacting to something"),
    new Question("Q37", "Is impulsive"),
    new Question("Q38", "Is quick to draw a conclusion"),
    new Question("Q39", "Is quick to deliver an opinion"),
    new Question("Q40", "Reacts immediately to situations"),
    new Question("Q41", "Enjoys the company of others"),
    new Question("Q42", "Finds it easy dealing with others"),
    new Question("Q43", "Prefers to talk problems through"),
    new Question("Q44", "Enjoys large social gatherings"),
    new Question("Q45", "Enjoys my own company"),
    new Question("Q46", "Prefers to work through a problem on my own"),
    new Question("Q47", "Prefers solitary pursuits"),
    new Question("Q48", "Finds it easy to be on my own"),
    new Question("Q49", "Prefers to state my views forcefully"),
    new Question("Q50", "Is dominant"),
    new Question("Q51", "Usually makes the decisions"),
    new Question("Q52", "Likes to take charge"),
    new Question("Q53", "Does not mind if others take charge"),
    new Question("Q54", "Prefers not to be assertive"),
    new Question("Q55", "Prefers others to lead the way"),
    new Question("Q56", "Lets others decide what to do"),
    new Question("Q57", "Prefers to have a good time"),
    new Question("Q58", "Considers having a good time as a high priority"),
    new Question("Q59", "Pursues pleasure as a priority"),
    new Question("Q60", "Finds it easy to spoil myself"),
    new Question("Q61", "Takes work seriously"),
    new Question("Q62", "Pursues work as a priority"),
    new Question("Q63", "Enjoys T.V. programmes that cover serious issues"),
    new Question("Q64", "Considers having a good time a low priority"),
    new Question("Q65", "Feels at ease with strangers"),
    new Question("Q66", "Feels comfortable in social situations"),
    new Question("Q67", "Feels socially confident"),
    new Question("Q68", "Feels comfortable when meeting new people"),
    new Question("Q69", "Feels ill-at-ease with people of high status"),
    new Question("Q70", "Prefers to mix with people I know"),
    new Question("Q71", "Feels ill-at-ease in social situations"),
    new Question("Q72", "Feels uncomfortable expressing my views to strangers"),
    new Question("Q73", "Prefers change to be in small controlled steps"),
    new Question("Q74", "Tends to be uncomfortable with radical change"),
    new Question("Q75", "Is more comfortable with things as they are"),
    new Question("Q76", "Prefers well-regulated situations"),
    new Question("Q77", "Prefers the more radical solutions to problems"),
    new Question("Q78", "Prefers to find different ways of doing things"),
    new Question("Q79", "Finds it easy to think of many different solutions to problems"),
    new Question("Q80", "Is comfortable with radical change"),
    new Question("Q81", "Prefers a structured approach to things"),
    new Question("Q82", "Prefers to concentrate on practical activities"),
    new Question("Q83", "Prefers to deal with the detail of tasks"),
    new Question("Q84", "Prefers to work on well-specified tasks"),
    new Question("Q85", "Prefers to take a broad view"),
    new Question("Q86", "Enjoys seeing the 'bigger picture'"),
    new Question("Q87", "Is comfortable considering future possibilities"),
    new Question("Q88", "Enjoys thinking about how different ideas interrelate"),
    new Question("Q89", "Prefers to deal with hard facts"),
    new Question("Q90", "Prefers decisions based on logic"),
    new Question("Q91", "Prefers to have clear evidence before deciding a way forward"),
    new Question("Q92", "Prefers to evaluate all available data before making a decision"),
    new Question("Q93", "Prefers to follow my own insight when solving problems"),
    new Question("Q94", "Puts imagination before information when problem solving"),
    new Question("Q95", "Prefers to use intuition to solve problems"),
    new Question("Q96", "Likes to use my imagination"),
    new Question("Q97", "Is not concerned about personal popularity"),
    new Question("Q98", "Prefers to deal with the task to be done rather than the people"),
    new Question("Q99", "Is not overly concerned about friendship"),
    new Question("Q100", "Finds it easy to state my opinion irrespective of the threat to personal relationships"),
    new Question("Q101", "Goes out of their way to be helpful to others"),
    new Question("Q102", "Is concerned about the needs of other people"),
    new Question("Q103", "Tends to consider people before tasks"),
    new Question("Q104", "Prefers to avoid saying hurtful things"),
    new Question("Q105", "Prefers to avoid confrontation"),
    new Question("Q106", "Tends to be mistrustful of others"),
    new Question("Q107", "Rarely takes people at face value"),
    new Question("Q108", "Tends not to believe what others say"),
    new Question("Q109", "Tends to be suspicious of the motives of others"),
    new Question("Q110", "Finds it easy to trust people"),
    new Question("Q111", "Takes people at face value"),
    new Question("Q112", "Tends not to suspect the motives of others"),
    new Question("Q113", "Tends to believe what others say"),
    new Question("Q114", "Tends to disagree with what others say"),
    new Question("Q115", "Finds it easy to take an opposing view"),
    new Question("Q116", "Asks tough probing questions"),
    new Question("Q117", "Finds it easy to oppose"),
    new Question("Q118", "Prefers to co-operate with others"),
    new Question("Q119", "Hesitates to express a contradictory view"),
    new Question("Q120", "Considers others before myself"),
    new Question("Q121", "Finds it easy to conform"),
    new Question("Q122", "Tends to make excessive demands on people"),
    new Question("Q123", "Likes to talk about my achievements"),
    new Question("Q124", "Sometimes gives the impression of being self-important"),
    new Question("Q125", "Assumes my views will be accepted"),
    new Question("Q126", "Believes my own ideas are better than those of others"),
    new Question("Q127", "Is unassuming"),
    new Question("Q128", "Is modest"),
    new Question("Q129", "Prefers to get on with my work rather than talk about it"),
    new Question("Q130", "Is discreet about my own accomplishments"),
    new Question("Q131", "Finds it easy to change direction"),
    new Question("Q132", "Likes to be flexible in how I organise my work"),
    new Question("Q133", "Finds it easy to move on to something new"),
    new Question("Q134", "Is quick to see the value of new approaches to solving problems"),
    new Question("Q135", "Considers planning a constraint"),
    new Question("Q136", "Prefers to plan my work carefully"),
    new Question("Q137", "Prefers to work to set deadlines"),
    new Question("Q138", "Likes to establish clear milestones to complete the job on time"),
    new Question("Q139", "Likes to be highly organised in what I do"),
    new Question("Q140", "Finds it difficult to leave tasks incomplete"),
    new Question("Q141", "Feels that accuracy is not all that important"),
    new Question("Q142", "Feels that detailed preparation can sometimes inhibit effectiveness"),
    new Question("Q143", "Prefers not to give my full attention to one thing at a time"),
    new Question("Q144", "Finds it hard to deal with detail"),
    new Question("Q145", "Is always conscious of getting the details right"),
    new Question("Q146", "Prefers to tie up all loose ends"),
    new Question("Q147", "Finds it easy to work to deadlines"),
    new Question("Q148", "Prefers work that requires attention to detail"),
    new Question("Q149", "Finds it easy to accept lower standards in order to deliver an outcome"),
    new Question("Q150", "Cuts corners to get results"),
    new Question("Q151", "Is pragmatic in order to get the task done"),
    new Question("Q152", "Finds it easy to accept 'fit for purpose' rather than perfection"),
    new Question("Q153", "Tries to exceed personal standards of excellence"),
    new Question("Q154", "Enjoys being the best at what I do"),
    new Question("Q155", "Is often impatient with my own errors"),
    new Question("Q156", "Is a perfectionist"),
    new Question("Q157", "Does not enjoy positions of influence"),
    new Question("Q158", "Prefers not to be in charge"),
    new Question("Q159", "Tends not to enjoy positions of authority"),
    new Question("Q160", "Does not enjoy positions of power and influence"),
    new Question("Q161", "Prefers to achieve by managing the actions of others"),
    new Question("Q162", "Enjoys making an impact"),
    new Question("Q163", "Likes to be seen as influential"),
    new Question("Q164", "Enjoys persuading others"),
    new Question("Q165", "Enjoys being in charge"),
    new Question("Q166", "Is content with my position in life"),
    new Question("Q167", "Is comfortable in my work"),
    new Question("Q168", "Is satisfied with life in general"),
    new Question("Q169", "Is content in my current job"),
    new Question("Q170", "Seeks promotion"),
    new Question("Q171", "Is ambitious"),
    new Question("Q172", "Seeks positions of importance"),
    new Question("Q173", "Feels that status is important"),
    new Question("Q174", "Enjoys prestigious situations"),
    new Question("Q175", "Approaches work tasks in a measured way"),
    new Question("Q176", "Prefers to make steady progress"),
    new Question("Q177", "Tries to avoid making hasty decisions"),
    new Question("Q178", "Prefers time to think before having to take action"),
    new Question("Q179", "Is energetic"),
    new Question("Q180", "Is animated in conversation"),
    new Question("Q181", "Gets through work at a brisk pace"),
    new Question("Q182", "Finds it easy to generate enthusiasm")

];

// Randomize list
var serverQuestionList = orderedList.sort(function (a, b) { return a._Sort - b._Sort });

// Used by the page
var localQuestionList;

// Number of questions per page
var numQuestions = 10;

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

function getQuestions() {

    try {

        
        // This function will call API eventually - for now the call will be simulated
        localQuestionList = randomQuestions();

        if (localQuestionList.length > 0) {

            writeQuestions();

        }
        else {

            writeEndOfSurvey();
        }
        

    }
    catch (err) {

        alert(err.message + " in getQuestions()");
    }
}

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

            var name = localQuestionList[i].Id;
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

function getProgressBar() {

    try {

        textstr = "";

        var N = serverQuestionList.length;
        var n = 0;

        for (var i = 0; i < N; i++) {

            if (serverQuestionList[i].Answer > 0) {
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

function saveExit() {

    try {

        saveQuestions();

        writeInstructions();

    }
    catch (err) {

        alert(err.message + " in saveExit()");
    }
}

function saveContinue() {

    try {

        saveQuestions();

        getQuestions();

    }
    catch (err) {

        alert(err.message + " in saveContinue()");
    }
}

function saveQuestions() {

    try {

        // Note that because assigment of objects is by reference,
        // updating localQuestionList also updates serverQuestionList
        // since these contain the same objects

        var myform = document.getElementById("GPI_form");

        // Loop through question list to look up answers
        for (var i = 0; i < localQuestionList.length; i++) {

            var id = localQuestionList[i].Id;
            var score = getScore(myform, id);

            if (score > 0) {

                localQuestionList[i].Answer = score;

            }
        }   

    }
    catch (err) {

        alert(err.message + " in saveQuestions()");
    }
}

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

function randomQuestions() {

    try {

        // Note that serverQuestionList has already been randomized
        var num_qu = 0;
        var q_list = [];

        for (var i = 0; i < serverQuestionList.length; i++) {

            if (serverQuestionList[i].Answer == 0) {

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






