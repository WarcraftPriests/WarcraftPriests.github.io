function getQueryParameter() {
    return new URLSearchParams(window.location.search);
}

function manipulateUrl(talentQueryParm, talentQueryValue, simsQueryParm, simsQueryValue, covenantsQueryParm, covenantsQueryValue, fightStyleQueryParm, fightStyleQueryValue) {
    var oldParm = getQueryParameter();
    var paramterUrl = buildParameterUrl(talentQueryParm, talentQueryValue, simsQueryParm, simsQueryValue, covenantsQueryParm, covenantsQueryValue, fightStyleQueryParm, fightStyleQueryValue);
    var newParams = new URLSearchParams(paramterUrl);
    
    if(paramterUrl.length > 1
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

function buildParameterUrl(talentQueryParm, talentQueryValue, simsQueryParm, simsQueryValue, covenantsQueryParm, covenantsQueryValue, fightStyleQueryParm, fightStyleQueryValue) {
    var result = "?";
    var talentQuery = talentQueryParm + "=" + talentQueryValue;
    var simsQuery = simsQueryParm + "=" + simsQueryValue;
    var covenantsQuery = covenantsQueryParm + "=" + covenantsQueryValue;
    var fightStyleQuery = fightStyleQueryParm + "=" + fightStyleQueryValue;

    if(talentQueryValue != null && talentQueryValue.length > 0) {
        result += talentQuery;
    }
    if(simsQueryValue != null && simsQueryValue.length > 0) {
        result += "&" + simsQuery;
    }
    if(covenantsQueryValue != null && covenantsQueryValue.length > 0) {
        result += "&" + covenantsQuery;
    }
    if(fightStyleQueryValue != null && fightStyleQueryValue.length > 0) {
        result += "&" + fightStyleQuery;
    }

    return result;
}