function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        // Define a ordem das colunas
        var row = [
            data.timestamp,
            data.nome,
            data.whatsapp,
            data.email,
            data.estadoCivil,
            data.profissao,
            data.frase
        ];

        // Adiciona a linha na planilha
        sheet.appendRow(row);

        return ContentService.createTextOutput("Sucesso").setMimeType(ContentService.MimeType.TEXT);
    } catch (error) {
        return ContentService.createTextOutput("Erro: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
    }
}

// Opcional: Adiciona cabeçalhos se a planilha estiver vazia
function setup() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Data/Hora", "Nome", "WhatsApp", "E-mail", "Estado Civil", "Profissão", "Momento Atual"]);
    }
}
