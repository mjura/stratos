/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.ServiceUsageEvents', new ServiceUsageEventsApi($http));
  }

  function ServiceUsageEventsApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(ServiceUsageEventsApi.prototype, {

   /*
    * List Service Usage Events
    * Events are sorted by internal database IDs. This order may differ from created_at.
    * Events close to the current time should not be processed because other events may still have open
    * transactions that will change their order in the results.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_usage_events/list_service_usage_events.html
    */
    ListServiceUsageEvents: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_usage_events';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Purge and reseed Service Usage Events
    * Destroys all existing events. Populates new usage events, one for each existing service instance.
    * All populated events will have a created_at value of current time.
    * There is the potential race condition if service instances are currently being created or deleted.
    * The seeded usage events will have the same guid as the service instance.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_usage_events/purge_and_reseed_service_usage_events.html
    */
    PurgeAndReseedServiceUsageEvents: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_usage_events/destructively_purge_all_and_reseed_existing_instances';
      config.method = 'POST';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Retrieve a Particular Service Usage Event
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_usage_events/retrieve_a_particular_service_usage_event.html
    */
    RetrieveServiceUsageEvent: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_usage_events/' + guid + '';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    }

  });
  /* eslint-enable camelcase */

})();
