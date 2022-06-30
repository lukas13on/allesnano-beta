function formObject(form, data) {
    this.form = form;
    this.data = data;
    return this;
}

formObject.prototype.validate = function (input) {
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
    var elValid = this.data[input].validator();
    var elFeedbackValid = elInput.parent().find(".valid-feedback");
    var elFeedbackInvalid = elInput.parent().find(".invalid-feedback");
    if (!elFeedbackValid.length || !elFeedbackInvalid.length) {
        console.error("Invalid feedback e(ou) valid feedback nao entrado.");
    }
    if (elValid) {
        if (elFeedbackValid.css("display") === "none") {
            elFeedbackValid.slideDown();
        }
    } else {
        if (elFeedbackInvalid.css("display") === "none") {
            elFeedbackInvalid.slideDown();
        }
    }
    console.log(elInput, elValid, elFeedbackValid, elFeedbackInvalid);
};

var form = $("#formulario");
var data = {
    nome: {
        value: null,
        name: "nome",
        validator: function (value) {
            return true;
        }
    },
    nomeEmpresa: {
        value: null,
        name: "nomeEmpresa",
        validator: function (value) {
            return true;
        }
    },
    telefone: {
        value: null,
        name: "telefone",
        validator: function (value) {
            return true;
        }
    },
    email: {
        value: null,
        name: "email",
        validator: function (value) {
            return true;
        }
    },
    mensagem: {
        value: null,
        name: "mensagem",
        validator: function (value) {
            return true;
        }
    }
};
var formulario = new formObject(form, data);
console.log(formulario);