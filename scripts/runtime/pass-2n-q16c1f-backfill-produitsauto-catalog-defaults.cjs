function initAdmin(admin) {
  if (admin.apps.length > 0) return;

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    "terragest-dev";

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId || serviceAccount.project_id,
    });

    return;
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccountPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId || serviceAccount.project_id,
    });

    return;
  }

  admin.initializeApp({
    projectId,
  });
}