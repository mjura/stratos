/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.RoutesMapping', new RoutesMappingApi($http));
  }

  function RoutesMappingApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(RoutesMappingApi.prototype, {

   /*
    * Delete a Particular Route Mapping
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/routes_mapping/delete_a_particular_route_mapping.html
    */
    DeleteRouteMapping: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/route_mappings/' + guid + '';
      config.method = 'DELETE';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * List all Route Mappings
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/routes_mapping/list_all_route_mappings.html
    */
    ListAllRouteMappings: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/route_mappings';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Mapping an App and a Route
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/routes_mapping/mapping_an_app_and_a_route.html
    */
    MappingAppAndRoute: function (value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/route_mappings';
      config.method = 'POST';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Retrieve a Particular Route Mapping
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/routes_mapping/retrieve_a_particular_route_mapping.html
    */
    RetrieveRouteMapping: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/route_mappings/' + guid + '';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Updating a Route Mapping
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/routes_mapping/updating_a_route_mapping.html
    */
    UpdateRouteMapping: function (guid, value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/route_mappings/' + guid + '';
      config.method = 'PUT';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    }

  });
  /* eslint-enable camelcase */

})();
