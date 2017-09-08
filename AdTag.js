/*
 * @Namespace hAT
 *
 * @discussion
 * Top-level object.
 */
var hAT = {};

/*
 * @css
 *
 * @discussion
 * The absolute path to the CSS file to use for your hack.
 */
hAT.css = "https://a1garcia.github.io/hackathon.css"

/*
 * @Class View
 *
 * @discussion
 * A simple wrapper around an HTML div element
 * providing cocoa-esque syntax and sugar.
 */
hAT.View = class {
    constructor () {
        this._view = document.createElement("div");
        Object.defineProperties(this, {
            "width": {
                get: function () {
                    return this._view.width;
                },
                set: function (width) {
                    this._view.width = width;
                }
            },
            "height": {
                get: function () {
                    return this._view.height;
                },
                set: function (height) {
                    this._view.height = height;
                }
            },
            "id": {
                get: function () {
                    return this._view.id;
                },
                set: function (id) {
                    this._view.id = id;
                }
            },
            "innerText": {
                get: function () {
                    this._view.innerText;
                },
                set: function (text) {
                    this._view.innerText = text;
                }
            },
            "innerHTML": {
                get: function () {
                    this._view.innerHTML;
                },
                set: function (html) {
                    this._view.innerHTML = html;
                }
            },
            "element": {
                get: function () {
                    return this._view;
                }
            }
        });
    }

    addSubView (view) {
        if (!view instanceof hAT.View) {
            return;
        }
        this._view.appendChild(view._view);
    }

    removeSubView (view) {
        if (!view instanceof hAT.View) {
            return;
        }
        this._view.removeChild(view._view);
    }
};

/*
 * @Const EventTarget
 *
 * @discussion
 * A simple implementation of element event target for hAT.View.
 */
const EventTarget = (target) =>
    Object.assign(target, {
         addEventListener (object, type, listener, useCapture) {
             object.addEventListener(type, listener, useCapture);
         },
         removeEventListener (object, type, listener, useCapture) {
             object.removeEventListener(type, listener, useCapture);
         }
    });

/*
 * @Class Hackathon
 *
 * @discussion
 * An MRAID shim that will log MRAID methods
 * to the window.console.
 */
hAT.MRAIDShim = class {
    constructor () {
        this.isShim = true;
        [
        "addEventListener",
        "close",
        "expand",
        "getExpandProperties",
        "getPlacementType",
        "getState",
        "getVersion",
        "isViewable",
        "open",
        "removeEventListener",
        "setExpandProperties",
        "useCustomClose",
        "_createCalendarEvent"
        ].forEach(function (method) {
            this[method] = function () {
                console.log("MRAID # " + method + " shim implementation called.");
            };
        }, this);
    }
};

/*
 * @Class Hackathon
 *
 * @discussion
 * A simple Ad Tag Example.
 */
hAT.Hackathon = class {
    constructor () {
        this.hasMRAID = !!window.mraid;
        if (!this.hasMRAID) {
            window.mraid = new hAT.MRAIDShim();
        }
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        // URLs must be absolute paths. Replace this path with your AWS instance
        link.setAttribute("href", hAT.css);
        document.getElementsByTagName('head')[0].appendChild(link);

        this.rootView = new hAT.View();
        this.rootView.id = "hAT-root-view";
        document.body.appendChild(this.rootView.element);
    }

    helloWorld () {
        var containerView = new hAT.View();
        containerView.id = "hAT-content-view";

        var appleContainer= new hAT.View();
        appleContainer.id = "hAT-apple-container";
        containerView.addSubView(appleContainer);

        var appleView = new hAT.View();
        appleView.id = "hAT-apple-view";
        appleContainer.addSubView(appleView);

        var hackView = new hAT.View();
        hackView.id = "hAT-hack-view";
        hackView.innerHTML = "Hack-a-Tag<br>Challenge";
        containerView.addSubView(hackView);

        var dateView = new hAT.View();
        dateView.id = "hAT-date-view";
        dateView.innerHTML = "September 7-8, 2017";
        containerView.addSubView(dateView);

        this.rootView.addEventListener(this.rootView.element, this.hasMRAID ? "touchend" : "click", this.handleMainAction.bind(this));
        this.rootView.addSubView(containerView);
    }

    handleMainAction (event) {
        // This can be safely called since we're using the hAT.MRAIDShim
        mraid.open("https://a1gar");
    }
};

// Bootstrap

// Register our Mixin on hAT.View.
EventTarget(hAT.View.prototype);

// Instantiate a Hackathon Instance.
var hack = new hAT.Hackathon();
// Call a method on our instance.
hack.helloWorld();

