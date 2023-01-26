import { Swal } from '../components/imports.js';
export const message=(type,message)=>{
    // eslint-disable-next-line default-case
    switch(type){
        case 'success':
        Swal.fire({
                toast: true,
                position: 'top-end',
                text: message,
                icon: type,
                showConfirmButton: false,
                timer: 3000
            });
            break;
        case 'error':
        case 'info':
        case 'warning':
        Swal.fire({
                text: message,
                icon: type,
            });
            break;
        case 'confirmation':
        Swal.fire({
            text: message,
            icon: 'success',
        });
        break;
        case 'warning-toast':
        Swal.fire({
            toast: true,
            position: 'top-end',
            text: message,
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000
        });
            break;
        case 'error-toast':
        Swal.fire({
                toast: true,
                position: 'top-end',
                text: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            });
        break;
        case 'delete':
        return Swal.fire({
                title: '¿Estas seguro?',
                html: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            });
        break;
            
    }    
}