import React, { useState } from 'react';
import { 
    getAllButterflies, 
    getOneButterfly, 
    createButterfly, 
    updateButterfly, 
    deleteButterfly 
} from './ButterflyServices';

const TestServices = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [testButterflyId, setTestButterflyId] = useState(null);

    const addResult = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setResults(prev => [...prev, { message, type, timestamp }]);
    };

    const runAllTests = async () => {
        setIsLoading(true);
        setResults([]);
        
        try {
            addResult('🧪 Iniciando pruebas completas de servicios CRUD...', 'info');
            
            // TEST 1: GET ALL - Obtener todas las mariposas
            addResult('📋 TEST 1: Obteniendo todas las mariposas...', 'test');
            const allButterflies = await getAllButterflies();
            console.log('GET ALL - Resultado:', allButterflies);
            addResult(`✅ GET ALL: ${allButterflies?.length || 0} mariposas encontradas`, 'success');
            
            // TEST 2: CREATE - Crear una nueva mariposa
            addResult('➕ TEST 2: Creando nueva mariposa...', 'test');
            const newButterfly = {
                name: "Mariposa de Prueba",
                species: "Testus butterflyus",
                location: "Nueva Zelanda",
                description: "Mariposa creada para pruebas CRUD",
                habitat: "Bosques templados",
                wingspan: "8-10 cm",
                status: "Test"
            };
            
            const createdButterfly = await createButterfly(newButterfly);
            console.log('CREATE - Resultado:', createdButterfly);
            
            if (createdButterfly && createdButterfly.id) {
                setTestButterflyId(createdButterfly.id);
                addResult(`✅ CREATE: Mariposa creada con ID: ${createdButterfly.id}`, 'success');
                
                // TEST 3: GET ONE - Obtener la mariposa recién creada
                addResult('🔍 TEST 3: Obteniendo mariposa específica...', 'test');
                const oneButterfly = await getOneButterfly(createdButterfly.id);
                console.log('GET ONE - Resultado:', oneButterfly);
                addResult(`✅ GET ONE: Mariposa "${oneButterfly.name}" obtenida correctamente`, 'success');
                
                // TEST 4: UPDATE - Actualizar la mariposa
                addResult('✏️ TEST 4: Actualizando mariposa...', 'test');
                const updatedData = {
                    ...oneButterfly,
                    name: "Mariposa de Prueba ACTUALIZADA",
                    description: "Descripción actualizada mediante PUT",
                    wingspan: "10-12 cm",
                    status: "Actualizada"
                };
                
                const updatedButterfly = await updateButterfly(createdButterfly.id, updatedData);
                console.log('UPDATE - Resultado:', updatedButterfly);
                addResult(`✅ UPDATE: Mariposa actualizada. Nuevo nombre: "${updatedButterfly.name}"`, 'success');
                
                // TEST 5: DELETE - Eliminar la mariposa de prueba
                addResult('🗑️ TEST 5: Eliminando mariposa de prueba...', 'test');
                const deleteResult = await deleteButterfly(createdButterfly.id);
                console.log('DELETE - Resultado:', deleteResult);
                addResult(`✅ DELETE: Mariposa eliminada correctamente`, 'success');
                
                // TEST 6: Verificar que se eliminó (debería dar error)
                addResult('🔍 TEST 6: Verificando eliminación...', 'test');
                try {
                    await getOneButterfly(createdButterfly.id);
                    addResult('⚠️ ADVERTENCIA: La mariposa aún existe después de eliminarla', 'warning');
                } catch (error) {
                    addResult('✅ VERIFICACIÓN: Mariposa eliminada correctamente (error esperado)', 'success');
                    throw error;
                }
                
            } else {
                addResult('❌ CREATE: Error - No se pudo crear la mariposa', 'error');
            }
            
            addResult('🎉 Todas las pruebas completadas exitosamente!', 'success');
            
        } catch (error) {
            console.error('Error en las pruebas:', error);
            addResult(`❌ Error durante las pruebas: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const runIndividualTest = async (testType) => {
        setIsLoading(true);
        
        try {
            switch(testType) {
                case 'getAll':{
                    addResult('📋 Ejecutando GET ALL...', 'test');
                    const all = await getAllButterflies();
                    console.log('GET ALL:', all);
                    addResult(`✅ GET ALL: ${all?.length || 0} mariposas`, 'success');
                    break;
                }
                case 'getOne':{
                    if (!testButterflyId) {
                        addResult('⚠️ Primero crea una mariposa para probar GET ONE', 'warning');
                        return;
                    }
                    addResult(`🔍 Ejecutando GET ONE (ID: ${testButterflyId})...`, 'test');
                    const one = await getOneButterfly(testButterflyId);
                    console.log('GET ONE:', one);
                    addResult(`✅ GET ONE: ${one.name}`, 'success');
                    break;
                }
                case 'create':{
                    addResult('➕ Ejecutando CREATE...', 'test');
                    const newTest = {
                        name: "Mariposa Individual",
                        species: "Individual testus",
                        location: "Australia"
                    };
                    const created = await createButterfly(newTest);
                    console.log('CREATE:', created);
                    setTestButterflyId(created.id);
                    addResult(`✅ CREATE: ID ${created.id}`, 'success');
                    break;
                }
                default:
                    addResult('❌ Tipo de prueba no válido', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            addResult(`❌ Error: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const clearResults = () => {
        setResults([]);
        setTestButterflyId(null);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>🦋 Pruebas de Servicios CRUD - Mariposas</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={runAllTests} 
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Ejecutando...' : '🧪 Ejecutar Todas las Pruebas'}
                </button>
                
                <button 
                    onClick={() => runIndividualTest('getAll')} 
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    📋 GET ALL
                </button>
                
                <button 
                    onClick={() => runIndividualTest('create')} 
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#FF9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    ➕ CREATE
                </button>
                
                <button 
                    onClick={() => runIndividualTest('getOne')} 
                    disabled={isLoading || !testButterflyId}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#9C27B0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading || !testButterflyId ? 'not-allowed' : 'pointer'
                    }}
                >
                    🔍 GET ONE
                </button>
                
                <button 
                    onClick={clearResults}
                    disabled={isLoading || !testButterflyId}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    🗑️ Limpiar
                </button>
            </div>

            {testButterflyId && (
                <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#e8f5e8', 
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    <strong>ID de mariposa de prueba actual:</strong> {testButterflyId}
                </div>
            )}

            <div style={{ 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                padding: '15px',
                maxHeight: '400px',
                overflowY: 'auto',
                backgroundColor: '#f9f9f9'
            }}>
                <h3>📊 Resultados:</h3>
                {results.length === 0 ? (
                    <p style={{ color: '#666' }}>No hay resultados aún. Ejecuta una prueba para ver los resultados.</p>
                ) : (
                    results.map((result, index) => (
                        <div 
                            key={index}
                            style={{
                                padding: '5px 10px',
                                marginBottom: '5px',
                                borderRadius: '3px',
                                backgroundColor: 
                                    result.type === 'success' ? '#d4edda' :
                                    result.type === 'error' ? '#f8d7da' :
                                    result.type === 'warning' ? '#fff3cd' :
                                    result.type === 'test' ? '#e3f2fd' :
                                    '#f8f9fa',
                                color:
                                    result.type === 'success' ? '#155724' :
                                    result.type === 'error' ? '#721c24' :
                                    result.type === 'warning' ? '#856404' :
                                    result.type === 'test' ? '#0c5460' :
                                    '#495057',
                                fontFamily: 'monospace',
                                fontSize: '14px'
                            }}
                        >
                            <span style={{ opacity: 0.7 }}>[{result.timestamp}]</span> {result.message}
                        </div>
                    ))
                )}
            </div>
            
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <p><strong>Instrucciones:</strong></p>
                <ul>
                    <li>Abre la consola del navegador (F12) para ver los detalles completos</li>
                    <li>Asegúrate de que tu backend esté corriendo en localhost:3000</li>
                    <li>El botón "Ejecutar Todas las Pruebas" realiza un ciclo completo: GET ALL → CREATE → GET ONE → UPDATE → DELETE</li>
                    <li>También puedes ejecutar pruebas individuales con los otros botones</li>
                </ul>
            </div>
        </div>
    );
};

export default TestServices;


