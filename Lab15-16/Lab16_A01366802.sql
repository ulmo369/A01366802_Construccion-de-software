------------------------------------------------------------EJERCICIO 1--------------------------------------------------------------------
--BORRADO DE TABLAS--
drop TABLE entregan
drop TABLE materiales
drop TABLE proyectos
drop TABLE Proveedores


--CREAR LAS TABLAS--
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Materiales')

DROP TABLE Materiales

CREATE TABLE Materiales
(
  Clave numeric(5) not null,
  Descripcion varchar(50),
  Costo numeric (8,2)
)

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Proveedores')
CREATE TABLE Proveedores
(
  RFC char(13) not null,
  RazonSocial varchar(50)
)

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Proyectos')
CREATE TABLE Proyectos
(
  Numero numeric(5) not null,
  Denominacion varchar(50)
)

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Entregan')
CREATE TABLE Entregan
(
  Clave numeric(5) not null,
  RFC char(13) not null,
  Numero numeric(5) not null,
  Fecha DateTime not null,
  Cantidad numeric (8,2)
)


--LLENADO DE TABLAS--
BULK INSERT a1366802.a1366802.[Materiales]
   FROM 'e:\wwwroot\rcortese\materiales.csv'
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

SET DATEFORMAT dmy -- especificar formato de la fecha

BULK INSERT a1366802.a1366802.[Entregan]
   FROM 'e:\wwwroot\rcortese\entregan.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)


--CHECAR TABLAS--
SELECT * FROM Materiales
SELECT * FROM Proveedores
SELECT * FROM Proyectos
SELECT * FROM Entregan

------------------------------------------------------------EJERCICIO 2--------------------------------------------------------------------

--AGREGAR NUEVOS REGISTROS--

/*
	Inconsistencia: Ya se tiene un dato con esa llave
*/
 INSERT INTO Materiales values(1000, 'xxx', 1000)
 Delete from Materiales where Clave = 1000 and Costo = 1000


--DEFINIR LLAVE PRIMARIA--
 ALTER TABLE Materiales add constraint llaveMateriales PRIMARY KEY (Clave)
 ALTER TABLE Proveedores add constraint llaveProveedores PRIMARY KEY (RFC)
 ALTER TABLE Proyectos add constraint llaveProyectos PRIMARY KEY (Numero)
 ALTER TABLE Entregan add constraint llaveEntregan PRIMARY KEY (Clave, RFC, Numero, Fecha)

 /*
	Que ocurrió: Ahora no es posible agregar esta columna por que ya se definió la llave primaria
*/
 INSERT INTO Materiales values(1000, 'xxx', 1000)


 /*
 ¿Qué información muestra esta consulta?
	Muestra la información del constraint de las llaves primarias que ya creamos

 ¿Qué sentencias utilizaste para definir las llaves primarias?
	PRIMARY KEY

 ¿Qué sentencias utilizaste para definir este constrait?
	Alter table
*/
 sp_helpconstraint Materiales
 sp_helpconstraint Proveedores
 sp_helpconstraint Proyectos
 sp_helpconstraint Entregan

 --BORRAR LALVE PRIMARIA (CONSTRAINT)--
 ALTER TABLE tableName drop constraint ConstraintName

 
 ------------------------------------------------------------EJERCICIO 3--------------------------------------------------------------------

 --CHECAR TABLAS--
SELECT * FROM Materiales
SELECT * FROM Proveedores
SELECT * FROM Proyectos
SELECT * FROM Entregan


 /*
	¿Qué particularidad observas en los valores para clave, rfc y numero?
	Que no tinen un formato correcto para las personas pero sí para el sistema

	¿Cómo responde el sistema a la inserción de este registro?
	Lo acepta correctamente
*/
INSERT INTO entregan values (0, 'xxx', 0, '1-jan-02', 0) ;
Delete from Entregan where Clave = 0


--LLAVES FORANES--

 /*
¿Qué significa el mensaje que emite el sistema?
Que no permite agregar esa columna

¿Qué significado tiene la sentencia anterior?
Que no permite gracias a que debe ser una clave existente en la tabla materiales
*/
 ALTER TABLE entregan add constraint cfentreganclave foreign key (clave) references materiales(clave);
 ALTER TABLE entregan add constraint cfentreganRFC foreign key (RFC) references Proveedores(RFC);
 ALTER TABLE entregan add constraint cfentregannumero foreign key (Numero) references Proyectos(Numero);

 sp_helpconstraint Entregan

 ------------------------------------------------------------EJERCICIO 4--------------------------------------------------------------------

/*
¿Qué uso se le está dando a GETDATE()?
	Se óne la fecha y el tiempo en el que se agrega la información

¿Tiene sentido el valor del campo de cantidad?
	no
*/
 INSERT INTO entregan values (1000, 'AAAA800101', 5000, GETDATE(), 0);
 Delete from Entregan where Cantidad = 0


 /*
¿Cómo responde el sistema?
	No nos permite ponerlo

¿Qué significa el mensaje?
	Que no se puede gracias a que ya pusimos una restricción
*/
 ALTER TABLE entregan add constraint cantidad check (cantidad > 0) ;

 /*
¿Que ssignifica integridad referencial?
	que la clave externa de una tabla de referencia siempre debe aludir a una fila válida de la tabla a la que se haga referencia

REFERENCIA:
https://es.wikipedia.org/wiki/Integridad_referencial
*/