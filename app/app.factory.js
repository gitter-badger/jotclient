(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AppFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$stateParams', 'toastr', 'API_URL'];

    /* @ngInject */
    function AppFactory($http, $q, $state, $stateParamas, toastr, API_URL) {
        var publicAPI = {
            deleteIt: deleteIt,
            getAll: getAll,
            getOne: getOne,
            inArray: inArray,
            nullOrNot: nullOrNot,
            patchIt: patchIt,
            postIt: postIt,
            putIt: putIt,
            returnColor: returnColor,
            sumThese: sumThese
        };
        return publicAPI;

        //////////
        function deleteIt(npoint, id) {
            return $http.delete(API_URL+npoint+'/'+id);
        }
        function getAll(npoint) {
            return $http.get(API_URL+npoint);
        }
        function getOne(npoint, id) {
            return $http.get(API_URL+npoint+'/'+id);
        }
        function inArray(needle, haystack) {
            if (haystack.indexOf(needle) === -1) {
                return false;
            }
            return true;
        }
        function nullOrNot(obj) {
            return !angular.isDefined(obj) || obj===null;
        }
        function patchIt(npoint, id, data) {
            return $http.patch(API_URL+npoint+'/'+id, data);
        }
        function postIt(npoint, data) {
            return $http.post(API_URL+npoint, data);
        }
        function putIt(npoint, id, data) {
            return $http.put(API_URL+npoint+'/'+id, data);
        }
        function returnColor(val) {
            /* 0-Gray, 1-Green, 2-Yellow, 3-Red, 4-Blue */
            /* 5-Orange, 6-Yellow+, 7-Orange+, 8-Red+ */
            var colors = ['gray', 'green', 'yellow', 'red', 'blue', 'orange', 'yellow_inner', 'orange_inner', 'red_inner'];
            return colors[val] || 'gray';
        }
        function sumThese(a, b) {
            return a + b;
        }
    } // end factory

})();