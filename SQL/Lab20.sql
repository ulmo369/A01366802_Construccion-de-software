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

SELECT RFC, Cantidad, Fecha, Numero
FROM [Entregan]
WHERE [Numero] Between 5000 and 5010 AND
Exists ( SELECT [RFC]
FROM [Proveedores]
WHERE RazonSocial LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC] )


SELECT Proveedores.RFC
FROM [Proveedores], [Entregan]
WHERE RazonSocial LIKE 'La%' and [Entregan].[RFC] = [Proveedores].[RFC]
and not Exists (SELECT RFC, Cantidad, Fecha, Numero
FROM [Entregan]
WHERE [Numero] Between 5000 and 5010)