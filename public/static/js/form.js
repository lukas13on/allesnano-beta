var swalStyled = Swal.mixin({
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ff8a00",
    customClass: {
        confirmButton: "btn btn-primary"
    }
});

function formObject(form, data) {
    this.form = form;
    this.data = data;
    this.refresh();
    return this;
}

formObject.prototype.refresh = function () {
    var inputs = Object.keys(this.data);
    var formObject = this;
    var form = formObject.form;
    // adiciona a formatacao do numero de telefone
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    
    $(this.form).find('[type="tel"]').mask(SPMaskBehavior, spOptions);
    // aciona quando o formulario for resetado
    $(this.form).unbind("reset").on("reset", function (e) {
        e.preventDefault();
        swalStyled.fire({
            icon: "warning",
            title: "Confirmar ação",
            text: "Deseja limpar todos os campos do formulário?"
        }).then(function (result) {
            if (result.value) {
                console.log("limpo");
                $(form).find(".invalid-feedback, .valid-feedback").hide();
                formObject.refresh();
                inputs.forEach(function (input) {
                    console.log(input);
                    $(form).find('[name="' + input + '"]').val("");
                });
            }
        });
    });
    // aciona quando o formulario for enviado
    $(this.form).unbind("submit").on("submit", function (e) {
        e.preventDefault();
        var valid = formObject.validateAll();
        console.log(valid);
        if (valid) {
            swalStyled.fire({
                icon: "info",
                title:"Confirmar ação",
                text:"Deseja enviar o formulário de contato?"
            }).then(function (result) { 
                if (result.value) { 
                    alert("Vou ser enviado");
                }
            });
        } else {
            swalStyled.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                text: 'Por favor verifique os erros no formulário.',
                confirmButtonText: "Entendido",
                showCancelButton: false
            });
        }
        return valid;
    });
    // adiciona ao pressionar qualquer tecla 
    inputs.forEach(function (input) {
        $(this.form).find('[name="' + input + '"]').unbind("keyup").on("keyup", function () {
            console.log(input);
            var value = $(this).val().trim();
            formObject.data[input].value = value === "" ? null : value;
            formObject.validate(input);
        });
    });
};

formObject.prototype.validateAll = function () {
    var inputs = Object.keys(this.data);
    var formObject = this;
    var errors = 0;
    inputs.forEach(function (input) {
        if (!formObject.validate(input, true)) {
            errors++;
        }
    });
    console.log(errors);
    return errors === 0;
};

formObject.prototype.validate = function (input, forced) {
    if (!forced) {
        forced = false;
    }
    if (!this.data[input]) {
        console.error("Input data." + input + " nao definido.");
        return;
    }
    var elInput = $(this.form).find('[name="' + input + '"]');
    if (!elInput.length) {
        console.error("Input name=[" + input + "] nao encontrado no formulario.");
        return;
    }
    if (!this.data[input].validator) {
        console.error("Validador nao encontrado para o input.");
        return;
    }
    var elValue = elInput.val();
    var elValid = this.data[input].validator(elValue);
    var elFeedbackValid = elInput.parent().find(".valid-feedback");
    var elFeedbackInvalid = elInput.parent().find(".invalid-feedback");
    if (!elFeedbackValid.length || !elFeedbackInvalid.length) {
        console.error("Invalid feedback e(ou) valid feedback nao entrado.");
    }
    if (elValue.length > 0 || forced) {
        if (elValid) {
            if (elFeedbackValid.css("display") === "none") {
                elFeedbackInvalid.hide();
                elFeedbackValid.slideDown();
            }
        } else {
            if (elFeedbackInvalid.css("display") === "none") {
                elFeedbackValid.hide();
                elFeedbackInvalid.slideDown();
            }
        }
    } else {
        elFeedbackValid.hide();
        elFeedbackInvalid.hide();
    }
    console.log(elInput, elValid, elFeedbackValid, elFeedbackInvalid);
    return elValid;
};

var form = $("#formulario");
var data = {
    nome: {
        value: null,
        validator: function (value) {
            console.log("nome");
            if (value.length >= 5 && value.length <= 50) {
                return true;
            } else {
                return false;
            }
        }
    },
    nomeEmpresa: {
        value: null,
        validator: function (value) {
            console.log("nomeEmpresa");
            if (value.length >= 3 && value.length <= 50) {
                return true;
            } else {
                return false;
            }
        }
    },
    telefone: {
        value: null,
        validator: function (value) {
            console.log("telefone");
            if (value.length >= 14 && value.length <= 15) {
                return true;
            } else {
                return false;
            }
        }
    },
    email: {
        value: null,
        validator: function (value) {
            console.log("email");
            if (value.length >= 5 && value.length <= 50) {
                var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regExp.test(value);
            } else {
                return false;
            }
        }
    },
    mensagem: {
        value: null,
        validator: function (value) {
            console.log("mensagem");
            if (value.length >= 10 && value.length <= 50) {
                return true;
            } else {
                return false;
            }
        }
    }
};

var formulario = new formObject(form, data);
console.log(formulario);