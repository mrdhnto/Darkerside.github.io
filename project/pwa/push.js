var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BKi63zME5WoW0D2TZ7EJHvIyxDC6aBXxzPpHopVpOftSbQRBLbduZdTNE9OdUtPYJXgPNwugWJQdK5bJm1oq5vU",
    "privateKey": "Sczp-O1u88HFPZCRfOw3iFGomto7phl5QbyEV7jc7dU"
};
 
 
webPush.setVapidDetails(
    'mailto:riski.mardianto@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dr7enXe0dms:APA91bFUFeDvlMCi-AAbSeAUSgEmY3UwWdypRi6Hu0AqgscJcig28bBdSfRAmyxou2bCGrD7Y0XI2Mu8ONet7yxYorIX9V9stxEz7zGzxst8fmPQV8GdoTvHwXm8jha268OtJdm44Tmm",
    "keys": {
        "p256dh": "BBUAswtEg45Ip9SgxZf1b0RTR3FfSumQOoHr2TCsslTReQWi07b7MwsgXEIKbSnLTPRVRz9w8iYI7qu8wH5PvYA=",
        "auth": "bJ0GF4dRUhxx55nkEciY4Q=="
    }
};
var payload = 'Luminix Studio Push Notification Test!';
var options = {
    gcmAPIKey: '851906386666',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);