// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod certificate;
mod soap;

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![database::init_database,
      database::get_all_students, database::get_student, database::insert_student,database::edit_student,database::delete_student,
      database::enable_student,database::disable_student,database::edit_student_status,
      database::get_all_schools,database::edit_school,
      database::get_all_degrees,database::insert_degree,database::delete_degree,
      database::get_all_responsibles,database::insert_responsible,database::delete_responsible,
      certificate::sign_original_chain,certificate::get_xml_from_json,
      soap::descarga, soap::acceso_cadena])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
