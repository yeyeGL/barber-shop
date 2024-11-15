import Swal from 'sweetalert2';

// Funcion de mostrar mensajes de alerta de tipo success "Valido"
export const showSuccess = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });
};

// Funcion de mostrar mensajes de alerta de tipo error "Invalido"
export const showError = (title, text) => {
    // Si el texto es un array de errores, los concatenamos
    if (Array.isArray(text)) {
      text = text.join("\n"); // Unimos los errores en un solo texto separado por saltos de línea
    }
  
    // Mostramos el modal con SweetAlert2
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  };
  
// Funcion de mostrar mensajes de alerta de tipo warning "Advertencia"
export const showWarning = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
    });
};  

// Funcion de mostrar mensajes de alerta de tipo info "Informacion"
export const showInfo = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonText: 'Aceptar',
    });
};

// Funcion de mostrar mensajes de alerta de tipo question "Pregunta"
export const showQuestion = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        confirmButtonText: 'Aceptar',
    });
};

// Funcion de mostrar mensajes de alerta de tipo loading "Cargando"
export const showLoading = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'loading',
        confirmButtonText: 'Aceptar',
    });
};

// Funcion de mostrar mensajes de alerta de tipo success "Valido" con tiempo de espera
export const showSuccessWithTimer = (title, text, timer) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: timer,
    });
};  

// Funcion de mostrar mensajes de alerta de tipo error "Invalido" con tiempo de espera
export const showErrorWithTimer = (title, text, timer) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: timer,
    });
};

// Funcion de mostrar mensajes de alerta de tipo warning "Advertencia" con tiempo de espera
export const showWarningWithTimer = (title, text, timer) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        timer: timer,
    });
};  

// Funcion de mostrar mensajes de alerta de tipo info "Informacion" con tiempo de espera
export const showInfoWithTimer = (title, text, timer) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        timer: timer,
    });
};

// Funcion para eliminar un reserva con aceptar y cancelar
export const showDeleteReserva = (title, text, timer) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        timer: timer,
    });
};
