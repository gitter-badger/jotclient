(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('QuestsController', QuestsController);

        QuestsController.$inject = ['$rootScope', '$scope'];

        function QuestsController($rootScope, $scope){
            //console.log('Quests', $scope.loan.quests);
        } // end controller
})();