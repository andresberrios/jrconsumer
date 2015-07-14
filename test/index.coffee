angular.module 'App', ['jrConsumer']
.run ['jrConsumer', (jrConsumer) ->
  window.jrConsumer = jrConsumer

  clearTimestamps = (attrs) ->
    delete attrs.created_at
    delete attrs.updated_at
    attrs

  window.Campaign = jrConsumer
    type: 'campaigns'
    url: 'http://localhost:3000/api/v1/campaigns/:id.json'
    defaultParams: id: '@id'
    attributesSerializer: clearTimestamps

  window.User = jrConsumer
    type: 'users'
    url: 'http://localhost:3000/api/v1/users/:id.json'
    defaultParams: id: '@id'
    attributesSerializer: clearTimestamps

  u = User.get id: 1 #, include: 'campaigns'
  u.$promise.then ->
    u.$update()
]

angular.element(document).ready ->
  angular.bootstrap(document, ['App'])
