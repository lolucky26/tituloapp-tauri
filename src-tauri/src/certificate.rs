use x509_parser::prelude::*;
use ::pem::parse as parse_pem;
use hex::decode as hex_decode;
use openssl::rsa::Rsa;
use base64::engine::general_purpose::STANDARD as BASE64;
use base64::Engine as _;
use openssl::pkey::PKey;
use openssl::sign::Signer;
use openssl::hash::MessageDigest;
use xml2json_rs::XmlConfig;
use xml2json_rs::{ Declaration, Version, Encoding };

fn hex_colon_to_ascii(hex_colon: String) -> Result<String, Box<dyn std::error::Error>> {
    // Remove colons and whitespace (optional, if any)
    let clean_hex: String = hex_colon.replace(":", "").replace(|c: char| c.is_whitespace(), "");
    // Decode from hex to bytes
    let bytes = hex_decode(clean_hex)?;
    // Convert bytes to ASCII string
    let ascii = String::from_utf8(bytes)?;
    Ok(ascii)
}

pub fn get_cert_serial(cert_string: String) -> Result<String, Box<dyn std::error::Error>> {
    // Parse the PEM and get the DER bytes
    let pem = parse_pem(&cert_string)?;
    let der_bytes = &pem.contents;
    // Parse the DER-encoded certificate
    let (_, cert) = X509Certificate::from_der(der_bytes)?;
    // Get the serial number as a hex string
    let hex_serial: String = cert.raw_serial_as_string();
    let ascii_serial: String = hex_colon_to_ascii(hex_serial)?;
    Ok(ascii_serial)
}

pub fn validate_private_key_passphrase(private_key: String, passphrase: String) -> bool {
    Rsa::private_key_from_pem_passphrase(private_key.as_bytes(), passphrase.as_bytes()).is_ok()
}

#[tauri::command]
pub fn sign_original_chain(private_key: String, passphrase: String, original_chain: String) -> Result<String, String> {
    // Parse the encrypted private key
    let rsa = Rsa::private_key_from_pem_passphrase(
            private_key.as_bytes(),
            passphrase.as_bytes()
        )
        .map_err(|e| format!("PEM/Passphrase parse error: {}", e))?;
    let pkey = PKey::from_rsa(rsa).map_err(|e| format!("PKey error: {}", e))?;

    // Create a signer
    let mut signer = Signer::new(MessageDigest::sha256(), &pkey)
        .map_err(|e| format!("Signer error: {}", e))?;
    signer.update(original_chain.as_bytes())
        .map_err(|e| format!("Sign update error: {}", e))?;
    let signature = signer.sign_to_vec()
        .map_err(|e| format!("Signing error: {}", e))?;
    Ok(BASE64.encode(signature))   
}

#[tauri::command]
pub fn get_xml_from_json(json_string: String) -> Result<String,String>  {
    //let mut xml_builder = XmlBuilder::default();
    let mut xml_builder = XmlConfig::new()
    .decl(Declaration::new(Version::XML10, Some(Encoding::UTF8), None ))
    .finalize();
    let xml= xml_builder.build_from_json_string(&json_string).map_err(|e| format!("XML error: {}", e))?;
    Ok(xml)
}