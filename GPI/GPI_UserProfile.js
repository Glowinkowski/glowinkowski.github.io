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

    constructor(_Email, _Password, _FirstName, _LastName, _GenderId = 1, _AgeRangeId = 1, _EthnicityId = 1) {

        this.Email = _Email;
        this.Password = _Password;
        this.FirstName = _FirstName;
        this.LastName = _LastName;
        this.GenderId = _GenderId;
        this.AgeRangeId = _AgeRangeId;
        this.EthnicityId = _EthnicityId;
    }

    isValid() {

        return true;
    }
}

function submitUserProfile() {

    try {

        var user_profile = new UserProfile(
            document.getElementById("email").value,
            document.getElementById("pwd").value,
            document.getElementById("first_name").value,
            document.getElementById("last_name").value,
            document.getElementById("gender").value,
            document.getElementById("age_range").value,
            document.getElementById("ethnicity").value
        )

        postUserProfile(user_profile);

    }
    catch (err) {

        alert(err.message + " in submitUserProfile()");
    }
}


function postUserProfile(user_profile) {

    try {

        // TODO: Change the url in the live version
        var url = "https://localhost:44369/api/user/";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            try {

                // readyState == 4 : The operation is complete.
                if (this.readyState == 4) {

                    if (this.status == 200) {

                        // The text from the API call
                        var responseText = this.responseText;
                        var textstr = responseText;

                        // Write string to document
                        document.getElementById("GPI_content").innerHTML = textstr;

                    }
                    else {

                        alert("Unable to get a response from " + url);
                    }

                }

            }
            catch (err) {

                alert(err.message + " in xhttp.onreadystatechange()");
            }
            
            
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user_profile));

    }
    catch (err) {

        alert(err.message + " in postUserProfile()");
    }
}

