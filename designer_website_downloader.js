// ==UserScript==
// @name         设计师常用网站图片下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  设计师常用网站图片下载。已经支持 https://www.pinterest.com https://dribbble.com
// @author       Anders
// @match        https://www.pinterest.com/search/*
// @match        https://dribbble.com/search/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function () {
    const btn = $(`<button style="
    z-index: 99999;position: fixed;top: 50%;border-radius: 50%;
    ">解析</button>`);

    btn.click(function () {
        let host = location.host;
        if (host == "www.pinterest.com") {
            $("body").find("div[data-test-id='giftWrap']").parent().remove()
            $(".pinterest_download_pic").remove()
            let list_items = $(".Collection-Item");
            list_items.each(function (key, item) {
                let imgSrc = $(item).find("img").attr("src")
                $(item).append(`<button class="pinterest_download_pic" data-imgSrc="${imgSrc}" style="
            position: absolute;
            top: 2%;
            left: 2%;
        ">下载</button>`)
            });
        } else if (host == "dribbble.com") {
            $(".dribbble_download_pic").remove()
            let list_items = $("li[id^='screenshot-']");
            list_items.each(function (key, item) {
                let imgSrc = $(item).find("img").attr("src")
                $(item).append(`<button class="dribbble_download_pic" data-imgSrc="${imgSrc}" style="
            position: absolute;
            top: 2%;
            left: 2%;
        ">下载</button>`)
            });
        }
    });

    $("body").prepend(btn);

    // www.pinterest.com下载按钮添加点击事件
    $("body").on("click", ".pinterest_download_pic", function () {
        let href = $(this).attr("data-imgSrc").replace("236x", "originals")
        open(href)
    });
    // dribbble.com下载按钮添加点击事件
    $("body").on("click", ".dribbble_download_pic", function () {
        let href = $(this).attr("data-imgSrc").split("?")
        open(href[0])
    });
})();