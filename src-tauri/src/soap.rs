const SOAP_URL: &str = "http://app-msys.uienl.edu.mx:8044/WebProduccionTitulo/WsTitulo.asmx";

#[tauri::command]
pub fn descarga(
    recibo: String,
    clave_dgp: i32,
    archivo_nombre: String
) -> Result<String, String> {
    // SOAP endpoint & action
    let soap_action = "http://tempuri.org/Descarga";

    // Prepare SOAP request XML
    let soap_req = format!(
        r#"<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soap:Body>
    <tem:Descarga>
      <tem:Recibo>{recibo}</tem:Recibo>
      <tem:ClaveDGP>{clave_dgp}</tem:ClaveDGP>
      <tem:Archivo_Nombre>{archivo_nombre}</tem:Archivo_Nombre>
    </tem:Descarga>
  </soap:Body>
</soap:Envelope>
"#);

    // Send request
    let client = reqwest::blocking::Client::new();
    let resp = client
        .post(SOAP_URL)
        .header("Content-Type", "text/xml; charset=utf-8")
        .header("SOAPAction", soap_action)
        .body(soap_req)
        .send()
        .map_err(|e| format!("HTTP error: {}", e))?;

    let text = resp.text().map_err(|e| format!("Response error: {}", e))?;

    // Minimal XML parsing to get the result
    let descarga_result_tag_start = "<DescargaResult>";
    let descarga_result_tag_end = "</DescargaResult>";

    if let Some(start) = text.find(descarga_result_tag_start) {
        if let Some(end) = text[start..].find(descarga_result_tag_end) {
            let result = &text[start+descarga_result_tag_start.len() .. start+end];
            return Ok(result.to_string());
        }
    }

    Err(format!("Could not parse SOAP response. Raw: {}", text))
}

#[tauri::command]
pub fn acceso_cadena(
    cuenta:String,
    password:String,
    recibo: String,
    clave_dgp: i32,
    cadena:String,
    archivo_nombre:String
) -> Result<String, String> {
    // SOAP endpoint & action
    let soap_action = "http://tempuri.org/AccesoCadena";

    // Prepare SOAP request XML
    let soap_req = format!(
        r#"<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soap:Body>
    <tem:AccesoCadena>
      <tem:Cuenta>{cuenta}</tem:Cuenta>
      <tem:Password>{password}</tem:Password>
      <tem:Recibo>{recibo}</tem:Recibo>
      <tem:ClaveDGP>{clave_dgp}</tem:ClaveDGP>
      <tem:Cadena>{cadena}</tem:Cadena>
      <tem:FileName>{archivo_nombre}</tem:FileName>
    </tem:AccesoCadena>
  </soap:Body>
</soap:Envelope>
"#);

    // Send request
    let client = reqwest::blocking::Client::new();
    let resp = client
        .post(SOAP_URL)
        .header("Content-Type", "text/xml; charset=utf-8")
        .header("SOAPAction", soap_action)
        .body(soap_req)
        .send()
        .map_err(|e| format!("HTTP error: {}", e))?;

    let text = resp.text().map_err(|e| format!("Response error: {}", e))?;

    // Minimal XML parsing to get the result
    let result_tag_start = "<AccesoCadenaResult>";
    let result_tag_end = "</AccesoCadenaResult>";

    if let Some(start) = text.find(result_tag_start) {
        if let Some(end) = text[start..].find(result_tag_end) {
            let result = &text[start+result_tag_start.len() .. start+end];
            return Ok(result.to_string());
        }
    }

    Err(format!("Could not parse SOAP response. Raw: {}", text))
}