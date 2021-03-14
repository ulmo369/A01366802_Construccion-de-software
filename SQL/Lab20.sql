-- Tabla completa
select * from materiales
/*
Renglones = 44

1000	Varilla 3/16	100.00
1010	Varilla 4/32	115.00
1020	Varilla 3/17	130.00
*/

-- Selección
select * from materiales
where clave=1000
/*
Renglones = 1

1000	Varilla 3/16	100.00
*/

-- Proyección
select clave,rfc,fecha from entregan
/*
Renglones = 132

1000	AAAA800101   	1998-07-08 00:00:00.000
1000	AAAA800101   	1999-08-08 00:00:00.000
1000	AAAA800101   	2000-04-06 00:00:00.000
*/

-- join natural
select * from materiales,entregan
where materiales.clave = entregan.clave
/*
Renglones = 132

1000	Varilla 3/16	100.00	1000	AAAA800101   	5000	1998-07-08 00:00:00.000	165.00
1000	Varilla 3/16	100.00	1000	AAAA800101   	5019	1999-08-08 00:00:00.000	254.00
1000	Varilla 3/16	100.00	1000	AAAA800101   	5019	2000-04-06 00:00:00.000	7.00
*/

-- Si algún material no ha se ha entregado ¿Aparecería en el resultado de esta consulta?
-- No

-- Teta join
select * from entregan,proyectos
where entregan.numero < = proyectos.numero
/*
Renglones = 1188

1000	AAAA800101   	5000	1998-07-08 00:00:00.000	165.00	5000	Vamos Mexico
1200	EEEE800101   	5000	2000-03-05 00:00:00.000	177.00	5000	Vamos Mexico
1400	AAAA800101   	5000	2002-03-12 00:00:00.000	382.00	5000	Vamos Mexico
*/

-- Unión
(select * from entregan where clave=1450)
union
(select * from entregan where clave=1300)
/*
Renglones = 3

1300	GGGG800101   	5005	2002-06-10 00:00:00.000	521.00
1300	GGGG800101   	5005	2003-02-02 00:00:00.000	457.00
1300	GGGG800101   	5010	2003-01-08 00:00:00.000	119.00
*/

--¿Cuál sería una consulta que obtuviera el mismo resultado sin usar el operador Unión?
SELECT  * from entregan where clave = 1450 or clave = 1300

-- Intersección
(select clave from entregan where numero=5001)
intersect
(select clave from entregan where numero=5018)
/*
Renglones = 1

1010
*/

-- Diferencia
(select * from entregan)
Except
(select * from entregan where clave=1000)
/*
Renglones = 129

1010	BBBB800101   	5001	2000-05-03 00:00:00.000	528.00
1010	BBBB800101   	5018	2000-11-10 00:00:00.000	667.00
1010	BBBB800101   	5018	2002-03-29 00:00:00.000	523.00
*/

-- Producto cartesiano
/*
Renglones = 5808

1000	AAAA800101   	5000	1998-07-08 00:00:00.000	165.00	1000	Varilla 3/16	100.00
1000	AAAA800101   	5019	1999-08-08 00:00:00.000	254.00	1000	Varilla 3/16	100.00
1000	AAAA800101   	5019	2000-04-06 00:00:00.000	7.00	1000	Varilla 3/16	100.00
*/

-- ¿Cómo está definido el número de tuplas de este resultado en términos del número de tuplas de entregan y de materiales?
-- Sería entrgan*materiales, 132*44 = 5808

--Plantea ahora una consulta para obtener las descripciones de los materiales entregados en el año 2000.
select descripcion from materiales, entregan 
where materiales.clave = entregan.clave
and entregan.fecha between '20000101' and '20010101'
/*
Renglones = 28

Varilla 3/16
Varilla 4/32
Varilla 4/32

¿Por qué aparecen varias veces algunas descripciones de material?
Porque se entregaron varias veces en diferentes fechas
*/

select distinct descripcion from materiales, entregan 
where materiales.clave = entregan.clave
and entregan.fecha between '20000101' and '20010101'
/*
Renglones = 22

Arena
Block
Cantera rosa

¿Qué resultado obtienes en esta ocasión?
los mismos resultados sin repetir
*/


-- Obtén los números y denominaciones de los proyectos con las fechas y cantidades de sus entregas, ordenadas por número de proyecto, 
-- presentando las fechas de la más reciente a la más antigua.

Select Entregan.Numero, Proyectos.denominacion, Entregan.fecha, Entregan.cantidad 
from Proyectos, Entregan
where Proyectos.numero = Entregan.Numero
order by numero, fecha desc

/*
Renglones = 132

5000	Vamos Mexico	2002-03-12 00:00:00.000	382.00
5000	Vamos Mexico	2000-03-05 00:00:00.000	177.00
5000	Vamos Mexico	1998-07-08 00:00:00.000	165.00

¿Qué resultado obtienes en esta ocasión?
los mismos resultados sin repetir
*/

-- Operadores de cadena
SELECT * FROM Materiales where Descripcion LIKE 'Si%'
/*
Renglones = 2

1120	Sillar rosa	100.00
1130	Sillar gris	110.00

Explica que hace el símbolo '%'
Lo que hace es indicar a partir de que punto de la palabra se encuentra ducha condición, si se pone antes es al final de la palabra y si se pone
después es al inicio de la palabra

¿Qué sucede si la consulta fuera : LIKE 'Si' ?
busca todos los materiales que en la descripción tengan unicamente un Si

¿Qué resultado obtienes?
Como no se especifica el %, entonces lo toma que unicamente sea esa palabra completa
*/

SELECT (Apellido + ', ' + Nombre) as Nombre FROM Personas;
DECLARE @foo varchar(40);
DECLARE @bar varchar(40);
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? '
SET @foo += ' obtienes?';
PRINT @foo + @bar;
/*
¿Qué resultado obtienes de ejecutar el siguiente código?
= ¿Que resultado obtienes? ¿¿¿??? 

¿Para qué sirve DECLARE?
Para crear un atributo

¿Cuál es la función de @foo?
declaración de atributos

¿Que realiza el operador SET?
Especificar el valor de un atributo

*/

SELECT RFC FROM Entregan WHERE RFC LIKE '[A-D]%'
/*
Renglones = 14

5016
5016
5006

Se esta seleccionando los RFC que empiezan con las letras que se encuentran en el rango de A-D

*/


SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%'
/*
Renglones = 114

BBBB800101   
BBBB800101   
BBBB800101   

Se estan seleccionando los RFC que inician cual cualquier letra exceptuando la letra A

*/

SELECT Numero FROM Entregan WHERE Numero LIKE '___6'
/*
Renglones = 14

5016
5016
5006

Se seleccionan todos los numeros que tengan 4 digitos y que terminen en 6

*/

--Operadores lógicos
SELECT Clave,RFC,Numero,Fecha,Cantidad
FROM Entregan
WHERE Numero Between 5000 and 5010;
/*
Renglones = 60

1000	AAAA800101   	5000	1998-07-08 00:00:00.000	165.00
1010	BBBB800101   	5001	2000-05-03 00:00:00.000	528.00
1020	CCCC800101   	5002	2001-07-29 00:00:00.000	582.00

¿Cómo filtrarías rangos de fechas?
Between 'dmy' and 'dmy'

*/

SELECT RFC, Cantidad, Fecha, Numero
FROM [Entregan]
WHERE [Numero] Between 5000 and 5010 AND
Exists ( SELECT [RFC]
FROM [Proveedores]
WHERE RazonSocial LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC] )
/*
Renglones = 16

AAAA800101   	165.00	1998-07-08 00:00:00.000	5000
CCCC800101   	582.00	2001-07-29 00:00:00.000	5002
AAAA800101   	86.00	1999-01-12 00:00:00.000	5008

¿Qué hace la consulta?
Selecciona RFC, Cantidad, Fecha, Numero de la tabla Entregan, donde el numero se encuentra entre 5000 y 5010,
ademas de que la razónsocial empieza con LA y el RFC es el mismo tanto en entregan como en proveedores.

¿Qué función tiene el paréntesis ( ) después de EXISTS?
se utiliza para hacer una subconsulta, es decir, hacer nuevamente una consulta dentro
*/

-- Tomando de base la consulta anterior del EXISTS, realiza el query que devuelva el mismo resultado, pero usando el operador IN

SELECT RFC, Cantidad, Fecha, Numero
FROM [Entregan]
WHERE [Numero] Between 5000 and 5010 AND
RFC in ( SELECT [RFC]
FROM [Proveedores]
WHERE RazonSocial LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC] )

-- Utilizando NOT para negar las consultas anteriores
SELECT RFC, Cantidad, Fecha, Numero
FROM [Entregan]
WHERE [Numero] Between 5000 and 5010 AND
not Exists ( SELECT [RFC]
FROM [Proveedores]
WHERE RazonSocial not LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC] )


select RFC,Cantidad, Fecha,Numero
from Entregan
where Numero Between 5000 and 5010 AND 
rfc not IN 
( select RFC
from Proveedores
where RazonSocial not LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC] )


-- Operador TOP
SELECT TOP 2 * FROM Proyectos
/*
Renglones = 2

5000	Vamos Mexico
5001	Aztecón

¿Qué hace la consulta?
Muesta los dos primeros registros que hay en proyectos, tomando en cuenta el orden ascendente de su row "Numero"
Esto se debe al numero 2 que se está poniendo después de la palabra TOP y a esa misma sentencia
*/

SELECT TOP Numero FROM Proyectos
/*
¿Qué hace la consulta?
No muestra nada, ya que es una consulta con error de sintaxis, esto se debe a que se debe especificar que top se desea sacar
*/

--Modificando la estructura de un tabla existente.

--Agrega a la tabla materiales la columna PorcentajeImpuesto con la instrucción:
ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);

--A fin de que los materiales tengan un impuesto, les asignaremos impuestos ficticios basados en sus claves con la instrucción:
UPDATE materiales SET PorcentajeImpuesto = 2*clave/1000;
SELECT * FROM Materiales
SELECT * FROM Entregan

/*
¿Qué consulta usarías para obtener el importe de las entregas es decir, el total en dinero de lo entregado, 
basado en la cantidad de la entrega y el precio del material y el impuesto asignado?
*/

SELECT SUM((costo+PorcentajeImpuesto) * cantidad) as resultado
FROM Materiales, Entregan
WHERE Entregan.Clave = Materiales.Clave

/*
Renglones = 1

10810988.9800

*/

-- Creación de vistas
-- Creando vistas para cinco de las consultas que planteaste anteriormente en la práctica .

--VIEW1
CREATE VIEW view1 AS
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero Between 5000 and 5010 AND
not Exists ( SELECT RFC
FROM [Proveedores]
WHERE RazonSocial not LIKE 'La%' and Entregan.RFC = Proveedores.RFC )

SELECT * FROM view1


--VIEW2
CREATE VIEW view2 AS
select * from materiales

SELECT * FROM view2


--VIEW3
CREATE VIEW view3 AS
SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%'

SELECT * FROM view3


--VIEW4
CREATE VIEW view4 AS
select * from materiales
where clave=1000

SELECT * FROM view4


--VIEW5
CREATE VIEW view5 AS
select distinct descripcion from materiales, entregan 
where materiales.clave = entregan.clave
and entregan.fecha between '20000101' and '20010101'

SELECT * FROM view5

---------------------------------------------------------CONSULTAS DE ENUNCIADOS-----------------------------------------------------------------------
Select * from Materiales
Select * from Entregan
Select * from Proyectos
Select * from Proveedores

-- Los materiales (clave y descripción) entregados al proyecto "México sin ti no estamos completos".
SELECT Materiales.clave, descripcion 
FROM Materiales, Entregan, Proyectos
WHERE Materiales.Clave = Entregan.Clave 
and Entregan.Numero = Proyectos.Numero
and Proyectos.Denominacion = 'Mexico sin ti no estamos completos'
/*
Renglones = 3

1030	Varilla 4/33
1230	Cemento 
1430	Pintura B1022

*/

-- Los materiales (clave y descripción) que han sido proporcionados por el proveedor "Acme tools".
SELECT distinct Entregan.clave, descripcion
FROM Materiales, Proveedores, Entregan
WHERE Materiales.Clave = Entregan.Clave
and Entregan.RFC = Proveedores.RFC
and Proveedores.RazonSocial	= 'La fragua'

/*
NOS SALDRÍA SERÓ CON "Acme tools", YA QUE NO EXISTE EN NUESTRA TABLA, PERO CON "La fragua" NOS SALE LO SIGUIENTE

Renglones = 6

1000	Varilla 3/16
1080	Ladrillos rojos
1160	Cantera rosa

*/

-- El RFC de los proveedores que durante el 2000 entregaron en promedio cuando menos 300 materiales.
SELECT distinct Proveedores.RFC
FROM Proveedores, Entregan
WHERE Proveedores.RFC = Entregan.RFC
and Entregan.fecha between '01/01/00' and '01/01/01'
and Cantidad > 300

/*
Renglones = 8

AAAA800101   
BBBB800101   
CCCC800101     

*/

-- El Total entregado por cada material en el año 2000
SELECT Descripcion, sum(costo) as Total_Vendido
FROM Materiales, Entregan
WHERE Materiales.Clave = Entregan.Clave
GROUP BY Descripcion
ORDER BY sum(costo) asc

/*
Renglones = 42

Block	            90.00
Tepetate	        102.00
Ladrillos grises	105.00

*/ 

-- La Clave del material más vendido durante el 2001. (se recomienda usar una vista intermedia para su solución)
CREATE VIEW aux1 AS
select distinct Descripcion, count(entregan.clave) as cantidad_material
from materiales, entregan
where Materiales.clave = Entregan.Clave 
and Entregan.fecha between '01/01/01' and '01/01/02'
Group by Descripcion

SELECT TOP 5 * FROM aux1
order by cantidad_material desc
/*
Renglones = 5

Cantera blanca	      2
Recubrimiento P1001	  2
Recubrimiento P1028	  2
Sillar rosa	          2
Varilla 3/17	      2

*/ 

--  Productos que contienen el patrón 'ub' en su nombre.
SELECT * 
FROM Materiales 
where Descripcion LIKE '%ub%'
/*
Renglones = 12

1180	Recubrimiento P1001	200.00	2.36
1190	Recubrimiento P1010	220.00	2.38
1200	Recubrimiento P1019	240.00	2.40
1210	Recubrimiento P1028	250.00	2.42

*/ 

-- Denominación y suma del total a pagar para todos los proyectos.
Select Denominacion, sum(cantidad) as total_pagar
FROM Proyectos, Entregan
WHERE Proyectos.Numero = Entregan.Numero
GROUP BY Denominacion
ORDER BY sum(cantidad) desc
/*
Renglones = 20

Construcción de Hospital Infantil	     3789.00
Reparación de la plaza Sonora	         3665.00
CIT Yucatan	                             3645.00
Remodelación de aulas del IPP	         3488.00
Restauración de instalaciones del CEA    3151.00

*/ 

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que 
-- no se encuentran apoyando al proyecto Educando en Coahuila (Solo usando vistas).
CREATE VIEW aux2 AS
SELECT Denominacion Den, Entregan.RFC RFC, RazonSocial RS
FROM Proveedores, Proyectos, Entregan
WHERE Entregan.RFC = Proveedores.RFC
and Proyectos.Numero = Entregan.Numero

Select *
From aux2
WHERE Den = 'Televisa en acción'
/*
Renglones = 8

Televisa en acción	AAAA800101   	La fragua
Televisa en acción	DDDD800101   	Cecoferre
Televisa en acción	DDDD800101   	Cecoferre
Televisa en acción	DDDD800101   	Cecoferre
Televisa en acción	DDDD800101   	Cecoferre

*/

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que
-- no se encuentran apoyando al proyecto Educando en Coahuila (Sin usar vistas, utiliza not in, in o exists).
SELECT Denominacion Den, Entregan.RFC RFC, RazonSocial RS
FROM Proveedores, Proyectos, Entregan
WHERE Entregan.RFC = Proveedores.RFC
and Proyectos.Numero = Entregan.Numero
and Denominacion not in (
SELECT Denominacion
FROM Proyectos
WHERE Denominacion = 'Televisa en acción')
/*
Renglones = 124

Queretaro limpio	HHHH800101   	Tubasa
Queretaro limpio	HHHH800101   	Tubasa
CIT Yucatan			HHHH800101   	Tubasa
Queretaro limpio	HHHH800101   	Tubasa

*/

/*
Costo de los materiales y los Materiales que son entregados al proyecto 
Televisa en acción cuyos proveedores también suministran materiales al proyecto 
Educando en Coahuila.
*/
SELECT distinct Materiales.Costo, Materiales.Descripcion
FROM Materiales, Entregan, Proyectos, Proveedores
WHERE Entregan.Numero = Proyectos.Numero
and Proyectos.Denominacion = 'Televisa en acción'
and Materiales.Clave = Entregan.Clave
and Proveedores.RFC = Entregan.RFC

UNION

SELECT distinct Materiales.Costo, Materiales.Descripcion
FROM Materiales, Entregan, Proyectos, Proveedores
WHERE Entregan.Numero = Proyectos.Numero
and Proyectos.Denominacion = 'Educando en Coahuila'
and Materiales.Clave = Entregan.Clave
and Proveedores.RFC = Entregan.RFC

/*
Renglones = 8

34.00	Tepetate
40.00	Megablock
50.00	Ladrillos rojos

*/

-- Nombre del material, cantidad de veces entregados y total del costo de dichas entregas por material de todos los proyectos.
select Descripcion, count(Entregan.Clave) as Cant_entregado, sum(Entregan.cantidad) as total_costo
from Entregan, Materiales, Proyectos
where Entregan.Clave = Materiales.Clave 
and Proyectos.Numero = Entregan.Numero
GROUP BY Descripcion

/*
Renglones = 42
Tubería 3.6	3	734.00
Tubería 3.7	3	1205.00
Tubería 3.8	3	863.00
*/