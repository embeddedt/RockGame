
var rockNames = [
    "Coal", /**/
    "Shale", /**/
    "Basalt", /**/
    "Sandstone", /**/
    "Obsidian", /**/
    "Pumice", /**/
    "Limestone", /**/
    "Magnatite", /**/
    "Schist", /**/
    "Graphite", /**/
    "Marble", /**/
    "Quartz", /**/
    "Chalk", /**/
    "Granite", /**/
    "Slate" /**/
];

var rockDescriptions = [
    "Color: very dull black\nHardness: 2\nMade of carbon, hydrogen, and oxygen.\nHas a yellow color and shiny smoke when burned.",
    "Color: mainly gray\nHardness: 1\nMade of clay, mica, and quartz.\nIs created from large mud deposits.",
    "Color: black or gray\nHardness: 5.5-6\nMade of pyroxene and olivine.\nMakes up most of the ocean floor.",
    "Color: red or tan\nHardness: 4-7.5\nMade of quartz, feldspar, and mica.\nUsed for paving and floors.",
    "Color: black (glassy)\nHardness: 5.5\nMade of rhyolite and andesite.\nFormed when magma cools quickly",
    "Color: grayish or beige\nHardness: 5.5\nMade of ash, glass, dust, and gas.\nFormed when magma rapidly leaves a volcano and cools.",
    "Color: white, gray, or black\nHardness: 3-4\nMade of calcium from coral and sea shells.\nSlowly dissolves from acid rain.",
    "Color: reddish-brown\nHardness: 5.5-6.5\nMade of iron-oxide.\nMakes up magnets.\n",
    "Color: silver, black, white, and green\nHardness: 4-5\nMade of quartz and mica.\nWhen transparent it is used in lamps.",
    "Color: grey and black\nHardness: 1\nMade of calcium.\nUsed in pencils.\n",
    "Color: gray or white\nHardness: 4-7\nMade of recrystallized limestone.\nUsed in statues and buildings.\n",
    "Color: white, yellow, green, purple, or black\nHardness: 7\nMade of silicon dioxide\nMakes a nice crystal.\n",
    "Color: white or gray\nHardness: 3\nFine-grained, crumbly, and filled with holes.\nFizzes when hydrochloric acid is added.",
    "Color: speckled gray, black, pink, and clear\nHardness: 6-7\nMade of quartz, feldspar, and mica.\nOne of the hardest building stones.",
    "Color: dark gray (shiny)\nHardness: 2.5-5.5\nVery fine-grained.\nUsed in shingles and floors."
];

var tries = 0;
var numRight = 0;
var currentRock = -1;

var applause;
var beep;
var yourock;

function nextRock() {
    tries = 0;
    applause.pause();
    beep.pause();
    try { $("#goodJobDialog").dialog("close"); } catch(e) {}
    try { $("#oopsDialog").dialog("close"); } catch(e) {}
    try { $("#instructionDialog").dialog("close"); } catch(e) {}
    currentRock++;
    $("#score-total").text(currentRock);
    if(currentRock === rockDescriptions.length) {
        yourock.play();
        $("#endDialog").dialog({modal: true });
        return;
    }
    $("#rock-details").text(rockDescriptions[currentRock]); 
    $("#rock-img").attr("src", rockNames[currentRock].toLowerCase() + ".jpg");
}

$(function() {
    applause = new Audio("applause.mp3");
    beep = new Audio("beep.mp3");
    yourock = new Audio("yourock.mp3");
    $(".rock-button").click(function() {
        if($(this).text() === rockNames[currentRock]) {
            applause.currentTime = 0;
            applause.play();
            $("#goodJobDialog").dialog({ modal: true, height: 'auto' });
            numRight++;
            $("#score-right").text(numRight);
        } else {
            if(tries == 2) {
                beep.currentTime = 0;
                beep.play();
                $("#oopsText").text(rockNames[currentRock]);
                $("#oopsDialog").dialog({ modal: true, height: 'auto' });
            } else {
                tries++;
                $("#tryAgainDialog").dialog({ modal: true });
            }
        }
    });
    $("#instructionDialog").dialog({ modal: true, height: 'auto' });    
});
