sap.ui.define([], function () {
    "use strict";

    return {

        callService: function (sUrl, sMethod, oPayload) {

            return new Promise(function (resolve, reject) {

                switch (sMethod.toUpperCase()) {

                    // ✅ GET
                    case "GET":
                        jQuery.ajax(sUrl, {
                            type: "GET",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
                        break;

                    // ✅ POST
                    case "POST":
                        jQuery.ajax(sUrl, {
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(oPayload),
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
                        break;

                    // ✅ PUT (UPDATE)
                    case "PUT":
                        jQuery.ajax(sUrl, {
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(oPayload),
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
                        break;

                    // ✅ DELETE
                    case "DELETE":
                        jQuery.ajax(sUrl, {
                            type: "DELETE",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
                        break;

                    // ❌ INVALID METHOD
                    default:
                        reject("Invalid Method");
                        break;
                }

            });

        }

    };

});