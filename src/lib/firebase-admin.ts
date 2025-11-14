import { getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Initialize Firebase Admin SDK once per runtime
function initFirebaseAdmin() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    let privateKey = process.env.FIREBASE_PRIVATE_KEY

    // Allow escaped newlines in env
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n')
    }

    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    } else {
      // Fallback to applicationDefault if service account not explicitly set
      initializeApp({
        credential: applicationDefault(),
      })
    }
  }
  return getAuth()
}

export const adminAuth = initFirebaseAdmin()
