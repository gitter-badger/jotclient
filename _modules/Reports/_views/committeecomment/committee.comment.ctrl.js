(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeCommentController', CommitteeCommentController);

    CommitteeCommentController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CommitteeCommentFactory'];

    function CommitteeCommentController($scope, $http, $filter, $timeout, AppFactory, Loans, CommitteeCommentFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        var columnDefs = [
            {
                headerName: 'Member',
                field: 'committee_member',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerGroup: 'Crop',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Loan Addendum',
                headerGroup: 'Loan',
                headerName: 'Addendum',
                field: 'loan_addendum',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.loan_addendum){
                        return "<span style='color:#007700'>+" + moment(params.data.loan_date).format('MM/DD/YYYY') + "</span>";
                    } else {
                        return "<span style='color:#000000'>&nbsp;" + moment(params.data.loan_date).format('MM/DD/YYYY') + "</span>";
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: 'Loan',
                headerName: 'Dist',
                field: 'dist',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: '',
                headerName: 'Vote',
                field: 'committee_vote',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.committee_vote){
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-up" style="color:#007700;"></span></div>';
                    } else {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-down"  style="color:#770000;"></span></div>';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Class',
                field: 'account_classification',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Log',
                field: 'committee_log',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 220
            }
        ];

        $scope.getModel = function(){
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
            }
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.showToolPanel($scope.tools);
            }
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false
        };

        $scope.reduced = CommitteeCommentFactory.getData(Loans);
        console.log('reduced', $scope.reduced);

        var sort = [
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'committee_member', sort: 'asc'},
        ];
        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();

        if ($scope.gridOptions.api) {
            $scope.gridOptions.api.onNewRows();
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.tools = false;
    }

})();
