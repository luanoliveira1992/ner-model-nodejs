const NerModel = require('./ner');

try {
    // Init the object NerModel and train it from csv formatted
    let model = new NerModel();
    model.trainningModel('input.csv');

    // enter some sentence and an entity will appear
    model.predict('gostaria de saber quando vai passar o boa tarde fox', 'pt').then(function (entites) {
        entites.forEach(entity => {

            let output = `Entidade encontrada ${entity.entity} 
        iniciando em ${entity.start} e finalizando em 
        ${entity.end} com nome ${entity.sourceText}`;

            console.log(output);
        });
    });
} catch (error) {
    console.error(error);
}

