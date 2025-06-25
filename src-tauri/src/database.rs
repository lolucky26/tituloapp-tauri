use rusqlite::{Connection, Result, params};
use std::path::Path;
use serde_json::{Value, json};
use crate::certificate;
const DB_PATH: &str = "tituloapp.db";
const DB_SCHEMA: &str = include_str!("schema.sql");
use chrono::Local;
use serde::Serialize;

#[derive(Serialize)]
pub struct Student {
    id: i32,
    is_active: i32,
    is_validated: i32,
    fecha_creado: String,
    fecha_editado: String,
    folio: String,
    nombre: String,
    primer_apellido: String,
    segundo_apellido: String,
    carrera: String,
}



fn sqlite_value_to_json(val: rusqlite::types::Value) -> Value {
    use rusqlite::types::Value::*;
    match val {
        Null => Value::Null,
        Integer(i) => json!(i),
        Real(f) => json!(f),
        Text(t) => json!(t),
        Blob(b) => json!(b), // Optionally base64-encode if needed
    }
}

#[tauri::command]
pub fn init_database() -> Result<String, String>  {

    let db_exists = Path::new(DB_PATH).exists();
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    if !db_exists {
        //let schema = fs::read_to_string(DB_SCHEMA).map_err(|e| e.to_string())?;
        //conn.execute_batch(&schema).map_err(|e| e.to_string())?;
        conn.execute_batch(DB_SCHEMA).map_err(|e| e.to_string())?;
    }

    Ok("Base de datos cargada correctamente.".into())
}



#[tauri::command]
pub fn get_all_students() -> Result<Vec<Student>, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT id, is_active, is_validated, fecha_creado, fecha_editado, folio, nombre, primer_apellido, segundo_apellido, carrera FROM students")
        .map_err(|e| e.to_string())?;

    let student_iter = stmt
        .query_map([], |row| {
            Ok(Student {
                id: row.get(0)?,
                is_active: row.get(1)?,
                is_validated: row.get(2)?,
                fecha_creado: row.get(3)?,
                fecha_editado: row.get(4)?,
                folio: row.get(5)?,
                nombre: row.get(6)?,
                primer_apellido: row.get(7)?,
                segundo_apellido: row.get(8)?,
                carrera: row.get(9)?,

            })
        })
        .map_err(|e| e.to_string())?;
    let mut students = Vec::new();
    for student in student_iter {
        students.push(student.map_err(|e| e.to_string())?);
    }
    Ok(students)
}

#[tauri::command]
pub fn get_student(id: i32) -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare("SELECT * FROM students WHERE id = ?").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let student = stmt.query_row([id], |row| {
        let mut obj = serde_json::Map::new();
        for (i, col_name) in column_names.iter().enumerate() {
            let value: rusqlite::types::Value = row.get(i)?;
            obj.insert(col_name.to_string(), sqlite_value_to_json(value));
        }
        Ok(Value::Object(obj))
    });
    match student {
        Ok(student_data) => Ok(student_data),
        Err(rusqlite::Error::QueryReturnedNoRows) => Err("No student found with the given ID.".to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn insert_student() -> Result<i64, String> {
    let is_active = true;
    let current_timestamp = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO students (is_active, fecha_creado, fecha_editado) VALUES (?1,?2,?3)",
        params![
            is_active,
            current_timestamp ,
            current_timestamp 
        ],
    ).map_err(|e| e.to_string())?;
    // Get the id of the just-inserted record
    let id = conn.last_insert_rowid();

    // Update the folio column with the id value (convert id to string if folio is TEXT)
    let folio = id.to_string();
    conn.execute(
        "UPDATE students SET folio = ?1 WHERE id = ?2",
        params![folio, id],
    ).map_err(|e| e.to_string())?;
    Ok(id)
}

#[tauri::command]
pub fn edit_student(
        id:i32,
        folio: String,
        nombre: String,
        primer_apellido: String,
        segundo_apellido: String,
        curp: String,
        email: String,
        carrera: String,
        fecha_inicio: String,
        fecha_termino: String,
        autorizacion: String,
        fecha_expedicion: String,
        modalidad_titulacion: String,
        fecha_examen_profesional: String,
        fecha_excencion_examen_profesional: String,
        cumplio_servicio_social: String,
        fundamento_legal_servicio_social: String,
        entidad_federativa: String,
        escuela_procedencia: String,
        tipo_estudio_antecedente: String,
        entidad_federativa_antecedente: String,
        fecha_inicio_antecedente: String,
        fecha_termino_antecedente: String,
        numero_cedula_antecedente: String,
        recibo: String,
        cadena_original: String,
        cadena_firmada: String,
        xml_base_64: String) -> Result<(), String> {
    let current_timestamp = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE students SET
            folio = ?2,
            nombre = ?3,
            primer_apellido = ?4,
            segundo_apellido = ?5,
            curp = ?6,
            email = ?7,
            carrera = ?8,
            fecha_inicio = ?9,
            fecha_termino = ?10,
            autorizacion = ?11,
            fecha_expedicion = ?12,
            modalidad_titulacion = ?13,
            fecha_examen_profesional = ?14,
            fecha_excencion_examen_profesional = ?15,
            cumplio_servicio_social = ?16,
            fundamento_legal_servicio_social = ?17,
            entidad_federativa = ?18,
            escuela_procedencia = ?19,
            tipo_estudio_antecedente = ?20,
            entidad_federativa_antecedente = ?21,
            fecha_inicio_antecedente = ?22,
            fecha_termino_antecedente = ?23,
            numero_cedula_antecedente = ?24,
            recibo = ?25,
            cadena_original = ?26,
            cadena_firmada = ?27,
            xml_base_64 = ?28,
            fecha_editado = ?29
            WHERE id = ?1",
        params![
            id,
            folio,
            nombre,
            primer_apellido,
            segundo_apellido,
            curp,
            email,
            carrera,
            fecha_inicio,
            fecha_termino,
            autorizacion,
            fecha_expedicion,
            modalidad_titulacion,
            fecha_examen_profesional,
            fecha_excencion_examen_profesional,
            cumplio_servicio_social,
            fundamento_legal_servicio_social,
            entidad_federativa,
            escuela_procedencia,
            tipo_estudio_antecedente,
            entidad_federativa_antecedente,
            fecha_inicio_antecedente,
            fecha_termino_antecedente,
            numero_cedula_antecedente,
            recibo,
            cadena_original,
            cadena_firmada,
            xml_base_64,
            current_timestamp
        ],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn delete_student(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM students WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    Ok(())
    
}

#[tauri::command]
pub fn enable_student(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let updated = conn.execute(
        "UPDATE students SET is_active = 1 WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;

    if updated == 0 {
        // No rows updated—return an appropriate error
        Err("No record found with the given ID.".to_string())
    } else {
        Ok(())
    }
}

#[tauri::command]
pub fn disable_student(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let updated = conn.execute(
        "UPDATE students SET is_active = 0 WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;

    if updated == 0 {
        // No rows updated—return an appropriate error
        Err("No record found with the given ID.".to_string())
    } else {
        Ok(())
    }
}

#[tauri::command]
pub fn edit_student_status(id:i32,estatus_tracking:String,xml_archivo_firmado:Option<String>) -> Result<(), String> {
    let conn: Connection = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let current_timestamp = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let updated = if let Some(xml) = xml_archivo_firmado {
        conn.execute(
            "UPDATE students SET estatus_tracking = ?2, is_validated = 1, xml_archivo_firmado = ?3, fecha_editado = ?4 WHERE id = ?1",
            params![id, estatus_tracking, xml,current_timestamp],
        )
    } else {
        conn.execute(
            "UPDATE students SET estatus_tracking = ?2, fecha_editado = ?3 WHERE id = ?1",
            params![id, estatus_tracking,current_timestamp],
        )
    }.map_err(|e| e.to_string())?;

    if updated == 0 {
        // No rows updated—return an appropriate error
        Err("No record found with the given ID.".to_string())
    } else {
        Ok(())
    }
}

#[tauri::command]
pub fn get_all_schools() -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM schools").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let rows = stmt.query_map([], {
        let column_names = column_names.clone();
        move |row| {
            let mut obj = serde_json::Map::new();
            for (i, col_name) in column_names.iter().enumerate() {
                let value: rusqlite::types::Value = row.get(i)?;
                obj.insert(col_name.to_string(), sqlite_value_to_json(value));
            }
            Ok(Value::Object(obj))
        }
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }

    Ok(Value::Array(results))
}

#[tauri::command]
pub fn edit_school(
    id:i32,
    nombre:String,
    estado:String,
    cuenta:String,
    password:String,
    clave_institucion:String) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let updated = conn.execute(
        "UPDATE schools SET nombre=?2, estado=?3, cuenta=?4, password=?5, clave_institucion=?6  WHERE id = ?1",
        params![
            id,
            nombre,
            estado,
            cuenta,
            password,
            clave_institucion],
    ).map_err(|e| e.to_string())?;

    if updated == 0 {
        // No rows updated—return an appropriate error
        Err("No record found with the given ID.".to_string())
    } else {
        Ok(())
    }
}

#[tauri::command]
pub fn get_all_degrees() -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM degrees").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let rows = stmt.query_map([], {
        let column_names = column_names.clone();
        move |row| {
            let mut obj = serde_json::Map::new();
            for (i, col_name) in column_names.iter().enumerate() {
                let value: rusqlite::types::Value = row.get(i)?;
                obj.insert(col_name.to_string(), sqlite_value_to_json(value));
            }
            Ok(Value::Object(obj))
        }
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }

    Ok(Value::Array(results))
}

#[tauri::command]
pub fn insert_degree(nombre:String,rvoe:String,clave:String) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO degrees (nombre, rvoe, clave) VALUES (?1, ?2, ?3)",
        params![nombre,rvoe,clave],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn delete_degree(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM degrees WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    Ok(())
    
}

#[tauri::command]
pub fn get_all_responsibles() -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM responsible_signatures").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let rows = stmt.query_map([], {
        let column_names = column_names.clone();
        move |row| {
            let mut obj = serde_json::Map::new();
            for (i, col_name) in column_names.iter().enumerate() {
                let value: rusqlite::types::Value = row.get(i)?;
                obj.insert(col_name.to_string(), sqlite_value_to_json(value));
            }
            Ok(Value::Object(obj))
        }
    }).map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }

    Ok(Value::Array(results))
}

#[tauri::command]
pub fn insert_responsible(
    nombre:String,
    primer_apellido:String,
    segundo_apellido:String,
    curp:String,
    cargo:String,
    titulo:String,
    certificado:String,
    certificado_original:String,
    clave_privada:String,
    password:String) -> Result<(), String> {
    //first read the certificate and validate the private key
    let numero_certificado = certificate::get_cert_serial(certificado.clone()).map_err(|e: Box<dyn std::error::Error>| e.to_string())?;
    let  observaciones : String;
    if certificate::validate_private_key_passphrase(clave_privada.clone(), password.clone()) {
        observaciones = String::from("OK");
    } else {
        observaciones = String::from("Contraseña incorrecta");
    }
    //now insert data in the DB
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO responsible_signatures (
        nombre, primer_apellido, segundo_apellido, curp, cargo, titulo, certificado, certificado_original, clave_privada, password, numero_certificado, observaciones
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)",
        params![nombre,
        primer_apellido,
        segundo_apellido,
        curp,
        cargo,
        titulo,
        certificado,
        certificado_original,
        clave_privada,
        password,
        numero_certificado,
        observaciones],
    ).map_err(|e: rusqlite::Error| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn delete_responsible(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM responsible_signatures WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    Ok(())
    
}