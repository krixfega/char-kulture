import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Database, Upload, Users, ArrowLeft } from 'lucide-react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';

const FirebaseTest = () => {
  const [testResults, setTestResults] = useState({
    connection: null,
    firestore: null,
    firestoreQuery: null,
    auth: null
  });
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testFirebaseConnection = async () => {
    setTesting(true);
    setTestResults({ connection: null, firestore: null, firestoreQuery: null, auth: null });
    setLogs([]);

    try {
      addLog('Starting Firebase connection tests...', 'info');

      // Test 1: Basic Connection
      addLog('Testing basic Firebase connection...', 'info');
      try {
        if (db && auth) {
          setTestResults(prev => ({ ...prev, connection: true }));
          addLog('✅ Firebase services initialized successfully', 'success');
        } else {
          throw new Error('Firebase services not initialized');
        }
      } catch (error) {
        setTestResults(prev => ({ ...prev, connection: false }));
        addLog(`❌ Firebase initialization failed: ${error.message}`, 'error');
        return;
      }

      // Test 2: Basic Firestore Operations
      addLog('Testing Firestore basic operations...', 'info');
      try {
        const testCollection = collection(db, 'test');
        const testDoc = await addDoc(testCollection, { 
          test: true, 
          timestamp: new Date(),
          message: 'Firebase test from React app' 
        });
        addLog(`✅ Document created with ID: ${testDoc.id}`, 'success');

        // Read the document back
        const snapshot = await getDocs(testCollection);
        addLog(`✅ Retrieved ${snapshot.size} test documents`, 'success');

        // Clean up
        await deleteDoc(doc(db, 'test', testDoc.id));
        addLog('✅ Test document cleaned up', 'success');

        setTestResults(prev => ({ ...prev, firestore: true }));
      } catch (error) {
        setTestResults(prev => ({ ...prev, firestore: false }));
        addLog(`❌ Firestore basic test failed: ${error.message}`, 'error');
      }

      // Test 3: Complex Query (like your blog query)
      addLog('Testing complex Firestore query...', 'info');
      try {
        const postsCollection = collection(db, 'posts');
        const q = query(
          postsCollection,
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        addLog(`✅ Complex query executed successfully (${querySnapshot.size} results)`, 'success');
        setTestResults(prev => ({ ...prev, firestoreQuery: true }));
      } catch (error) {
        setTestResults(prev => ({ ...prev, firestoreQuery: false }));
        if (error.message.includes('index')) {
          addLog('❌ Query failed: Missing Firestore index', 'error');
          addLog('Click the index creation link from the previous error to fix this', 'warning');
        } else {
          addLog(`❌ Complex query failed: ${error.message}`, 'error');
        }
      }

      // Test 4: Authentication Service
      addLog('Testing Firebase Authentication...', 'info');
      try {
        if (auth) {
          addLog(`✅ Auth service available. Current user: ${auth.currentUser ? auth.currentUser.email : 'Not signed in'}`, 'success');
          setTestResults(prev => ({ ...prev, auth: true }));
        } else {
          throw new Error('Auth service not available');
        }
      } catch (error) {
        setTestResults(prev => ({ ...prev, auth: false }));
        addLog(`❌ Authentication test failed: ${error.message}`, 'error');
      }

      addLog('All tests completed!', 'info');
    } catch (error) {
      addLog(`Unexpected error: ${error.message}`, 'error');
    } finally {
      setTesting(false);
    }
  };

  const StatusIcon = ({ status }) => {
    if (status === null) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    if (status === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusText = (status) => {
    if (status === null) return 'Not tested';
    if (status === true) return 'Working';
    return 'Failed';
  };

  const getStatusColor = (status) => {
    if (status === null) return 'text-gray-600';
    if (status === true) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Firebase Connection Test</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <p className="text-gray-600">Test your Firebase services to ensure everything is working correctly</p>
          </div>

          {/* Test Button */}
          <div className="text-center mb-8">
            <motion.button
              onClick={testFirebaseConnection}
              disabled={testing}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
              whileHover={{ scale: testing ? 1 : 1.05 }}
              whileTap={{ scale: testing ? 1 : 0.95 }}
            >
              {testing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Testing...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Run Firebase Tests
                </>
              )}
            </motion.button>
          </div>

          {/* Test Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { key: 'connection', label: 'Firebase Init', icon: Database },
              { key: 'firestore', label: 'Basic Firestore', icon: Database },
              { key: 'firestoreQuery', label: 'Complex Query', icon: Database },
              { key: 'auth', label: 'Authentication', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <motion.div
                key={key}
                className="bg-gray-50 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{label}</h3>
                <div className="flex items-center justify-center gap-2">
                  <StatusIcon status={testResults[key]} />
                  <span className={`text-xs font-medium ${getStatusColor(testResults[key])}`}>
                    {getStatusText(testResults[key])}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logs */}
          {logs.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-4 mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Test Logs
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-gray-400 font-mono text-xs whitespace-nowrap">
                      {log.timestamp}
                    </span>
                    <span className={`${
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'warning' ? 'text-yellow-400' :
                      'text-gray-300'
                    }`}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Index Creation Helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3">Quick Index Creation:</h3>
            <p className="text-sm text-blue-700 mb-3">
              If the complex query test fails, you need to create a Firestore index:
            </p>
            <div className="bg-blue-100 rounded p-3 text-sm text-blue-800">
              <strong>Manual Creation:</strong><br/>
              1. Go to Firebase Console → Firestore → Indexes<br/>
              2. Create Composite Index for collection: <code>posts</code><br/>
              3. Fields: <code>published</code> (Ascending), <code>createdAt</code> (Descending)
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => window.location.href = '/blog'}
              className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Test Blog Page
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Go to Admin
            </button>
            <button
              onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
              className="bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Firebase Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;