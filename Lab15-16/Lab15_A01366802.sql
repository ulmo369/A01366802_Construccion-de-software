CREATE TABLE Materiales(
  Clave numeric(5),
  Descripcion varchar(50),
  Costo numeric(8,2)
)

CREATE TABLE Proveedores(
  RFC char(13),
  RazonSocial varchar(50)
)

CREATE TABLE Proyectos(
  Numero numeric(5),
  Denominacion varchar(50)
)

CREATE TABLE Entregan(
  Clave numeric(5),
  RFC char(13),
  Numero numeric(5),
  Fecha datetime,
  Cantidad numeric(8,2)
)

BULK INSERT a1366802.a1366802.[Materiales]
   FROM 'e:\wwwroot\rcortese\materiales.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT a1366802.a1366802.[Entregan]
   FROM 'e:\wwwroot\rcortese\entregan.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT a1366802.a1366802.[Proveedores]
   FROM 'e:\wwwroot\rcortese\proveedores.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT a1366802.a1366802.[Proyectos]
   FROM 'e:\wwwroot\rcortese\proyectos.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

SELECT * FROM Materiales

DROP table Entregan

SET DATEFORMAT dmy

/* 
REPORTE:

1. ¿Que muestra la instrucción?
	Las caracteristica de la tabla

2. ¿Qué efecto tuvo esta acción?
	Nos sale el lugar donde podremos escribir código SQL

3. ¿Qué utilidad tiene esta manera de ejecutar los comandos de SQL?
	Autamita muchos procesos

4. ¿Qué relación tiene el contenido de este archivo (materiales.sql) con el formato en que se encuentran los datos en el archivo materiales.csv?
	El acomodo de los datos y los datos

5. ¿Qué sucedió?
	Nos mostró todos los datos de la tabla

*/