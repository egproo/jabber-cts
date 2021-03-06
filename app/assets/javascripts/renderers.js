var renderers = {
    user: function(data, type, row) {
        var displayName = data.name;
        if (type === 'display') {
            return "<a href='/users/" + data.id + "'>" + displayName + "</a>";
        } else {
            return displayName;
        }
    },

    date: function(data, type, row) {
        if (type === 'display') {
            return new Date(Date.parse(data)).toISOString().replace(/T.*/, '');
        }
        return data;
    },

    roomClass: function(next_payment_at, active) {
        if (active) {
            var nextDate = new Date(Date.parse(next_payment_at)),
                today = new Date(),
                expirationDate = new Date();

            expirationDate.setDate(expirationDate.getDate() + 3);

            if (nextDate <= today) {
                return 'expired';
            } else if (nextDate <= expirationDate) {
                return 'to_be_expired';
            }
        } else {
            return 'deactivated';
        }
    },

    nextPaymentDate: function(data, type, row) {
        if (type === 'display' && data) {
            //var cls = renderers.roomClass(data, row.active);
            var nextDateString = new Date(Date.parse(data)).toISOString().replace(/T.*/, '');

            /*if (cls) {
                return '<span class="expired_' + cls + '">' + nextDateString + '</span>';
            }*/
            return nextDateString;
        } else if (!data) {
            return '';
        }
        return data;
    },

    roomShortName: function(data, type, row) {
        if (type === 'display') {
            return "<a href='/rooms/" + row.id + "'>" + row.short_name + "</a>";
        }
        return row.short_name;
    },

    amount: function(data, type, row) {
        if (type === 'display' && data != null) {
            return '$' + data;
        } 
        return data;
    },

    lastPaymentAmount: function(data, type, row) {
        var lastPayment = row.last_payment;
        if (type === 'display' && lastPayment) {
            return "<a href='/money_transfers/" + lastPayment.money_transfer_id + "'>" + renderers.amount(lastPayment.amount, type, row) + "</a>";
        } else if (!lastPayment) {
            return '';
        }
        return renderers.amount(lastPayment.amount, type, row);
    },

    lastPaymentDate: function(data, type, row) {
        var lastPaymentDate = row.last_payment;
        if (type === 'display' && lastPaymentDate) {
            return renderers.date(lastPaymentDate.effective_from, type, row);
        } else if (!lastPaymentDate) {
            return '';
        }
        return renderers.date(lastPaymentDate.effective_from, type, row);
    },

    mtAmount: function(data, type, row) {
        if (type === 'display') {
            return "<a href='/money_transfers/" + row.id + "'>" + renderers.amount(data, type, row) + "</a>";
        }
        return renderers.amount(data, type, row);
    },

    owner: function(data, type, row) {
        if (type === 'display' && row.owner) {
            return "<a href='/users/" + row.owner.id + "'>" + row.owner.name + "</a>";
        } else if (!row.owner) {
            return '';
        }
        return row.owner.name;
    },

    showDateTime: function(date) {
        function addLeadingZero(num) {
            return num < 10 ? '0' + num : num;
        }
        var currDate = new Date(date),
            currYear = currDate.getFullYear(),
            currMonth = addLeadingZero(currDate.getMonth() + 1),
            currDay = addLeadingZero(currDate.getDate()),
            currHour = addLeadingZero(currDate.getHours()),
            currMin = addLeadingZero(currDate.getMinutes()),
            currSec = addLeadingZero(currDate.getSeconds());
        return currYear + '-' + currMonth + '-' + currDay + ' ' + currHour + ':' + currMin + ':' + currSec;
    },

    dateTime: function(data, type, row) {
        if (type === 'display') {
            return renderers.showDateTime(Date.parse(data));
        }
        return renderers.date(data, type, row);
    },

    dateTimeFromUNIX: function(data, type, row) {
        if (type === 'display') {
            if (data) {
                var d = new Date(0);
                d.setUTCSeconds(data);
                return renderers.showDateTime(d);
            } else {
                return 'Never';
            }
        }
        return data;
    }
}
