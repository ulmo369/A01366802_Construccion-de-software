SELECT nombre, SUM(sueldo) as 'Sueldo total' 
FROM Elenco 
GROUP BY nombre

SELECT nomestudio, SUM(presupuesto) as TotalPrecio
FROM peliculas, estudio
WHERE estudio.nomestudio = peliculas.nomestudio
GROUP BY nomestudio

SELECT nombre, AVG(sueldo) as promedio
FROM Elenco, Actor
WHERE Elenco.nombre = Actor.nombre AND sexo = 'hombre'
HAVING AVG(sueldo) > 5000000
ORDER BY AVG(sueldo) DESC

SELECT titulo, año, MIN(presupuesto) as presupuesto
FROM pelicula

SELECT * FROM Materiales 

SELECT RFC, Numero, MIN(Cantidad) as presupuesto
FROM Entregan
GROUP BY RFC, Numero
ORDER BY presupuesto

SELECT nombre, max(sueldo)
FROM elenco
WHERE sexo = 'mujer'
