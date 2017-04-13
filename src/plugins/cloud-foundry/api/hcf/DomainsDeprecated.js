/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.DomainsDeprecated', new DomainsDeprecatedApi($http));
  }

  function DomainsDeprecatedApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(DomainsDeprecatedApi.prototype, {

   /*
    * Create a Domain owned by the given Organization (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/create_a_domain_owned_by_the_given_organization_(deprecated).html
    */
    CreateDomainOwnedByGivenOrganizationDeprecated: function (value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains';
      config.method = 'POST';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Create a Shared Domain (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/create_a_shared_domain_(deprecated).html
    */
    CreateSharedDomainDeprecated: function (value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains';
      config.method = 'POST';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Delete a Particular Domain (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/delete_a_particular_domain_(deprecated).html
    */
    DeleteDomainDeprecated: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains/' + guid + '';
      config.method = 'DELETE';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * List all Domains (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/list_all_domains_(deprecated).html
    */
    ListAllDomainsDeprecated: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * List all Spaces for the Domain (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/list_all_spaces_for_the_domain_(deprecated).html
    */
    ListAllSpacesForDomainDeprecated: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains/' + guid + '/spaces';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

   /*
    * Retrieve a Particular Domain (deprecated)
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/domains__deprecated_/retrieve_a_particular_domain_(deprecated).html
    */
    RetrieveDomainDeprecated: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/domains/' + guid + '';
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
