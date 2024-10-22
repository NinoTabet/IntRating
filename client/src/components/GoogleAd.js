import React, { useEffect } from 'react';

function GoogleAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins
        className="border border-primary position-fixed top-50 h-25 w-25"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3366618965875818"
        data-ad-slot="7071737081"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adbreak-test="on">
        </ins>
    );
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