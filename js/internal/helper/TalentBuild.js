$(".talentBuild").click(function () {
    $header = $(this);
    $content = $header.next();
    //$content = $temp.next();
    $content.slideToggle(500, function () {
        $header.text(function () {
            return $content.is(":visible") ? "Hide Talent Build" : "Show Talent Build";
        });
    });
});

function replaceTalentId(currTalent, currFightStyle) {
    let selectedFightStyle = undefined;
    if (currFightStyle == 'twotarget') {
        selectedFightStyle = '2t';
    } else if (currFightStyle == 'threetarget') {
        selectedFightStyle = '3t';
    } else if (currFightStyle == 'fourtarget') {
        selectedFightStyle = '4t';
    } else if (currFightStyle == 'dungeons') {
        selectedFightStyle = 'dungeons';
    } else {
        selectedFightStyle = currFightStyle.toLowerCase();
    }

    document.getElementById(talentBuildIdDiv).innerHTML = document.getElementById(talentBuildIdDiv).innerHTML.replaceAll('%talentId%',configData['builds'][currTalent.replaceAll('_', '-')][selectedFightStyle])
    document.getElementById(talentBuildContentDiv).innerHTML = document.getElementById(talentBuildContentDiv).innerHTML.replaceAll('%talentId%',configData['builds'][currTalent.replaceAll('_', '-')][selectedFightStyle])
}

function copyURI(evt) {
    evt.preventDefault();
        navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {
        alert("Talent id copied to the clipboard");
    }, () => {
      /* clipboard write failed */
    });
}
