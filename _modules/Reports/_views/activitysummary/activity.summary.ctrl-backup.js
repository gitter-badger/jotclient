(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ActivitySummaryController', ActivitySummaryController);

    ActivitySummaryController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory'];

    function ActivitySummaryController($scope, $http, $filter, $timeout, AppFactory) {
        $scope.AppFactory = AppFactory;

        var columnDefs = [
            {
                headerTooltip: 'Icons',
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165
            },
            {
                headerTooltip: 'Region',
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.region.toUpperCase() === 'N'){
                        return 'North';
                    } else if (params.data.region.toUpperCase() === 'S'){
                        return 'South';
                    } else if (params.data.region.toUpperCase() === 'E'){
                        return 'East';
                    } else if (params.data.region.toUpperCase() === 'W'){
                        return 'West';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85
            },
            {
                headerTooltip: 'Location',
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerTooltip: 'Crop Year',
                headerGroup: 'Crop',
                headerName: 'Year',
                //headerGroupShow: 'closed',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85,
                filter: 'number'
            },
            {
                headerTooltip: 'Crop Season',
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'season',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.season.toUpperCase() == 'F'){
                        return 'Fall';
                    } else {
                        return 'Spring';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 95
            },
            {
                headerTooltip: 'Loan Analyst',
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Farmer',
                headerName: 'Farmer',
                field: 'farmer',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Loan Type',
                headerGroup: 'Loan',
                headerName: 'Type',
                //headerGroupShow: 'closed',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Distributor',
                headerGroup: 'Loan',
                headerName: 'Dist',
                //headerGroupShow: 'closed',
                field: 'dist',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Loan Date',
                headerGroup: 'Loan',
                field: 'loan_date',
                headerName: 'Date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.loan_date).format('MM/DD/YYYY');
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Status',
                headerName: 'Status',
                field: 'status_id',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerTooltip: 'ARM Commitment',
                headerGroup: 'Commitment',
                headerName: 'ARM',
                field: 'commit_arm',
                cellClass: function(params) {
                    return (params.data.commit_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.commit_arm, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 110
            },
            {
                headerTooltip: 'Loan Rate',
                headerGroup: '',
                headerName: 'Rate',
                field: 'int_percent_arm',
                cellClass: function(params) {
                    return (params.data.int_percent_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexPercent')(params.data.int_percent_arm, 2);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Fees',
                headerGroup: '',
                headerName: 'Fees',
                field: 'fee_total',
                cellClass: function(params) {
                    return (params.data.fee_total ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.fee_total, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            }
        ];

        $scope.hideIcons = function(){
            $scope.icons = !$scope.icons;
            if ($scope.icons){
                $scope.gridOptions.pinnedColumnCount = $scope.pins - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pins;
            }
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
        }

        $scope.toggleHorizontal = function(){
            $scope.horizontal = !$scope.horizontal;
            if ($scope.horizontal){
                $scope.pin = 0;
            } else {
                if ($scope.icons) {
                    $scope.pin = $scope.pins - 1;
                } else {
                    $scope.pin = $scope.pins;
                }
            }
            $scope.gridOptions.pinnedColumnCount = $scope.pin;
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            pinnedColumnCount: $scope.pin,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false
        };

        $http.get("json/activity.detail.json")
            .then(function (res) {
                $scope.pins = 8;
                $scope.pin = 0;
                $scope.gridOptions.rowData = res.data;
                $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
                $scope.gridOptions.api.onNewRows();
                $scope.sortKeys = [
                    {field: 'region', sort: 'asc'},
                    {field: 'location', sort: 'asc'},
                    {field: 'crop_year', sort: 'asc'},
                    {field: 'season', sort: 'asc'},
                    {field: 'analyst', sort: 'asc'},
                    {field: 'farmer', sort: 'asc'},
                    {field: 'applicant', sort: 'asc'},
                    {field: 'dist', sort: 'asc'},
                    {field: 'loan_type', sort: 'asc'},
                ];
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
                $scope.icons = false;
                $scope.tools = false;
            });
    }

})();
