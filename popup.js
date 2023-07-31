$(function(){
    // This function runs when the DOM is ready.

    // Retrieving 'total' and 'limit' values from Chrome storage.
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        // When the values are retrieved, update the corresponding elements in the HTML.
        $('#total').text(budget.total); 
        $('#limit').text(budget.limit);
    });

    // Setting a click event for an element with the ID 'spendAmount'.
    $('#spendAmount').click(function(){
        // When the 'spendAmount' element is clicked, this function will be executed.

        // Retrieving 'total' and 'limit' values from Chrome storage again.
        chrome.storage.sync.get(['total','limit'], function(budget){
            // When the values are retrieved, perform the following actions:

            // Initialize a variable to store the new total value.
            var newTotal = 0;

            // If 'total' value exists, add its parsed integer value to 'newTotal'.
            if(budget.total){
                newTotal += parseInt(budget.total);
            }

            // Get the amount value from the element with the ID 'amount'.
            var amount = $('#amount').val();

            // If 'amount' value exists, add its parsed integer value to 'newTotal'.
            if(amount){
                newTotal += parseInt(amount);
            }

            // Update the 'total' value in Chrome storage with the new total value.
            chrome.storage.sync.set({'total': newTotal}, function(){
                // After updating the 'total', check if the limit is reached.

                // Note: There is a mistake in the following line of code. 
                // The correct condition should be 'newTotal >= budget.limit' instead of 'newTotal >= budget,limit'.

                // So, let's correct it:
                if(amount && newTotal >= budget.limit){
                    // If the condition is true, show a notification with the limit reached message.
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'limit reached!',
                        message: "Uh oh! Looks like you have reached your limit!"
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });

            // Update the corresponding elements in the HTML with the newTotal and reset the 'amount' field.
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});
