define('custom-time', ['dateJS'], function() {
    var timeProto = Object.create(HTMLElement.prototype);
    timeProto.createdCallback = function() {
        var root = this.createShadowRoot();
        var clone = document.createElement('span');
        var that = this;
        var w;

        if (this.hasAttribute("update") && this.getAttribute("update") === "true") {
            if (typeof(Worker) !== "undefined") {
                if (typeof(w) === "undefined") {
                    w = new Worker("./js/framework/workers/customTimeWorker.js");
                    w.onmessage = function(event) {
                        clone.innerHTML = formatTime(that, event.data);
                    };
                }
            } else {
                clone.innerHTML = formatTime(that, (new Date()));
            }
        } else {
            clone.innerHTML = formatTime(that, (new Date()));
        }
        root.appendChild(clone);
    };

    function formatTime(that, msg) {
        if (that.hasAttribute("format")) {
            return msg.toString(that.getAttribute('format'));
        } else {
            return msg.toString("dd-MMM-yyyy");
        }
    }

    document.register('custom-time', {prototype: timeProto});
});