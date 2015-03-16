$("#scroll_area").on('resize scroll', onVisibilityChange);
//Trigger a scroll event so the status text is initialzed when the page loads.
$("#scroll_area").trigger('scroll');

function isElementVisible(element, scrollArea) {

    var elementLeft = $(element).position().left;
    var elementRight = elementLeft + $(element).outerWidth();
    var scrollAreaLeft = $(scrollArea).position().left;
    var scrollAreaRight = scrollAreaLeft + $(scrollArea).outerWidth();

    return (elementLeft > scrollAreaLeft && elementLeft < scrollAreaRight) 
        || (elementRight > scrollAreaLeft && elementRight < scrollAreaRight);
}

function onVisibilityChange(event) {


    $("#color_count").html($(".color").length);

    var colors = ["#red", "#white", "#blue", "#green", "#brown"];
    $.each(colors, function (index, value) {
        $(value + "_status").html(
        isElementVisible($(value), event.target) ? 'visible' : 'not visible');
    });


    if (isElementVisible($(".color:last"), event.target)) {
        addNewColorDiv($(".color:last"));
    }
}

function addNewColorDiv(element) {
    var parent = element.parent();
    var color = getRandomColor();
    var html = '<div id="' + color + '" class="color" style="background-color: #' + color + ';"></div>';
    var el = $.parseHTML(html);

    parent.width(parent.width() + element.width());
    parent.append(el);
}

//http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
