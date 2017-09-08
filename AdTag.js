<div id="adContainer" style="width:320px;margin:0px;padding:0px;background-color:#ffffff;">
    <div id="expanded" style="display:none;width:320px;height:480px;margin:auto;position:relative;top:0px;left:0px;">
        <img width="320" height="480" style="position:absolute;top:0px;left:0px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/320x480.png" />
        <img width="37" height="37" style="position:absolute;top:125px;left:56px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Html_37x37.png" onclick="javascript:openSite('http://www.opera.com');" />
        <img width="37" height="37" style="position:absolute;top:125px;left:113px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Location_37x37.png" onclick="javascript:openSite('https://maps.google.com/maps?q=1875+S+Grant+St,+San+Mateo,+CA&hl=en&sll=46.238212,6.864936&sspn=0.135592,0.222816&oq=1875+S&hnear=1875+S+Grant+St,+San+Mateo,+California+94402&t=m&z=17&iwloc=A')" />
        <img width="37" height="37" style="position:absolute;top:125px;left:170px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Download_37x37.png" onclick="javascript:openSite('https://itunes.apple.com/us/app/opera-mini-web-browser/id363729560?mt=8&ign-mpt=uo%3D4');" />
        <img width="37" height="37" style="position:absolute;top:125px;left:227px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Video_37x37.png" onclick="javascript:openSite('http://admarvel.s3.amazonaws.com/demo/mraid/OMW_SOUND_VIDEO_RENEW.iPhoneSmall.mp4');" />
    </div>
</div>

<style type="text/css">
body
{
    background-color:#FFFFFF;
}
</style>

<script>
function mraidIsReady()
{
    mraid.removeEventListener("ready", mraidIsReady);

    prepareMyAd();
}

function prepareMyAd()
{
    if (!mraid.isViewable())
    {
        mraid.addEventListener("viewableChange", isInterstitialDisplayed);
    }
    else
    {
        showMyAd();
    }
}

function isInterstitialDisplayed(displayed)
{
    if (displayed)
    {
        mraid.removeEventListener("viewableChange", isInterstitialDisplayed);
        showMyAd();
    }
}

function showMyAd()
{
    // Count impressions at this point and display ad
    var el = document.getElementById("expanded");
    el.style.display = '';
}

function openSite(url)
{
    mraid.open(url);
}

function setupViewport(width)
{
    var element = document.querySelector("meta[name=viewport]");
    if (!element)
    {
        element = document.createElement("meta");
        element.name = "viewport";
        element.content = "width=" + width + ", user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(element);
    }
    else
    {
        element.content = "width=" + width + ", user-scalable=no";
    }
}
setupViewport(320);

function doReadyCheck()
{
    if (mraid.getState() == 'loading')
    {
        mraid.addEventListener("ready", mraidIsReady);
    }
    else
    {
        prepareMyAd();
    }
}

doReadyCheck();
</script>
