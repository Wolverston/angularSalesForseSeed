angular.module('template')
.service('sfService', function ($rootScope, $q, $log, $cookies) {

    // var auth = {};
    // if ($cookies.get('publicToken')) {
    //     auth.token = $cookies.get('publicToken'); 
    // }else{              
    //     auth.token = ''; 
    // }

  var sf = Visualforce.remoting.Manager.invokeAction;
  // var sf = '';

  function invokeAction(method, params, info) {
    info = info || {buffer: false, escape: false, timeout: 120000};
    // params = params ? [auth.token].concat(params) : [auth.token];   
    // if ($cookies.get('publicToken')) {
    //      params[0] = $cookies.get('publicToken');
    // }
    if (params) {
        var inputs = [method].concat(params).concat([callback, info]);
    }else{
        var inputs = [method].concat([callback, info]);
    }
    
    var defer = $q.defer();
    sf.apply(Visualforce.remoting.Manager, inputs);

    return defer.promise;

    function callback(result, event) {
        if (event.status) {                
                defer.resolve(angular.fromJson(result));
            } else {
                defer.reject.apply(defer, arguments);
            }
            $rootScope.$apply();
        }
    }
    return invokeAction;

})