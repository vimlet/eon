vcomet.element("vc-appmenu", "style.css", {

    dependencies: [
        "../vc-item",
        "../vc-scroll"
    ],

    properties: {
        /*
          @property {String} location 
          @description Site of the container where the appmenu icon will be placed
          Values can be: right, left or center
          Defaulf: right
        */
        location: {
            value: "right",
            reflect: true
        }
    },

    privateProperties: {
        /*
          @property (private) {Object} _appsBoxNode 
          @description Store appsBox node
        */
        appsBoxNode: {
            value: {}
        },
    },

    functions: {
        /*
          @function addItem
          @description Add new app node item programmaticaly
          @param {Object} item [Node to add to appmenu]
        */
        addItem: function (item) {
            item.classList.add("vc-appmenu-item");
            item.classList.add("bg1-hoverable-border");

            (item.value) ? this._setupSpan(item) : null;
            (item.icon) ? this._setupIcon(item) : null;

            // If does not exit mobileContainer
            this._appsWrapper.appendChild(item);

        },

        /*
          @function removeItem 
          @description Remove node item passed as parameter
          @param {Object} item [Node to removes from appmenu] 
         */
        removeItem: function (item) {
            this._appsWrapper.removeChild(item);
        },

        /*
          @function replaceItem 
          @description Replace old node item with a new one
          @param {Object} newItem [Node that replaces old one]
          @param {Object} oldItem [Node to be replaced]
         */
        replaceItem: function (newItem, oldItem) {
            newItem.classList.add("vc-appmenu-item");
            newItem.classList.add("bg1-hoverable-border");

            (newItem.value) ? this._setupSpan(newItem) : null;
            (newItem.icon) ? this._setupIcon(newItem) : null;

            this._appsWrapper.replaceChild(newItem, oldItem);
        },

        /*
          @function show
          @description Show appmenu
        */
        show: function () {
            var el = this;

            el._appsBoxNode.classList.add("vc-appmenu-visibleApps");
            // Since the scroll was hidden, it could not calculate if it needs to create scrolls, so after we added the visibleApps class, 
            // we manually call update to check whether it needs scrolling or not
            el._appsWindowBox.vcometScroll.update();
            vcomet.triggerCallback("onShow", this);
        },

        /*
        @function hide
        @description Hide appmenu
        */
        hide: function () {
            var el = this;
            el._appsBoxNode.classList.remove("vc-appmenu-visibleApps");
            vcomet.triggerCallback("onHide", this);
        },
    },

    privateFunctions: {

        /*
          @function (private) _updateLocation
          @description Position appmenu. *Parent container must have display: flex
          @param {String} newVal [Site of the container where the appmenu icon will be placed]
        */
        updateLocation: function (newVal) {
            var appmanuParent = this.parentNode;

            switch (newVal) {
                case ("right"):
                    appmanuParent.style.justifyContent = "flex-end";
                    break;

                case ("left"):
                    appmanuParent.style.justifyContent = "flex-start";
                    break;

                case ("center"):
                    appmanuParent.style.justifyContent = "center";
                    break;
            }
        },

        /*
          @function (private) _setupItems
          @description Set up declarative user apps items
          @param {Array} sourceNodes [Contains apps node items]
        */
        setupItems: function (sourceNodes) {
            var el = this;
            var itemsDocFragment = document.createDocumentFragment();
            var length = sourceNodes.length;
            var item;

            while (sourceNodes.length) {
                item = sourceNodes.shift();
                item.classList.add("vc-appmenu-item");
                item.classList.add("bg1-hoverable-border");

                (item.value) ? this._setupSpan(item) : null;
                (item.getAttribute("icon")) ? el._setupIcon(item) : null;

                itemsDocFragment.appendChild(item);
            }
            // Move documentFragment
            el._appsWrapper.appendChild(itemsDocFragment);

        },

        /*
          @function (private) _setupSpan
          @description Set up span with name of app
          @param {Object} item [App node item]
       */
        setupSpan: function (item) {
            var itemSpan = document.createElement("span");

            itemSpan.innerHTML = item.value;
            itemSpan.classList.add("vc-appmenu-itemSpan");
            item.appendChild(itemSpan);
        },

        /*
          @function (private) _setupIcon
          @description Set up app icon
          @param {Object} item [App node icon]
       */
        setupIcon: function (item) {
            var icon;
            var iconAttribute;
            var iconPosition;

            // Programmaticaly item property
            // Declarative item attribute
            iconAttribute = (item.icon) ? item.icon : item.getAttribute("icon");

            // Programmaticaly item property
            // Declarative item attribute
            iconPosition = (item.iconPosition) ? item.iconPosition : item.getAttribute("icon-position");


            if (iconAttribute.indexOf("</i>") !== -1) {
                var tempDiv = document.createElement("div");

                tempDiv.innerHTML = iconAttribute;
                icon = tempDiv.querySelector("i");
                icon.classList.add("vc-appmenu-itemIcon");

            } else {
                icon = document.createElement("div");
                icon.style.backgroundImage = "url('" + iconAttribute + "')";
                icon.classList.add("vc-appmenu-itemIcon");
            }

            (iconPosition == "top") ? item.insertBefore(icon, item.childNodes[0]) : null;
            (iconPosition == "bottom") ? item.appendChild(icon) : null;

        },

        /*
          @function (private) _verifyScreenResolution
          @description Set device type
        */
        verifyScreenResolution: function () {
            var el = this;

            // Tablet view
            if (window.innerWidth <= vcomet.tabletWidth && window.innerWidth > vcomet.mobileWidth) {
                el._setResponsiveClose();
                // Mobile view
            } else if (window.innerWidth <= vcomet.mobileWidth) {
                el._setResponsiveClose();
                // Desktop view
            } else {
                el._removeResponsiveFunctionality();
            }

        },

        /*
          @function (private) _setResponsiveClose
          @description Add a close button for small devices
        */
        setResponsiveClose: function () {
            var el = this;

            if (!el._appsClose.classList.contains("vc-appmenu-closeVisible")) {
                el._appsClose.classList.add("vc-appmenu-closeVisible");

                el._appsCloseIcon.addEventListener("click", function () {
                    el.hide();
                });

            }

        },

        /*
          @function (private) _removeResponsiveFunctionality
          @description Remove small devices functionality on desktop view
        */
        removeResponsiveFunctionality: function () {
            var el = this;

            if (el._appsClose.classList.contains("vc-appmenu-closeVisible")) {
                el._appsClose.classList.remove("vc-appmenu-closeVisible");
            }

        }

    },

    onCreated: function () {
        var el = this;

        vcomet.createCallback("onShow", this);
        vcomet.createCallback("onHide", this);

        el._appMenu = el.template.querySelector(".vc-appmenu-appMenu");
        el._appsBoxNode = el.template.querySelector(".vc-appmenu-appsBox");
        el._appsWrapper = el.template.querySelector(".vc-appmenu-appsWrapper");
        el._appsWindowBox = el.template.querySelector(".vc-appmenu-windowBox");
        el._appsClose = el.template.querySelector(".vc-appmenu-close");
        el._appsCloseIcon = el.template.querySelector(".vc-appmenu-closeIcon");

        el._verifyScreenResolution();
    },

    onBubbleRender: function () {
        var el = this;
        var sourceNodes = el.getSourceElements();

        el._setupItems(sourceNodes);
        el._updateLocation(el.location);

        // Open and close window apps event listener
        el._appMenu.addEventListener("click", function () {
            (el._appsBoxNode.classList.contains("vc-appmenu-visibleApps")) ? el.hide() : el.show();
        }, false);

        // Closing the window apps when cliks outside
        document.body.addEventListener("pointerdown", function (event) {
            var clickElement = el.contains(event.target);

            if (!clickElement) {
                el.hide();
            }

        });

    },

    onPropertyChanged: function (attrName, oldVal, newVal) {
        switch (attrName) {
            case ("location"):
                this._updateLocation(newVal);
                break;
        }
    },

    onWindowResize: function (event) {
        this._verifyScreenResolution();
    }

});
