import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccountPath = process.env.FIREBASE_CREDENTIAL_PATH;

    if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
      throw new Error(
        'Firebase service account JSON not found or path is invalid',
      );
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf8'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  sendToOne(token: string, title: string, body: string) {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
    };

    return admin.messaging().send(message);
  }

  sendToMany(tokens: string[], title: string, body: string) {
    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: {
        title,
        body,
      },
    };

    return admin.messaging().sendEachForMulticast(message);
  }
}
