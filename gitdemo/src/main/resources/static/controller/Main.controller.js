sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sairevanth/utiles/service",
    "sap/m/MessageBox"
], function (Controller, JSONModel, service, MessageBox) {
    "use strict";

    return Controller.extend("sairevanth.controller.Main", {

        onInit: function () {
            var oModel = new JSONModel();

            oModel.setData({
                postPayload: {
                    "companyName": "",
					"firstName": "",
					"lastName": "",
					"website": "",
                    "email": "",
					"status": "A",
					"gstNo": ""
                    
                },
                vendor: []
            });

            this.getView().setModel(oModel);
        },

        // ✅ LOAD DATA FROM /vendor
        load: function () {
            var that = this;

            service.callService("/vendor", "GET")
                .then(function (data) {

                    console.log("GET Response:", data);

                    var oModel = that.getView().getModel();

                    // ✅ Direct array (no _embedded here)
                    oModel.setProperty("/vendor", data);

                })
                .catch(function (err) {
                    console.error("Error:", err);
                    MessageBox.error("Failed to load data");
                });
        },

        // ✅ CREATE VENDOR
        onCreate: function () {

            var that = this;
            var oModel = this.getView().getModel();
            var payload = oModel.getProperty("/postPayload");

            console.log("POST Payload:", payload);

            service.callService("/vendor", "POST", payload)
                .then(function () {

                    MessageBox.success("Vendor created successfully");

                    // ✅ CLEAR FORM
                    oModel.setProperty("/postPayload", {
						"companyName": "",
								"firstName": "",
								"lastName": "",
								"website": "",
						        "email": "",
								"status": "A",
								"gstNo": ""
                    });

                    // ✅ REFRESH TABLE
                    that.load();

                })
                .catch(function (err) {
                    console.error("POST Error:", err);
                    MessageBox.error("Post failed");
                });
        },

        // ✅ DELETE VENDOR
        onDelete: function (oEvent) {

            var that = this;
            var oContext = oEvent.getSource().getBindingContext();
            var id = oContext.getProperty("id");

            service.callService("/vendor/" + id, "DELETE")
                .then(function () {
                    MessageBox.success("Deleted successfully");

                    // refresh table
                    that.load();
                })
                .catch(function () {
                    MessageBox.error("Delete failed");
                });
        }

    });

});