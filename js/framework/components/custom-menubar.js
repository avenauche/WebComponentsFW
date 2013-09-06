define('custom-menubar', [], function() {

    var menuBarProto = Object.create(HTMLElement.prototype);

    menuBarProto.createdCallback = function() {
        console.log(this);

        var root = this.createShadowRoot();
        root.applyAuthorStyles = true;

        var mainMenu = this.querySelectorAll("menu");
        var mainMenuLength = mainMenu.length;

        var cloneMenuBar = document.createElement('div');
        cloneMenuBar.setAttribute("pseudo", "x-menubar");

        var cloneMainMenuUL = document.createElement('ul');
//        cloneMainMenuUL.setAttribute("pseudo", "x-menu");

        for (var mainMenuIndex = 0; mainMenuIndex < mainMenuLength; mainMenuIndex++) {
            var cloneMainMenuLI = document.createElement('li');
            cloneMainMenuLI.setAttribute("pseudo", "x-menu");

            var cloneMainMenuLI_A = document.createElement('a');
            cloneMainMenuLI_A.innerHTML = (mainMenu[mainMenuIndex].hasAttribute("title") ? mainMenu[mainMenuIndex].getAttribute("title") : "menu - " + mainMenuIndex);
            cloneMainMenuLI_A.setAttribute("pseudo", "x-menu-text");

            var subMenu = mainMenu[mainMenuIndex].querySelectorAll("submenu");
            var subMenuLength = subMenu.length;
            var cloneSubMenuUL = document.createElement('ul');

            for (var subMenuIndex = 0; subMenuIndex < subMenuLength; subMenuIndex++) {
                var cloneSubMenuLI = document.createElement('li');
                cloneSubMenuLI.setAttribute("pseudo", "x-submenu");

                var cloneSubMenuLI_A = document.createElement('a');
                cloneSubMenuLI_A.innerHTML = subMenu[subMenuIndex].innerHTML;

                cloneSubMenuLI.appendChild(cloneSubMenuLI_A);
                cloneSubMenuUL.appendChild(cloneSubMenuLI);
            }

            cloneMainMenuLI.appendChild(cloneMainMenuLI_A);
            cloneMainMenuLI.appendChild(cloneSubMenuUL);
            cloneMainMenuUL.appendChild(cloneMainMenuLI);
        }

        cloneMenuBar.appendChild(cloneMainMenuUL);
        root.appendChild(cloneMenuBar);
    };

    document.register('custom-menubar', {prototype: menuBarProto});
});