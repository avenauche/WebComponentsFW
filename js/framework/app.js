require.config({
    paths: {
        'jQuery': "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery",
        'dateJS': "../libs/dateJS/date"
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    },
    packages: [
        {
            name: 'custom-first-name',
            location: 'components',
            main: 'custom-first-name'
        }, {
            name: 'custom-last-name',
            location: 'components',
            main: 'custom-last-name'
        }, {
            name: 'custom-menubar',
            location: 'components',
            main: 'custom-menubar'
        }, {
            name: 'custom-time',
            location: 'components',
            main: 'custom-time'
        }, {
            name: 'custom-camera',
            location: 'components',
            main: 'custom-camera'
        }
    ]
});


require(['jQuery', 'custom-first-name', 'custom-last-name', 'custom-menubar', 'custom-time', 'custom-camera'], function() {
    console.log('jQuery version:', $.fn.jquery);
});