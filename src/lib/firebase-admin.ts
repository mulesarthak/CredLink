import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK once per runtime
function initFirebaseAdmin() {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    let privateKey = process.env.FIREBASE_PRIVATE_KEY

    // Allow escaped newlines in env
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n')
    }

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    } else {
      // Fallback to applicationDefault if service account not explicitly set
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      })
    }
  }
  return admin.auth()
}

export const adminAuth = initFirebaseAdmin()
