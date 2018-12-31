fs = require('fs');
const { NerManager } = require('node-nlp');



module.exports = class NerModel {

    constructor() {
        this.modelPath = '/tmp/model';
    }

    // Train a ner model from a csv file
    // In the end, model must stay is the path /tmp/model
    trainningModel(pathFile) {
        let manager = new NerManager({ threshold: 0.8 });

        try {
            let contents = fs.readFileSync(pathFile, 'utf8');
            let allLines = contents.split("\n");
            for (let line in allLines) {
                let splittedLine = allLines[line].split(',');
                if (splittedLine.length > 2) {
                    manager.addNamedEntityText(
                        splittedLine[0],
                        splittedLine[1],
                        [splittedLine[2]],
                        [splittedLine[1].replace("-", ""), splittedLine[1].replace("-", " "), splittedLine[1].replace("'", "")]
                    );
                }

            }

        } catch (error) {
            console.log(error);
        }

        let result = manager.save(this.modelPath);
        let modelString = JSON.stringify(result);
        fs.writeFileSync(this.modelPath, modelString);

    }

    // Predict entites from some text in some language.
    // Many entity may be figured out in one text.
    predict(input, lang) {

        let contents = fs.readFileSync(this.modelPath, 'utf8');
        let model = JSON.parse(contents);
        let manager = new NerManager({ threshold: 0.8 });
        manager.load(model);

        return manager.findEntities(input, lang)
            .then(entities => {
                return entities;
            });

    }
}