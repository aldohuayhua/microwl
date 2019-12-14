var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var response = [{
    name: "Kenny",
    photo: "https://upload.wikimedia.org/wikipedia/en/6/6f/KennyMcCormick.png",
    scores: [1, 2, 3, 4, 5, 4, 3, 2, 1, 0]
}, {
    name: "Cartman",
    photo: "https://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png",
    scores: [1, 2, 3, 4, 5, 5, 1, 3, 2, 0]

},{
    name: "Stan  ",
    photo: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj-ieLb7pnmAhVsplkKHZSaA80QjRx6BAgBEAQ&url=https%3A%2F%2Fsouthpark.fandom.com%2Fwiki%2FStan_Marsh&psig=AOvVaw22Cy44HE3HHg2qPOfNvFNx&ust=1575475762682111",
    scores: [5, 3, 3, 4, 5, 2, 3, 3, 4, 2]

},{
    name: "Butters",
    photo: "http://southparkstudios.mtvnimages.com/shared/characters/kids/butters-stotch.png?height=165",
    scores: [1,1,1,1,1,1,1,1,1,1]
}];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/api/response", function (req, res) {
    return res.json(response);
});
app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});

app.get("/api/response/:name", function (req, res) {
    var chosen = req.params.name;

    console.log(chosen);
    for (var i = 0; i < response.length; i++) {
        if (chosen = response[i].name) {
            return res.json(response[i]);
        }
    }
    return res.json(false);
});

var friendsData = response;


// module.exports = function (app){
    // app.get("/api/response", function(req, res){
    //     res.json(friendsData);
    // });
app.post("/api/response", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newCharacter = req.body;
        var userScore = newCharacter.scores;
        var totalDifference;
        var bestMatch = {
            name:"",
            photo:"",
            difference: 100
        };
        for(var i=0; i< response.length; i++){
            totalDifference=0;
            for(var j=0;j<response[i].scores.length; j++){
                totalDifference += Math.abs(response[i].scores[j] - userScore[j]);
                if(totalDifference <= bestMatch.difference){
                    bestMatch.name = response[i].name,
                    bestMatch.photo = response[i].photo,
                    bestMatch.difference = totalDifference
                }
            }
        };

        // Using a RegEx Pattern to remove spaces from user
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newCharacter.name = newCharacter.name.replace(/\s+/g, "").toLowerCase();
      
        console.log(newCharacter);
      
        response.push(newCharacter);
      
        // res.json(newCharacter);
        res.json(bestMatch);
        console.log("best match is :" + bestMatch.name)
      });
      
// }

