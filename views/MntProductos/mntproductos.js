var tabla;

function init() {
    $("#producto_form").on("submit", function(e){
        guardaryeditar(e);
    });
}

$(document).ready(function(){
    tabla=$('#producto_data').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ],

        "ajax":{
            url: '../../controller/producto.php?op=listar',
            type: "get",
            dataType: "json",
            error: function(e){
                console.log(e.responseText);
            }
        },

        "bDestroy": true,
        "responsive": true,
        "bInfo": true,
        "iDisplayLength": 2,
        "order": [[0, "asc"]],
        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ resgistros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningun dato disponible en esta tabla",
            "sInfo": "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando un total de 0 registros",
            "sInfoFiltered": "(filtrado de un taotal de _MAX_ resgistros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },

            "oAria":{
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

        }
    }).DataTable();
});

function guardaryeditar(e) {

    e.preventDefault();
    var formData = new FormData($("#producto_form")[0]);

    $.ajax({
        url: "../../controller/producto.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function(datos) {

            $('#producto_form')[0].reset();
            $("#modalmantenimiento").modal('hide');
            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Registro',
                'Registro correcto!',
                'success'
            )
            /*
            Swal.fire({
                title: 'Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `No guardar`,
              }).then((datos) => {
                //Read more about isConfirmed, isDenied below 
                if (result.isConfirmed) {

                    $.post("../../controller/producto.php?op=guardaryeditar", {prod_id:prod_id}, function(data){

                    });
                    
                  Swal.fire('Guardado correctamente!', '', 'success')
                } else if (result.isDenied) {
                    $.post("../../controller/producto.php?op=mostrar", {prod_id:prod_id}, function(data){

                    });
                  Swal.fire('Los cambios no fueron guardados', '', 'info')
                }
              })*/
            
        }
    });
    
}

function editar(prod_id) {
    console.log(prod_id);    
}

function eliminar(prod_id) {

    swal.fire({
        title: 'Eliminar',
        text: "Esta seguro de eliminar el registro?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed){

            $.post("../../controller/producto.php?op=eliminar", {prod_id:prod_id}, function(data){

            });

            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Eliminado!',
                'El registro se eliminó correctamente',
                'success'
            )
        }
    })
}

$(document).on("click", "#btnnuevo", function(){
    $('#mdltitulo').html('Nuevo Registro');
    $('#modalmantenimiento').modal('show');
});

init();

