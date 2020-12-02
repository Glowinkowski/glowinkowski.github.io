/**
 * @fileoverview
 * <h3>JavaScript components for the GPI Report</h3>
 * <p>(Simulated API version)</p>
 * <p>Provides the functionality for rendering components of the
 * GPI Talent Report on a web page</p>
 * <b>Key functionality:</b>
 * <ul>
 *    <li>Renders the quadrant model visualisations</li>
 * </ul>
 * @author M.P. Vaughan
 * @version 1.01
 * @copyright Glowinkowski International Limited (2020)
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
     * @todo Need to provide validation for sten score
     */
    constructor(_UnipolarName, _LeftBipolarName, _RightBipolarName, _isParent=false, _StenScore=0) {

        this._UnipolarName = _UnipolarName;
        this._LeftBipolarName = _LeftBipolarName;
        this._RightBipolarName = _RightBipolarName;
        this._isParent = _isParent;
        this._StenScore = _StenScore;   
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
     * Gets an array of sub-dimenions for the Dimension
     * @returns {Dimension[]} An array of sub-dimenions for the Dimension
     */
    get SubDimensions() {

        return this._SubDimensions;

    }

    /**
     * Indicates if dimension is a parent
     * @param {boolean} Indicates if dimension is a parent
     */
    set isParent(bool) {

        // Anything not true will be taken to be false
        this._isParent = Boolean(bool);

    }

    /**
     * Set the sten score for this Dimension
     * @param {number}  An integer between 1 and 10
     * @throws "Sten score must be an integer 1 - 10  (not in range)"
     * @throws "Sten score must be an integer 1 - 10 (not an integer)"
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
     * Sets the sub-Dimensions for a Dimension and calculates the compound score
     * @param {Dimension[]} An array of Dimension objects
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
 * and individuals GPI dimensions</p>
 */
class QuadrantModel {

    constructor(_xDimension, _yDimension, _Q1label, _Q2label, _Q3label, _Q4label) {

        if ((_xDimension instanceof Dimension) && (_yDimension instanceof Dimension)) {

            this._xDimension = _xDimension;
            this._yDimension = _yDimension;
        }
        else {

            throw "Arguments are not Dimension objects";

        }

        this._Q1label = _Q1label;
        this._Q2label = _Q2label;
        this._Q3label = _Q3label;
        this._Q4label = _Q4label;
    }

    // Getters
    get xDimension() {

        return this._xDimension;
    }

    get yDimension() {

        return this._yDimension;
    }

    get Q1label() {

        return this._Q1label;
    }

    get Q2label() {

        return this._Q2label;
    }

    get Q3label() {

        return this._Q3label;
    }

    get Q4label() {

        return this._Q4label;
    }

}

/**
 * Quadrant element colours and fonts
 */


var quad_circle_colour;
var quad_start_colour;
var quad_end_colour;
var quad_axis_colour;
var quad_grid_colour;
var quad_marker_colour;
var quad_text_colour;
var quad_text_size;
var quad_text_font;
var quad_label_text_colour;
var quad_label_text_size;
var quad_label_text_font;


// Quadrant models
var probSolveImpStyle;
var commInterperStyle;
var feelSelfControl;

// List of GPI dimensions (with scores)
var dimensionList;

// Canvas dimensions for quadrant diagrams
var quad_width;
var quad_height;

assignQuadFormating();


if (initialize()) {

    // getPage("contents");
}
else {

    alert("Unable to show GPI report");

}

function writeElement(mystr) {

    try {

        // Values of mystr:
        // 
        // 'problem_quad'
        // 'communication_quad'
        // 'feelings_quad'


        // Write contents
        textstr = "";
        textstr += "<div align='center'>";
        textstr += "<canvas id='quadrant' width='" + quad_width + "' height='" + quad_height + "' style='display: none'></canvas>";
        textstr += "<img id='quadrant_image' src='' width='" + quad_width + "' height='" + quad_height + "' style='max-width: 100%; height: auto;'/>";
        textstr += "</div>";

        // Write string to document
        document.getElementById("main").innerHTML = textstr;

        switch (mystr) {

            case "problem_quad":

                drawQuadrant(probSolveImpStyle);
                break;

            case "communication_quad":

                drawQuadrant(commInterperStyle);
                break;

            case "feelings_quad":

                drawQuadrant(feelSelfControl);
                break;

            default:

                throw "Unknown element";
                
        }       

    }
    catch (err) {

        alert(err.message + " in writeElement()");

    }
}

/*
 
    Draw quadrant diagrams
 
 */

function assignQuadFormating() {

    try {

        // Attempt to assign quadrant colours and font from CSS file

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

        /**
         * @todo Assign fonts from CSS. For now, use defaults
         */
        quad_text_size = 26;
        quad_text_font = quad_text_size + "px Arial";

        quad_label_text_colour = "#ffffff";
        quad_label_text_size = 24;
        quad_label_text_font = quad_label_text_size + "px Arial";

        // Canvas dimensions for quadrants
        quad_width = 900; //1000;
        quad_height = 700;

    }
    catch (err) {

        alert(err.message + " in assigning Quadrant element colours and font");
    }
    
}


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
        //var pad = ctx.measureText('XXXXXX').width;
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
        ctx.arc(xM, yM, rM, 0, 2 * Math.PI);
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
        dimensionList[0].SubDimensions = [
            new Dimension("Anxiety", "Relaxed", "Tense", false, 5),
            new Dimension("Hostility", "Placid", "Discontented", false, 3),
            new Dimension("Optimism", "Optimistic", "Pessimistic", false, 7),
            new Dimension("Self-Esteem", "Confident", "Self Conscious", false, 9)
        ];

        // Impulsivity
        dimensionList[1].SubDimensions = [
            new Dimension("Impulsivity", "Disciplined", "Impulsive", false, 5)
        ];

        // Extraversion
        dimensionList[2].SubDimensions = [
            new Dimension("Sociability", "Outgoing", "Reserved", false, 5),
            new Dimension("Assertiveness", "Asserting", "Accepting", false, 3),
            new Dimension("Hedonism", "Fun Loving", "Serious Minded", false, 7),
            new Dimension("Social Poise", "Socially Assured", "Socially Uncertain", false, 9)
        ];

        // Cognition
        dimensionList[3].SubDimensions = [
            new Dimension("Change Orientation", "Evolutionary", "Revolutionary", false, 5),
            new Dimension("Information Processing", "Practical", "Conceptual", false, 3),
            new Dimension("Decision Making", "Rational", "Intuitive", false, 7)
        ];

        // Agreeableness
        dimensionList[4].SubDimensions = [
            new Dimension("Affiliation", "Affiliative", "Unaffiliative", false, 5),
            new Dimension("Trust", "Trusting", "Questioning", false, 3),
            new Dimension("Conformity", "Conforming", "Dissenting", false, 7),
            new Dimension("Modesty", "Modest", "Assuming", false, 9)
        ];

        // Attainment
        dimensionList[5].SubDimensions = [
            new Dimension("Implementation Style", "Outcome", "Spontaneous", false, 5),
            new Dimension("Conscientiousness", "Conscientious", "Cursory", false, 3),
            new Dimension("Achievement Orientation", "Perfectionist", "Pragmatic", false, 7)
        ];

        // Drive
        dimensionList[6].SubDimensions = [
            new Dimension("Influence", "Persuasive", "Consensual", false, 5),
            new Dimension("Ambitiousness", "Ambitious", "Contented", false, 3),
            new Dimension("Energy", "Energetic", "Paced", false, 7)
        ];

        // Initialise quadrant models
        probSolveImpStyle = new QuadrantModel(
            dimensionList.find(x => x.UnipolarName === "Cognition"), 
            dimensionList.find(y => y.UnipolarName === "Attainment"),
            "STRATEGIST",
            "PLANNER",
            "PRACTITIONER",
            "VISIONARY"
        );

        commInterperStyle = new QuadrantModel(
            dimensionList.find(x => x.UnipolarName === "Extraversion"),
            dimensionList.find(y => y.UnipolarName === "Agreeableness"),
            "SUPPORTER",
            "ENCOURAGER",
            "CHALLENGER",
            "INDEPENDENT"
        );

        feelSelfControl = new QuadrantModel(
            dimensionList.find(x => x.UnipolarName === "Emotionality"),
            dimensionList.find(y => y.UnipolarName === "Impulsivity"),
            "CONTAINED",
            "COMPOSED",
            "ENERGISED",
            "EXPRESSIVE"
        );

        return true;

    }
    catch (err) {

        alert(err.message + " in initialize()")
    }
}

