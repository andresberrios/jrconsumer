/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Presenter, Store, identityFn, ref,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ref = __webpack_require__(2)(), Store = ref.Store, Presenter = ref.Presenter;

	identityFn = function(a) {
	  return a;
	};

	angular.module('jrConsumer', ['ngResource']).factory('jrConsumer', [
	  '$resource', function($resource) {
	    return function(arg) {
	      var $resourceOptions, Class, action, actions, attributesSerializer, config, defaultParams, jrPresenter, relationships, store, transformRequestFunction, transformResponseFunction, type, url;
	      type = arg.type, url = arg.url, defaultParams = arg.defaultParams, actions = arg.actions, $resourceOptions = arg.$resourceOptions, attributesSerializer = arg.attributesSerializer, relationships = arg.relationships;
	      if (!angular.isString(type)) {
	        throw new TypeError("Invalid 'type' parameter, expected string");
	      }
	      if (defaultParams == null) {
	        defaultParams = {};
	      }
	      if (actions == null) {
	        actions = {};
	      }
	      if (attributesSerializer == null) {
	        attributesSerializer = identityFn;
	      }
	      if (!angular.isFunction(attributesSerializer)) {
	        throw new TypeError("Invalid 'attributesSerializer' parameter, expected function");
	      }
	      if (relationships == null) {
	        relationships = {};
	      }
	      actions = angular.extend({}, actions, {
	        query: {
	          method: 'GET',
	          isArray: true
	        },
	        get: {
	          method: 'GET'
	        },
	        save: {
	          method: 'POST'
	        },
	        update: {
	          method: 'PUT'
	        },
	        remove: {
	          method: 'DELETE'
	        },
	        "delete": {
	          method: 'DELETE'
	        }
	      });
	      jrPresenter = (function(superClass) {
	        extend(jrPresenter, superClass);

	        function jrPresenter() {
	          return jrPresenter.__super__.constructor.apply(this, arguments);
	        }

	        jrPresenter.prototype.type = type;

	        jrPresenter.prototype.attributes = function() {
	          return attributesSerializer(jrPresenter.__super__.attributes.apply(this, arguments));
	        };

	        jrPresenter.prototype.relationships = function() {
	          var consumer, name;
	          for (name in relationships) {
	            consumer = relationships[name];
	            relationships[name] = consumer.presenter;
	          }
	          return relationships;
	        };

	        return jrPresenter;

	      })(Presenter);
	      store = new Store();
	      transformRequestFunction = function(data, headers) {
	        data = jrPresenter.render(data);
	        return angular.toJson(data);
	      };
	      transformResponseFunction = function(data, headers) {
	        var result;
	        result = store.sync(angular.fromJson(data));
	        store.reset();
	        return result;
	      };
	      for (action in actions) {
	        config = actions[action];
	        config.transformRequest = transformRequestFunction;
	        config.transformResponse = transformResponseFunction;
	      }
	      Class = $resource(url, defaultParams, actions, $resourceOptions);
	      Class.presenter = jrPresenter;
	      return Class;
	    };
	  }
	]);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Adapter, Q, adapters, lookupAdapter, presenter, presenterFactory, tryRequire, utils, _;

	tryRequire = function(dep) {
	  try {
	    return __webpack_require__(6)(dep);
	  } catch (_error) {
	    return void 0;
	  }
	};

	this.window || (this.window = {});

	Q = this.window.Q;

	_ = this.window._;

	Q || (Q = tryRequire('q'));

	_ || (_ = tryRequire('lodash/dist/lodash.underscore'));

	_ || (_ = tryRequire('underscore'));

	utils = __webpack_require__(9)(_, Q);

	Adapter = __webpack_require__(5);

	adapters = __webpack_require__(3);

	presenterFactory = __webpack_require__(7);

	lookupAdapter = function(nameOrAdapter) {
	  return adapters[nameOrAdapter] || Adapter;
	};

	presenter = function(options) {
	  var adapter;
	  if (options == null) {
	    options = {};
	  }
	  adapter = lookupAdapter(options.adapter);
	  return presenterFactory(utils, adapter);
	};

	module.exports = function(_arg) {
	  var adapter;
	  adapter = (_arg != null ? _arg : {}).adapter;
	  return {
	    Store: __webpack_require__(8)(utils),
	    Presenter: presenter({
	      adapter: adapter
	    }),
	    Adapter: Adapter
	  };
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  sequelize: __webpack_require__(4)
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Adapter, SequelizeAdapter,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Adapter = __webpack_require__(5);

	SequelizeAdapter = (function(_super) {
	  __extends(SequelizeAdapter, _super);

	  function SequelizeAdapter() {
	    return SequelizeAdapter.__super__.constructor.apply(this, arguments);
	  }

	  SequelizeAdapter.get = function(model, key) {
	    if (model != null) {
	      return model.get(key);
	    }
	  };

	  return SequelizeAdapter;

	})(Adapter);

	module.exports = SequelizeAdapter;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Adapter;

	Adapter = (function() {
	  function Adapter() {}

	  Adapter.get = function(model, key) {
	    if (key) {
	      return model[key];
	    }
	    return model;
	  };

	  Adapter.id = function(model) {
	    return "" + (this.get(model, 'id'));
	  };

	  return Adapter;

	})();

	module.exports = Adapter;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./yayson": 2,
		"./yayson.js": 2,
		"./yayson/adapter": 5,
		"./yayson/adapter.js": 5,
		"./yayson/adapters/index": 3,
		"./yayson/adapters/index.js": 3,
		"./yayson/adapters/sequelize": 4,
		"./yayson/adapters/sequelize.js": 4,
		"./yayson/presenter": 7,
		"./yayson/presenter.js": 7,
		"./yayson/store": 8,
		"./yayson/store.js": 8,
		"./yayson/utils": 9,
		"./yayson/utils.js": 9
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(utils, adapter) {
	  var Presenter;
	  Presenter = (function() {
	    var buildLinks;

	    buildLinks = function(link) {
	      if (link == null) {
	        return;
	      }
	      if ((link.self != null) || (link.related != null)) {
	        return link;
	      } else {
	        return {
	          self: link
	        };
	      }
	    };

	    Presenter.adapter = adapter;

	    Presenter.prototype.type = 'objects';

	    function Presenter(scope) {
	      if (scope == null) {
	        scope = {};
	      }
	      this.scope = scope;
	    }

	    Presenter.prototype.id = function(instance) {
	      return this.constructor.adapter.id(instance);
	    };

	    Presenter.prototype.selfLinks = function(instance) {};

	    Presenter.prototype.links = function() {};

	    Presenter.prototype.relationships = function() {};

	    Presenter.prototype.attributes = function(instance) {
	      var attributes, key, relationships;
	      if (instance == null) {
	        return null;
	      }
	      attributes = utils.clone(this.constructor.adapter.get(instance));
	      delete attributes['id'];
	      delete attributes['type'];
	      relationships = this.relationships();
	      for (key in relationships) {
	        delete attributes[key];
	      }
	      return attributes;
	    };

	    Presenter.prototype.includeRelationships = function(scope, instance) {
	      var data, factory, key, presenter, relationships, _results;
	      relationships = this.relationships();
	      _results = [];
	      for (key in relationships) {
	        factory = relationships[key] || (function() {
	          throw new Error("Presenter for " + key + " in " + this.type + " is not defined");
	        }).call(this);
	        presenter = new factory(scope);
	        data = this.constructor.adapter.get(instance, key);
	        if (data != null) {
	          _results.push(presenter.toJSON(data, {
	            include: true
	          }));
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };

	    Presenter.prototype.buildRelationships = function(instance) {
	      var build, data, key, links, presenter, relationships, rels;
	      if (instance == null) {
	        return null;
	      }
	      rels = this.relationships();
	      links = this.links(instance) || {};
	      relationships = null;
	      for (key in rels) {
	        data = this.constructor.adapter.get(instance, key);
	        presenter = rels[key];
	        build = (function(_this) {
	          return function(d) {
	            var rel;
	            rel = {
	              data: {
	                id: _this.constructor.adapter.id(d),
	                type: presenter.prototype.type
	              }
	            };
	            if (links[key] != null) {
	              rel.links = buildLinks(links[key]);
	            }
	            return rel;
	          };
	        })(this);
	        relationships || (relationships = {});
	        relationships[key] || (relationships[key] = {});
	        relationships[key] = data instanceof Array ? data.map(build) : data != null ? build(data) : null;
	      }
	      return relationships;
	    };

	    Presenter.prototype.buildSelfLink = function(instance) {
	      return buildLinks(this.selfLinks(instance));
	    };

	    Presenter.prototype.toJSON = function(instanceOrCollection, options) {
	      var added, collection, instance, links, model, relationships, _base, _base1, _base2;
	      if (options == null) {
	        options = {};
	      }
	      if (options.meta != null) {
	        this.scope.meta = options.meta;
	      }
	      (_base = this.scope).data || (_base.data = null);
	      if (instanceOrCollection == null) {
	        return this.scope;
	      }
	      if (instanceOrCollection instanceof Array) {
	        collection = instanceOrCollection;
	        (_base1 = this.scope).data || (_base1.data = []);
	        collection.forEach((function(_this) {
	          return function(instance) {
	            return _this.toJSON(instance);
	          };
	        })(this));
	      } else {
	        instance = instanceOrCollection;
	        added = true;
	        model = {
	          id: this.id(instance),
	          type: this.type,
	          attributes: this.attributes(instance)
	        };
	        relationships = this.buildRelationships(instance);
	        if (relationships != null) {
	          model.relationships = relationships;
	        }
	        links = this.buildSelfLink(instance);
	        if (links != null) {
	          model.links = links;
	        }
	        if (options.include) {
	          (_base2 = this.scope).included || (_base2.included = []);
	          if (!utils.any(this.scope.included.concat(this.scope.data), function(i) {
	            return i.id === model.id;
	          })) {
	            this.scope.included.push(model);
	          } else {
	            added = false;
	          }
	        } else if (this.scope.data != null) {
	          if (!utils.any(this.scope.data, function(i) {
	            return i.id === model.id;
	          })) {
	            this.scope.data.push(model);
	          } else {
	            added = false;
	          }
	        } else {
	          this.scope.data = model;
	        }
	        if (added) {
	          this.includeRelationships(this.scope, instance);
	        }
	      }
	      return this.scope;
	    };

	    Presenter.prototype.render = function(instanceOrCollection, options) {
	      if (utils.isPromise(instanceOrCollection)) {
	        return instanceOrCollection.then((function(_this) {
	          return function(data) {
	            return _this.toJSON(data, options);
	          };
	        })(this));
	      } else {
	        return this.toJSON(instanceOrCollection, options);
	      }
	    };

	    Presenter.toJSON = function() {
	      var _ref;
	      return (_ref = new this).toJSON.apply(_ref, arguments);
	    };

	    Presenter.render = function() {
	      var _ref;
	      return (_ref = new this).render.apply(_ref, arguments);
	    };

	    return Presenter;

	  })();
	  return module.exports = Presenter;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(utils) {
	  var Record, Store;
	  Record = (function() {
	    function Record(options) {
	      this.id = options.id, this.type = options.type, this.attributes = options.attributes, this.relationships = options.relationships;
	    }

	    return Record;

	  })();
	  return Store = (function() {
	    function Store(options) {
	      this.reset();
	    }

	    Store.prototype.reset = function() {
	      this.records = [];
	      return this.relations = {};
	    };

	    Store.prototype.toModel = function(rec, type, models) {
	      var data, key, model, rel, resolve, _base, _name, _ref;
	      model = utils.clone(rec.attributes) || {};
	      model.id = rec.id;
	      models[type] || (models[type] = {});
	      (_base = models[type])[_name = rec.id] || (_base[_name] = model);
	      if (rec.relationships != null) {
	        _ref = rec.relationships;
	        for (key in _ref) {
	          rel = _ref[key];
	          data = rel.data;
	          model[key] = null;
	          if (data == null) {
	            continue;
	          }
	          resolve = (function(_this) {
	            return function(_arg) {
	              var id, type;
	              type = _arg.type, id = _arg.id;
	              return _this.find(type, id, models);
	            };
	          })(this);
	          model[key] = data instanceof Array ? data.map(resolve) : resolve(data);
	        }
	      }
	      return model;
	    };

	    Store.prototype.findRecord = function(type, id) {
	      return utils.find(this.records, function(r) {
	        return r.type === type && r.id === id;
	      });
	    };

	    Store.prototype.findRecords = function(type) {
	      return utils.filter(this.records, function(r) {
	        return r.type === type;
	      });
	    };

	    Store.prototype.find = function(type, id, models) {
	      var rec;
	      if (models == null) {
	        models = {};
	      }
	      rec = this.findRecord(type, id);
	      if (rec == null) {
	        return null;
	      }
	      models[type] || (models[type] = {});
	      return models[type][id] || this.toModel(rec, type, models);
	    };

	    Store.prototype.findAll = function(type, models) {
	      var recs;
	      if (models == null) {
	        models = {};
	      }
	      recs = this.findRecords(type);
	      if (recs == null) {
	        return [];
	      }
	      recs.forEach((function(_this) {
	        return function(rec) {
	          models[type] || (models[type] = {});
	          return _this.toModel(rec, type, models);
	        };
	      })(this));
	      return utils.values(models[type]);
	    };

	    Store.prototype.remove = function(type, id) {
	      var records, remove;
	      remove = (function(_this) {
	        return function(record) {
	          var index;
	          index = _this.records.indexOf(record);
	          if (!(index < 0)) {
	            return _this.records.splice(index, 1);
	          }
	        };
	      })(this);
	      if (id != null) {
	        return remove(this.findRecord(type, id));
	      } else {
	        records = this.findRecords(type);
	        return records.map(remove);
	      }
	    };

	    Store.prototype.sync = function(body) {
	      var models, recs, sync;
	      sync = (function(_this) {
	        return function(data) {
	          var add;
	          if (data == null) {
	            return null;
	          }
	          add = function(obj) {
	            var id, rec, type;
	            type = obj.type, id = obj.id;
	            _this.remove(type, id);
	            rec = new Record(obj);
	            _this.records.push(rec);
	            return rec;
	          };
	          if (data instanceof Array) {
	            return data.map(add);
	          } else {
	            return add(data);
	          }
	        };
	      })(this);
	      sync(body.included);
	      recs = sync(body.data);
	      if (recs == null) {
	        return null;
	      }
	      models = {};
	      if (recs instanceof Array) {
	        return recs.map((function(_this) {
	          return function(rec) {
	            return _this.toModel(rec, rec.type, models);
	          };
	        })(this));
	      } else {
	        return this.toModel(recs, recs.type, models);
	      }
	    };

	    return Store;

	  })();
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(_, Q) {
	  var utils;
	  if (_ == null) {
	    _ = {};
	  }
	  if (Q == null) {
	    Q = {};
	  }
	  return utils = {
	    find: _.find || function(arr, callback) {
	      var elem, _i, _len;
	      for (_i = 0, _len = arr.length; _i < _len; _i++) {
	        elem = arr[_i];
	        if (callback(elem)) {
	          return elem;
	        }
	      }
	      return void 0;
	    },
	    filter: _.filter || function(arr, callback) {
	      var elem, res, _i, _len;
	      res = [];
	      for (_i = 0, _len = arr.length; _i < _len; _i++) {
	        elem = arr[_i];
	        if (callback(elem)) {
	          res.push(elem);
	        }
	      }
	      return res;
	    },
	    values: _.values || function(obj) {
	      if (obj == null) {
	        obj = {};
	      }
	      return Object.keys(obj).map(function(key) {
	        return obj[key];
	      });
	    },
	    clone: _.clone || function(obj) {
	      var clone, key, val;
	      if (obj == null) {
	        obj = {};
	      }
	      clone = {};
	      for (key in obj) {
	        val = obj[key];
	        clone[key] = val;
	      }
	      return clone;
	    },
	    any: _.any || function(arr, callback) {
	      return utils.find(arr, callback) != null;
	    },
	    isPromise: Q.isPromise || function(obj) {
	      return obj === Object(obj) && typeof obj.promiseDispatch === "function" && typeof obj.inspect === "function";
	    }
	  };
	};


/***/ }
/******/ ]);