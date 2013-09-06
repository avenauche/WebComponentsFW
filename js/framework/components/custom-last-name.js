define('custom-last-name', [], function() {

    var lastNameProto = Object.create(HTMLElement.prototype);

    lastNameProto.createdCallback = function() {

        var root = this.createShadowRoot();
        var clone = document.createElement('span');

        if (this.hasAttribute("text")) {
            clone.innerHTML = this.getAttribute("text");
        } else {
            clone.innerHTML = "";
        }

        root.appendChild(clone);
    };

    document.register('custom-last-name', {prototype: lastNameProto});
});