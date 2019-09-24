# extensible-lightning-component
This is meant to be a Lightning Component that is extended by other Lightning Components. By definition, it cannot be a stand-alone Lightning Component.

In order to utilize this, after creating the component in your org, your new Lightning Component must utilize in the markup:
    extends = "LightningUtilities"

Additionally, understand that you also need to use the included Apex controller and (TODO) the test class.

Helper methods that become available upon extension:
    showToast
    stopSpinner
    startSpinner
    callFunction
    runSOQLQueryToGetRecords

showToast:
    Displays a toast message
    Input Arguments:
        messageType:
            The toast type, which can be 'error', 'warning', 'success', or 'info'. The default is 'other', which is styled like an 'info' toast and doesn’t display an icon, unless specified by the key attribute.
            "error": red
            "success": green
            "info": gray
        message
            String text that you wish to display in your toast
        duration
            Integer number of ms to display the toast

startSpinner:
    Displays a "wait" spinner, generally to let the end-user know that the screen is not yet ready to be viewed and we are waiting for data.
    Input Arguments:
        component

stopSpinner:
    Hides the spinner, generally to let the end-user know that the screen is ready to be viewed and we are no longer waiting for data
    Input Arguments:
        component

callFunction:
    Call a function that exists within your own Apex controller.
    Input Arguments:
        component
        functionName
            String name of your Apex method
        vars
            JSON-formatted object that contains the respective arguments that need to be given to your Apex method
            i.e.:
            var variables = {
                id : component.get("v.Id"),
                quantity : component.get("v.quantity")
            };
        onSuccess
            function to be called upon success
        onFailure
            function to be called upon failure

runSOQLQueryToGetRecords:
    Call Apex class provided by the Lightning Utilities Component to run a query
    Input Arguments:
        component
        fields
            SELECT (fields) FROM etc__c
            String csv list of fields (i.e. "Id, Name, Custom_Field__c")
        recordType
            SELECT fields FROM (recordType)
            String text of record type
            "count()" not supported
        conditions
            SELECT fields FROM recordType WHERE (conditions)
            String list of limitations (i.e. "xx IN yy AND zz = vv")
        orderBy
             SELECT fields FROM recordType WHERE conditions ORDER BY (orderBy)
             String field by which the return values are ordered
        limit
            SELECT fields FROM recordType WHERE conditions ORDER BY orderBy LIMIT (limit)
            String or Integer limit of quantity of records to receive from query
    Returns:
        List of sObjects found as a result of your query