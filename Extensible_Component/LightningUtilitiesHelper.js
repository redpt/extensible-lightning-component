({
	showToast : function(messageType, message, duration) {
    	var toastError = $A.get("e.force:showToast");
        if($A.util.isEmpty(duration)){
			duration = 3000;
        }
        if($A.util.isEmpty(messageType)){
			messageType = "info";
        }
        if($A.util.isEmpty(message)){
			message="";
        }
    	toastError.setParams({
            "type": messageType,
        	"message": message,
            "duration" : duration
    	});
    	toastError.fire();
	},
    stopSpinner: function (component) {
        component.set("v.spinnerOff", true);
    },
    startSpinner: function (component) {
        component.set("v.spinnerOff", false);
    },
    callFunction: function(component, functionName, vars, onSuccess, onFailure){
        var _this = this;
		var action = component.get("c."+functionName);
        action.setParams(vars);
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(response);
            if (state === "SUCCESS" && !$A.util.isEmpty(onSuccess)) {
                onSuccess(response);
            }else if(state !== "SUCCESS" && !$A.util.isEmpty(onFailure)){
				onFailure(response);
            }else{
				this.showToast("error", "There was an error while loading data.", 3000);
            }
            _this.stopSpinner(component);
        });
        _this.startSpinner(component);
        $A.enqueueAction(action);
    },
    runSOQLQueryToGetRecords: function(component, fields, recordType, conditions, orderBy, limit){
        var _this = this;
        var variables = {
            selectString : fields,
            fromString : recordType,
            whereString : conditions,
            orderByString : orderBy,
            limitString: limit
        };
        var successFunction = function(response){
			component.set("v.recordsQueried", response.getReturnValue());
        };
		_this.callFunction(component, "getInfo", variables, successFunction, null);
    }
})