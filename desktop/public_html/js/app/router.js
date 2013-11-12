App.Router.map(function ()
{
    this.resource('lists', function ()
    {
        this.resource('list', { path: '/:list_id' }, function ()
        {
            this.route('add');
            this.route('edit');
            this.route('delete');

            this.resource('item', { path: '/:item_id' }, function ()
            {
                this.route('edit');
                this.route('delete');
            });
        });
        this.route('create');
    });

    this.resource('trips', function ()
    {
        this.resource('trip', { path: '/:trip_id' }, function ()
        {
            this.route('edit');
        });
        this.route('create');
    });
});