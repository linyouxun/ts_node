curl -F media=@1.mp4 "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=20_uq6ojNUEYfgx49caMGm3LFRvCfeONgJccnWQVFC9Vsp515VffsS4WyRbMB6EBCjZ8FoYB-l0aH20UtP6F4pXRQyi3ejd1tSLVuRo7zruoBImsJPr0G3euUNyWrUGGHcAIALLM&type=video"

{
    "card": {
        "card_type": "GROUPON", 
        "groupon": {
            "base_info": {
                "logo_url": "http://mmbiz.qpic.cn/mmbiz_jpg/AXfRBdrRUlN6HTBkYvTIpK7fQwWv2hCzcMTrNibvuNibn53ybErTK7ibpfDbBlLuas46CSibxdnAiaYibpSQdSIymB6w/0", 
                "brand_name": "微信餐厅2", 
                "code_type": "CODE_TYPE_TEXT", 
                "title": "132元双人火锅套餐", 
                "sub_title": "周末狂欢必备", 
                "color": "Color010", 
                "notice": "使用时向服务员出示此券", 
                "service_phone": "020-88888888", 
                "description": "不可与其他优惠同享如需团购券发票，请在消费时向商户提出店内均可使用，仅限堂食", 
                "date_info": {
                    "type": "DATE_TYPE_FIX_TERM", 
                    "fixed_term": 15, 
                    "fixed_begin_term": 0
                }, 
                "sku": {
                    "quantity": 500000
                }, 
                "get_limit": 3, 
                "use_custom_code": false, 
                "bind_openid": false, 
                "can_share": true, 
                "can_give_friend": true, 
                "location_id_list": [
                    123, 
                    12321, 
                    345345
                ], 
                "custom_url_name": "立即使用", 
                "custom_url": "http://www.qq.com", 
                "custom_url_sub_title": "6个汉字tips", 
                "promotion_url_name": "更多优惠", 
                "promotion_url": "http://www.qq.com"
            }, 
            "deal_detail": "以下锅底2选1（有菌王锅、麻辣锅、大骨锅、番茄锅、清补凉锅、酸 菜鱼锅可选）：大锅1份 12元小锅2份 16元 "
        }
    }
}


{
    "action_name": "QR_CARD",
    "action_info": {
        "card": {
            "card_id": "phbyS59Wb6pEPy1beypcr9G-I2F8",
        }
    }
}

{
    "errcode": 0, 
    "errmsg": "ok", 
    "card_id": "phbyS52rzM9gCz5cV7YmaQdcaCgc"
}
{
    "errcode": 0, 
    "errmsg": "ok", 
    "card_id": "phbyS52voE1H-BEM1SImCkfb--Fk"
}
{
    "errcode": 0, 
    "errmsg": "ok", 
    "card_id": "phbyS53mvbtWyLf7QNRekJWHh0Cg"
}

{
    "errcode": 0, 
    "errmsg": "ok", 
    "ticket": "gQEj8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAybUswRUUtNVllaUQxTGEtd2h1NG8AAgRKy79cAwSAM_EB", 
    "expire_seconds": 31536000, 
    "url": "http://weixin.qq.com/q/02mK0EE-5YeiD1La-whu4o", 
    "show_qrcode_url": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEj8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAybUswRUUtNVllaUQxTGEtd2h1NG8AAgRKy79cAwSAM_EB"
}

1.将 api_ticket、appid、location_id、timestamp、nonce_str、card_id、card_type的value值进行字符串的字典序排序。

2.将所有参数字符串拼接成一个字符串进行sha1加密，得到cardSign。