(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('ActivityDetailFactory', ActivityDetailFactory);

    ActivityDetailFactory.$inject = [];

    /* @ngInject */
    function ActivityDetailFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            console.log('ActivityDetailFactory.loans', loans);

            var groupByCrop = _.partial(_.ary(_.groupBy, 2), _, 'fins.crop_acres');

            var retro = _.map(loans, function (item) {
                var data = {};

                data.has_addendum = item.has_addendum;
                data.is_cross_collateralized = item.is_cross_collateralized;
                data.bankruptcy_history = item.bankruptcy_history;
                data.required_3party = item.required_3party;
                data.added_land = item.added_land;
                data.controlled_disbursement = item.controlled_disbursement;
                data.num_attachments = item.attachments.length;

                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;

                if (item.season == 'S') {
                    data.season = 'Spring';
                } else if (item.season == 'F') {
                    data.season = 'Fall';
                }

                data.analyst = item.analyst;
                data.analyst_abr = item.analyst_abr;
                data.farmer = item.farmer.farmer;
                data.applicant = item.applicant.applicant;
                data.loan_type = item.loan_type;
                data.loantype_abr = item.loantype_abr;
                data.dist = item.distributor.distributor;
                data.app_date = item.app_date;
                data.due_date = item.due_date;

                data.agency = item.agencies;
                data.status_id = item.status.id;

                data.commit_arm = item.financials.commit_arm;
                data.commit_dist = item.financials.commit_dist;

                data.account_classification = item.account_classification;

                data.int_percent_arm = item.fins.int_percent_arm;
                data.int_percent_dist = item.fins.int_percent_dist;

                /*
                 data.qb_date = item.;
                 data.qb_type = item.;
                 data.qb_cat = item.;
                 data.qb_amount = item.;
                 */

                return data;
            });
            console.log('ActivityDetailFactory.retro', retro);
            return retro;
        }
    } // end factory
})();