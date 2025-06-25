BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "schools" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL DEFAULT '',
    "estado" TEXT NOT NULL DEFAULT '',
    "tipo_registro" TEXT NOT NULL DEFAULT '',
    "clave_institucion" TEXT NOT NULL DEFAULT '',
    "cuenta" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS "students" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "is_validated" INTEGER NOT NULL DEFAULT 0,
    "fecha_creado" TEXT NOT NULL DEFAULT '',
    "fecha_editado" TEXT NOT NULL DEFAULT '',
    "folio" TEXT NOT NULL DEFAULT '',
    "nombre" TEXT NOT NULL DEFAULT '',
    "primer_apellido" TEXT NOT NULL DEFAULT '',
    "segundo_apellido" TEXT NOT NULL DEFAULT '',
    "curp" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "carrera" TEXT NOT NULL DEFAULT '',
    "fecha_inicio" TEXT NOT NULL DEFAULT '',
    "fecha_termino" TEXT NOT NULL DEFAULT '',
    "autorizacion" TEXT NOT NULL DEFAULT '',
    "fecha_expedicion" TEXT NOT NULL DEFAULT '',
    "modalidad_titulacion" TEXT NOT NULL DEFAULT '',
    "fecha_examen_profesional" TEXT NOT NULL DEFAULT '',
    "fecha_excencion_examen_profesional" TEXT NOT NULL DEFAULT '',
    "cumplio_servicio_social" TEXT NOT NULL DEFAULT '',
    "fundamento_legal_servicio_social" TEXT NOT NULL DEFAULT '',
    "entidad_federativa" TEXT NOT NULL DEFAULT '',
    "escuela_procedencia" TEXT NOT NULL DEFAULT '',
    "tipo_estudio_antecedente" TEXT NOT NULL DEFAULT '',
    "entidad_federativa_antecedente" TEXT NOT NULL DEFAULT '',
    "fecha_inicio_antecedente" TEXT NOT NULL DEFAULT '',
    "fecha_termino_antecedente" TEXT NOT NULL DEFAULT '',
    "numero_cedula_antecedente" TEXT NOT NULL DEFAULT '',
    "estatus_titulo" TEXT NOT NULL DEFAULT '',
    "recibo" TEXT NOT NULL DEFAULT '',
    "cadena_original" TEXT NOT NULL DEFAULT '',
    "cadena_firmada" TEXT NOT NULL DEFAULT '',
    "xml" TEXT NOT NULL DEFAULT '',
    "xml_base_64" TEXT NOT NULL DEFAULT '',
    "estatus_tracking" TEXT NOT NULL DEFAULT '',
    "xml_archivo_firmado" TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS "responsible_signatures" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL DEFAULT '',
    "primer_apellido" TEXT NOT NULL DEFAULT '',
    "segundo_apellido" TEXT NOT NULL DEFAULT '',
    "curp" TEXT NOT NULL DEFAULT '',
    "cargo" TEXT NOT NULL DEFAULT '',
    "titulo" TEXT NOT NULL DEFAULT '',
    "certificado" TEXT NOT NULL DEFAULT '',
    "certificado_original" TEXT NOT NULL DEFAULT '',
    "clave_privada" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "numero_certificado" TEXT NOT NULL DEFAULT '',
    "observaciones" TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS "degrees" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL DEFAULT '',
    "rvoe" TEXT NOT NULL DEFAULT '',
    "clave" TEXT NOT NULL DEFAULT ''
);

INSERT INTO "schools" VALUES (1, 'AGREGUE NOMBRE', '', '', '', '', '');

COMMIT;