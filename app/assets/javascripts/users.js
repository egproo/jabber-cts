$(document).ready(function() {
    setupDataTable({
        aaData: usersData,
        aoColumns: [
            {
                mData: null,
                mRender: function(data, type, row) { return renderers.user(row, type, row); },
                sWidth: "30%"
            }, {
                mData: "phone",
                sWidth: "20%"
            }, {
                mData: "role",
                mRender: function(data, type, row) { return user_role_names[data]; },
                sWidth: "10%"
            }, {
                mData: "created_at",
                mRender: renderers.date,
                sWidth: "10%"
            }
        ]
    });
});
