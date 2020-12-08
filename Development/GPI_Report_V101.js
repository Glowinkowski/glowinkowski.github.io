/**
 * @fileoverview
 * <h3>JavaScript components for the GPI Report</h3>
 * <p>(Simulated API version)</p>
 * <p>Provides the functionality for rendering components of the
 * GPI Talent Report on a web page</p>
 * <b>Key functionality:</b>
 * <ul>
 *    <li>Renders the quadrant model visualisations</li>
 *    <li>Renders the sten score visualisations</li>
 *    <li>Automatically selects report text from model</li>
 * </ul>
 * @author M.P. Vaughan
 * @version 1.01
 * @copyright Glowinkowski International Limited (2020)
 */

/*=================================================
 *          CLASS DEFINITIONS
 * ================================================
 */

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
     * @param {string} _UnipolarName - The unipolar name of the Dimension
     * @param {string} _LeftBipolarName - The left bipolar name of the Dimension
     * @param {string} _RightBipolarName - The right bipolar name of the Dimension
     * @param {boolean} _isParent - Indicates if this is a parent Dimension
     * @param {number} _StenScore - The sten score associated with this Dimension (integer between 1 and 10)
     * @param {string} _ScoreText - The text associated with the sten score of the Dimension
     * @todo Need to provide validation for sten score
     */
    constructor(_UnipolarName, _LeftBipolarName, _RightBipolarName, _isParent=false, _StenScore=0, _ScoreText="") {

        this._UnipolarName = _UnipolarName;
        this._LeftBipolarName = _LeftBipolarName;
        this._RightBipolarName = _RightBipolarName;
        this._isParent = _isParent;
        this._StenScore = _StenScore;
        this._ScoreText = _ScoreText;
        this._SubDimensions = [];
    }

    /**
     * Get the unipolar name of the Dimension
     * @returns {string} The unipolar name of the Dimension
     */
    get UnipolarName() {

        return this._UnipolarName;
    }

    /**
     * Get the left bipolar name of the Dimension
     * @returns {string} The left bipolar name of the Dimension
     */
    get LeftBipolarName() {

        return this._LeftBipolarName;
    }

    /**
     * Get the right bipolar name of the Dimension
     * @returns {string} The right bipolar name of the Dimension
     */
    get RightBipolarName() {

        return this._RightBipolarName;
    }

    /**
    * Indicates if Dimension is a parent
    * @returns {boolean} Indicates if Dimension is a parent
    */
    get isParent() {

        return this._isParent;
    }

    /**
     * Get the sten score of the Dimension
     * @returns {number} An integer between 1 and 5
     */
    get StenScore() {

        return this._StenScore;
        
    }

    /**
     * Get the text associated with the sten score of the Dimension
     * @returns {string} An HTML-formatted string
     */
    get ScoreText() {

        return this._ScoreText;
    }

    /**
     * Gets an array of sub-dimenions for the Dimension
     * @returns {Dimension[]} An array of sub-dimenions for the Dimension
     */
    get SubDimensions() {

        return this._SubDimensions;

    }

    /**
     * Indicates if dimension is a parent
     * @param {boolean} bool Indicates if dimension is a parent
     */
    set isParent(bool) {

        // Anything not true will be taken to be false
        this._isParent = Boolean(bool);

    }

    /**
     * Set the sten score for this Dimension
     * @param {number}  score An integer between 1 and 10
     * @throws Sten score must be an integer 1 - 10  (not in range)
     * @throws Sten score must be an integer 1 - 10 (not an integer)
     */
    set StenScore(score) {

        if (Number.isInteger(score)) {

            if (score >= 1 && score <= 10) {

                this._StenScore = score;
            }
            else {

                throw "Sten score must be an integer 1 - 10  (not in range)";
            }

        }
        else {

            throw "Sten score must be an integer 1 - 10 (not an integer)";
        }
    }

    /**
     * Set the text associated with the sten score of the Dimension
     * @param {string} text Text associated with the sten score of the Dimension
     */
    set ScoreText(text) {

        this._ScoreText = text;
    }

    /**
     * Sets the sub-Dimensions for a Dimension and calculates the compound score
     * @param {Dimension[]} dimensions An array of Dimension objects
     */
    set SubDimensions(dimensions) {

        try {

            this._SubDimensions = dimensions;

            var n = dimensions.length;

            if (n > 0) {

                var score = 0;

                for (var i = 0; i < n; i++) {

                    score += dimensions[i].StenScore;
                }

                score = Math.round(score / n);

                if (score < 1) score = 1;
                if (score > 10) score = 10;

                this._StenScore = score;
            }

        }
        catch (err) {

            alert(err.message + " in Dimension.SubDimensions()");
        }
        
    }
}

/**
 * @classdesc <p>The GPI Quadrant model is a composite model based on 
 * and individual's GPI dimensions</p>
 */
class QuadrantModel {

    /**
     * Creates a GPI Quadrant Model
     * @param {string} Name - The name of the Quadrant Model
     * @param {Dimension} _xDimension - The Dimension associated with the x-axis
     * @param {Dimension} _yDimension - The Dimension associated with the y-axis
     * @param {string} _Q1label - Label for the 1st (upper right) quadrant
     * @param {string} _Q2label - Label for the 2nd (upper left) quadrant
     * @param {string} _Q3label - Label for the 3rd (lower left) quadrant
     * @param {string} _Q4label - Label for the 4th (lower right) quadrant
     * @param {string} _QText - The text associated with this Quadrant Model
     * @throws Throws an error if either of the first two arguments are not Dimension objects
     */
    constructor(_Name, _xDimension, _yDimension, _Q1label, _Q2label, _Q3label, _Q4label, _QText) {

        if ((_xDimension instanceof Dimension) && (_yDimension instanceof Dimension)) {

            this._xDimension = _xDimension;
            this._yDimension = _yDimension;
        }
        else {

            throw "Arguments are not Dimension objects";

        }

        this._Name = _Name;
        this._Q1label = _Q1label;
        this._Q2label = _Q2label;
        this._Q3label = _Q3label;
        this._Q4label = _Q4label;
        this._QText = _QText;
    }

    /**
     * Gets the name of the Quadrant Model
     * @returns {string}
     */
    get Name() {

        return this._Name;
    }

    /**
     * Gets the Dimension associated with the x-axis
     * @returns {Dimension}
     */
    get xDimension() {

        return this._xDimension;
    }

    /**
     * Gets the Dimension associated with the y-axis
     * @return {Dimension}
     */
    get yDimension() {

        return this._yDimension;
    }

    /**
     * Gets the label for the 1st (upper right) quadrant
     * @returns {string}
     */
    get Q1label() {

        return this._Q1label;
    }

    /**
    * Gets the label for the 2nd (upper left) quadrant
    * @returns {string}
    */
    get Q2label() {

        return this._Q2label;
    }

    /**
    * Gets the label for the 3rd (lower left) quadrant
    * @returns {string}
    */
    get Q3label() {

        return this._Q3label;
    }

    /**
    * Gets the label for the 4th (lower right) quadrant
    * @returns {string}
    */
    get Q4label() {

        return this._Q4label;
    }

    /**
    * Gets the text associated with this Quadrant Model
    * @returns {string}
    */
    get QText() {

        return this._QText;
    }

    /**
    * Sets the text associated with this Quadrant Model
    * @param {string} text The text associated with this Quadrant Model
    */
    set QText(text) {

        this._QText = text;
    }

}


/**
 * @classdesc <p>The GPI Blue model is a derivative model based on
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
     * @param {number} _RiskArea - a number between 0 and 3
     * @param {number} _RiskLevel - a number between 0 and 5
     */
    constructor(_RiskArea = 0, _RiskLevel = 0) {

        if (Number.isInteger(_RiskArea)) {

            if (_RiskArea >= 0 && _RiskArea <= 3) {

                this._RiskArea = _RiskArea;
            }
            else {

                throw "Risk area must be an integer 0 - 3 (not in range)";
            }

        }
        else {

            throw "Risk area must be an integer 0 - 3 (not an integer)";
        }

        if (Number.isInteger(_RiskLevel)) {

            if (_RiskLevel >= 0 && _RiskLevel <= 5) {

                this._RiskLevel = _RiskLevel;
            }
            else {

                throw "Risk level must be an integer 0 - 5 (not in range)";
            }

        }
        else {

            throw "Risk level must be an integer 0 - 5 (not an integer)";
        }

        this._ScoreText = "";

    }

    /**
     * Gets the risk area of the model ('Red'/'Amber'/'Green')
     * @returns {string}
     */
    get RiskArea() {

        switch (this._RiskArea) {
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

        switch (this._RiskLevel) {
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
     * Get the text associated with this model
     * @returns {string} An HTML-formatted string
     */
    get ScoreText() {

        return this._ScoreText;
    }

    /**
     * Sets the risk area
     * @param {number} _RiskArea - an integer between 1 and 3
     */
    set RiskArea(_RiskArea) {

        if (Number.isInteger(_RiskArea)) {

            if (_RiskArea >= 1 && _RiskArea <= 3) {

                this._RiskArea = _RiskArea;
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
     * @param {number} _RiskLevel - an integer between 1 and 5
     */
    set RiskLevel(_RiskLevel) {

        if (Number.isInteger(_RiskLevel)) {

            if (_RiskLevel >= 1 && _RiskLevel <= 5) {

                this._RiskLevel = _RiskLevel;
            }
            else {

                throw "Risk level must be an integer 1 - 5 (not in range)";
            }

        }
        else {

            throw "Risk level must be an integer 1 - 5 (not an integer)";
        }
    }

    /**
     * Set the text associated with this model
     * @param {string} text Text associated with this model
     */
    set ScoreText(text) {

        this._ScoreText = text;
    }
}

/**
 * @classdesc <p>Encapsulates the GPI Talent Report</p>
 */
class Report {

    /**
     * Creates a GPI Talent Report
     * @param {string} _FirstName - First name of report subject
     * @param {string} _LastName - Last name of report subject
     */
    constructor(_FirstName, _LastName) {

        this._FirstName = _FirstName;
        this._LastName = _LastName;
        this._QuadrantModels = [];
        this._LeadershipModel = null;

    }

    /**
     * Gets the first name of the report subject
     * @returns {string}
     */
    get FirstName() {

        return this._FirstName;
    }

    /**
     * Gets the last name of the report subject
     * @returns {string}
     */
    get LastName() {

        return this._LastName;
    }

    /**
     * Gets the array of Quadrant Models for this report
     * @returns {QuadrantModel[]}
     */
    get QuadrantModels() {

        return this._QuadrantModels;
    }

    /**
     * Gets the Blue4Model model for this report
     * @returns {Blue4Model}
     */
    get LeadershipModel() {

        return this._LeadershipModel;
    }

    /**
     * Sets the array of Quadrant Models for this report
     * @param {QuadrantModel[]} models Array of Quadrant Models for this report
     */
    set QuadrantModels(models) {

        this._QuadrantModels = models;
    }

    /**
     * Sets the Leadership model for this report
     * @param {Blue4Model} model Leadership model for this report
     */
    set LeadershipModel(model) {

        if (model instanceof Blue4Model) {

            this._LeadershipModel = model;
        }
        else {
            throw "Argument is not a Blue4Model model";
        }
    }
}

/*=================================================
 *          GLOBAL VARIABLES
 * ================================================
 */

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
 */
var dimensionList;

/**
 * Report object
 * @type {Report}
 */
var myReport;

/*=================================================
 *          INITIALIZATION CODE
 * ================================================
 */

// Set formating for quadrant element
assignQuadFormating();

// Initialize Dimensions
if (initialize()) {

 
}
else {

    alert("Unable to show GPI report");

}


/*=================================================
 *          FUNCTIONS
 * ================================================
 */

/**
 * @param {string} mystr String specifying the QuadrantModel to display
 * @description <p>Writes the QuadrantModel element to the web page</p>
 * <p>The possible values of 'mystr' are currently:</p>
 * <ul>
 * <li>'problem_quad'</li>
 * <li>'communication_quad'</li>
 * <li>'feelings_quad'</li>
 * </ul>
 */
function writeElement(mystr) {

    try {

        var quadmodel;

        switch (mystr) {

            case "problem_quad":

                quadmodel = quadModel_probSolveImpStyle;

                //drawQuadrant(quadModel_probSolveImpStyle);
                break;

            case "communication_quad":

                quadmodel = quadModel_commInterperStyle;

                //drawQuadrant(quadModel_commInterperStyle);
                break;

            case "feelings_quad":

                quadmodel = quadModel_feelSelfControl;

                //drawQuadrant(quadModel_feelSelfControl);
                break;

            case "leadership":

                writeLeadership();
                return;

            default:

                throw "Unknown element";
                
        }  

        // Write contents
        textstr = "";
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

        // Write string to document
        document.getElementById("main").innerHTML = textstr;

        drawQuadrant(quadmodel);

        for (var i = 0; i < quadmodel.xDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.xDimension.SubDimensions[i]);

        }

        for (var i = 0; i < quadmodel.yDimension.SubDimensions.length; i++) {

            drawSten(quadmodel.yDimension.SubDimensions[i]);

        }



    }
    catch (err) {

        alert(err.message + " in writeElement()");

    }
}

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
 * Attempts to assign quadrant colours and fonts from CSS file.
 * If not found, default values are used.
 * @todo Assign fonts from CSS. For now, use defaults
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

        if (quad_axis_colour.length == 0) {

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
 * Draw the Quadrant Model element on an HTML canvas.
 * @param {QuadrantModel} quadrant - the QuadrantModel to display
 * @see QuadrantModel
 * @see writeElement
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
        var rM = 0.5*grid_space;        // Radius of marker

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
 * Draw the Sten Score element on an HTML canvas.
 * @param {Dimension} dimension - the Dimesion of the score to display
 * @see Dimension
 * @see writeElement
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

        var sw = 0.5*lh;     // Width of square y-axis stops

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
        ctx.fillRect(-aw / 2, -2*grid_space, aw, 2*grid_space - aw / 2);

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

/**
 * Initializes the Dimensions for GPI Report (simulated version)
 * @todo Wire this up to API calls
 */
function initialize() {

    try {

        // Initialize dimensions
        dimensionList = [
            new Dimension("Emotionality", "At Ease", "Ill At Ease", true),
            new Dimension("Impulsivity", "Disciplined", "Impulsive", true),
            new Dimension("Extraversion", "Extraversion", "Introversion", true),
            new Dimension("Cognition", "Incremental", "Radical", true),
            new Dimension("Agreeableness", "Collectivist", "Individualist", true),
            new Dimension("Attainment", "Focused", "Flexible", true),
            new Dimension("Drive", "Driving", "Measured", true)
        ];

        // Emotionality
        anxiety = "<p>Specimen is marginally towards the Tense end of the dimension. This suggests that she has a tendency to focus on things that may go wrong and "
            + "could, accordingly, feel an enhanced degree of anxiety. This implies that she may tend to feel a certain degree of tension / edginess about achieving "
            + "performance outcomes and be alert to changing circumstances and therefore responding quickly if things do start to go wrong. This kind of "
            + "tension or energy can reflect the upside of Specimen's position on the dimension in terms of reflecting drive. The potential downside, however, is "
            + "the possible tendency to experience an unnecessarily high degree of tension and come over as permanently on edge. This risks being seen by "
            + "others as not taking things in one's stride. Specimen's position on this dimension is quite balanced suggesting she is able to flex into the Relaxed "
            + "mode when appropriate.</p>";

        hostility = "<p>Specimen is marginally towards the Discontented side of the dimension. This suggests that she has a tendency to view their experience and her "
            + "'life journey' to date in a moderately negative light. In this context she may experience a degree of frustration or discontentment when reflecting "
            + "upon what she has achieved either in a professional or personal context. The essence of Discontented is the idea of regret and feeling a degree of "
            + "dissatisfaction about what one has achieved to date. This is not necessarily an absolute measure of achievement, more a kind of self‐imposed "
            + "bench mark and extent to which a person feels comfortable with themselves. The downside can be the fact that many people with enormous "
            + "achievements still feel a sense of dissatisfaction. The upside, however, is that it can often drive and motivate people to achieve more. Specimen's "
            + "position on this profile is clearly balanced suggesting a tendency to flex into the Placid side with only a marginal orientation towards Discontented.</p>";

        optimism = "<p>Specimen is clearly orientated towards the Pessimistic end of the scale. This suggests she will have a tendency to bring a Pessimistic perspective "
            + "viewing the future possibilities and their prospects relatively negatively. It implies she will tend to be likely to look ahead and consider the possible "
            + "problems and things that might go wrong. The essence of Pessimistic is the idea of the 'glass half empty' rather than 'half full'. Although this may "
            + "come across to others as unenthusiastic and doubtful, it does have the advantage that ensuring threats have been considered before taking action. "
            + "This of course is the upside of pessimism, the downside is the fact that others can be put off and demotivated together with potential "
            + "opportunities not being realised due to a kind of risk aversion. Specimen’'s position on the dimension is quite strongly towards the Pessimistic "
            + "side. This suggests a lack of tendency to feel comfortable flexing into the optimistic side of the dimension.</p>";

        selfesteem = "<p>Specimen is moderately on the Self Confident side of the dimension. This suggests that she feels within themselves a positive degree of "
            + "confidence holding a comfortable view of themselves and maintaining a healthy sense of positive self‐esteem. This is likely to come across in their "
            + "behaviour and interaction with others. Specimen is likely to be realistic and indeed comfortable with their abilities but still feeling open to learn "
            + "and improve. She is likely to feel comfortable in the face of criticism from others and able to rationally make up their own mind as to whether to "
            + "take that criticism on board or not. The essence of self‐confidence relates to the individuals degree of comfort and acceptance of who they are. The "
            + "upside of confident is about self‐belief in achieving successful outcomes. The downside however can sometimes be a level of contentedness which "
            + "can actually undermine achievement. Specimen's position on the profile suggests that she may that she may occasionally flex into the Self‐Conscious "
            + "side but is nevertheless orientated towards Confident.</p>";

        dimensionList[0].SubDimensions = [
            new Dimension("Anxiety", "Relaxed", "Tense", false, 6, anxiety),
            new Dimension("Hostility", "Placid", "Discontented", false, 6, hostility),
            new Dimension("Optimism", "Optimistic", "Pessimistic", false, 8, optimism),
            new Dimension("Self-Esteem", "Confident", "Self Conscious", false, 4, selfesteem)
        ];

        // Impulsivity
        impulsivity = "<p>Specimen is marginally towards the Impulsive end of the dimension. This suggests she will be aware of their emotional reactions and will tend to "
            + "express them relatively freely. She may sometimes struggle to exercise control over their emotions and thus behaving impulsively as a result. This "
            + "might include feelings of impatience, particularly with the delay of the fulfilment of a desire and the possibility of being distracted by their "
            + "impulses. Specimen is likely to come across as open and willing to share their feelings with others but may not always be selective about what she "
            + "shares or with whom. The upside of Impulsive is the idea of an individual who is open and makes decisions quickly. The downside of Impulsive is a "
            + "tendency to react too quickly and show their hand when not appropriate. Specimen's position on this dimension is quite balanced suggesting their "
            + "ability to flex into the Disciplined side of the dimension.</p>";

        dimensionList[1].SubDimensions = [
            new Dimension("Impulsivity", "Disciplined", "Impulsive", false, 6, impulsivity)
        ];

        // Extraversion
        sociability = "<p>Specimen shows a clear preference towards Reserved. This suggests she is energised by their own company with the opportunity to reflect. While "
            + "she can enjoy a degree of social interaction and the company of others, she nevertheless, mainly draws their energy from personal reflection and "
            + "the opportunity to focus on the internal world of ideas and concepts. She is often capable of working for extended periods alone enjoying the "
            + "opportunity to think through their ideas. A feature of reserved introverts is the idea of 'thinking by thinking' as opposed to 'thinking by talking'. In "
            + "this sense, Specimen will have a strong tendency to formulate her thinking and ideas through personal reflection rather than dialogue with "
            + "others. The upside of being reserved is the capacity for reflection and introspection. The downside can be a lack of energy for social engagement "
            + "and connection with others.</p>";

        assertiveness = "<p>Specimen shows a marginal preference for Asserting. This suggests a tendency to feel comfortable sharing and asserting their views with others "
            + "and providing direction. At the same time, she will have the capacity to also keep their own counsel. Nevertheless, their preference is to assert and "
            + "in this context, Specimen will be comfortable pushing themselves forward, stating what she thinks, and in a leadership context articulating what "
            + "needs to be done and the direction required. This upside of asserting is clear in terms of an individual's capacity to be open with their views and "
            + "deliver direction setting input. The downside however, can sometimes involve a lack of listening and empathy towards others with the risk of "
            + "being overly dominant. In Specimen's case however, given their more balanced profile this may be less likely suggesting their capacity to flex, "
            + "when appropriate, into Accepting.</p>";

        hedonism = "<p>Specimen shows a moderate preference towards Fun Loving. This suggests that social activities inside and outside of the work place are important "
            + "to them. While she will prioritise the importance of their responsibilities and to that extent flex into Serious Minded, socialising and relaxation "
            + "remains an important priority. The essence of Fun Loving is the idea that socialising, relaxation and leisure time etc. is a dominant priority. From a "
            + "work perspective, the upside of this relates to an ability to be engaging and recognise the social needs of people in the work place. The downside, "
            + "however, is the risk of sometimes not being taken seriously. Specimen's profile on this dimension, albeit towards the Fun Loving end of the scale, "
            + "is nevertheless relatively balanced and thus suggests their ability to flex into Serious Minded when appropriate.</p>";

        socialpoise = "<p>Specimen's Profile shows that she is moderately towards the Socially Uncertain end of the dimension. This implies that she will have a preference "
            + "for engaging with smaller groups and furthermore where she is already familiar with the individuals. While she may feel confident in large groups "
            + "and meeting new people, their comfort zone is much more socially selective. The essence of being Socially Uncertain gives the idea of "
            + "emphasising and developing existing relationships rather than new ones. The upside is of course the facility to maintain existing relationships but "
            + "the downside is sometimes a reluctance to proactively network and practice broader influencing behaviour.The balance in Specimen's profile "
            + "suggests she may be able to flex towards the Socially Assured end of the dimension.</p>";

        dimensionList[2].SubDimensions = [
            new Dimension("Sociability", "Outgoing", "Reserved", false, 8, sociability),
            new Dimension("Assertiveness", "Asserting", "Accepting", false, 5, assertiveness),
            new Dimension("Hedonism", "Fun Loving", "Serious Minded", false, 4, hedonism),
            new Dimension("Social Poise", "Socially Assured", "Socially Uncertain", false, 7, socialpoise)
        ];

        // Cognition
        changeorientation = "<p>Specimen's profile shows a moderate preference towards the Revolutionary side of the dimension. This suggests that Specimen is more energized "
            + "by radical / transformational change rather than by change in small controlled steps. She will have preference for more 'blue‐sky' thinking with a "
            + "drive to generate novel ideas but still be able to appreciate the potential of using tried and tested approaches. In terms of their natural approach "
            + "she is likely to focus more on change that transforms and creates new approaches and generate innovative and new ideas.</p>";

        informationprocessing = "<p>Specimen has a moderate preference toward the Practical side of the dimension. This involves looking at the reality of the current situation, "
            + "gathering data and considering strengths and weaknesses, with a view to accomplishing immediate goals and objectives. However, she will still be "
            + "comfortable flexing into conceptual thinking in order to consider future trends and dynamics that are likely to be more ambiguous. Nevertheless, "
            + "her tendency is to be orientated towards more practical tasks and today's delivery. Specimen can be comfortable in both the domains of "
            + "planning and strategy but with more of an edge towards the planning. Specimen can be fairly comfortable in the world of theories and concepts "
            + "but is likely to prefer for them to have a practical application.</p>";

        decisionmaking = "<p>Specimen has a marginal preference towards the Intuitive. This suggests that she prefers to use an intuition based approach to solving problems "
            + "and making decisions. In this context, decision making is driven by her own insight and gut feeling about a situation irrespective of what the data says. "
            + "This is not to say that rational facts are not thought out to validate an approach it simply implies that the approach of the intuitive decision maker "
            + "tends to be more gut feeling driven. The upside of intuitive decision making is that problems and decisions can be addressed quickly and without "
            + "getting caught up in analysis by paralysis. The downside of course, is that sometimes important information can be missed. Specimen's profile "
            + "does show a balance and so she will be comfortable flexing towards the Rational when required.</p>";

        dimensionList[3].SubDimensions = [
            new Dimension("Change Orientation", "Evolutionary", "Revolutionary", false, 7, changeorientation),
            new Dimension("Information Processing", "Practical", "Conceptual", false, 4, informationprocessing),
            new Dimension("Decision Making", "Rational", "Intuitive", false, 6, decisionmaking)
        ];

        // Agreeableness
        affiliation = "<p>Specimen shows a moderate preference towards the Affiliative end of the dimension. This suggests she has a more tender minded and warm "
            + "engagement style with others rather than tough minded and detached. There is a preference for maintaining harmony and warm connections with "
            + "others. Affiliative individuals are often aware of the needs and feelings of others and will accommodate them if possible, avoiding being hurtful or "
            + "creating disharmony. Affiliative types enjoy liking and being liked by others with an emphasis on the needs of people rather than the task. The "
            + "upside of Affiliation is about relationships and engagement style together with the capacity to influence and network. The downside however "
            + "relates to the individual's ability to address difficult issues and focus on the needs of the task over and above the needs of people. Specimen's "
            + "profile although relatively balanced and suggesting the ability to flex into the Unaffiliative side of the dimension is nevertheless orientated towards "
            + "Affiliative.</p>";

        trust = "<p>Specimen shows a moderate preference towards Questioning. This implies a tendency for them to be more cautious when dealing with others in "
            + "the first instance and more readily question what other people's motives might actually be. She is likely to suspend judgement over where "
            + "someone may be coming from until they prove themselves worthy of the task. The upside of Questioning is that sometimes caution of others can "
            + "be well placed in that you need some evidence to be sure about someone. The downside however, can be lack of openness and engagement on "
            + "initial meeting thus risking openness and trust in the earlier stages of the relationship. Specimen's position on this dimension is relatively "
            + "balanced suggesting she can flex into Trusting. Nevertheless their orientation is towards the more Questioning.</p>";

        conformity = "<p>Specimen's profile indicates a strong preference towards Dissenting. This implies she has a tendency to focus on what she disagrees with, or "
            + "thinks is wrong, with an idea, finding it fairly easy to find an opposing view. The essence of Dissenting is the idea of the individual being quite "
            + "independently minded with more of a tendency to disagree and see the downsides of the group view than to feel agreeable and collaborative. "
            + "Dissenting types feel more comfortable and able to ask tough probing questions about how the group is performing. The upside of Dissenting is "
            + "the opportunity for challenge and a different perspective, while the downside can sometimes be disruptive behaviour when collaboration is "
            + "needed. Specimen's profile is firmly towards the Dissenting end of the scale, the upside being their capacity to challenge colleagues and think "
            + "differently, the downside being the need to sometimes adopt a more collaborate team orientated approach. The extent to which a 'dissenter' "
            + "actually articulates their views will be strongly influenced by how assertive and confident they feel.</p>"

        modesty = "<p>Specimen shows a moderate preference towards Assuming. This suggests their tendency for an Assuming approach where she will like to receive "
            + "acknowledgement for their own individual contribution and feel comfortable about promoting and talking about those accomplishments with "
            + "others. The essence of Assuming is an individual's preparedness to talk about what they have achieved rather than holding their 'light under a "
            + "bushel'. The upside of Assuming is of course the capacity to establish a broader personal profile together with an ability to promote the broader "
            + "accomplishments of the team and / or organisation and this can have a positive leadership impact.The downside can be the risk of being perceived "
            + "as boastful or arrogant. Specimen's position on the profile suggests she can flex into the Modest end of this dimension. She is however orientated "
            + "towards the Assuming side.</p>";

        dimensionList[4].SubDimensions = [
            new Dimension("Affiliation", "Affiliative", "Unaffiliative", false, 4, affiliation),
            new Dimension("Trust", "Trusting", "Questioning", false, 6, trust),
            new Dimension("Conformity", "Conforming", "Dissenting", false, 9, conformity),
            new Dimension("Modesty", "Modest", "Assuming", false, 7, modesty)
        ];

        // Attainment
        implementationstyle = "<p>The Outcome/Spontaneous dimension relates to an individual's preference for a structured/organised as opposed to a flexible approach for the "
            + "delivery of outcomes and results. Specimen shows a marginal preference for being Spontaneous. This means she brings a flexibility to their "
            + "approach but also likely to be able to plan for the end goal bearing it in mind as she experiments with the process. She is likely to enjoy balancing "
            + "multiple tasks simultaneously but will be able to focus on each sufficiently to get it completed. She enjoys keeping their options open for as long "
            + "as possible and can sometimes enjoy the experience more than the outcome. Specimen's natural approach to delivery is to be flexible in approach "
            + "keeping options open and retaining the capacity to change course if required.The profile does show a balance, however, and so Specimen can be "
            + "comfortable flexing towards the Outcome side of the scale.</p>";

        conscientiousness = "<p>Specimen shows a strong preference for evaluating the main points and overall idea of an issue rather than getting into the full detail of a task. "
            + "She is likely to be able to move quickly through information and detail, picking out the main relevant points and should, therefore, be able to "
            + "handle a volume of information without getting overwhelmed. She is likely to feel frustrated when required to focus in and concentrate on the "
            + "details: as a result she may sometimes miss important information or fail to make thorough preparations. Specimen's natural approach is Cursory "
            + "rather than Conscientious and therefore prefers the overview and bigger picture rather than the nuts and bolts of the detail. This of course has its "
            + "advantages and disadvantages.</p>";

        achievementorientation = "<p>Specimen shows a clear preference towards the Pragmatist. This suggests that she prefers an approach which involves delivering the appropriate "
            + "level of quality to get the job done or meet the expectations of others (e.g.customers). This 'fit for purpose' approach for standards involves "
            + "flexibly adjusting the standards of work which is done in order to, for instance, meet a deadline or keep down costs. Specimen may feel impatient "
            + "with standards, or procedures, that she judges to be inefficient or wasteful and she may occasionally feel the need to cut corners in the pursuit of a "
            + "goal. The upside of being Pragmatic is an ability to deliver on time and cost together with more of a willingness to delegate and thus use their time "
            + "more effectively. The downside of course is sometimes a lack of focus in terms of standards of excellence.</p>";

        dimensionList[5].SubDimensions = [
            new Dimension("Implementation Style", "Outcome", "Spontaneous", false, 6, implementationstyle),
            new Dimension("Conscientiousness", "Conscientious", "Cursory", false, 9, conscientiousness),
            new Dimension("Achievement Orientation", "Perfectionist", "Pragmatic", false, 8, achievementorientation)
        ];

        // Drive
        influence = "<p>Influence paragraph</p>";
        ambitiousness = "<p>Ambitiousness paragraph</p>";
        energy = "<p>Energy paragraph</p>";

        dimensionList[6].SubDimensions = [
            new Dimension("Influence", "Persuasive", "Consensual", false, 5, influence),
            new Dimension("Ambitiousness", "Ambitious", "Contented", false, 3, ambitiousness),
            new Dimension("Energy", "Energetic", "Paced", false, 7, energy)
        ];

        // Initialise quadrant models
        probSolveImpStyle = "<p>Specimen's profile is positioned within the Visionary style. Visionaries are predisposed to look at situations in terms of the bigger picture and "
            + "consider all the future possibilities that exist. They will tend to generate radically different ideas, enjoy strategy, and be more interested in this than "
            + "in dealing with the practical details of turning ideas into reality. Visionaries enjoy big change with more of a Focus on making things different than "
            + "improving what already exists. They have a tendency to enjoy a multiple of activities rather than a focus on singular tasks. Decision Making is often "
            + "intuitive rather than entirely fact based and their approach to standards tends to be more pragmatic than perfectionist. The essence of a Visionary "
            + "is new ideas with a multiple of activities on the go.</p>"
            + "<p>On occasions, the Visionaries can get caught up with all of the possibilities of change, and may move from one idea to the next. While this has a "
            + "wide range of advantages, one downside is that they can find it difficult to select a focus and stick with it through to Implementation.</p>"
            + "<p>Specimen's position in the Visionary style is marginal and this suggests she will relate to only part of the above description. She will feel "
            + "comfortable with elements of the other three types and in this context will retain a degree of flexibility.</p>";

        quadModel_probSolveImpStyle = new QuadrantModel(
            "Problem Solving & Implementation Style",
            dimensionList.find(x => x.UnipolarName === "Cognition"), 
            dimensionList.find(y => y.UnipolarName === "Attainment"),
            "STRATEGIST",
            "PLANNER",
            "PRACTITIONER",
            "VISIONARY",
            probSolveImpStyle
        );

        commInterperStyle = "<p>Specimen's profile is positioned within the Independent style. Independence combines Introversion and Individualist. Independents will often be "
            + "seen by others as rational, reserved and perhaps even detached from the rest of the group.They are task focused and tend to be comfortable "
            + "pursuing their own interests. Although they will tend to keep their views to themselves, they often have great insights into the issues faced by the "
            + "group but not necessarily surfaced. It is likely that the Independent will be predisposed to speak when the situation requires it. They will however, "
            + "feel entirely comfortable expressing their views irrespective of whether they are different of that of the group. The upside of the Independent can "
            + "be the ability to see things differently from the group and retain an appropriate level of attachment in order to make that critical input. The "
            + "downside and perhaps the development area relates to the need to develop a warmer and more engaging style with others.</p>"
            + "<p>Specimen's position in the Independent style is marginal and this suggests she will relate to only part of the above description. She will feel "
            + "comfortable with elements of the other three types and in this context will retain a degree of flexibility.</p>";

        quadModel_commInterperStyle = new QuadrantModel(
            "Communication & Interpersonal Style",
            dimensionList.find(x => x.UnipolarName === "Extraversion"),
            dimensionList.find(y => y.UnipolarName === "Agreeableness"),
            "SUPPORTER",
            "ENCOURAGER",
            "CHALLENGER",
            "INDEPENDENT",
            commInterperStyle
        );

        feelSelfControl = "<p>Specimen's profile is positioned within the Expressive quadrant. Expressive combines Ill‐At‐Ease with Disciplined. Expressive individuals have a "
            + "tendency to be very open in their thoughts and showing of their emotions. They will often react quickly in situations and Problem Solving contexts. "
            + "This combines with a tendency to lack confidence in themselves and feel positive about situations. People in this category are often seen as "
            + "'wearing their emotions on their sleeve'. Depending upon the extent of self‐confidence they may sometimes be described as 'temperamental'.</p>"
            + "Specimen's position in the Expressive style is marginal and this suggests she will relate to only part of the above description. She will relate with "
            + "elements of the other three types. In this context other aspects of the Feelings and Self Control Framework, may resonate with them more effectively.</p>";

        quadModel_feelSelfControl = new QuadrantModel(
            "Feelings & Self-Control",
            dimensionList.find(x => x.UnipolarName === "Emotionality"),
            dimensionList.find(y => y.UnipolarName === "Impulsivity"),
            "CONTAINED",
            "COMPOSED",
            "ENERGISED",
            "EXPRESSIVE",
            feelSelfControl
        );

        myReport = new Report("Specimen", "Client");

        myReport.QuadrantModels = [

            quadModel_probSolveImpStyle,
            quadModel_commInterperStyle,
            quadModel_feelSelfControl

        ];

        myReport.LeadershipModel = new Blue4Model(1, 3);

        myReport.LeadershipModel.ScoreText = "<p>The graphics for this model have not yet been developed</p>";

        return true;

    }
    catch (err) {

        alert(err.message + " in initialize()")
    }
}

