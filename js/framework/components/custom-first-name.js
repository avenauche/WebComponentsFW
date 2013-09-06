define('custom-first-name', [], function() {

    var firstNameProto = Object.create(HTMLElement.prototype);

    firstNameProto.createdCallback = function() {

        var root = this.createShadowRoot();
        var clone = document.createElement('span');

        if (this.hasAttribute("text")) {
            clone.innerHTML = this.getAttribute("text");
        } else {
            clone.innerHTML = "";
        }

        root.appendChild(clone);
    };

    document.register('custom-first-name', {prototype: firstNameProto});
});