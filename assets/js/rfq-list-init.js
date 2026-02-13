$(document).ready(function() {
    if ($('#proposalList').length) {
        $('#proposalList').DataTable({
            "searching": false,
            "lengthChange": false,
            "language": {
                paginate: {
                    next: '<i class="feather feather-chevron-right"></i>',
                    previous: '<i class="feather feather-chevron-left"></i>'
                }
            }
        });
    }
});
