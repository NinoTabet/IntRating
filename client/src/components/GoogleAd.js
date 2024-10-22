import React from 'react'
import { Adsense } from '@ctrl/react-adsense';

function GoogleAd() {
    console.log("Ads Shown")
    return (
        <Adsense
            className='border border-primary position-fixed top-50 h-25 w-25'
            client="ca-pub-3366618965875818"
            slot="7071737081"
            // adtest='on' //Dev Only
        />
    )

}

export default GoogleAd;

/*
<script async src="https://pageAd2.googlesyndication.com/pageAd/js/Adsbygoogle.js?client=ca-pub-3366618965875818"
     crossorigin="anonymous"></script>
<!-- Square-Ad -->
<ins class="Adsbygoogle"
     style="display:block"
     data-Ad-client="ca-pub-3366618965875818"
     data-Ad-slot="7071737081"
     data-Ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (Adsbygoogle = window.Adsbygoogle || []).push({});
</script>
*/