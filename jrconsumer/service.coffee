{Store, Presenter} = require('yayson')()
identityFn = (a) -> a

angular.module 'jrConsumer', ['ngResource']
.factory 'jrConsumer', ['$resource', ($resource) ->
  ({
    type, url, defaultParams, actions, $resourceOptions
    attributesSerializer, relationships
  }) ->
    unless angular.isString type
      throw new TypeError "Invalid 'type' parameter, expected string"
    defaultParams ?= {}
    actions ?= {}
    attributesSerializer ?= identityFn
    unless angular.isFunction attributesSerializer
      throw new TypeError "Invalid 'attributesSerializer' parameter, expected function"
    relationships ?= {}

    actions = angular.extend {}, actions,
      query:
        method: 'GET'
        isArray: true
      get: method: 'GET'
      save: method: 'POST'
      update: method: 'PUT'
      remove: method: 'DELETE'
      delete: method: 'DELETE'

    class jrPresenter extends Presenter
      type: type
      attributes: -> attributesSerializer super
      relationships: ->
        for name, consumer of relationships
          relationships[name] = consumer.presenter
        relationships

    store = new Store()

    transformRequestFunction = (data, headers) ->
      data = jrPresenter.render data
      angular.toJson data
    transformResponseFunction = (data, headers) ->
      result = store.sync angular.fromJson data
      store.reset()
      result
    for action, config of actions
      config.transformRequest = transformRequestFunction
      config.transformResponse = transformResponseFunction
    Class = $resource url, defaultParams, actions, $resourceOptions
    Class.presenter = jrPresenter
    Class
]
