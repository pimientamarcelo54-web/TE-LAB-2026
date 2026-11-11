//Tecnologías Emergentes de la Programación
//Alumno: Marcelo Nicolás Pimienta Dejesús
//Fecha: 10 de Noviembre de 2026


import './styles.css';

// 1. Tipo esperado
type Student = { id: number; name: string; scores: number[] };

// 2. Simulamos la respuesta de una API
const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';

// Ejemplos inválidos para probar (descomenta uno a la vez):
// const json = '{"id":"1","name":"Hermione","scores":[95, 100, 98]}'; // id es string
// const json = '{"id":1,"name":"Hermione","scores":[95, "100", 98]}'; // score no numérico
// const json = '{"id":1,"name":"Hermione"}';                          // falta scores
// const json = '{esto no es JSON';                                    // JSON roto

// 3. Parseo seguro: devuelve unknown (nunca asumimos el tipo)
function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null; // JSON malformado
  }
}

// 4. Type guard: valida la forma y los tipos en tiempo de ejecución
function isStudent(x: unknown): x is Student {
  if (typeof x !== 'object' || x === null) return false;

  const obj = x as Record<string, unknown>;

  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.scores) &&
    obj.scores.every((s) => typeof s === 'number')
  );
}

// 5. Promedio
function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, n) => acc + n, 0) / nums.length;
}

// 6. Renderizado en el DOM
function renderStudent(student: Student): void {
  const h1 = document.createElement('h1');
  h1.textContent = student.name;

  const p = document.createElement('p');
  p.textContent = `Promedio de scores: ${average(student.scores).toFixed(2)}`;

  document.body.append(h1, p);
}

function renderError(message: string): void {
  const p = document.createElement('p');
  p.textContent = message;
  p.style.color = 'crimson';
  document.body.appendChild(p);
}

// 7. Flujo principal
const data = safeParse(json);

if (isStudent(data)) {
  // Aquí TypeScript ya sabe que data es Student (narrowing)
  renderStudent(data);
} else {
  renderError('Error: la respuesta no tiene el formato esperado de Student.');
}
