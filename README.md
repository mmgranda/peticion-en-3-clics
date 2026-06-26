# Petición en 3 Clics

Plataforma comunitaria para crear causas, registrar apoyos y generar un PDF colectivo.

## Objetivo

Construir una herramienta sencilla de participación ciudadana que permita organizar solicitudes comunitarias y registrar apoyos.

## Instalación

```bash
npm install

## Interfaz visual

La Clase 57 agrega una interfaz en `/` que permite:

- Crear causas comunitarias.
- Ver causas registradas.
- Registrar apoyos.
- Ver contador de apoyos.
- Ver comentarios de apoyo.

## Regla de privacidad

El formulario de apoyo solo pide nombre de práctica y comentario opcional.
No solicita cédula, teléfono, dirección ni datos sensibles.

## Generación de PDF

La Clase 58 agrega generación de PDF colectivo.

Ruta:

```txt
GET /api/pdf/:causaId