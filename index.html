<script src="mraid.js"></script>


<div id="adContainer" style="width:320px;margin:0px;padding:0px;background-color:#ffffff;">
    <div id="expanded" style="display:none;width:320px;height:480px;margin:auto;position:relative;top:0px;left:0px;">
        <img width="37" height="37" style="position:absolute;top:125px;left:56px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Html_37x37.png" onclick="javascript:openSite('http://apple.com');" />

        <!--Misbehave here !!-->

    </div>
    <a id="link" href="http://apple.com">apple</a>
</div>

<script>

    function openSite(url) {
        //
        // Misbehave here !!
        //
        mraid.open(url);
    }
    ////////////////////////////////////////////////////////////
    function mraidIsReady() {
        mraid.removeEventListener("ready", mraidIsReady);
        prepareMyAd();
    }
    function prepareMyAd() {
        if (!mraid.isViewable()) {
            mraid.addEventListener("viewableChange", isInterstitialDisplayed);
        } else {
            showMyAd();
        }
    }
    function isInterstitialDisplayed(displayed) {
        if (displayed) {
            mraid.removeEventListener("viewableChange", isInterstitialDisplayed);
            showMyAd();
        }
    }
    function showMyAd() {
        var el = document.getElementById("expanded");
        el.style.display = '';
        setTimeout(function() { document.getElementById("link").click() }, 5000)
    }
    function setupViewport(width) {
        var element = document.querySelector("meta[name=viewport]");
        if (!element)   {
            element = document.createElement("meta");
            element.name = "viewport";
            element.content = "width=" + width + ", user-scalable=no";
            document.getElementsByTagName('head')[0].appendChild(element);
        } else {
            element.content = "width=" + width + ", user-scalable=no";
        }
    }
    setupViewport(320);
    function doReadyCheck() {
        if (mraid.getState() == 'loading') {
            mraid.addEventListener("ready", mraidIsReady);
        } else {
            prepareMyAd();
        }
    }

    doReadyCheck();

    ////////////////////////////////////////////////////////////
</script>
