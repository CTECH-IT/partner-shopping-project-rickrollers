(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector:' + selector);
        }

        //remove a row identified by an email address
        CheckList.prototype.removeRow = function (email) {
            this.$element
                .find('[value="' + email + '"]')
                .closest('[data-keyboard-order="checkbox"]')
                .remove();
        };

        CheckList.prototype.addClickHandler = function(func) {
            this.$element.on('click', 'input', function (event) {
                var email = event.target.value;
                this.removeRow(email);
                func(email);
            }.bind(this));
        };

        // The method that adds a new row to the checklist
        CheckList.prototype.addRow = function (keyboardOrder) {
            //Remove any existing rows that match the email address
            this.removeRow(keyboardOrder.emailAddress);
            //Create a new instance of a row, using the coffee order info
            var rowElement = new Row(keyboardOrder);
            // Add the new ro instance's $element property to the checklist
            this.$element.append(rowElement.$element);
        };

        //Each row is one outstanding order
        function Row(keyboardOrder) {
            let $div = $('<div></div>', {
                'data-keyboard-order': 'checkbox',
                'class': 'checkbox'
            });
            let $label = $('<label></label>');

            let $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: keyboardOrder.emailAddress
            });
            let description = keyboardOrder.Amount + ' ';
            if (keyboardOrder.Amount && keyboardOrder.HuntsmanMiniWhite) {
                description += 'Huntsman Mini White -$129.99 ';
            }
            if (keyboardOrder.Amount && keyboardOrder.LogitechWireless) {
                description += 'Logitech Wireless -$149.99';
            }
            if (keyboardOrder.Amount && keyboardOrder.RGBMechanicalKeyboardBlack) {
                description += 'RGB Mechanical Keyboard Black -$109.99 ';
            }
            if (keyboardOrder.Amount && keyboardOrder.sixtyMechanicalKeyboardPurple) {
                description += '60% Purple Custom Mechanical Keyboard -$159.99';
            }
            if(keyboardOrder.Amount && keyboardOrder.HuntsmanMiniBlack){
                description += 'Huntsman Mini [Black] -$129.99'
            }
            if(keyboardOrder.amount&& keyboardOrder.LeagueOfLegendsBoard){
                description += 'League of Legends Keyboard -$129.99'
            }
            description += ' (' + keyboardOrder.emailAddress + ')';
            
        

            $label.append($checkbox);
            $label.append(description);
            $div.append($label);

            this.$element = $div;
        }

    }
    App.CheckList = CheckList;
    window.App = App;
})(window); 