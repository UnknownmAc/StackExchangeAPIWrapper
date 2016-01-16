/**
 * Created by niskumar on 16/01/16.
 */


/**
 *
 * @returns {string}
 * @param queryParams
 */
SW.helperMethods.getUrlForAllUserDetails = function(queryParams) {
    var url = SW.constants.URL_ROOT;
    var domain = queryParams.hasOwnProperty("domain") ? queryParams.domain : SW.config.DOMAIN;

    url += '?key=' + SW.config.APP_KEY;
    url += (queryParams.hasOwnProperty("page") ? ('?page=' + queryParams.page) : '') ;
    url += (queryParams.hasOwnProperty("pagesize") ? ('?pagesize=' + queryParams.pagesize) : '') ;
    url += (queryParams.hasOwnProperty("fromdate") ? ('?fromdate=' + queryParams.fromdate) : '') ;
    url += (queryParams.hasOwnProperty("todate") ? ('?todate=' + queryParams.todate) : '') ;
    url += (queryParams.hasOwnProperty("order") ? ('?order=' + queryParams.order) : '') ;
    url += (queryParams.hasOwnProperty("min") ? ('?min=' + queryParams.min) : '') ;
    url += (queryParams.hasOwnProperty("max") ? ('?max=' + queryParams.max) : '') ;
    url += (queryParams.hasOwnProperty("sort") ? ('?sort=' + queryParams.sort) : '') ;
    url += (queryParams.hasOwnProperty("inname") ? ('?inname=' + queryParams.inname) : '') ;
    url += (queryParams.hasOwnProperty("filter") ? ('?filter=' + queryParams.filter) : '') ;
    url += '&site=' + domain;

    return url;
};

/*
 * @param: configOptions
 *   {
 *   app_key : String,
 *   domain : String
 *    }
 */
SW.methods.init = function(configOptions) {
    if(!configOptions.app_key) {
        console.error(SW.messages.ERROR_EMPTY_APP_KEY);
        return;
    }

    if(!configOptions.domain) {
        console.error(SW.messages.ERROR_EMPTY_DOMAIN);
        return;
    }

    SW.config.APP_KEY = configOptions.app_key;
    SW.config.DOMAIN = configOptions.domain;
}

/*
 *  @param: detailParams
 *  {
 *  domain : String,
 *  filters : String,
 *  page : integer [range(1, 999)],
 *  pagesize : integer [range(1, 999)],
 *  fromdate : Date,
 *  todate : Date,
 *  order : String [(asc, desc)],
 *  min : integer [range(0, 999)],
 *  max : integer [range(0, 999)],
 *  sort : String [Values: [reputation, creation, name, modified]],
 *  inname : String
 *  }
 */
SW.methods.getUsersDetail = function(detailParams, successCallback, errorCallback) {
    var url = SW.helperMethods.getUrlForAllUserDetails(detailParams);
    var userInfo = null;

    $.ajax({
        method: 'GET',
        url: url,
        async: false,
        success: function(response) {
            userInfo = response.items[0];
            successCallback(userInfo);
        },
        error: function(e) {
            console.error(e);
            errorCallback(e);
        }
    });
}

