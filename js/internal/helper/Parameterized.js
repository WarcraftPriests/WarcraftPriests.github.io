function getQueryParameter() {
    return new URLSearchParams(window.location.search);
}

function manipulateUrl(params) {
    var oldParm = getQueryParameter();
    const nonEmptyParams = Object.entries(params).reduce((prev, [key, value]) => {
        return value ? { ...prev, [key]: value } : prev
    }, {})
    var newParams = new URLSearchParams(nonEmptyParams);

    if(newParams.size > 0
        && !compareParameters(oldParm, newParams)) {
        window.location.search = newParams;
    }
}

function compareParameters(oldParm, newParms) {
    if(oldParm.toString().localeCompare(newParms.toString()) == 0) {
        return true;
    }
    return false;
}
