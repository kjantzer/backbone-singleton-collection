/*
    Backbone Singleton Collection

    Overrides `fetch` to only fetch one time.

    @author Kevin Jantzer, Blackstone Audio Inc
    @since 2016-02-01
*/

Backbone.SingletonCollection = Backbone.Collection.extend({

    refresh: function(success){
        this.fetch({force: true, success: success})
    },

    fetch: function(opts){

        this.__onSuccess = this.__onSuccess || []

                var opts = opts || {};
                var onSuccess = opts.success || null;

        if( _.isFunction(opts) ){
            onSuccess = opts;
            opts = {}
        }

        if( onSuccess ) this.__onSuccess.push(onSuccess)

        if( this.hasFetched && opts.force !== true ){
            this._callFetchSuccess();
            return;
        }

        // if already fetching, do no fetch again. Success will be called in `_callFetchSuccess`
        if( this.isFetching ) return;

                opts.success = function(){
                        this.hasFetched = true;
                        this.isFetching = false;
            this._callFetchSuccess()
                }.bind(this)

                this.isFetching = true;

                Backbone.Collection.prototype.fetch.call(this, opts);
        },

    _callFetchSuccess: function(){
        var self = this
        if( this.__onSuccess && this.__onSuccess.length > 0 )
            _.each(this.__onSuccess, function(fn){ fn(self, self.models) })
        this.__onSuccess = []
    }

})
